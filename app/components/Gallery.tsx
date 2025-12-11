'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, ExternalLink } from 'lucide-react';

const galleryItems = [
  {
    src: '/elizabeth-holmes.jpg',
    alt: 'Elizabeth Holmes at TechCrunch Disrupt 2014',
    caption: 'TechCrunch Disrupt SF, 2014',
    credit: 'Max Morse/TechCrunch',
    license: 'CC BY 2.0'
  },
  {
    src: '/holmes-2014-full.jpg',
    alt: 'Elizabeth Holmes backstage at TechCrunch',
    caption: 'Backstage Interview, 2014',
    credit: 'Max Morse/TechCrunch',
    license: 'CC BY 2.0'
  }
];

const quotes = [
  {
    text: "First they think you're crazy, then they fight you, then you change the world.",
    attribution: "Elizabeth Holmes"
  },
  {
    text: "The minute you have a back-up plan, you've admitted you're not going to succeed.",
    attribution: "Elizabeth Holmes"
  },
  {
    text: "I think a lot of young people have incredible ideas and incredible insights, but sometimes they wait before they go give their life to something.",
    attribution: "Elizabeth Holmes"
  }
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 sm:py-32 bg-gradient-to-b from-background to-card/20 relative">
      <div className="container mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="outline" className="px-4 py-2 border-primary/20 bg-primary/5">
              <Camera className="w-4 h-4 mr-2 text-primary" />
              Gallery
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            Before the <span className="gradient-text">Fall</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A young visionary who dared to dream of changing healthcare. The dream failed, but the dreamer remains.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {galleryItems.map((item, index) => (
            <Card key={index} className="border-border/30 bg-card/30 backdrop-blur-sm overflow-hidden group">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-white font-medium">{item.caption}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Quotes Section */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-center mb-8 text-muted-foreground">In Her Words</h3>
          <div className="grid gap-6">
            {quotes.map((quote, index) => (
              <Card key={index} className="border-border/30 bg-card/30 backdrop-blur-sm">
                <CardContent className="p-6 sm:p-8">
                  <blockquote className="text-lg sm:text-xl italic text-foreground/90 font-serif mb-4">
                    &ldquo;{quote.text}&rdquo;
                  </blockquote>
                  <p className="text-sm text-muted-foreground">— {quote.attribution}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline Teaser */}
        <div className="mt-16 text-center">
          <Card className="inline-block border-border/30 bg-card/30 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-4 text-left">
                <div className="text-4xl">📅</div>
                <div>
                  <h4 className="font-bold text-foreground">The Timeline</h4>
                  <p className="text-sm text-muted-foreground">2003: Founded Theranos at 19</p>
                  <p className="text-sm text-muted-foreground">2014: Peak valuation $9B</p>
                  <p className="text-sm text-muted-foreground">2022: Convicted of fraud</p>
                  <p className="text-sm text-muted-foreground">2023: Began 11-year sentence</p>
                  <p className="text-sm text-amber-400 font-medium">202?: Second chance?</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
