import type { Metadata } from "next";
import "./globals.css";
import { Bounce, ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "RAVX OS — Create Your Own AI Avatar | Personal AI Operating System",
  description:
    "RAVX OS is a next-generation Personal AI Avatar platform where anyone can create intelligent digital avatars that execute tasks, generate content, and interact naturally — no coding required. Built with Next.js, Tailwind, and Google Gemini AI.",
  keywords: [
    "RAVX OS",
    "AI avatar platform",
    "personal AI",
    "AI assistant builder",
    "AI operating system",
    "Google Gemini AI",
    "Next.js AI project",
    "no-code AI tool",
    "AI automation",
    "RAVX ARC",
    "AI startup project",
  ],
  authors: [{ name: "Harsh Pandey", url: "https://github.com/201Harsh" }],
  creator: "Harsh Pandey",
  publisher: "RAVX OS",
  applicationName: "RAVX OS",
  metadataBase: new URL("https://ravx-os.vercel.app"),
  openGraph: {
    title: "RAVX OS — Create Your Own AI Avatar",
    description:
      "Build intelligent AI avatars that think, talk, and act. Experience the future of personalized AI with RAVX OS.",
    url: "https://ravx-os.vercel.app",
    siteName: "RAVX OS",
    images: [
      {
        url: "/img/SEO_RAVX_HOME.png",
        width: 1200,
        height: 630,
        alt: "RAVX OS — Create Your Own AI Avatar",
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
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <html lang="en">
        <body>{children}</body>
      </html>
    </>
  );
}
