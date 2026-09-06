import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { InstallAppPrompt } from "@/components/InstallAppPrompt";
import { SiteHeader } from "@/components/SiteHeader";
import { PWARegistration } from "@/components/PWARegistration";
import { StructuredData } from "@/components/StructuredData";
import { wellbeingDisclaimer } from "@/lib/legal";
import { defaultShareAlt, defaultShareDescription, defaultShareTitle, shareImage, shareImageType, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Litho Intelligence by Quintessence Cristal",
    template: "%s | Litho Intelligence"
  },
  description:
    "Test gratuit pour découvrir la pierre naturelle associée à votre intention : stress, amour, protection, énergie, confiance ou cadeau.",
  applicationName: "Litho Intelligence",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/pwa-icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/pwa-icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Litho"
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    title: defaultShareTitle,
    description: defaultShareDescription,
    url: "/",
    siteName: "Litho Intelligence",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: shareImage,
        secureUrl: shareImage,
        type: shareImageType,
        width: 1200,
        height: 630,
        alt: defaultShareAlt
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: defaultShareTitle,
    description: defaultShareDescription,
    images: [shareImage]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#b77a65"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <StructuredData />
        <PWARegistration />
        <InstallAppPrompt />
        <div className="site-shell">
          <SiteHeader />
          {children}
          <footer className="footer">
            <div className="footer-links">
              <Link href="/formation">Formation</Link>
              <Link href="/meditations">Méditations</Link>
              <Link href="/consultation">Consultation</Link>
              <Link href="/pierre-de-naissance">Pierre de naissance</Link>
              <Link href="/compatibilite-amoureuse">Compatibilité</Link>
              <Link href="/idee-cadeau">Idées cadeaux</Link>
              <Link href="/conseils-lithotherapie">Guides lithothérapie</Link>
              <Link href="/guides">Guides</Link>
            </div>
            <strong>Litho Intelligence by Quintessence Cristal.</strong> {wellbeingDisclaimer}
          </footer>
        </div>
      </body>
    </html>
  );
}
