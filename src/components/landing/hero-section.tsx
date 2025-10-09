import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className='relative flex min-h-[600px] flex-col items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4 text-center pt-24'>
      <div className='mx-auto max-w-4xl space-y-6'>
        <h1 className='text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl'>HELLO WORLD!</h1>
        <p className='mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl'>
          First project using Next.js, Tailwind CSS and TypeScript. This is a landing page for a
          fictional bank called UFBank.
        </p>
      </div>
    </section>
  )
}
