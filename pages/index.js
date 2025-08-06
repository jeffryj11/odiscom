import Head from 'next/head'

import ScrollingClients from '../components/ScrollingClients'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-800">
      <Head>
        <title>Odiscom LLC</title>
      </Head>
      <main className="text-center px-6 py-12">
        <h1 className="text-4xl font-bold mb-4">Odiscom LLC</h1>
        <p className="text-lg mb-6">
          Civil. Structural. Telecom. Construction.<br />
          Proudly serving AT&T, Smartlink, EBI, SONIC, Zayo, and more.
        </p>
        <a href="/about" className="text-blue-600 underline">Learn more about us</a>
            <ScrollingClients />
    </main>
    </div>
  )
}