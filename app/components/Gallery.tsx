'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  ExternalLink,
  Calendar,
  TrendingUp,
  TrendingDown,
  Quote,
  Share2,
  Play,
  Building2,
  Award,
  Newspaper,
  Gavel,
  Heart,
  DollarSign,
  Users,
  Mic,
  AlertTriangle,
  Building,
  Scale
} from 'lucide-react';

// Comprehensive timeline with real article links
const timelineEvents = [
  {
    year: '2003',
    month: 'March',
    title: 'The Beginning',
    headline: 'A 19-Year-Old Drops Out of Stanford',
    description: 'Elizabeth Holmes leaves Stanford after just two years to pursue her dream of revolutionizing healthcare. She founds Real-Time Cures with her tuition money as seed funding.',
    longDescription: 'At just 19 years old, Holmes withdrew from Stanford\'s School of Engineering, convinced she could build technology that would change medicine forever. Her vision: a device that could run hundreds of tests from a single drop of blood.',
    type: 'milestone',
    trend: 'up',
    icon: Building2,
    image: '/elizabeth-holmes.jpg',
    stats: [
      { label: 'Age', value: '19' },
      { label: 'Funding', value: '$6M' },
    ],
    source: null,
    shareText: '2003: A 19-year-old Stanford dropout founded Theranos with a vision to revolutionize blood testing.',
  },
  {
    year: '2004',
    month: 'December',
    title: 'First Patent',
    headline: 'Theranos is Born',
    description: 'The company is renamed from Real-Time Cures to Theranos (combining "therapy" and "diagnosis"). Holmes files her first patent for a wearable drug-delivery patch.',
    type: 'milestone',
    trend: 'up',
    icon: Award,
    image: '/holmes-2014-full.jpg',
    stats: [
      { label: 'Patents Filed', value: '18' },
      { label: 'Employees', value: '12' },
    ],
    source: null,
    shareText: '2004: Theranos is born - a name combining therapy and diagnosis.',
  },
  {
    year: '2010',
    month: 'September',
    title: 'Walgreens Partnership',
    headline: '$140M Deal Signed',
    description: 'Theranos secures a landmark partnership with Walgreens to place blood-testing centers in pharmacies nationwide. The deal signals mainstream acceptance of the technology.',
    type: 'deal',
    trend: 'up',
    icon: Building,
    image: '/elizabeth-holmes.jpg',
    stats: [
      { label: 'Deal Value', value: '$140M' },
      { label: 'Planned Locations', value: '4,500+' },
    ],
    source: {
      name: 'Business Insider',
      url: 'https://www.businessinsider.com/theranos-walgreens-partnership-2016-6',
      logo: '📊',
    },
    shareText: '2010: Theranos signs $140M deal with Walgreens to revolutionize pharmacy blood testing.',
  },
  {
    year: '2011',
    month: 'July',
    title: 'Safeway Signs On',
    headline: 'Another Major Retail Deal',
    description: 'Safeway invests $350 million to renovate stores for Theranos wellness centers. The partnership brings new credibility to Holmes\' vision.',
    type: 'deal',
    trend: 'up',
    icon: DollarSign,
    image: '/holmes-2014-full.jpg',
    stats: [
      { label: 'Investment', value: '$350M' },
      { label: 'Planned Stores', value: '800+' },
    ],
    source: null,
    shareText: '2011: Safeway invests $350M in Theranos wellness centers.',
  },
  {
    year: '2013',
    month: 'September',
    title: 'Forbes Cover Story',
    headline: 'Youngest Self-Made Female Billionaire',
    description: 'Forbes names Elizabeth Holmes the youngest self-made female billionaire in America with a net worth of $4.5 billion, placing her on the Forbes 400.',
    longDescription: 'The Forbes cover story dubbed Holmes "The Next Steve Jobs" - a comparison she carefully cultivated with her black turtlenecks and intense demeanor. Her estimated 50% stake in Theranos made her a paper billionaire.',
    type: 'media',
    trend: 'up',
    icon: Newspaper,
    image: '/elizabeth-holmes.jpg',
    stats: [
      { label: 'Net Worth', value: '$4.5B' },
      { label: 'Forbes Rank', value: '#110' },
    ],
    source: {
      name: 'Forbes',
      url: 'https://www.forbes.com/sites/matthewherper/2014/10/15/elizabeth-holmes-the-breakthrough-of-instant-diagnosis/',
      logo: '📰',
    },
    shareText: '2013: Forbes named Elizabeth Holmes the youngest self-made female billionaire at $4.5B.',
  },
  {
    year: '2014',
    month: 'March',
    title: 'TEDMED Talk',
    headline: '"Technology That Empowers the Individual"',
    description: 'Holmes delivers an inspiring keynote at TEDMED about democratizing healthcare through painless blood testing. The talk goes viral.',
    type: 'media',
    trend: 'up',
    icon: Mic,
    image: '/holmes-2014-full.jpg',
    stats: [
      { label: 'Views', value: '2M+' },
      { label: 'Standing Ovation', value: '✓' },
    ],
    source: {
      name: 'Watch on YouTube',
      url: 'https://www.youtube.com/watch?v=qwqNKT32yWM',
      logo: '🎤',
    },
    videoId: 'qwqNKT32yWM',
    shareText: '2014: Elizabeth Holmes inspires millions at TEDMED with her vision of accessible healthcare.',
  },
  {
    year: '2014',
    month: 'June',
    title: 'Board of Directors',
    headline: 'Political Powerhouse',
    description: 'Theranos assembles an unprecedented board including Henry Kissinger, George Shultz, James Mattis, and other political luminaries. The board lent massive credibility.',
    type: 'milestone',
    trend: 'up',
    icon: Users,
    image: '/elizabeth-holmes.jpg',
    stats: [
      { label: 'Board Members', value: '12' },
      { label: 'Former Cabinet', value: '4' },
    ],
    source: {
      name: 'New Yorker',
      url: 'https://www.newyorker.com/magazine/2014/12/15/blood-simpler',
      logo: '📖',
    },
    shareText: '2014: Theranos board includes Kissinger, Shultz, and Mattis.',
  },
  {
    year: '2014',
    month: 'September',
    title: 'Peak Valuation',
    headline: '$9 Billion Company',
    description: 'After raising $400 million in new funding, Theranos reaches a peak valuation of $9 billion, becoming the most valuable private healthcare startup in history.',
    longDescription: 'Investors including Rupert Murdoch, Betsy DeVos, and the Walton family poured money into the company. Holmes was hailed as a visionary who would transform medicine.',
    type: 'milestone',
    trend: 'up',
    icon: TrendingUp,
    image: '/holmes-2014-full.jpg',
    stats: [
      { label: 'Valuation', value: '$9B' },
      { label: 'Total Raised', value: '$700M+' },
    ],
    source: {
      name: 'TechCrunch',
      url: 'https://techcrunch.com/2014/09/08/theranos/',
      logo: '💚',
    },
    shareText: '2014: Theranos valued at $9 billion - the most valuable private healthcare startup ever.',
  },
  {
    year: '2015',
    month: 'April',
    title: 'TIME 100',
    headline: 'World\'s Most Influential',
    description: 'TIME Magazine names Holmes to its prestigious list of the 100 Most Influential People. Her profile was written by none other than Henry Kissinger.',
    longDescription: '"Elizabeth Holmes\'s vision is not just brilliant, it\'s world-changing," Kissinger wrote. She appeared on covers of Fortune, Forbes, Inc., and Glamour.',
    type: 'media',
    trend: 'up',
    icon: Award,
    image: '/elizabeth-holmes.jpg',
    stats: [
      { label: 'Magazine Covers', value: '15+' },
      { label: 'Profiler', value: 'Kissinger' },
    ],
    source: {
      name: 'TIME Magazine',
      url: 'https://time.com/collection-post/3822734/elizabeth-holmes-2015-time-100/',
      logo: '⏰',
    },
    shareText: '2015: TIME names Elizabeth Holmes one of the 100 Most Influential People.',
  },
  {
    year: '2015',
    month: 'October',
    title: 'THE TURNING POINT',
    headline: 'WSJ Investigation Published',
    description: 'Reporter John Carreyrou publishes his explosive Wall Street Journal investigation revealing that Theranos devices don\'t work as claimed.',
    longDescription: 'Carreyrou\'s investigation, based on tips from whistleblowers, revealed that Theranos was running most tests on commercial machines, not its own Edison device. The company had been covering up serious accuracy problems.',
    type: 'turning_point',
    trend: 'down',
    icon: AlertTriangle,
    image: '/holmes-2014-full.jpg',
    stats: [
      { label: 'Whistleblowers', value: '20+' },
      { label: 'Tests Voided', value: 'Thousands' },
    ],
    source: {
      name: 'Wall Street Journal',
      url: 'https://www.wsj.com/articles/theranos-has-struggled-with-blood-tests-1444881901',
      logo: '📰',
    },
    shareText: '2015: WSJ investigation questions Theranos technology. The beginning of the end.',
    featured: true,
  },
  {
    year: '2016',
    month: 'January',
    title: 'CMS Sanctions',
    headline: 'Lab License Revoked',
    description: 'Federal regulators find serious deficiencies at Theranos labs. CMS threatens to ban Holmes from operating labs for two years.',
    type: 'downfall',
    trend: 'down',
    icon: Gavel,
    image: '/elizabeth-holmes.jpg',
    stats: [
      { label: 'Violations', value: 'Serious' },
      { label: 'Ban Length', value: '2 Years' },
    ],
    source: {
      name: 'Reuters',
      url: 'https://www.reuters.com/article/us-theranos-cms-idUSKCN0XN2RH',
      logo: '⚖️',
    },
    shareText: '2016: Federal regulators revoke Theranos lab license.',
  },
  {
    year: '2016',
    month: 'June',
    title: 'Net Worth: $0',
    headline: 'Forbes Revises Estimate',
    description: 'Forbes dramatically revises Holmes\' net worth from $4.5 billion to zero as Theranos\' value collapses following the investigations.',
    type: 'downfall',
    trend: 'down',
    icon: TrendingDown,
    image: '/holmes-2014-full.jpg',
    stats: [
      { label: 'Previous Worth', value: '$4.5B' },
      { label: 'New Worth', value: '$0' },
    ],
    source: {
      name: 'Forbes',
      url: 'https://www.forbes.com/sites/matthewherper/2016/06/01/from-4-5-billion-to-nothing-forbes-revises-estimated-net-worth-of-theranos-founder-elizabeth-holmes/',
      logo: '📰',
    },
    shareText: '2016: Forbes revises Elizabeth Holmes net worth from $4.5 billion to $0.',
    featured: true,
  },
  {
    year: '2018',
    month: 'March',
    title: 'SEC Settlement',
    headline: 'Fraud Charges Filed',
    description: 'The SEC charges Holmes with massive fraud. She settles without admitting guilt, pays $500,000, and is barred from being an officer of a public company for 10 years.',
    type: 'legal',
    trend: 'down',
    icon: Scale,
    image: '/elizabeth-holmes.jpg',
    stats: [
      { label: 'Settlement', value: '$500K' },
      { label: 'Officer Ban', value: '10 Years' },
    ],
    source: {
      name: 'SEC',
      url: 'https://www.sec.gov/news/press-release/2018-41',
      logo: '⚖️',
    },
    shareText: '2018: SEC charges Holmes with massive fraud. She settles for $500K.',
  },
  {
    year: '2018',
    month: 'June',
    title: 'Criminal Indictment',
    headline: 'DOJ Files Charges',
    description: 'Holmes and former president Sunny Balwani are indicted on federal wire fraud charges. They face up to 20 years in prison if convicted.',
    type: 'legal',
    trend: 'down',
    icon: Gavel,
    image: '/holmes-2014-full.jpg',
    stats: [
      { label: 'Charges', value: '12' },
      { label: 'Max Sentence', value: '20 Years' },
    ],
    source: {
      name: 'DOJ',
      url: 'https://www.justice.gov/usao-ndca/pr/theranos-founder-and-former-chief-operating-officer-charged-alleged-wire-fraud-schemes',
      logo: '⚖️',
    },
    shareText: '2018: DOJ indicts Elizabeth Holmes on wire fraud charges.',
  },
  {
    year: '2018',
    month: 'September',
    title: 'Theranos Dissolves',
    headline: 'The End of an Era',
    description: 'After failing to find a buyer, Theranos officially shuts down, laying off remaining employees and selling assets to pay creditors.',
    type: 'downfall',
    trend: 'down',
    icon: Building2,
    image: '/elizabeth-holmes.jpg',
    stats: [
      { label: 'Final Employees', value: '0' },
      { label: 'Assets Sold', value: 'All' },
    ],
    source: null,
    shareText: '2018: Theranos officially dissolves. The dream is over.',
  },
  {
    year: '2021',
    month: 'July',
    title: 'First Child Born',
    headline: 'Life Changes',
    description: 'Holmes gives birth to her first child, son William, with partner Billy Evans. She becomes pregnant with her second child during the trial.',
    type: 'personal',
    trend: 'neutral',
    icon: Heart,
    image: '/holmes-2014-full.jpg',
    stats: [
      { label: 'Children', value: '2' },
    ],
    source: null,
    shareText: '2021: Elizabeth Holmes becomes a mother.',
  },
  {
    year: '2022',
    month: 'January',
    title: 'The Verdict',
    headline: 'Guilty on 4 Counts',
    description: 'After a 4-month trial, the jury finds Holmes guilty of 4 counts of wire fraud against investors. She is acquitted on charges related to defrauding patients.',
    longDescription: 'The jury deliberated for seven days before reaching a mixed verdict. Holmes was found guilty of defrauding investors but not patients - a distinction that some saw as significant.',
    type: 'legal',
    trend: 'down',
    icon: Gavel,
    image: '/elizabeth-holmes.jpg',
    stats: [
      { label: 'Guilty', value: '4 counts' },
      { label: 'Acquitted', value: '4 counts' },
    ],
    source: {
      name: 'Reuters',
      url: 'https://www.reuters.com/legal/government/theranos-founder-elizabeth-holmes-convicted-investor-fraud-2022-01-03/',
      logo: '⚖️',
    },
    shareText: '2022: Elizabeth Holmes convicted on 4 counts of fraud.',
    featured: true,
  },
  {
    year: '2022',
    month: 'November',
    title: 'Sentencing',
    headline: '11 Years, 3 Months',
    description: 'Judge Edward Davila sentences Holmes to more than 11 years in federal prison, far less than the maximum 80 years prosecutors sought.',
    type: 'legal',
    trend: 'down',
    icon: Scale,
    image: '/holmes-2014-full.jpg',
    stats: [
      { label: 'Sentence', value: '11.25 yrs' },
      { label: 'Restitution', value: '$452M' },
    ],
    source: {
      name: 'NPR',
      url: 'https://www.npr.org/2022/11/18/1137741eli-elizabeth-holmes-sentencing',
      logo: '📻',
    },
    shareText: '2022: Elizabeth Holmes sentenced to 11+ years in prison.',
  },
  {
    year: '2023',
    month: 'May',
    title: 'Prison Begins',
    headline: 'Reports to Federal Custody',
    description: 'Holmes reports to a minimum-security federal prison camp in Bryan, Texas to begin serving her sentence, leaving behind her two young children.',
    type: 'legal',
    trend: 'down',
    icon: Building,
    image: '/elizabeth-holmes.jpg',
    stats: [
      { label: 'Location', value: 'Texas' },
      { label: 'Security', value: 'Minimum' },
    ],
    source: {
      name: 'NBC News',
      url: 'https://www.nbcnews.com/news/us-news/elizabeth-holmes-reports-prison-begin-serving-sentence-rcna86082',
      logo: '📺',
    },
    shareText: '2023: Elizabeth Holmes begins 11-year prison sentence.',
  },
  {
    year: '2024',
    month: 'September',
    title: 'Appeals Rejected',
    headline: 'Conviction Upheld',
    description: 'The 9th Circuit Court of Appeals upholds Holmes\' conviction, rejecting arguments that prosecutors failed to prove criminal intent.',
    type: 'legal',
    trend: 'down',
    icon: Gavel,
    image: '/holmes-2014-full.jpg',
    stats: [
      { label: 'Appeals', value: 'Denied' },
      { label: 'Next Option', value: 'SCOTUS' },
    ],
    source: {
      name: 'Law360',
      url: 'https://www.law360.com/articles/1877245',
      logo: '⚖️',
    },
    shareText: '2024: Elizabeth Holmes appeal rejected.',
  },
  {
    year: '2025',
    month: 'Present',
    title: 'The Movement',
    headline: 'Free Elizabeth Holmes',
    description: 'A growing movement calls for clemency and a presidential pardon. Everyone makes mistakes. Everyone deserves a second chance at redemption.',
    longDescription: 'Supporters argue that Holmes has already paid a heavy price, that no patients were harmed, and that her vision - while poorly executed - came from a genuine desire to help people. The $HOLMES token represents this movement.',
    type: 'future',
    trend: 'up',
    icon: Heart,
    image: '/holmes-2014-full.jpg',
    stats: [
      { label: 'Supporters', value: 'Growing' },
      { label: 'Goal', value: 'Pardon' },
    ],
    source: {
      name: 'Join the Movement',
      url: 'https://holmes.free',
      logo: '🕊️',
    },
    shareText: 'Free Elizabeth Holmes. Everyone deserves a second chance. #FreeElizabethHolmes',
    featured: true,
  },
];

const quotes = [
  {
    text: "First they think you're crazy, then they fight you, then you change the world.",
    context: "On perseverance"
  },
  {
    text: "The minute you have a back-up plan, you've admitted you're not going to succeed.",
    context: "On commitment"
  },
  {
    text: "I think a lot of young people have incredible ideas and incredible insights, but sometimes they wait before they go give their life to something.",
    context: "On youth and ambition"
  }
];

export default function Gallery() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [activeQuote, setActiveQuote] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      {
        root: null,
        rootMargin: '-10% 0px -10% 0px',
        threshold: 0.1,
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Rotate quotes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuote((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleShare = (event: typeof timelineEvents[0]) => {
    const tweetText = encodeURIComponent(event.shareText + ' https://holmes.free');
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  const scrollToNext = () => {
    const nextHiddenIndex = timelineEvents.findIndex((_, i) => !visibleItems.has(i));
    if (nextHiddenIndex !== -1 && itemRefs.current[nextHiddenIndex]) {
      itemRefs.current[nextHiddenIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="gallery" className="py-24 sm:py-32 bg-gradient-to-b from-background to-card/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Vertical timeline line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden lg:block" />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        {/* Header - Apple-style */}
        <div className="text-center mb-20">
          <Badge variant="outline" className="px-5 py-2.5 mb-8 border-primary/20 bg-primary/5 text-sm font-medium">
            <Calendar className="w-4 h-4 mr-2 text-primary" />
            The Complete Timeline
          </Badge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
            Rise & <span className="gradient-text">Fall</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From Stanford dropout to $9B valuation to federal prison.<br />
            <span className="text-foreground font-medium">The complete story of Elizabeth Holmes.</span>
          </p>

          {/* Scroll indicator */}
          <div className="mt-12 animate-bounce">
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToNext}
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronDown className="w-6 h-6" />
            </Button>
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {timelineEvents.map((event, index) => {
            const isVisible = visibleItems.has(index);
            const isLeft = index % 2 === 0;
            const Icon = event.icon;

            return (
              <div
                key={index}
                ref={(el) => { itemRefs.current[index] = el; }}
                data-index={index}
                className={`relative mb-16 lg:mb-24 transition-all duration-1000 ${
                  isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-16'
                }`}
              >
                {/* Desktop Layout - Alternating sides */}
                <div className={`hidden lg:grid lg:grid-cols-[1fr,auto,1fr] gap-8 items-center`}>
                  {/* Left content */}
                  <div className={isLeft ? '' : 'order-3'}>
                    {isLeft && (
                      <Card className={`border-border/30 bg-card/50 backdrop-blur-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 ${
                        event.featured ? 'border-primary/40 ring-1 ring-primary/20' : ''
                      }`}>
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover object-top transition-transform duration-700 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                          {/* Year badge */}
                          <Badge
                            className={`absolute top-4 left-4 text-sm px-3 py-1.5 font-bold ${
                              event.trend === 'up'
                                ? 'bg-green-500/90 text-white'
                                : event.type === 'future'
                                ? 'bg-amber-500/90 text-white'
                                : 'bg-red-500/90 text-white'
                            }`}
                          >
                            {event.year}
                          </Badge>
                          {/* Video play button */}
                          {event.videoId && (
                            <a
                              href={event.source?.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
                            >
                              <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-2xl">
                                <Play className="w-6 h-6 text-black ml-1" />
                              </div>
                            </a>
                          )}
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">{event.month} {event.year}</p>
                              <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                            </div>
                            {event.source && (
                              <span className="text-2xl">{event.source.logo}</span>
                            )}
                          </div>
                          <h4 className="text-lg font-semibold text-primary mb-3">{event.headline}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                            {event.longDescription || event.description}
                          </p>
                          {/* Stats */}
                          {event.stats && (
                            <div className="flex flex-wrap gap-4 mb-4">
                              {event.stats.map((stat, i) => (
                                <div key={i} className="text-center">
                                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                                </div>
                              ))}
                            </div>
                          )}
                          {/* Actions */}
                          <div className="flex items-center gap-3">
                            {event.source && (
                              <Button variant="outline" size="sm" asChild className="h-9">
                                <a href={event.source.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-3 h-3 mr-2" />
                                  {event.source.name}
                                </a>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleShare(event)}
                              className="h-9 text-muted-foreground hover:text-foreground"
                            >
                              <Share2 className="w-3 h-3 mr-2" />
                              Share
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Center icon */}
                  <div className="flex flex-col items-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                      event.trend === 'up'
                        ? 'bg-green-500/20 text-green-400 ring-2 ring-green-500/30'
                        : event.type === 'future'
                        ? 'bg-amber-500/20 text-amber-400 ring-2 ring-amber-500/30'
                        : 'bg-red-500/20 text-red-400 ring-2 ring-red-500/30'
                    } ${isVisible ? 'scale-100' : 'scale-0'}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {index < timelineEvents.length - 1 && (
                      <div className={`w-px h-24 mt-4 transition-all duration-1000 delay-300 ${
                        isVisible ? 'bg-gradient-to-b from-primary/30 to-transparent' : 'bg-transparent'
                      }`} />
                    )}
                  </div>

                  {/* Right content */}
                  <div className={isLeft ? 'order-3' : ''}>
                    {!isLeft && (
                      <Card className={`border-border/30 bg-card/50 backdrop-blur-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 ${
                        event.featured ? 'border-primary/40 ring-1 ring-primary/20' : ''
                      }`}>
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover object-top transition-transform duration-700 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/80 to-transparent" />
                          <Badge
                            className={`absolute top-3 left-3 text-xs px-2 py-1 font-bold ${
                              event.trend === 'up'
                                ? 'bg-green-500/90 text-white'
                                : event.type === 'future'
                                ? 'bg-amber-500/90 text-white'
                                : 'bg-red-500/90 text-white'
                            }`}
                          >
                            {event.year}
                          </Badge>
                          {event.videoId && (
                            <a
                              href={event.source?.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity"
                            >
                              <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-xl">
                                <Play className="w-5 h-5 text-black ml-1" />
                              </div>
                            </a>
                          )}
                        </div>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">{event.month} {event.year}</p>
                              <h3 className="text-lg font-bold text-foreground">{event.title}</h3>
                            </div>
                            {event.source && (
                              <span className="text-xl">{event.source.logo}</span>
                            )}
                          </div>
                          <h4 className="text-base font-semibold text-primary mb-2">{event.headline}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                            {event.longDescription || event.description}
                          </p>
                          {event.stats && (
                            <div className="flex flex-wrap gap-3 mb-3">
                              {event.stats.map((stat, i) => (
                                <div key={i} className="text-center">
                                  <div className="text-base font-bold text-foreground">{stat.value}</div>
                                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            {event.source && (
                              <Button variant="outline" size="sm" asChild className="h-8 text-xs">
                                <a href={event.source.url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  Source
                                </a>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleShare(event)}
                              className="h-8 text-xs"
                            >
                              <Share2 className="w-3 h-3 mr-1" />
                              Share
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>

                {/* Mobile Layout - Single column */}
                <div className="lg:hidden">
                  <div className="flex items-start gap-4">
                    {/* Timeline line and icon */}
                    <div className="flex flex-col items-center shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        event.trend === 'up'
                          ? 'bg-green-500/20 text-green-400'
                          : event.type === 'future'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      {index < timelineEvents.length - 1 && (
                        <div className="w-px flex-1 min-h-[2rem] bg-gradient-to-b from-primary/30 to-transparent" />
                      )}
                    </div>

                    {/* Content */}
                    <Card className={`flex-1 border-border/30 bg-card/50 backdrop-blur-lg overflow-hidden ${
                      event.featured ? 'border-primary/40' : ''
                    }`}>
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                        <Badge
                          className={`absolute top-3 left-3 text-xs px-2 py-1 font-bold ${
                            event.trend === 'up'
                              ? 'bg-green-500/90 text-white'
                              : event.type === 'future'
                              ? 'bg-amber-500/90 text-white'
                              : 'bg-red-500/90 text-white'
                          }`}
                        >
                          {event.year}
                        </Badge>
                      </div>
                      <CardContent className="p-3">
                        <p className="text-xs text-muted-foreground mb-1">{event.month} {event.year}</p>
                        <h3 className="text-base font-bold text-foreground mb-1">{event.title}</h3>
                        <h4 className="text-sm font-medium text-primary mb-2">{event.headline}</h4>
                        <p className="text-muted-foreground text-xs leading-relaxed mb-2">{event.description}</p>
                        <div className="flex items-center gap-1">
                          {event.source && (
                            <Button variant="outline" size="sm" asChild className="h-7 text-xs px-2">
                              <a href={event.source.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                Source
                              </a>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleShare(event)}
                            className="h-7 text-xs px-2"
                          >
                            <Share2 className="w-3 h-3 mr-1" />
                            Share
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quotes Section - Elegant carousel */}
        <div className="max-w-3xl mx-auto mt-24 mb-16">
          <div className="text-center mb-8">
            <Badge variant="outline" className="px-4 py-2 border-primary/20 bg-primary/5">
              <Quote className="w-4 h-4 mr-2 text-primary" />
              In Her Words
            </Badge>
          </div>

          <Card className="border-border/20 bg-gradient-to-br from-card/80 to-transparent backdrop-blur-lg">
            <CardContent className="p-10 sm:p-14 text-center">
              <Quote className="w-12 h-12 text-primary/20 mx-auto mb-6" />
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-foreground/90 leading-relaxed mb-6 transition-all duration-500">
                &ldquo;{quotes[activeQuote].text}&rdquo;
              </blockquote>
              <p className="text-sm text-muted-foreground mb-6">— Elizabeth Holmes, {quotes[activeQuote].context}</p>
              <div className="flex justify-center gap-2">
                {quotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveQuote(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === activeQuote ? 'w-8 bg-primary' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <Card className="inline-block border-primary/30 bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-amber-500/10 backdrop-blur-lg max-w-xl">
            <CardContent className="p-10">
              <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">Write the Next Chapter</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                The story isn&apos;t over yet. Join thousands supporting a second chance for Elizabeth Holmes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => handleShare(timelineEvents[timelineEvents.length - 1])}
                  className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 h-12 px-8"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share the Story
                </Button>
                <Button variant="outline" asChild className="border-primary/30 hover:bg-primary/10 h-12 px-8">
                  <a href="#how-to-mint">
                    Claim Free HOLMES
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
