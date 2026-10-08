import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: {
    default: "Billings Home Pros | Local Contractors & Home Services",
    template: "%s | Billings Home Pros",
  },
  description:
    "Find plumbers, HVAC technicians, electricians, roofers, and remodeling contractors serving Billings, Montana. Compare local home service professionals and request a quote.",
  keywords: [
    "Billings home services",
    "Billings contractors",
    "Billings MT contractors",
    "plumbers Billings MT",
    "HVAC Billings MT",
    "electricians Billings MT",
    "roofers Billings MT",
    "remodeling contractors Billings MT",
  ],
  metadataBase: new URL("https://billingshomepros.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Billings Home Pros | Local Contractors & Home Services",
    description:
      "Find local plumbers, HVAC technicians, electricians, roofers, and remodeling contractors serving Billings, Montana.",
    url: "https://billingshomepros.com",
    siteName: "Billings Home Pros",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-9SKTLDF7PR"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9SKTLDF7PR');
          `}
        </Script>
      </body>
    </html>
  );
}
