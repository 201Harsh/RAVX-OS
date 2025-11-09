import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "AI Agents — Intelligent Avatars You Create | RAVX OS",
    template: "%s | RAVX OS",
  },
  description:
    "Explore your personalized AI Agents in RAVX OS — each built with unique memory, personality, and purpose. Manage, interact, and evolve your intelligent digital companions in one unified AI ecosystem.",
  keywords: [
    "RAVX OS",
    "AI agents",
    "AI avatars",
    "intelligent assistant",
    "AI companion",
    "AI personality",
    "digital avatar platform",
    "no-code AI agents",
    "AI ecosystem",
    "RAVX ARC",
    "AI operating system",
    "AI automation platform",
  ],
  authors: [{ name: "Harsh Pandey", url: "https://github.com/201Harsh" }],
  creator: "Harsh Pandey",
  publisher: "RAVX ARC Labs",
  metadataBase: new URL("https://ravx-os.vercel.app"),
  openGraph: {
    title: "AI Agents — Intelligent Avatars You Create | RAVX OS",
    description:
      "Meet your AI Agents inside RAVX OS — living digital entities that execute tasks, generate content, and grow through interaction.",
    url: "https://ravx-os.vercel.app",
    siteName: "RAVX OS",
    images: [
      {
        url: "/img/SEO_RAVX_HOME.png",
        width: 1200,
        height: 630,
        alt: "AI Agents — Intelligent Avatars You Create | RAVX OS",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agents — Your Personalized Avatars | RAVX OS",
    description:
      "Manage and interact with your intelligent AI Agents — designed, trained, and personalized through RAVX OS.",
    images: ["/img/SEO_RAVX_HOME.png"],
    creator: "@201Harsh",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
