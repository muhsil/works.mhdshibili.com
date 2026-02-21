import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Mohammed Shibili | Creative Director & Brand Visualizer",
  description:
    "A Creative Director & Brand Visualizer helping brands tell their stories through graphic design, 3D art, illustration, and motion.",
  keywords: [
    "creative director",
    "brand visualizer",
    "UI/UX design",
    "3D art",
    "motion graphics",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
