import Hero    from '@/sections/Hero'
import Chapter from '@/components/Chapter'

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

      <Chapter
        id="projects"
        num="02"
        title="THE WORK"
        quote="Three projects. Real problems. Shipped code."
      />

      <Chapter
        id="skills"
        num="03"
        title="THE ARSENAL"
        quote="Tools are just tools. It's the hand that matters."
      />

      <Chapter
        id="contact"
        num="04"
        title="LET'S TALK"
        quote="No recruiters from non-technical firms. Everyone else: proceed."
      />
    </main>
  )
}
