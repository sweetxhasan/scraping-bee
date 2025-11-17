import Head from 'next/head'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import TestAPI from '../components/TestAPI'
import Examples from '../components/Examples'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-space">
      <Head>
        <title>Scraping Bee - Web Scraping API</title>
        <meta name="description" content="Extract HTML from any website with our powerful API" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>

      <Header />
      <Hero />
      <Stats />
      <TestAPI />
      <Examples />
      <Footer />
    </div>
  )
    }
