'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Check, ShieldCheck, Zap, Sparkles, ChevronDown, ChevronUp, 
  HelpCircle, Star, ArrowRight, CheckCircle2 
} from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Co-founder exact pricing definitions
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Ideal for trying TruProof with zero risk. No credit card required.',
      highlight: false,
      ctaText: 'Start Free',
      ctaLink: '/dashboard',
      features: [
        '10 text testimonials total',
        '1 video testimonial total',
        '1 live embed widget',
        '20 AI marketing credits total',
        'Powered by TruProof badge visible',
        '7-day expiring invite links',
        'Direct link sharing'
      ]
    },
    {
      name: 'Starter',
      price: billingCycle === 'monthly' ? '$9' : '$90',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      subtext: billingCycle === 'yearly' ? 'billed annually (save $18)' : 'billed monthly',
      description: 'Great for solo freelancers and creators building social proof.',
      highlight: false,
      ctaText: 'Get Starter',
      ctaLink: 'https://buy.stripe.com/test_starter', // Replace with your Stripe Payment Link
      features: [
        '50 text testimonials',
        '5 video testimonials',
        '3 embed widgets',
        '100 AI credits / month',
        'Custom widget styling',
        'Everything in Free'
      ]
    },
    {
      name: 'Pro',
      badge: 'Most Popular',
      price: billingCycle === 'monthly' ? '$19' : '$190',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      subtext: billingCycle === 'yearly' ? 'billed annually (save $38)' : 'billed monthly',
      description: 'Built for growth-focused founders, consultants, and SaaS builders.',
      highlight: true,
      ctaText: 'Upgrade to Pro',
      ctaLink: 'https://buy.stripe.com/test_pro', // Replace with your Stripe Payment Link
      features: [
        'Unlimited text testimonials',
        '25 video testimonials',
        'Unlimited embed widgets',
        '500 AI credits / month',
        'Remove "TruProof" branding',
        'CSV data export',
        'Priority email support'
      ]
    },
    {
      name: 'Agency',
      price: billingCycle === 'monthly' ? '$49' : '$490',
      period: billingCycle === 'monthly' ? '/month' : '/year',
      subtext: billingCycle === 'yearly' ? 'billed annually (save $98)' : 'billed monthly',
      description: 'For agencies managing client portfolios and multiple domains.',
      highlight: false,
      ctaText: 'Get Agency',
      ctaLink: 'https://buy.stripe.com/test_agency', // Replace with your Stripe Payment Link
      features: [
        'Unlimited text & video reviews',
        'Unlimited client websites',
        '2,000 AI credits / month',
        'Full White-label styling',
        'Dedicated onboarding support',
        'Everything in Pro'
      ]
    }
  ];

  const faqs = [
    {
      q: 'Can I use TruProof without having a website?',
      a: 'Yes! TruProof provides a standalone hosted review page link that you can share on social media, in emails, or in your WhatsApp bio even if you do not have a website.'
    },
    {
      q: 'Does it work with WordPress, Webflow, Shopify, and Framer?',
      a: 'Yes. You simply copy our one-line responsive HTML iframe tag and paste it into any website builder or custom code platform.'
    },
    {
      q: 'Can I collect video testimonials?',
      a: 'Yes. Clients can submit their review or paste external Loom/YouTube video links, which render natively in your widget.'
    },
    {
      q: 'What does the AI feature generate?',
      a: 'Our Gemini AI engine turns any approved testimonial into ready-to-post LinkedIn content, Twitter threads, micro case studies, and ad copy headlines with one click.'
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes, absolutely. You can cancel your subscription at any time with a single click. No lock-in contracts.'
    },
    {
      q: 'What payment methods do you support?',
      a: 'We accept all major credit and debit cards, Apple Pay, and Google Pay securely through Stripe Checkout.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
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
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-lg shadow-blue-600/20"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium">
            <Zap className="w-3.5 h-3.5" /> Simple, Transparent Global Pricing
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Turn Authentic Testimonials Into Real Revenue
          </h1>
          <p className="text-sm sm:text-base text-slate-400">
            Start free. Upgrade as your business scales. Cancel anytime.
          </p>

          {/* Monthly / Yearly Billing Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-semibold ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="w-14 h-7 bg-slate-800 rounded-full p-1 relative border border-slate-700 transition"
              aria-label="Toggle Billing Cycle"
            >
              <div 
                className={`w-5 h-5 rounded-full bg-blue-500 transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-xs font-semibold flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-400'}`}>
              Annual Billing
              <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                Save 2 Months
              </span>
            </span>
          </div>
        </div>

        {/* Founding Member Offer Box */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-blue-900/30 border border-blue-500/40 rounded-2xl p-6 text-center space-y-3 relative overflow-hidden shadow-xl">
          <div className="inline-block bg-blue-500 text-white font-bold text-[11px] uppercase tracking-wider px-3 py-0.5 rounded-full">
            Limited Launch Deal
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Founding Member Offer — Save 37% for 12 months
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Get complete access to the <strong>Pro Plan for just $12/month</strong> (regularly $19/month). 
            Available strictly for the first 100 paid founders.
          </p>
          <div className="pt-2">
            <a
              href="https://buy.stripe.com/test_founding" // Replace with Stripe link for $12 founding plan
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-lg shadow-blue-600/30"
            >
              Claim Founding Spot ($12/mo) <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 flex flex-col justify-between border relative transition-all ${
                p.highlight
                  ? 'bg-slate-900/90 border-blue-500 shadow-2xl shadow-blue-500/10'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                  {p.badge}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{p.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{p.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-white">{p.price}</span>
                    <span className="text-xs text-slate-400 font-medium">{p.period}</span>
                  </div>
                  {p.subtext && <p className="text-[11px] text-blue-400 mt-0.5">{p.subtext}</p>}
                </div>

                <ul className="space-y-2.5 pt-4 text-xs text-slate-300">
                  {p.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80">
                <a
                  href={p.ctaLink}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                    p.highlight
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {p.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="pt-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-white">Compare Plan Features</h2>
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/40">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800 bg-slate-900/80 text-slate-300">
                <tr>
                  <th className="p-4">Feature</th>
                  <th className="p-4 text-center">Free</th>
                  <th className="p-4 text-center">Starter</th>
                  <th className="p-4 text-center text-blue-400 font-bold">Pro</th>
                  <th className="p-4 text-center">Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                <tr>
                  <td className="p-4 font-medium">Text Testimonials</td>
                  <td className="p-4 text-center">10 total</td>
                  <td className="p-4 text-center">50</td>
                  <td className="p-4 text-center text-blue-400 font-bold">Unlimited</td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Video Testimonials</td>
                  <td className="p-4 text-center">1 total</td>
                  <td className="p-4 text-center">5</td>
                  <td className="p-4 text-center text-blue-400 font-bold">25</td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Live Embed Widgets</td>
                  <td className="p-4 text-center">1 widget</td>
                  <td className="p-4 text-center">3 widgets</td>
                  <td className="p-4 text-center text-blue-400 font-bold">Unlimited</td>
                  <td className="p-4 text-center">Unlimited</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">AI Marketing Credits</td>
                  <td className="p-4 text-center">20 total</td>
                  <td className="p-4 text-center">100 / mo</td>
                  <td className="p-4 text-center text-blue-400 font-bold">500 / mo</td>
                  <td className="p-4 text-center">2,000 / mo</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">TruProof Branding Removal</td>
                  <td className="p-4 text-center text-slate-500">Badge Visible</td>
                  <td className="p-4 text-center text-slate-500">Badge Visible</td>
                  <td className="p-4 text-center text-emerald-400 font-bold">Yes (Clean)</td>
                  <td className="p-4 text-center text-emerald-400 font-bold">Yes (White-label)</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">CSV Data Export</td>
                  <td className="p-4 text-center text-slate-500">—</td>
                  <td className="p-4 text-center text-slate-500">—</td>
                  <td className="p-4 text-center text-emerald-400 font-bold">Included</td>
                  <td className="p-4 text-center text-emerald-400 font-bold">Included</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="pt-8 max-w-3xl mx-auto space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-400">Everything you need to know about plans and billing.</p>
          </div>

          <div className="space-y-3 pt-2">
            {faqs.map((faq, fIdx) => (
              <div 
                key={fIdx} 
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition cursor-pointer"
                onClick={() => toggleFaq(fIdx)}
              >
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-white">
                  <span>{faq.q}</span>
                  {openFaq === fIdx ? <ChevronUp className="w-4 h-4 text-blue-400" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
                </div>
                {openFaq === fIdx && (
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-2">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Instant Support & Deal Closing CTA */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 text-center space-y-3 max-w-xl mx-auto">
          <h3 className="text-base font-bold text-white">Need a custom plan or want to pay via UPI/Wire?</h3>
          <p className="text-xs text-slate-400">Chat directly with the founder to get immediate account activation.</p>
          <a
            href="https://wa.me/?text=Hi%20TruProof%2C%20I%20have%20a%20question%20about%20upgrading%20my%20plan"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition"
          >
            Chat on WhatsApp to activate
          </a>
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
        <p>© {new Date().getFullYear()} TruProof. All rights reserved.</p>
      </footer>
    </div>
  );
}
