import './globals.css';

export const metadata = {
  title: 'TruProof — Proof that sells.',
  description: 'AI-powered testimonial engine that turns reviews into case studies and viral social assets.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
