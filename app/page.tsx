'use client';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Backers from './components/Backers';
import About from './components/About';
import Gallery from './components/Gallery';
import Tokenomics from './components/Tokenomics';
import Trade from './components/Trade';
import HowToMint from './components/HowToMint';
import News from './components/News';
import ViralFeatures from './components/ViralFeatures';
import FAQ from './components/FAQ';
import Roadmap from './components/Roadmap';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Backers />
      <About />
      <Gallery />
      <Tokenomics />
      <Trade />
      <HowToMint />
      <News />
      <ViralFeatures />
      <FAQ />
      <Roadmap />
      <Footer />
    </main>
  );
}
