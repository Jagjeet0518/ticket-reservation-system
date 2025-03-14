import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Layout from "@/components/Layout";

const Sans = Space_Grotesk({
  variable: "--font-space-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const Mono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata = {
  title: "Train Ticket Reservation System",
  description: "A simple and secure ticket reservation system for trains.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${Sans.variable} ${Mono.variable} antialiased`}>
        <Providers>
          <Layout>
          {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
