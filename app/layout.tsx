import type { Metadata } from "next";
import { Anton, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { CartProvider } from "@/components/CartProvider";
import CartDrawer from "@/components/CartDrawer";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://freshnoodles.vercel.app"),
  title: {
    default: "Fresh Noodles | Asian Fusion Delivery, Sunset Compound Cairo",
    template: "%s | Fresh Noodles",
  },
  description:
    "Fresh Noodles (FN) — Korean & Chinese fusion noodles, wok mains and appetizers, made fresh at Sunset Mall, Sunset Compound, Cairo. Order for delivery.",
  openGraph: {
    title: "Fresh Noodles | Asia Closer Than Ever",
    description:
      "Korean & Chinese fusion noodles and wok mains, made fresh in Sunset Compound, Cairo.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${jakarta.variable}`}>
      <body className="grain antialiased">
        <CartProvider>
          <Nav />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
