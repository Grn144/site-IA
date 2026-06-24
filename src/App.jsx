import Navbar from './components/layout/Navbar/Navbar'
import Footer from './components/layout/Footer/Footer'
import Hero from './components/sections/Hero/Hero'
import About from './components/sections/About/About'
import HowItWorks from './components/sections/HowItWorks/HowItWorks'
import UseCases from './components/sections/UseCases/UseCases'
import FAQ from './components/sections/FAQ/FAQ'
import CtaFinal from './components/sections/CtaFinal/CtaFinal'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <HowItWorks />
        <UseCases />
        <FAQ />
        <CtaFinal />
      </main>
      <Footer />
    </>
  )
}
