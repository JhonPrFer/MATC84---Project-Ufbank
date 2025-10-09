import {
  Navbar,
  HeroSection,
  Footer,
} from '@/components/landing'

export default function Home() {
  return (
    <div className='min-h-screen'>
      <Navbar />
      <main>
        <HeroSection />

      </main>
      <Footer />
    </div>
  )
}
