import Navbar from './components/layout/Navbar/Navbar'
import Footer from './components/layout/Footer/Footer'
import Hero from './components/sections/Hero/Hero'
import About from './components/sections/About/About'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
      </main>
      <Footer />
    </>
  )
}
