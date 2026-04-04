import Hero     from '@/sections/Hero'
import About    from '@/sections/About'
import Projects from '@/sections/Projects'
import Skills   from '@/sections/Skills'
import Contact  from '@/sections/Contact'
import Chapter  from '@/components/Chapter'

export default function Home() {
  return (
    <main>
      <Hero />

      <Chapter
        id="about"
        num="01"
        title="THE MAN BEHIND THE MACHINE"
        quote="I'm not in the business of making pretty things. I'm in the business of making things that work."
      />
      <About />

      <Chapter
        id="projects"
        num="02"
        title="THE WORK"
        quote="Three projects. Real problems. Shipped code."
      />
      <Projects />

      <Chapter
        id="skills"
        num="03"
        title="THE ARSENAL"
        quote="Tools are just tools. It's the hand that matters."
      />
      <Skills />

      <Chapter
        id="contact"
        num="04"
        title="LET'S TALK"
        quote="No recruiters from non-technical firms. Everyone else: proceed."
      />
      <Contact />
    </main>
  )
}
