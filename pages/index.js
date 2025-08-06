import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollingClients from '../components/ScrollingClients'

export default function Home() {
  return (
    <>
      <Head>
        <title>Odiscom LLC</title>
      </Head>
      <Header />
      <main className="bg-gray-50 min-h-screen flex flex-col items-center text-gray-800">
        <section className="text-center py-20 px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Wireless and Wireline A&E Experts
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Over 30 years of experience in telecom engineering and construction.
          </p>
          <a href="/services" className="bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-blue-700">
            View Our Services
          </a>
        </section>
        <ScrollingClients />
      </main>
      <Footer />
    </>
  );
}