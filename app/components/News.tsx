'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Newspaper,
  Twitter,
  ExternalLink,
  Calendar,
  TrendingUp,
  Share2,
  MessageCircle,
  Heart,
  Repeat2,
  ChevronRight,
  Sparkles
} from 'lucide-react';

const newsArticles = [
  {
    title: "Is Theranos fraudster Elizabeth Holmes angling for a pardon from President Trump?",
    source: "Mercury News",
    date: "Nov 30, 2025",
    url: "https://www.mercurynews.com/2025/11/30/theranos-fraudster-elizabeth-holmes-pardon-trump/",
    highlight: true,
    image: "/news/mercury-news.jpg",
    excerpt: "Holmes' X account follows top Trump advisers and aligns with MAGA movement",
  },
  {
    title: "Elizabeth Holmes, Angling for Trump Pardon, Challenges Specific Evidence From Her Trial",
    source: "SFist",
    date: "Dec 3, 2025",
    url: "https://sfist.com/2025/12/03/elizabeth-holmes-angling-for-trump-pardon-challenges-specific-evidence/",
    highlight: true,
    image: "/news/sfist.jpg",
    excerpt: "Latest legal challenge as pardon campaign intensifies",
  },
  {
    title: "Expert Says Elizabeth Holmes Is Campaigning for a Presidential Pardon",
    source: "Inc.",
    date: "Dec 2025",
    url: "https://www.inc.com/maria-jose-gutierrez-chavez/expert-says-elizabeth-holmes-is-campaigning-for-a-presidential-pardon/91273078",
    highlight: false,
    excerpt: "Analysis of Holmes' social media strategy",
  },
  {
    title: "theranos Calls on President Trump to Pardon Elizabeth Holmes",
    source: "Yahoo Finance",
    date: "Jun 27, 2025",
    url: "https://finance.yahoo.com/news/theranos-calls-president-trump-pardon-231300064.html",
    highlight: false,
    excerpt: "Official statement calling for presidential action",
  },
  {
    title: "Jailed Elizabeth Holmes Somehow Tweeting From Texas Prison",
    source: "Hoodline",
    date: "Sep 2025",
    url: "https://hoodline.com/2025/09/jailed-elizabeth-holmes-somehow-tweeting-from-texas-prison-despite-federal-social-media-ban/",
    highlight: false,
    excerpt: "Investigation into prison social media activity",
  },
  {
    title: "Elizabeth Holmes' X account is posting again — but is it really her?",
    source: "Protos",
    date: "2025",
    url: "https://protos.com/elizabeth-holmes-x-account-is-posting-again-but-is-it-really-her/",
    highlight: false,
    excerpt: "Deep dive into the mysterious X account activity",
  },
];

const xPosts = [
  {
    handle: "@EHolmes_EH",
    name: "Elizabeth Holmes",
    content: "I have been working to Make America Healthy Again since 2004. I will continue to dedicate my life ahead to improving healthcare in this beautiful country I call home.",
    url: "https://x.com/EHolmes_EH",
    verified: true,
    likes: "12.4K",
    retweets: "3.2K",
    replies: "892",
    avatar: "/elizabeth-holmes.jpg",
  },
  {
    handle: "@EHolmes_EH",
    name: "Elizabeth Holmes",
    content: "Here is draft legislation I have been working on in prison called the \"American Freedom Act\" with 29 provisions for criminal justice reform.",
    url: "https://x.com/EHolmes_EH",
    verified: true,
    likes: "8.7K",
    retweets: "2.1K",
    replies: "567",
    avatar: "/elizabeth-holmes.jpg",
  },
];

const keyFacts = [
  { icon: "🏛️", text: "Currently at Federal Prison Camp Bryan, Texas" },
  { icon: "⚖️", text: "Remaining options: Supreme Court appeal or presidential pardon" },
  { icon: "📱", text: "X account follows Trump advisers: Scavino, Patel, Kushner" },
  { icon: "📺", text: "Billboards proclaiming innocence appeared in LA" },
  { icon: "🏥", text: "Aligning with MAHA (Make America Healthy Again)" },
];

export default function News() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="news" className="py-24 sm:py-32 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        {/* Header with Animation */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge variant="outline" className="px-5 py-2.5 mb-8 border-blue-500/20 bg-blue-500/5 animate-bounce-slow">
            <Newspaper className="w-4 h-4 mr-2 text-blue-400" />
            Breaking News
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            The <span className="gradient-text animate-gradient">Pardon Campaign</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Elizabeth Holmes is actively seeking a presidential pardon. Follow the story.
          </p>
        </div>

        {/* Key Facts - Horizontal Scroll on Mobile */}
        <div className="mb-12 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
          <div className="flex gap-3 min-w-max">
            {keyFacts.map((fact, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card/50 border border-border/30 backdrop-blur-sm hover:border-amber-500/30 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="text-xl">{fact.icon}</span>
                <span className="text-sm text-muted-foreground whitespace-nowrap">{fact.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured News - Large Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {newsArticles.filter(a => a.highlight).map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card className="h-full overflow-hidden border-border/30 bg-card/30 backdrop-blur-sm hover:border-amber-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/10 hover:-translate-y-2">
                {/* Image Placeholder with Gradient */}
                <div className="relative h-48 bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-yellow-500/20 overflow-hidden">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                  <div className={`absolute inset-0 bg-gradient-to-t from-card to-transparent transition-opacity duration-500 ${hoveredCard === i ? 'opacity-50' : 'opacity-70'}`} />
                  <Badge className="absolute top-4 left-4 bg-amber-500 text-black font-semibold">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-amber-300 font-medium">{article.source}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg text-foreground mb-3 group-hover:text-amber-400 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-amber-400 group-hover:gap-2 transition-all">
                      Read more <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* More News - Compact Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-16">
          {newsArticles.filter(a => !a.highlight).map((article, i) => (
            <a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="h-full border-border/30 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-4">
                  <span className="text-[10px] text-blue-400 font-medium uppercase tracking-wider">{article.source}</span>
                  <h4 className="font-semibold text-sm text-foreground mt-2 mb-2 group-hover:text-blue-400 transition-colors line-clamp-3">
                    {article.title}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>{article.date}</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {/* X/Twitter Embed Style Cards */}
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="p-2 rounded-full bg-blue-500/10">
              <Twitter className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="font-bold text-xl">From Elizabeth Holmes&apos; X Account</h3>
          </div>

          <div className="space-y-4">
            {xPosts.map((post, i) => (
              <a
                key={i}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <Card className="border-border/30 bg-card/50 backdrop-blur-sm hover:bg-card/70 hover:border-blue-500/30 transition-all duration-300">
                  <CardContent className="p-5">
                    {/* Tweet Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 overflow-hidden ring-2 ring-amber-500/20">
                        <Image
                          src={post.avatar}
                          alt={post.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground">{post.name}</span>
                          {post.verified && (
                            <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                            </svg>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{post.handle}</span>
                      </div>
                      <Twitter className="w-5 h-5 text-blue-400" />
                    </div>

                    {/* Tweet Content */}
                    <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

                    {/* Tweet Actions */}
                    <div className="flex items-center justify-between pt-3 border-t border-border/30">
                      <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-400 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                          {post.replies}
                        </span>
                        <span className="flex items-center gap-2 text-sm text-muted-foreground hover:text-green-400 transition-colors">
                          <Repeat2 className="w-4 h-4" />
                          {post.retweets}
                        </span>
                        <span className="flex items-center gap-2 text-sm text-muted-foreground hover:text-pink-400 transition-colors">
                          <Heart className="w-4 h-4" />
                          {post.likes}
                        </span>
                      </div>
                      <Share2 className="w-4 h-4 text-muted-foreground hover:text-blue-400 transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>

        {/* Social Share CTA */}
        <div className="mt-16 text-center">
          <Card className="max-w-xl mx-auto border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5 backdrop-blur-sm">
            <CardContent className="p-8">
              <Share2 className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-2">Join the Conversation</h3>
              <p className="text-muted-foreground mb-6">
                Use these hashtags to spread the word about the movement.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white">
                  <a href="https://twitter.com/intent/tweet?text=Everyone%20deserves%20a%20second%20chance.%20%F0%9F%94%A5%20%24HOLMES%20%23FreeHolmes&url=https://holmes.free" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4 mr-2" />
                    Tweet #FreeHolmes
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-blue-500/40 hover:bg-blue-500/20">
                  <a href="https://twitter.com/search?q=%24HOLMES" target="_blank" rel="noopener noreferrer">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    $HOLMES on X
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
