import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-space-grotesk'
});

export const metadata: Metadata = {
  title: 'Omkar Garud | Full Stack Developer Portfolio',
  description: 'MCA Student & Aspiring Backend Developer passionate about clean code, real-world solutions, and building innovative applications with Java, Python, MERN, and more.',
  keywords: ['Omkar Garud', 'Full Stack Developer', 'Backend Developer', 'MCA', 'Java', 'Python', 'MERN', 'Portfolio'],
  authors: [{ name: 'Omkar Garud' }],
  creator: 'Omkar Garud',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Omkar Garud | Full Stack Developer Portfolio',
    description: 'MCA Student & Aspiring Backend Developer passionate about clean code and real-world solutions.',
    siteName: 'Omkar Garud Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Omkar Garud | Full Stack Developer Portfolio',
    description: 'MCA Student & Aspiring Backend Developer passionate about clean code and real-world solutions.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          themes={['light', 'dark', 'ocean', 'sunset', 'forest', 'rose', 'midnight', 'nord']}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
