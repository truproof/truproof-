import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <nav className="border-b border-slate-800 bg-slate-950/80 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-black text-blue-500">
          <ShieldCheck className="w-6 h-6 text-blue-500" /> TruProof
        </Link>
        <Link href="/" className="text-xs font-semibold text-slate-300 hover:text-white">Back to Home</Link>
      </nav>
      <main className="max-w-3xl mx-auto px-6 py-12 space-y-6 text-sm text-slate-300 leading-relaxed">
        <h1 className="text-3xl font-black text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-400">Last updated: October 2026</p>
        
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
          <p>We collect your account information (via Clerk Google OAuth) when you register as a founder. When your clients submit testimonials through your invite link, we collect their name, email, rating, review text, and optional video URLs.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. How We Use Information</h2>
          <p>Your data is used solely to generate embed widgets, manage your social proof moderation queue, and provide AI marketing copy generations via Google Gemini APIs. We do not sell your personal data to third parties.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Data Security & Storage</h2>
          <p>We store authentication tokens securely via Clerk and follow industry standard practices on Vercel infrastructure to protect your customer testimonials.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Contact Us</h2>
          <p>For any privacy requests or data deletion queries, contact us at support@truproof.com.</p>
        </section>
      </main>
    </div>
  );
}
