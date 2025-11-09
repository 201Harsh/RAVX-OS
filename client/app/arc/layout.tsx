import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "RAVX ARC LAB — Where AI Sparks to Life | Create Your Intelligent Avatar",
  description:
    "RAVX ARC LAB is the innovation core of RAVX OS — a futuristic AI creation zone where you design and personalize your own AI avatars. Craft intelligence, define personality, and bring your digital assistant to life without writing a single line of code.",
  keywords: [
    "RAVX ARC LAB",
    "RAVX OS",
    "AI creation lab",
    "create AI avatar",
    "personal AI builder",
    "AI development platform",
    "AI personality creator",
    "no-code AI",
    "AI startup project",
    "AI lab India",
    "AI assistant maker",
  ],
  authors: [{ name: "Harsh Pandey", url: "https://github.com/201Harsh" }],
  creator: "Harsh Pandey",
  publisher: "RAVX ARC Labs",
  metadataBase: new URL("https://201harsh.github.io/ravx-os/ravx/arc"),
  openGraph: {
    title: "RAVX ARC LAB — Where AI Sparks to Life",
    description:
      "Step inside RAVX ARC LAB, the birthplace of intelligent digital avatars. Define your AI personality, skills, and memory — and watch it come alive.",
    url: "https://201harsh.github.io/ravx-os/ravx/arc",
    siteName: "RAVX ARC LAB",
    images: [
      {
        url: "/img/SEO_RAVX_HOME.png",
        width: 1200,
        height: 630,
        alt: "RAVX ARC LAB — Where AI Sparks to Life",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
