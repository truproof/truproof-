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
  const DODO_CHECKOUT_URL = "https://checkout.dodopayments.com/buy/pdt_0Nozhzoogf1NN88ius8Uw?quantity=1";

  const isIndia = currency === 'INR';
  const isAnnual = billingCycle === 'annual';

  const plans = [
    {
      id: 'free',
      name: 'Free Starter',
      badge: null,
      desc: 'Ideal for testing initial social proof and testimonial collection.',
      priceUSD: 0,
      priceINR: 0,
      period: '/ month',
      features: [
        '10 Total Testimonials Limit',
        '1 Embeddable Widget',
        '7-Day Expiring Invites',
        '20 AI Generation Credits',
        'TruProof Watermark'
      ],
      cta: 'Start Free Today',
      link: '/dashboard',
      isExternal: false,
      popular: false
    },
    {
      id: 'starter',
      name: 'Starter Pro',
      badge: 'Coming Soon',
      desc: 'For solo creators and consultants building trust.',
      priceUSD: isAnnual ? 7 : 9,
      priceINR: isAnnual ? 249 : 299,
      period: '/ month',
      features: [
        'Up to 50 Live Testimonials',
        '3 Custom Embed Widgets',
        'Remove TruProof Branding',
        '100 AI Marketing Credits/mo',
        'Standard Email Support'
      ],
      cta: 'Grab Founding Deal Instead',
      link: DODO_CHECKOUT_URL,
      isExternal: true,
      popular: false
    },
    {
      id: 'founding',
      name: 'Founding Member Pro',
      badge: 'FOUNDING DEAL',
      desc: 'Exclusive launch deal with complete access and verified badges.',
      priceUSD: 12,
      priceINR: 499,
      period: ' one-time',
      features: [
        'Unlimited Verified Testimonials',
        'Unlimited Embed Widgets',
        'Remove Branding Completely',
        '500 AI Marketing Credits/mo',
        'CSV Data Export & Analytics',
        'Lifetime Early-Adopter Deal'
      ],
      cta: 'Claim Founding Pro →',
      link: DODO_CHECKOUT_URL,
      isExternal: true,
      popular: true
    },
    {
      id: 'agency',
      name: 'Agency Scale',
      badge: 'Coming Soon',
      desc: 'Designed for agencies handling client testimonials at scale.',
      priceUSD: isAnnual ? 39 : 49,
      priceINR: isAnnual ? 1599 : 1999,
      period: '/ month',
      features: [
        'Unlimited Workspaces',
        'Custom Domain Embeds',
        '2,000 AI Credits / month',
        'White-label Widget Styling',
        'Priority Founder Support'
      ],
      cta: 'Grab Founding Deal Instead',
      link: DODO_CHECKOUT_URL,
      isExternal: true,
      popular: false
    }
  ];

  const faqs = [
    {
      q: 'How does TruProof verify testimonials?',
      a: 'We send secure, time-sensitive verification links directly to clients. The submission verifies their email and identity badge automatically.'
    },
    {
      q: 'Can I embed testimonials on multiple websites?',
      a: 'Yes, our embed code works seamlessly on WordPress, Webflow, Shopify, Framer, React, or standard HTML sites.'
    },
    {
      q: 'What is the Founding Member deal?',
      a: 'It gives early supporters full lifetime access with verified badges, all updates, and premium AI features for a single one-time payment.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col justify-between selection:bg-blue-500 selection:text-white">
      {/* Navbar */}
      <header className="border-b border-slate-800/80 bg-[#07090E]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/30">
            T
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            TruProof
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/dashboard" className="text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-all shadow-md shadow-blue-600/20">
            Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {/* Launch Banner */}
        <div className="mb-10 bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-purple-900/40 border border-blue-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl shadow-blue-950/20">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-blue-400 mb-1">
              <Sparkles className="w-4 h-4" /> SPECIAL LAUNCH DEAL
            </div>
            <h3 className="text-xl font-bold text-white">
              Get Founding Pro Tier for {isIndia ? '₹499' : '$12'}
            </h3>
            <p className="text-sm text-slate-400 mt-0.5">
              Instant access • Lifetime verified badge • Global & domestic cards supported
            </p>
          </div>
          <a
            href={DODO_CHECKOUT_URL}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-lg shadow-blue-600/30 whitespace-nowrap"
          >
            Claim Founding Deal <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Currency & Billing Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          {/* Currency Toggle */}
          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currency === 'USD' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              USD ($ Global)
            </button>
            <button
              onClick={() => setCurrency('INR')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currency === 'INR' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              INR (₹ India)
            </button>
          </div>

          {/* Monthly / Annual Toggle */}
          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                billingCycle === 'monthly' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                billingCycle === 'annual' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Annual <span className="text-emerald-400 font-bold ml-1">20% OFF</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`relative rounded-2xl flex flex-col justify-between p-6 transition-all duration-200 ${
                p.popular
                  ? 'bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-900 border-2 border-blue-500 shadow-2xl shadow-blue-500/20 scale-[1.02]'
                  : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] tracking-wider uppercase font-bold py-1 px-3 rounded-full shadow-md">
                  {p.badge}
                </div>
              )}

              <div>
                <h4 className="text-lg font-bold text-white mb-1">{p.name}</h4>
                <p className="text-xs text-slate-400 min-h-[32px] mb-4">{p.desc}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-extrabold text-white">
                    {isIndia ? `₹${p.priceINR}` : `$${p.priceUSD}`}
                  </span>
                  <span className="text-xs text-slate-400">{p.period}</span>
                </div>

                <ul className="space-y-2.5 mb-8">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                {p.isExternal ? (
                  <a
                    href={p.link}
                    className={`w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      p.popular
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                  >
                    {p.cta}
                  </a>
                ) : (
                  <Link
                    href={p.link}
                    className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200"
                  >
                    {p.cta}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* FAQs Section */}
        <div className="max-w-3xl mx-auto mt-12">
          <h3 className="text-xl font-bold text-center text-white mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  className="w-full text-left px-5 py-4 flex items-center justify-between text-sm font-semibold text-white focus:outline-none"
                >
                  <span>{faq.q}</span>
                  {faqOpen === idx ? (
                    <ChevronUp className="w-4 h-4 text-blue-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                {faqOpen === idx && (
                  <div className="px-5 pb-4 text-xs text-slate-400 leading-relaxed border-t border-slate-800/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} TruProof. Built for real social proof.</p>
      </footer>
    </div>
  );
}
