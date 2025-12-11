'use client';

import { useState, useCallback, KeyboardEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is HOLMES token?",
    answer: "HOLMES is a free mint community token and cultural movement calling for the pardon of Elizabeth Holmes. It's a statement about redemption, second chances, and the belief that people can change."
  },
  {
    question: "Is this a real investment?",
    answer: "NO. HOLMES is a meme token with NO intrinsic value. Do not purchase as an investment. This is a cultural statement, not financial advice. Assume any money spent may be lost."
  },
  {
    question: "How do I get HOLMES tokens?",
    answer: "Visit our mint page with a Web3 wallet (MetaMask, Coinbase Wallet, etc.) on the Base network. Each wallet can mint 1,000 HOLMES tokens for free—you only pay gas fees."
  },
  {
    question: "Why Elizabeth Holmes?",
    answer: "This is not about defending fraud. Elizabeth Holmes made terrible mistakes and was punished. But we believe in redemption, second chances, and that punishment should lead to transformation, not destruction. She has two young children and is more than her worst moment."
  },
  {
    question: "Why a free mint?",
    answer: "Everyone deserves a second chance—including the chance to participate. 90% of the supply is available for free minting. No presale, no insiders, just a fair launch for all."
  },
  {
    question: "What blockchain is HOLMES on?",
    answer: "HOLMES launches on Base (Ethereum L2) with plans for omnichain expansion via the Superchain. Base offers low fees and fast transactions."
  },
  {
    question: "Is this affiliated with Elizabeth Holmes?",
    answer: "No. This is an independent community movement. We have no connection to Elizabeth Holmes, Theranos, or any related parties."
  },
  {
    question: "What's the total supply?",
    answer: "1 billion HOLMES tokens. 90% free mint (click the coin to mint!), 10% initial liquidity on Uniswap. Simple and fair."
  },
  {
    question: "Can I mint more than once?",
    answer: "No. Each wallet address can only mint once—because everyone gets exactly one second chance. This is enforced by the smart contract."
  },
  {
    question: "What's the goal of this movement?",
    answer: "To create a collective voice advocating for presidential clemency. One voice can be dismissed; a chorus cannot be ignored. We petition President Trump for a pardon."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = useCallback((index: number) => {
    setOpenIndex(current => current === index ? null : index);
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleFAQ(index);
    }
  };

  return (
    <section id="faq" className="py-24 sm:py-32 relative" aria-labelledby="faq-heading">
      <div className="container mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="outline" className="px-4 py-2 border-primary/20 bg-primary/5">
              <HelpCircle className="w-4 h-4 mr-2 text-primary" aria-hidden="true" />
              Questions
            </Badge>
          </div>
          <h2 id="faq-heading" className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about HOLMES and the movement.
          </p>
        </div>

        {/* FAQ Items with proper accessibility */}
        <div className="max-w-3xl mx-auto space-y-4" role="list">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const headerId = `faq-header-${index}`;
            const panelId = `faq-panel-${index}`;

            return (
              <Card
                key={`faq-${index}`}
                className={`border-border/30 bg-card/30 backdrop-blur-sm transition-all ${
                  isOpen ? 'border-primary/30' : ''
                }`}
                role="listitem"
              >
                <CardContent className="p-0">
                  <button
                    id={headerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFAQ(index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-full flex items-center justify-between p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg transition-colors hover:bg-accent/30"
                  >
                    <h3 className="font-semibold text-foreground pr-4">{faq.question}</h3>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" aria-hidden="true" />
                    )}
                  </button>
                  {isOpen && (
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={headerId}
                      className="px-5 pb-5 pt-0"
                    >
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
