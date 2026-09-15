import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

const roobert = localFont({
  src: [
    {
      path: "./fonts/Roobert-TRIAL-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/Roobert-TRIAL-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Roobert-TRIAL-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/Roobert-TRIAL-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-roobert",
});
export const metadata: Metadata = {
  title: "Skinstric",
  description: "Sophisticated skincare, powered by A.I.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${roobert.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
