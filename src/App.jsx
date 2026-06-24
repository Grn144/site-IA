import Navbar from './components/layout/Navbar/Navbar'
import Footer from './components/layout/Footer/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <p style={{ color: 'white', padding: '4rem 2rem' }}>Conteúdo principal</p>
      </main>
      <Footer />
    </>
  )
}
