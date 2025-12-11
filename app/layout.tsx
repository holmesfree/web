import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "HOLMES | A Second Chance",
  description: "Free mint community token supporting the pardon of Elizabeth Holmes. Everyone deserves a second chance.",
  keywords: ["Holmes", "Elizabeth Holmes", "pardon", "second chance", "redemption", "free mint", "Base", "omnichain"],
  metadataBase: new URL('https://holmes.free'),
  openGraph: {
    title: "HOLMES | A Second Chance",
    description: "Free mint community token supporting the pardon of Elizabeth Holmes. Everyone deserves a second chance.",
    url: 'https://holmes.free',
    siteName: 'HOLMES Token',
    images: [
      {
        url: '/elizabeth-holmes.jpg',
        width: 1200,
        height: 630,
        alt: 'HOLMES Token',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "HOLMES | A Second Chance",
    description: "Free mint community token. Everyone deserves a second chance.",
    images: ['/elizabeth-holmes.jpg'],
  },
  icons: {
    icon: '/elizabeth-holmes.jpg',
    apple: '/elizabeth-holmes.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
