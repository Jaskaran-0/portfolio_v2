// lib/three-arch.ts
// 3D Floating Architecture Diagram — RCAF Facial Recognition System
// Renders into the featured project card on hover

import * as THREE from 'three'

interface ArchSceneOptions {
  canvas: HTMLCanvasElement
}

const NODES = [
  { label: 'Archival Images\n1,000+', color: 0x666666, pos: new THREE.Vector3(-1.8, 1.8, 0.2) },
  { label: 'Real-ESRGAN',             color: 0xFF3C00, pos: new THREE.Vector3(0, 1.8, 0) },
  { label: 'ArcFace',                 color: 0xFF3C00, pos: new THREE.Vector3(0, 0, 0) },
  { label: 'PostgreSQL',              color: 0xF5C518, pos: new THREE.Vector3(-1.2, -1.8, -0.2) },
  { label: 'Match Output',            color: 0x888888, pos: new THREE.Vector3(1.2, -1.8, 0.2) },
]

const CONNECTIONS = [[0, 1], [1, 2], [2, 3], [2, 4]]

export class ArchScene {
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private nodeMeshes: THREE.Object3D[] = []
  private animId: number = 0
  private t: number = 0
  private active: boolean = false
  private keyLight!: THREE.PointLight

  constructor({ canvas }: ArchSceneOptions) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setClearColor(0x000000, 0) // transparent bg

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    this.camera.position.set(0, 0, 6)

    this.buildNodes()
    this.buildConnections()
    this.buildLights()
    this.resize()
  }

  private buildNodes() {
    NODES.forEach(n => {
      // Node sphere
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 14, 10),
        new THREE.MeshPhongMaterial({
          color: n.color,
          emissive: n.color,
          emissiveIntensity: 0.35,
          shininess: 90
        })
      )
      sphere.position.copy(n.pos)
      this.scene.add(sphere)
      this.nodeMeshes.push(sphere)

      // Glow wireframe ring around node
      const ring = new THREE.LineSegments(
        new THREE.WireframeGeometry(new THREE.SphereGeometry(0.3, 8, 6)),
        new THREE.LineBasicMaterial({ color: n.color, transparent: true, opacity: 0.18 })
      )
      ring.position.copy(n.pos)
      this.scene.add(ring)
      this.nodeMeshes.push(ring)
    })
  }

  private buildConnections() {
    CONNECTIONS.forEach(([a, b]) => {
      const points = [NODES[a].pos.clone(), NODES[b].pos.clone()]
      const geo = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(
        geo,
        new THREE.LineBasicMaterial({ color: 0xFF3C00, transparent: true, opacity: 0.22 })
      )
      this.scene.add(line)
      this.nodeMeshes.push(line)
    })
  }

  private buildLights() {
    this.scene.add(new THREE.AmbientLight(0x333333, 0.6))
    this.keyLight = new THREE.PointLight(0xFF3C00, 2.2, 12)
    this.keyLight.position.set(2, 2, 3)
    this.scene.add(this.keyLight)
    const fill = new THREE.PointLight(0xF5C518, 1.0, 10)
    fill.position.set(-2, -1, 2)
    this.scene.add(fill)
  }

  resize() {
    const c = this.renderer.domElement
    const w = c.parentElement?.offsetWidth || 400
    const h = c.parentElement?.offsetHeight || 300
    this.renderer.setSize(w, h, false)
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
  }

  setActive(val: boolean) {
    this.active = val
    if (val) this.resize()
  }

  start() {
    const tick = () => {
      this.animId = requestAnimationFrame(tick)
      if (!this.active) return
      this.t += 0.012

      // Orbit camera slowly around origin
      this.camera.position.x = Math.sin(this.t * 0.4) * 1.2
      this.camera.position.y = Math.cos(this.t * 0.3) * 0.6
      this.camera.lookAt(0, 0, 0)

      // Pulse individual nodes
      this.nodeMeshes.forEach((m, i) => {
        if ((m as THREE.Mesh).geometry?.type === 'SphereGeometry') {
          const g = (m as THREE.Mesh).geometry as THREE.SphereGeometry
          if (g.parameters.radius < 0.25) {
            const pulse = 1 + Math.sin(this.t * 1.5 + i * 0.7) * 0.06
            m.scale.setScalar(pulse)
          }
        }
      })

      // Key light orbit
      this.keyLight.position.x = Math.sin(this.t * 0.7) * 3
      this.keyLight.position.y = Math.cos(this.t * 0.5) * 2

      this.renderer.render(this.scene, this.camera)
    }
    tick()
  }

  dispose() {
    cancelAnimationFrame(this.animId)
    this.renderer.dispose()
    this.scene.traverse(obj => {
      if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose()
      if ((obj as THREE.Mesh).material) {
        const mat = (obj as THREE.Mesh).material
        if (Array.isArray(mat)) mat.forEach(m => m.dispose())
        else mat.dispose()
      }
    })
  }
}
