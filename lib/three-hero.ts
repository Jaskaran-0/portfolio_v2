// lib/three-hero.ts
// Three.js Hero Scene — Icosahedron (A) + Peripheral Shards (B)
// Content-first: left zone protected, 3D lives on right half only

import * as THREE from 'three'

interface HeroSceneOptions {
  canvas: HTMLCanvasElement
  onReady?: () => void
}

export class HeroScene {
  private renderer: THREE.WebGLRenderer
  private scene: THREE.Scene
  private camera: THREE.PerspectiveCamera
  private ico!: THREE.LineSegments
  private icoSolid!: THREE.Mesh
  private ico2!: THREE.LineSegments
  private icoMat!: THREE.LineBasicMaterial
  private shards: THREE.Object3D[] = []
  private keyLight!: THREE.PointLight
  private animId: number = 0
  private t: number = 0
  private nmx: number = 0
  private nmy: number = 0
  private tmx: number = 0
  private tmy: number = 0
  private scrollVel: number = 0
  private lastSY: number = 0
  private mouse3D: THREE.Vector3 = new THREE.Vector3()
  private raycaster: THREE.Raycaster = new THREE.Raycaster()
  private plane: THREE.Plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0)
  private W: number = 0
  private H: number = 0

  constructor({ canvas, onReady }: HeroSceneOptions) {
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setClearColor(0x050505, 1)

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
    this.camera.position.set(0, 0, 7)

    this.buildIcosahedron()
    this.buildShards()
    this.buildLights()
    this.bindEvents()
    this.resize()

    onReady?.()
  }

  private buildIcosahedron() {
    const geo = new THREE.IcosahedronGeometry(1.55, 1)

    // Outer wireframe — primary visible element
    this.icoMat = new THREE.LineBasicMaterial({ color: 0xFF3C00, transparent: true, opacity: 0.46 })
    this.ico = new THREE.LineSegments(new THREE.WireframeGeometry(geo), this.icoMat)
    this.ico.position.set(2.6, 0, 0)
    this.scene.add(this.ico)

    // Inner solid — dark, provides depth
    this.icoSolid = new THREE.Mesh(
      geo.clone(),
      new THREE.MeshPhongMaterial({ color: 0x110400, transparent: true, opacity: 0.82, shininess: 60 })
    )
    this.icoSolid.position.copy(this.ico.position)
    this.icoSolid.scale.setScalar(0.99)
    this.scene.add(this.icoSolid)

    // Ghost outer ring — barely visible, adds scale reference
    this.ico2 = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(2.5, 0)),
      new THREE.LineBasicMaterial({ color: 0xF5C518, transparent: true, opacity: 0.06 })
    )
    this.ico2.position.copy(this.ico.position)
    this.scene.add(this.ico2)
  }

  private buildShards() {
    const colors = [0xFF3C00, 0xF5C518, 0xFF6633, 0xAA2200]

    for (let i = 0; i < 38; i++) {
      const size = Math.random() * 0.2 + 0.04
      const t = Math.random()
      const geo = t < 0.4
        ? new THREE.TetrahedronGeometry(size, 0)
        : t < 0.75
          ? new THREE.OctahedronGeometry(size, 0)
          : new THREE.IcosahedronGeometry(size, 0)

      const col = colors[Math.floor(Math.random() * colors.length)]
      let mesh: THREE.Object3D

      if (Math.random() > 0.4) {
        mesh = new THREE.LineSegments(
          new THREE.WireframeGeometry(geo),
          new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: Math.random() * 0.3 + 0.08 })
        )
      } else {
        mesh = new THREE.Mesh(
          geo,
          new THREE.MeshPhongMaterial({ color: col, transparent: true, opacity: Math.random() * 0.18 + 0.04, shininess: 80 })
        )
      }

      // Right half only — xMin: -1.2 keeps shards out of text zone
      mesh.position.set(
        -1.2 + Math.random() * 7.8,
        (Math.random() - 0.5) * 6.5,
        (Math.random() - 0.5) * 3.5 - 1
      )
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      )

      ;(mesh as any)._base = mesh.position.clone()
      ;(mesh as any)._vel = new THREE.Vector3()
      ;(mesh as any)._rs = new THREE.Vector3(
        (Math.random() - 0.5) * 0.011,
        (Math.random() - 0.5) * 0.011,
        (Math.random() - 0.5) * 0.007
      )
      ;(mesh as any)._ph = Math.random() * Math.PI * 2
      ;(mesh as any)._da = Math.random() * 0.004 + 0.001

      this.scene.add(mesh)
      this.shards.push(mesh)
    }
  }

  private buildLights() {
    this.scene.add(new THREE.AmbientLight(0x1a0500, 0.7))

    this.keyLight = new THREE.PointLight(0xFF3C00, 2.4, 12)
    this.keyLight.position.set(3, 2, 4)
    this.scene.add(this.keyLight)

    const fill = new THREE.PointLight(0xF5C518, 0.75, 14)
    fill.position.set(-2, -3, 3)
    this.scene.add(fill)

    const rim = new THREE.PointLight(0xFF6633, 1.1, 7)
    rim.position.set(2.6, 0, -3)
    this.scene.add(rim)
  }

  private bindEvents() {
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('resize', this.resize)
  }

  private onMouseMove = (e: MouseEvent) => {
    this.nmx = (e.clientX / window.innerWidth) * 2 - 1
    this.nmy = -((e.clientY / window.innerHeight) * 2 - 1)
  }

  private onScroll = () => {
    const sy = window.scrollY
    this.scrollVel = Math.abs(sy - this.lastSY)
    this.lastSY = sy
    setTimeout(() => { this.scrollVel *= 0.85 }, 120)
  }

  resize = () => {
    const canvas = this.renderer.domElement
    this.W = canvas.parentElement?.offsetWidth || window.innerWidth
    this.H = canvas.parentElement?.offsetHeight || window.innerHeight
    this.renderer.setSize(this.W, this.H, false)
    this.camera.aspect = this.W / this.H
    this.camera.updateProjectionMatrix()
  }

  private updateMouse3D() {
    this.raycaster.setFromCamera({ x: this.nmx, y: this.nmy }, this.camera)
    this.raycaster.ray.intersectPlane(this.plane, this.mouse3D)
  }

  start() {
    const tick = () => {
      this.animId = requestAnimationFrame(tick)
      this.t += 0.01
      this.tmx += (this.nmx - this.tmx) * 0.04
      this.tmy += (this.nmy - this.tmy) * 0.04
      this.updateMouse3D()

      // Icosahedron rotation
      this.ico.rotation.x = this.t * 0.14 + this.tmy * 0.44
      this.ico.rotation.y = this.t * 0.20 + this.tmx * 0.54
      this.icoSolid.rotation.copy(this.ico.rotation)
      this.ico2.rotation.x = this.ico.rotation.x * 0.6
      this.ico2.rotation.y = this.ico.rotation.y * 0.6

      // Breathing pulse
      const pulse = 1 + Math.sin(this.t * 1.1) * 0.024
      this.ico.scale.setScalar(pulse)
      this.icoSolid.scale.setScalar(pulse * 0.98)

      // Key light follows mouse
      this.keyLight.position.x = 2.6 + Math.sin(this.t * 0.6) * 1.8 + this.tmx * 1.4
      this.keyLight.position.y = Math.cos(this.t * 0.5) * 1.4 + this.tmy * 1.1

      // Wireframe color shifts with mouse Y
      this.icoMat.color.setRGB(
        Math.min(1, 0.9 + this.tmy * 0.1),
        Math.max(0, 0.14 + this.tmy * 0.08),
        0
      )

      // Shard updates
      this.shards.forEach(s => {
        const m = s as any
        s.rotation.x += m._rs.x
        s.rotation.y += m._rs.y
        s.rotation.z += m._rs.z

        const drift = new THREE.Vector3(
          Math.sin(this.t * 0.35 + m._ph) * m._da,
          Math.cos(this.t * 0.28 + m._ph + 1) * m._da,
          0
        )

        if (this.mouse3D.lengthSq() < 200) {
          const toMouse = new THREE.Vector3().subVectors(s.position, this.mouse3D)
          const dist = toMouse.length()
          if (dist < 2.0 && dist > 0.01) {
            m._vel.addScaledVector(toMouse.normalize(), (1 - dist / 2.0) * 0.016)
          }
        }

        m._vel.addScaledVector(new THREE.Vector3().subVectors(m._base, s.position), 0.022)
        m._vel.add(drift)
        m._vel.multiplyScalar(0.88)
        s.position.add(m._vel)
      })

      this.renderer.render(this.scene, this.camera)
    }
    tick()
  }

  // MUST be called in useEffect cleanup — prevents memory leak
  dispose() {
    cancelAnimationFrame(this.animId)
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.resize)
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
