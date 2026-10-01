import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

export const metadata = {
  title: 'TruProof | Collect Authentic Testimonials & AI Content',
  description: 'Turn client feedback into automated social proof and marketing copy.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="antialiased bg-slate-950 text-slate-50">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
