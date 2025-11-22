import type { Metadata } from "next";
import localFont from "next/font/local";
// Removed Google Fonts import to use local fonts instead
import "./globals.css";
import { Providers } from "./providers";
import MixpanelInitializer from "./MixpanelInitializer";
import { LayoutProvider } from "./(presentation-generator)/context/LayoutContext";
import { Toaster } from "@/components/ui/sonner";
const inter = localFont({
  src: [
    {
      path: "./fonts/Inter.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-inter",
});

// Use Inter as fallback for Instrument Sans (similar sans-serif font)
const instrument_sans = localFont({
  src: [
    {
      path: "./fonts/Inter.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-instrument-sans",
});

// Use Inter as fallback for Roboto (similar sans-serif font)
const roboto = localFont({
  src: [
    {
      path: "./fonts/Inter.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-roboto",
});


// export const metadata: Metadata = {
//   metadataBase: new URL("https://presenton.ai"),
//   title: "Presenton - Open Source AI presentation generator",
//   description:
//     "Open-source AI presentation generator with custom layouts, multi-model support (OpenAI, Gemini, Ollama), and PDF/PPTX export. A free Gamma alternative.",
//   keywords: [
//     "AI presentation generator",
//     "data storytelling",
//     "data visualization tool",
//     "AI data presentation",
//     "presentation generator",
//     "data to presentation",
//     "interactive presentations",
//     "professional slides",
//   ],
//   openGraph: {
//     title: "Presenton - Open Source AI presentation generator",
//     description:
//       "Open-source AI presentation generator with custom layouts, multi-model support (OpenAI, Gemini, Ollama), and PDF/PPTX export. A free Gamma alternative.",
//     url: "https://presenton.ai",
//     siteName: "Presenton",
//     images: [
//       {
//         url: "https://presenton.ai/presenton-feature-graphics.png",
//         width: 1200,
//         height: 630,
//         alt: "Presenton Logo",
//       },
//     ],
//     type: "website",
//     locale: "en_US",
//   },
//   alternates: {
//     canonical: "https://presenton.ai",
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Presenton - Open Source AI presentation generator",
//     description:
//       "Open-source AI presentation generator with custom layouts, multi-model support (OpenAI, Gemini, Ollama), and PDF/PPTX export. A free Gamma alternative.",
//     images: ["https://presenton.ai/presenton-feature-graphics.png"],
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${roboto.variable} ${instrument_sans.variable} antialiased`}
      >
        <Providers>
          <MixpanelInitializer>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </MixpanelInitializer>
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
