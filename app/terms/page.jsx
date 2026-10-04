import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <nav className="border-b border-slate-800 bg-slate-950/80 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-black text-blue-500">
          <ShieldCheck className="w-6 h-6 text-blue-500" /> TruProof
        </Link>
        <Link href="/" className="text-xs font-semibold text-slate-300 hover:text-white">Back to Home</Link>
      </nav>
      <main className="max-w-3xl mx-auto px-6 py-12 space-y-6 text-sm text-slate-300 leading-relaxed">
        <h1 className="text-3xl font-black text-white">Terms of Service</h1>
        <p className="text-xs text-slate-400">Last updated: October 2026</p>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Service Description</h2>
          <p>TruProof provides authenticated customer testimonial collection links, embeddable website widgets, and AI marketing asset generation tools for founders and digital businesses.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Acceptable Use</h2>
          <p>Users must not use TruProof to collect fraudulent reviews, spam, or abusive content. We reserve the right to suspend accounts that fabricate deceptive endorsements.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Subscriptions & Billing</h2>
          <p>Paid plans (Starter, Pro, Agency) are billed monthly or annually via Stripe or Razorpay. You can cancel your subscription at any time directly through your dashboard with no lock-in contract.</p>
        </section>
      </main>
    </div>
  );
}
