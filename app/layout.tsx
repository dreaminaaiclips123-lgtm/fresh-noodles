import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://freshnoodles.vercel.app"),
  title: {
    default: "Fresh Noodles | Asian Fusion Delivery, New Cairo",
    template: "%s | Fresh Noodles",
  },
  description:
    "Fresh Noodles (FN) — Asian fusion noodles, wok mains and appetizers, made fresh at Agora Mall and Arabella Plaza, New Cairo. Order for delivery.",
  openGraph: {
    title: "Fresh Noodles | Asia Closer Than Ever",
    description:
      "Asian fusion noodles and wok mains, made fresh in New Cairo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${inter.variable}`}>
      <body className="grain antialiased">
        <CartProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
