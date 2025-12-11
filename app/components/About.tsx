'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Scale, Heart, Users, Feather, Sparkles, RefreshCw } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Scale,
      title: 'Justice & Mercy',
      description: 'True justice is not merely punishment. It is the restoration of the soul, the chance to rise again from ashes.',
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-400',
    },
    {
      icon: RefreshCw,
      title: 'Second Chances',
      description: 'In the mythology of America, reinvention is our birthright. The fallen can rise. The broken can heal.',
      iconBg: 'bg-yellow-500/10',
      iconColor: 'text-yellow-400',
    },
    {
      icon: Users,
      title: 'Collective Voice',
      description: 'One voice can be dismissed. A chorus cannot be ignored. Together we appeal for clemency.',
      iconBg: 'bg-orange-500/10',
      iconColor: 'text-orange-400',
    },
    {
      icon: Heart,
      title: 'Human Compassion',
      description: 'She has two young children. She is more than her worst moment. We are all more than our worst moments.',
      iconBg: 'bg-rose-500/10',
      iconColor: 'text-rose-400',
    },
  ];

  return (
    <section id="about" className="py-32 sm:py-40 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 sm:mb-24 max-w-3xl mx-auto">
          <Badge variant="outline" className="px-5 py-2.5 mb-8 border-primary/20 bg-primary/5">
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            The Story
          </Badge>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground mb-6">
            Why We Stand
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            This is not about defending fraud. This is about believing that punishment should lead to redemption, not merely destruction.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-border/30 bg-card/30 backdrop-blur-sm hover:bg-card/50 hover:border-primary/20 transition-all duration-500 hover:-translate-y-1"
              >
                <CardContent className="p-10">
                  <div className="flex items-start gap-6">
                    <div className={`shrink-0 p-4 rounded-2xl ${feature.iconBg}`}>
                      <Icon className={`w-8 h-8 ${feature.iconColor}`} />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Comprehensive Timeline & Case Analysis */}
        <div className="max-w-6xl mx-auto mb-12">
          <Card className="border-border/30 bg-card/30 backdrop-blur-sm">
            <CardContent className="p-8 sm:p-10">
              <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                The Complete Elizabeth Holmes Story: A Balanced Examination
              </h3>
              
              {/* Timeline Section */}
              <div className="mb-12">
                <h4 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  📅 Comprehensive Timeline
                  <span className="text-sm font-normal text-muted-foreground">(2003-2024)</span>
                </h4>
                
                <div className="space-y-4 text-sm">
                  {/* Early Years */}
                  <div className="flex gap-4">
                    <div className="w-24 text-muted-foreground/70">2003</div>
                    <div className="flex-1">
                      <strong className="text-foreground">Theranos Founded</strong>
                      <p className="text-muted-foreground mt-1">Elizabeth Holmes drops out of Stanford at 19 to start Theranos with vision of revolutionary blood testing technology</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-24 text-muted-foreground/70">2004-2010</div>
                    <div className="flex-1">
                      <strong className="text-foreground">Early Development & Funding</strong>
                      <p className="text-muted-foreground mt-1">Raises $70M+ from investors including Oracle founder Larry Ellison, media mogul Rupert Murdoch</p>
                    </div>
                  </div>
                  
                  {/* Peak Years */}
                  <div className="flex gap-4">
                    <div className="w-24 text-muted-foreground/70">2013-2014</div>
                    <div className="flex-1">
                      <strong className="text-foreground">Peak Valuation & Partnerships</strong>
                      <p className="text-muted-foreground mt-1">Theranos reaches $9B valuation, partners with Walgreens and Safeway, Holmes becomes youngest self-made female billionaire</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-24 text-muted-foreground/70">2015</div>
                    <div className="flex-1">
                      <strong className="text-foreground">Wall Street Journal Exposé</strong>
                      <p className="text-muted-foreground mt-1">John Carreyrou publishes investigation revealing Theranos technology doesn't work as claimed</p>
                    </div>
                  </div>
                  
                  {/* Downfall */}
                  <div className="flex gap-4">
                    <div className="w-24 text-muted-foreground/70">2016</div>
                    <div className="flex-1">
                      <strong className="text-foreground">Regulatory Crackdown</strong>
                      <p className="text-muted-foreground mt-1">CMS revokes Theranos lab license, voids two years of test results, SEC and DOJ launch investigations</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-24 text-muted-foreground/70">2018</div>
                    <div className="flex-1">
                      <strong className="text-foreground">Company Collapse</strong>
                      <p className="text-muted-foreground mt-1">Theranos dissolves, Holmes and Balwani charged with wire fraud and conspiracy</p>
                    </div>
                  </div>
                  
                  {/* Legal Proceedings */}
                  <div className="flex gap-4">
                    <div className="w-24 text-muted-foreground/70">2022</div>
                    <div className="flex-1">
                      <strong className="text-foreground">Conviction & Sentencing</strong>
                      <p className="text-muted-foreground mt-1">Holmes convicted on 4 counts of investor fraud, sentenced to 11.25 years, ordered to pay $452M restitution</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-24 text-muted-foreground/70">2023</div>
                    <div className="flex-1">
                      <strong className="text-foreground">Prison & Appeals</strong>
                      <p className="text-muted-foreground mt-1">Holmes begins sentence at FPC Bryan, appeals conviction, gives birth to second child</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Financial Analysis */}
              <div className="mb-12">
                <h4 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  💰 Financial Analysis: The Money Trail
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="bg-card/20 p-4 rounded-lg">
                    <h5 className="font-medium text-foreground mb-3">📈 Funds Raised</h5>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• <strong>$700M+</strong> total raised from investors</li>
                      <li>• <strong>$100M</strong> from Rupert Murdoch (2015)</li>
                      <li>• <strong>$125M</strong> from DeVos family (2014)</li>
                      <li>• <strong>$100M</strong> from Cox family (2014)</li>
                      <li>• <strong>$6M</strong> from Walmart's Walton family</li>
                      <li>• <strong>$5M</strong> from Oracle's Larry Ellison</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card/20 p-4 rounded-lg">
                    <h5 className="font-medium text-foreground mb-3">💸 Where The Money Went</h5>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• <strong>R&D:</strong> Failed Edison device development</li>
                      <li>• <strong>Legal:</strong> Defense against investigations</li>
                      <li>• <strong>Marketing:</strong> High-profile partnerships</li>
                      <li>• <strong>Salaries:</strong> 800+ employees at peak</li>
                      <li>• <strong>Real Estate:</strong> Lab facilities, HQ</li>
                      <li>• <strong>Settlements:</strong> Lawsuits and refunds</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 bg-card/20 p-4 rounded-lg text-sm">
                  <h5 className="font-medium text-foreground mb-2">⚖️ Restitution Ordered</h5>
                  <p className="text-muted-foreground">
                    Holmes ordered to pay <strong>$452 million</strong> in restitution to defrauded investors. Actual recovery expected to be minimal.
                  </p>
                </div>
              </div>
              
              {/* Patents & Technology */}
              <div className="mb-12">
                <h4 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  🔬 The Technology: What Actually Existed
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="bg-card/20 p-4 rounded-lg">
                    <h5 className="font-medium text-foreground mb-3">📜 Patent Portfolio</h5>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• <strong>275+ patents</strong> filed by Theranos</li>
                      <li>• <strong>80+ issued patents</strong> granted</li>
                      <li>• Focus areas: blood testing, microfluidics, diagnostics</li>
                      <li>• Many patents acquired by Fortress Investment Group (2018)</li>
                      <li>• Some technology potentially salvageable for legitimate uses</li>
                    </ul>
                  </div>
                  
                  <div className="bg-card/20 p-4 rounded-lg">
                    <h5 className="font-medium text-foreground mb-3">🔬 The Edison Device</h5>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• <strong>Claimed:</strong> 200+ tests from finger prick</li>
                      <li>• <strong>Reality:</strong> Only ~12 tests possible</li>
                      <li>• <strong>Accuracy:</strong> Significant reliability issues</li>
                      <li>• <strong>Method:</strong> Most tests run on commercial machines</li>
                      <li>• <strong>Dilution:</strong> Samples often diluted, affecting results</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Balanced Case Analysis */}
              <div className="mb-12">
                <h4 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  ⚖️ Balanced Case Analysis: Both Sides
                </h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Prosecution Case */}
                  <div className="bg-red-900/10 border border-red-500/20 p-6 rounded-xl">
                    <h5 className="font-bold text-red-400 mb-4 text-center">PROSECUTION ARGUMENTS</h5>
                    <ul className="space-y-3 text-sm">
                      <li className="flex gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong>Intentional Fraud:</strong> Knowingly misled investors about technology capabilities</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong>Falsified Data:</strong> Used commercial machines but claimed proprietary tech</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong>Patient Risk:</strong> Inaccurate test results could have harmed health decisions</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong>Massive Losses:</strong> Investors lost hundreds of millions based on false claims</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-red-400">•</span>
                        <span><strong>Pattern of Deception:</strong> Consistent misleading statements over years</span>
                      </li>
                    </ul>
                  </div>
                  
                  {/* Defense Case */}
                  <div className="bg-green-900/10 border border-green-500/20 p-6 rounded-xl">
                    <h5 className="font-bold text-green-400 mb-4 text-center">DEFENSE ARGUMENTS</h5>
                    <ul className="space-y-3 text-sm">
                      <li className="flex gap-2">
                        <span className="text-green-400">•</span>
                        <span><strong>Good Intentions:</strong> Genuinely believed in the mission to help people</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-400">•</span>
                        <span><strong>Startup Pressure:</strong> Faced extreme pressure from investors and board</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-400">•</span>
                        <span><strong>No Personal Gain:</strong> Never sold shares, lived modestly, reinvested all funds</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-400">•</span>
                        <span><strong>Mental Health:</strong> Evidence of psychological distress and control by Balwani</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-green-400">•</span>
                        <span><strong>Already Punished:</strong> Lost everything - company, reputation, freedom, family time</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Key Questions Section */}
              <div className="mb-8">
                <h4 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  ❓ Key Questions for Consideration
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-card/20 p-4 rounded-lg border border-border/20">
                    <strong className="text-foreground block mb-2">Does the punishment fit the crime?</strong>
                    <p className="text-muted-foreground">11+ years for a non-violent, first-time offender with no personal enrichment</p>
                  </div>
                  
                  <div className="bg-card/20 p-4 rounded-lg border border-border/20">
                    <strong className="text-foreground block mb-2">What about deterrence?</strong>
                    <p className="text-muted-foreground">Holmes' case already serves as major warning to Silicon Valley about fraud consequences</p>
                  </div>
                  
                  <div className="bg-card/20 p-4 rounded-lg border border-border/20">
                    <strong className="text-foreground block mb-2">Can she contribute to society?</strong>
                    <p className="text-muted-foreground">Her entrepreneurial skills and experience could be harnessed for positive innovation</p>
                  </div>
                  
                  <div className="bg-card/20 p-4 rounded-lg border border-border/20">
                    <strong className="text-foreground block mb-2">What about the victims?</strong>
                    <p className="text-muted-foreground">Investors were sophisticated individuals/institutions, not vulnerable retail investors</p>
                  </div>
                </div>
              </div>
              
              {/* Conclusion */}
              <div className="bg-card/20 p-6 rounded-lg text-center">
                <h4 className="text-lg font-semibold text-foreground mb-4">🎯 The HOLMES Token Perspective</h4>
                <p className="text-muted-foreground mb-4">
                  This community token doesn't excuse fraud or minimize the seriousness of Holmes' actions. However, it represents the belief that our justice system should prioritize rehabilitation over punishment, and that even those who make serious mistakes deserve the opportunity for redemption and contribution.
                </p>
                <p className="text-muted-foreground font-medium">
                  <strong>Justice with compassion. Accountability with hope.</strong>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Call to Action */}
        <div className="max-w-3xl mx-auto">
          <Card className="border-border/30 bg-card/30 backdrop-blur-sm glow-sm">
            <CardContent className="p-12 text-center">
              <Feather className="w-14 h-14 text-primary mx-auto mb-8" />
              <h3 className="text-2xl sm:text-3xl text-foreground font-bold leading-relaxed mb-6">
                Join the Movement
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Whether you believe in redemption, second chances, or simply want to be part of a unique community token, HOLMES offers an opportunity to engage with an important conversation about justice and rehabilitation.
              </p>
              <p className="text-lg text-muted-foreground">
                Mint your free HOLMES token and become part of this poetic appeal for a more compassionate future.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
