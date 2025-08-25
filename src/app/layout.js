
import "./globals.css";

export const metadata = {
  title: 'Regents Care - Healthcare Appointment Booking',
  description: 'Streamline your healthcare appointment booking process. Transform clicks into booking-ready emails with PDF attachments.',
  keywords: 'healthcare, appointment booking, medical practice, patient scheduling',
  authors: [{ name: 'Regents Care' }],
  creator: 'Regents Care',
  publisher: 'Regents Care',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://regentscare.com'),
  openGraph: {
    title: 'Regents Care - Healthcare Appointment Booking',
    description: 'Streamline your healthcare appointment booking process. Transform clicks into booking-ready emails with PDF attachments.',
    url: 'https://regentscare.com',
    siteName: 'Regents Care',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Regents Care Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regents Care - Healthcare Appointment Booking',
    description: 'Streamline your healthcare appointment booking process.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#4F46E5" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link
          rel="icon"
          href="/android-chrome-192x192.png"
          sizes="192x192"
          type="image/png"
        />
        <link
          rel="icon"
          href="/android-chrome-512x512.png"
          sizes="512x512"
          type="image/png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className={`bg-white text-gray-900 scroll-smooth`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
