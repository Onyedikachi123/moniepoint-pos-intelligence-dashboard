import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Using Outfit for a modern, geometric look similar to fintech brands
import { Providers } from "@/components/Providers";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Moniepoint POS Intelligence",
  description: "Smart Dispute, Reversal & POS Failure Intelligence Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased bg-background text-foreground`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
