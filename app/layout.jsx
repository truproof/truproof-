import './globals.css';

export const metadata = {
  metadataBase: new URL('https://truproof.vercel.app'),
  title: 'TruProof | Collect Authentic Testimonials & AI Marketing Assets',
  description:
    'Collect customer testimonials in 2 minutes. Gemini AI turns feedback into ready-to-publish LinkedIn posts, Twitter threads, case studies, and ad copy.',
  keywords: ['testimonial tool', 'social proof software', 'AI marketing copy', 'SaaS reviews', 'embed testimonials'],
  authors: [{ name: 'TruProof Team' }],
  openGraph: {
    title: 'TruProof | Collect Authentic Testimonials & AI Marketing Assets',
    description: 'Collect customer testimonials in 2 minutes. Turn proof into revenue with Gemini AI.',
    url: 'https://truproof.vercel.app',
    siteName: 'TruProof',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TruProof | Collect Authentic Testimonials & AI Marketing Assets',
    description: 'Collect customer testimonials in 2 minutes. Turn proof into revenue with Gemini AI.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
