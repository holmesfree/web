'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Download,
  Share2,
  Copy,
  Check,
  Heart,
  Baby,
  Users,
  Scale,
  FileText,
  Image as ImageIcon,
  ExternalLink,
  Newspaper,
  Mail
} from 'lucide-react';
import { toast } from 'sonner';

const pressAssets = [
  {
    name: 'HOLMES Logo Pack',
    description: 'PNG, SVG, and vector formats',
    icon: ImageIcon,
    downloadUrl: '/press/holmes-logo-pack.zip',
  },
  {
    name: 'Brand Guidelines',
    description: 'Colors, typography, usage rules',
    icon: FileText,
    downloadUrl: '/press/brand-guidelines.pdf',
  },
  {
    name: 'Press Release Template',
    description: 'Official announcement format',
    icon: Newspaper,
    downloadUrl: '/press/press-release.pdf',
  },
  {
    name: 'Manifesto PDF',
    description: 'The complete HOLMES whitepaper',
    icon: FileText,
    downloadUrl: '/holmes-whitepaper.pdf',
  },
];

const keyMessages = [
  {
    hashtag: '#FreeElizabethHolmes',
    message: 'Everyone deserves a second chance. Elizabeth Holmes has served her time. She\'s a mother of two young children who deserve their mom. Support the pardon movement.',
    category: 'Main',
  },
  {
    hashtag: '#FreeMoms',
    message: 'Elizabeth Holmes is a mother of two young children, separated from them during their most formative years. Non-violent offenders who are mothers deserve compassion and the chance to raise their children.',
    category: 'Mother',
  },
  {
    hashtag: '#SecondChances',
    message: 'America was built on second chances. Our justice system should rehabilitate, not just punish. Elizabeth Holmes has already lost everything - her company, her reputation, her freedom. When is enough, enough?',
    category: 'Redemption',
  },
  {
    hashtag: '#MAHA',
    message: 'Elizabeth Holmes dedicated her career to Making America Healthy Again - long before it was a movement. Her vision for accessible healthcare was ahead of its time. Let her contribute again.',
    category: 'Healthcare',
  },
];

const factSheet = [
  { label: 'Name', value: 'Elizabeth Anne Holmes' },
  { label: 'Age', value: '40 years old' },
  { label: 'Children', value: '2 (William, born 2021; Invicta, born 2023)' },
  { label: 'Partner', value: 'Billy Evans (hotel heir)' },
  { label: 'Sentence', value: '11 years, 3 months' },
  { label: 'Prison', value: 'FPC Bryan, Texas (minimum security)' },
  { label: 'Conviction', value: '4 counts of wire fraud (investors)' },
  { label: 'Acquitted', value: '4 counts related to patients' },
  { label: 'Key Point', value: 'No patients were physically harmed' },
  { label: 'Release Date', value: 'December 2032 (projected)' },
];

const mediaContacts = [
  { name: 'Press Inquiries', email: 'press@holmes.free' },
  { name: 'Partnership', email: 'partners@holmes.free' },
  { name: 'Legal', email: 'legal@holmes.free' },
];

export default function PressKit() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyMessage = (message: string, hashtag: string, index: number) => {
    const fullMessage = `${message}\n\n${hashtag} $HOLMES\nhttps://holmes.free`;
    navigator.clipboard.writeText(fullMessage);
    setCopiedIndex(index);
    toast.success('Message copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const shareOnTwitter = (message: string, hashtag: string) => {
    const text = message.length > 200
      ? encodeURIComponent(`${message.slice(0, 200)}... ${hashtag} $HOLMES`)
      : encodeURIComponent(`${message} ${hashtag} $HOLMES`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=https://holmes.free`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="press" className="py-24 sm:py-32 bg-gradient-to-b from-card/10 to-background relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-pink-500/5 blur-3xl" />
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="px-5 py-2.5 mb-8 border-pink-500/30 bg-pink-500/5 text-sm font-medium">
            <Newspaper className="w-4 h-4 mr-2 text-pink-400" />
            Press & Media
          </Badge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6">
            <span className="text-pink-400">#FreeMoms</span> Press Kit
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Elizabeth Holmes is more than a headline. She&apos;s a mother of two young children who deserve to have their mom home.
            Help us tell the complete story.
          </p>
        </div>

        {/* Mother's Story - Featured */}
        <Card className="border-pink-500/30 bg-gradient-to-br from-pink-500/10 to-transparent backdrop-blur-lg mb-16 max-w-4xl mx-auto">
          <CardContent className="p-8 sm:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="w-32 h-32 rounded-full bg-pink-500/20 flex items-center justify-center shrink-0">
                <Heart className="w-16 h-16 text-pink-400" />
              </div>
              <div>
                <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30 mb-4">
                  <Baby className="w-3 h-3 mr-1" />
                  A Mother&apos;s Story
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                  Two Children Need Their Mother
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  William was born in 2021, Invicta in 2023. Elizabeth Holmes entered prison when her children were just
                  toddlers. They&apos;re growing up visiting their mother in a federal prison camp in Texas.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Studies show that maternal incarceration has devastating effects on child development.
                  For non-violent offenders, keeping families together should be a priority of our justice system.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Badge variant="outline" className="border-pink-500/30 text-pink-300">
                    <Baby className="w-3 h-3 mr-1" />
                    William, age 4
                  </Badge>
                  <Badge variant="outline" className="border-pink-500/30 text-pink-300">
                    <Baby className="w-3 h-3 mr-1" />
                    Invicta, age 2
                  </Badge>
                  <Badge variant="outline" className="border-pink-500/30 text-pink-300">
                    <Scale className="w-3 h-3 mr-1" />
                    Non-violent offense
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Messages for Sharing */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            <Share2 className="w-6 h-6 inline mr-2 text-primary" />
            Ready-to-Share Messages
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {keyMessages.map((item, index) => (
              <Card key={index} className="border-border/30 bg-card/50 backdrop-blur-lg hover:border-primary/30 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="border-primary/30">
                      {item.category}
                    </Badge>
                    <code className="text-primary font-mono text-sm">{item.hashtag}</code>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {item.message}
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyMessage(item.message, item.hashtag, index)}
                      className="flex-1"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="w-4 h-4 mr-2 text-green-400" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => shareOnTwitter(item.message, item.hashtag)}
                      className="flex-1 bg-[#1DA1F2] hover:bg-[#1a8cd8]"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Tweet
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Fact Sheet */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            <FileText className="w-6 h-6 inline mr-2 text-primary" />
            Quick Facts
          </h3>
          <Card className="border-border/30 bg-card/50 backdrop-blur-lg max-w-3xl mx-auto">
            <CardContent className="p-6 sm:p-8">
              <div className="grid sm:grid-cols-2 gap-4">
                {factSheet.map((fact, index) => (
                  <div key={index} className="flex justify-between items-start py-3 border-b border-border/30 last:border-0">
                    <span className="text-muted-foreground text-sm">{fact.label}</span>
                    <span className="text-foreground font-medium text-sm text-right max-w-[60%]">{fact.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Press Assets */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">
            <Download className="w-6 h-6 inline mr-2 text-primary" />
            Press Assets
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {pressAssets.map((asset, index) => (
              <Card key={index} className="border-border/30 bg-card/50 backdrop-blur-lg hover:border-primary/30 transition-all group">
                <CardContent className="p-5 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <asset.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{asset.name}</h4>
                  <p className="text-xs text-muted-foreground mb-4">{asset.description}</p>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <a href={asset.downloadUrl} download>
                      <Download className="w-3 h-3 mr-2" />
                      Download
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Media Contact */}
        <div className="text-center">
          <Card className="inline-block border-primary/30 bg-gradient-to-r from-amber-500/10 to-pink-500/10 backdrop-blur-lg">
            <CardContent className="p-8 sm:p-10">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-foreground">Media Inquiries</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Journalists, podcasters, and content creators are welcome to reach out for interviews, comments, and exclusive content.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {mediaContacts.map((contact, index) => (
                  <Button key={index} variant="outline" asChild className="border-primary/30 hover:bg-primary/10">
                    <a href={`mailto:${contact.email}`}>
                      <Mail className="w-4 h-4 mr-2" />
                      {contact.name}
                    </a>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-16 text-center">
          <p className="text-xs text-muted-foreground/60 max-w-2xl mx-auto">
            <strong>Disclaimer:</strong> HOLMES is a community meme token and cultural movement. It is not affiliated with, endorsed by, or connected to Elizabeth Holmes, her legal team, or any member of her family.
            This is not financial advice. This is not a security. Purchasing or holding HOLMES tokens does not constitute an investment and you should assume any funds used may be lost entirely.
            The movement does not condone or excuse fraud. We believe in justice tempered with mercy and rehabilitation over pure punishment.
          </p>
        </div>
      </div>
    </section>
  );
}
