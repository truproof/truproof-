'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Check, Sparkles, ArrowRight, 
  ChevronDown, ChevronUp, Lock, Globe2
} from 'lucide-react';

export default function PricingPage() {
  const [currency, setCurrency] = useState('USD');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [faqOpen, setFaqOpen] = useState(null);

  // TruProof Founding Pro Dodo Checkout Link
  const DODO_CHECKOUT_URL = "https://checkout.dodopayments.com/buy/pdt_0Nozhzoogf1NN88ius8Uw";

  const isIndia = currency === 'INR';
  const isAnnual = billingCycle === 'annual';

  const plans = [
    {
      id: 'free',
      name: 'Free Starter',
      desc: 'Ideal for testing initial social proof and testimonial collection.',
      priceUSD: 0,
      priceINR: 0,
      popular: false,
      features: [
        '10 Total Testimonials Limit',
        '1 Embeddable Widget',
        '7-Day Expiring Invites',
        '20 AI Generation Credits',
        'TruProof Watermark'
      ],
      buttonText: 'Start Free Today',
      isFree: true
    },
    {
      id: 'starter',
      name: 'Starter Pro',
      desc: 'For solo creators and consultants building trust.',
      priceUSD: isAnnual ? 7 : 9,
      priceINR: isAnnual ? 249 : 299,
      popular: false,
      features: [
        'Up to 50 Live Testimonials',
        '3 Custom Embed Widgets',
        'Remove TruProof Branding',
        '100 AI Marketing Credits/mo',
        'Standard Email Support'
      ],
      buttonText: 'Get Starter Pro',
      isFree: false
    },
    {
      id: 'founding',
      name: 'Founding Member Pro',
      desc: 'Exclusive launch deal with complete access and verified badges.',
      priceUSD: 12,
      priceINR: 499,
      popular: true,
      features: [
        'Unlimited Verified Testimonials',
        'Unlimited Embed Widgets',
        'Remove Branding Completely',
        '500 AI Marketing Credits/mo',
        'CSV Data Export & Analytics',
        'Lifetime Early-Adopter Deal'
      ],
      buttonText: 'Claim Founding Pro',
      isFree: false
    },
    {
      id: 'agency',
      name: 'Agency Scale',
      desc: 'Designed for agencies handling client testimonials at scale.',
      priceUSD: isAnnual ? 39 : 49,
      priceINR: isAnnual ? 1599 : 1999,
      popular: false,
      features: [
        'Unlimited Workspaces',
        'Custom Domain Embeds',
        '2,000 AI Credits / month',
        'White-label Widget Styling',
        'Priority Founder Support'
      ],
      buttonText: 'Get Agency Scale',
      isFree: false
    }
  ];

  const handleCheckout = (isFreePlan) => {
    if (isFreePlan) {
      window.location.href = '/dashboard';
      return;
    }
    // Secure Dodo Checkout open hoga (Indian + Global payment bina number dikhe)
    window.open(DODO_CHECKOUT_URL, '_blank');
  };

  const faqs = [
    {
      q: 'How does the 7-day expiring invite link work?',
      a: 'When you create a client request in your dashboard, a unique secure link is generated. Your client has 7 days to submit their rating and testimonial before the token expires, preventing fake or spam entries.'
    },
    {
      q: 'Which payment methods are supported?',
      a: 'We accept global Credit & Debit Cards, Apple Pay, Google Pay, and Indian domestic payment options via our secure checkout.'
    },
    {
      q: 'Is my payment secure?',
      a: 'Yes, all transactions are 100% encrypted and processed securely through our Merchant of Record infrastructure. No personal banking details or phone numbers are exposed.'
    },
    {
      q: 'What is your refund policy?',
      a: 'We offer an unconditional 7-day money-back guarantee. If you are not satisfied, write to support and your refund will be processed.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Bar */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-black text-blue-500 tracking-tight">
            <ShieldCheck className="w-6 h-6 text-blue-500" /> TruProof
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xs font-semibold text-slate-300 hover:text-white transition">
              Home
            </Link>
            <Link
              href="/dashboard"
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium">
            <Globe2 className="w-3.5 h-3.5" /> India & Global Checkout Ready
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Simple, High-Trust Pricing
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Collect verified social proof with automated expiration links and boost conversions today.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Currency Selector */}
            <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center gap-1">
              <button
                onClick={() => setCurrency('USD')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                  currency === 'USD' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                USD ($ Global)
              </button>
              <button
                onClick={() => setCurrency('INR')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                  currency === 'INR' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                INR (₹ India)
              </button>
            </div>

            {/* Billing Cycle */}
            <div className="bg-slate-900 border border-slate-800 p-1 rounded-xl flex items-center gap-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition ${
                  billingCycle === 'monthly' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1 ${
                  billingCycle === 'annual' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Annual <span className="text-[10px] text-emerald-400 font-extrabold bg-emerald-500/10 px-1.5 py-0.5 rounded">20% OFF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Founding Member Banner */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 border border-blue-500/40 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Special Launch Deal
            </span>
            <h2 className="text-lg font-bold text-white">Get Founding Pro Tier for {isIndia ? '₹499' : '$12'}</h2>
            <p className="text-xs text-slate-300">Instant access • Zero personal numbers exposed • Global & domestic support.</p>
          </div>
          <button
            onClick={() => handleCheckout(false)}
            className="shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-3 rounded-xl transition shadow-lg shadow-blue-600/25 flex items-center gap-2 cursor-pointer"
          >
            Claim Founding Deal <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`rounded-2xl p-6 flex flex-col justify-between space-y-6 relative transition border ${
                p.popular
                  ? 'bg-slate-900/90 border-blue-500 shadow-xl shadow-blue-500/10 ring-1 ring-blue-500/50'
                  : 'bg-slate-900/50 border-slate-800'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Founding Deal
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-base font-bold text-white">{p.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{p.desc}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-white">
                    {isIndia ? `₹${p.priceINR}` : `$${p.priceUSD}`}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {p.id === 'founding' ? 'one-time' : '/ month'}
                  </span>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                  {p.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleCheckout(p.isFree)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                  p.popular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                {p.buttonText} <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Security Assurance */}
        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-4">
          <Lock className="w-3.5 h-3.5 text-emerald-400" />
          <span>Encrypted 256-bit SSL Checkout powered by Dodo Payments</span>
        </div>

        {/* FAQs */}
        <div className="max-w-2xl mx-auto space-y-4 pt-10 border-t border-slate-900">
          <h2 className="text-xl font-bold text-center text-white">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((f, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full text-left p-4 text-xs font-bold text-white flex items-center justify-between"
                >
                  <span>{f.q}</span>
                  {faqOpen === idx ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </button>
                {faqOpen === idx && (
                  <p className="px-4 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-2">
                    {f.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-8 px-4 text-center text-xs text-slate-500 space-y-2">
        <div className="flex items-center justify-center gap-4 text-slate-400">
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
          <span>•</span>
          <Link href="/refund" className="hover:underline">Refund Policy</Link>
        </div>
        <p>© {new Date().getFullYear()} TruProof. Built for high-trust founders.</p>
      </footer>
    </div>
  );
}
