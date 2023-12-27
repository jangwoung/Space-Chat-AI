import Image from 'next/image'

export default function Home() {
  return (
    <main>
      {process.env.NEXT_PUBLIC_API_KEY}
    </main>
  )
}