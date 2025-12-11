'use client';

import { useState, useEffect } from 'react';
import MintBanner from './components/MintBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ContractCard from './components/ContractCard';
import Backers from './components/Backers';
import About from './components/About';
import Gallery from './components/Gallery';
import Tokenomics from './components/Tokenomics';
import Trade from './components/Trade';
import HowToMint from './components/HowToMint';
import News from './components/News';
import PressKit from './components/PressKit';
import ViralFeatures from './components/ViralFeatures';
import FAQ from './components/FAQ';
import Roadmap from './components/Roadmap';
import Footer from './components/Footer';

const BANNER_DISMISSED_KEY = 'holmes-banner-dismissed';
const BANNER_HEIGHT = 44;

function BannerSpacer() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const checkBanner = () => {
      const dismissed = localStorage.getItem(BANNER_DISMISSED_KEY);
      setHeight(dismissed === 'true' ? 0 : BANNER_HEIGHT);
    };
    checkBanner();
    const interval = setInterval(checkBanner, 100);
    return () => clearInterval(interval);
  }, []);

  if (height === 0) return null;
  return <div style={{ height }} />;
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <MintBanner />
      <BannerSpacer />
      <Navbar />
      <Hero />
      <ContractCard />
      <Backers />
      <About />
      <Gallery />
      <Tokenomics />
      <Trade />
      <HowToMint />
      <News />
      <PressKit />
      <ViralFeatures />
      <FAQ />
      <Roadmap />
      <Footer />
    </main>
  );
}
