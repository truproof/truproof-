import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <nav className="border-b border-slate-800 bg-slate-950/80 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-xl font-black text-blue-500">
          <ShieldCheck className="w-6 h-6 text-blue-500" /> TruProof
        </Link>
        <Link href="/" className="text-xs font-semibold text-slate-300 hover:text-white">Back to Home</Link>
      </nav>
      <main className="max-w-3xl mx-auto px-6 py-12 space-y-6 text-sm text-slate-300 leading-relaxed">
        <h1 className="text-3xl font-black text-white">Refund Policy</h1>
        <p className="text-xs text-slate-400">Last updated: October 2026</p>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">7-Day Money-Back Guarantee</h2>
          <p>We want you to be completely satisfied with TruProof. If you upgrade to any paid tier (Starter, Pro, or Agency) and feel it does not fit your business needs, you are entitled to a full refund within 7 days of your purchase.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">How to Claim a Refund</h2>
          <p>Simply send an email to support@truproof.com with your registered account email and invoice details within 7 days. Refunds are processed back to your original payment method (Stripe or Razorpay) within 5–7 business days.</p>
        </section>
      </main>
    </div>
  );
}
