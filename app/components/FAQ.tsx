'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
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
    answer: "Everyone deserves a second chance—including the chance to participate. 70% of the supply is available for free minting. No presale, no insiders, just a fair launch for all."
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
    answer: "1 billion HOLMES tokens. 70% free mint, 10% liquidity, 10% Freedom Treasury, 5% team (2-year vest), 5% marketing."
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

  return (
    <section id="faq" className="py-24 sm:py-32 relative">
      <div className="container mx-auto px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-6">
            <Badge variant="outline" className="px-4 py-2 border-primary/20 bg-primary/5">
              <HelpCircle className="w-4 h-4 mr-2 text-primary" />
              Questions
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about HOLMES and the movement.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className={`border-border/30 bg-card/30 backdrop-blur-sm transition-all cursor-pointer ${
                openIndex === index ? 'border-primary/30' : ''
              }`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between p-5">
                  <h3 className="font-semibold text-foreground pr-4">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                </div>
                {openIndex === index && (
                  <div className="px-5 pb-5 pt-0">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
