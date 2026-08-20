import Hero from "@/components/pages/hero"
import FeatureCards from "@/components/pages/feature-cards"
import Testimonials from "@/components/pages/testimonials"
import Intro from "@/components/pages/intro"
import HowItWorks from "@/components/pages/howitworks"
import { Wave } from "@/components/ui/wave"

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="relative">
        <Wave variant="foreground" />
      </div>
      <FeatureCards />
      <div className="relative">
        <Wave variant="background" />
      </div>
      <Intro />
      <div className="relative">
        <Wave variant="foreground" />
      </div>

      <HowItWorks />
      <div className="relative">
        <Wave variant="background" />
      </div>
      <Testimonials />
    </main>
  )
}
