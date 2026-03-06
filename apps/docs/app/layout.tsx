import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@clawesome/ui";
import { DocsLayout } from "../components/DocsLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clawesome Docs",
  description:
    "Official documentation for Clawesome OS — the neural agent orchestration platform. Guides, API references, CLI usage, and component library.",
  icons: {
    icon: [
      { url: "/clawesome-icon.svg", type: "image/svg+xml" },
    ],
    apple: "/clawesome-icon.svg",
    shortcut: "/clawesome-icon.svg",
  },
  openGraph: {
    type: "website",
    url: "https://clawesome-docs.vercel.app",
    title: "Clawesome Docs — Developer Documentation",
    description:
      "Everything you need to build with AI agents. Guides, references, CLI docs, and component library for Clawesome OS.",
    siteName: "Clawesome Docs",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Clawesome Docs — Developer Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clawesome Docs — Developer Documentation",
    description: "Everything you need to build with AI agents.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white dark:bg-black`}>
        <ThemeProvider>
          <DocsLayout>
            {children}
          </DocsLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
