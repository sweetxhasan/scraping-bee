import Head from 'next/head'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Stats from '../components/Stats'
import TestAPI from '../components/TestAPI'
import Examples from '../components/Examples'
import Footer from '../components/Footer'
import GenerateKeyModal from '../components/GenerateKeyModal'

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Scraping Bee - Premium Web Scraping API</title>
        <meta name="description" content="Extract clean HTML from any website with our powerful, fast, and reliable scraping API" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Hero />
      <Stats />
      <TestAPI />
      <Examples />
      <Footer />
      <GenerateKeyModal />
    </Layout>
  )
}
