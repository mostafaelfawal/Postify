import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Postify | شارك أفكارك ومقالاتك بحرية",
  description:
    "Postify هي منصة تتيح لك مشاركة أفكارك ومنشوراتك بسهولة والتفاعل مع الآخرين. ابدأ بإنشاء حساب وشارك العالم ما تفكر فيه.",
  keywords: [
    "Postify",
    "مشاركة المنشورات",
    "تواصل اجتماعي",
    "منصة كتابة",
    "منشورات",
    "تطبيق اجتماعي",
    "مقالات",
    "مدونة",
  ],
  authors: [{ name: "Mostafa Hamdi" }],
  openGraph: {
    title: "Postify | شارك أفكارك ومقالاتك بحرية",
    description:
      "انضم إلى Postify وابدأ بمشاركة أفكارك ومنشوراتك بطريقة سهلة وسريعة.",
    url: "https://postify-mu-blush.vercel.app/",
    siteName: "Postify",
    locale: "ar_EG",
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 1200,
        height: 630,
        alt: "Postify - منصة مشاركة المنشورات",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Postify | شارك أفكارك ومقالاتك بحرية",
    description:
      "انضم إلى Postify وابدأ بمشاركة أفكارك ومنشوراتك بطريقة سهلة وسريعة.",
    images: ["/icon.png"],
    creator: "@mostafa_hamdi",
  },
  metadataBase: new URL("https://postify-mu-blush.vercel.app/"),
  alternates: {
    canonical: "https://postify-mu-blush.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
