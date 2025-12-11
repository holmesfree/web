'use client';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Backers from './components/Backers';
import About from './components/About';
import Gallery from './components/Gallery';
import Tokenomics from './components/Tokenomics';
import HowToMint from './components/HowToMint';
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
      <HowToMint />
      <ViralFeatures />
      <FAQ />
      <Roadmap />
      <Footer />
    </main>
  );
}
