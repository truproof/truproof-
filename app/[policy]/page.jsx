import Link from 'next/link';

export const dynamic = 'force-dynamic';

const policyData = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'September 2026',
    content: [
      {
        h2: '1. Information We Collect',
        p: 'TruProof collects verified client feedback, including ratings, written feedback, names, and optional email addresses provided through single-use authenticated tokens.'
      },
      {
        h2: '2. How We Use Information',
        p: 'Submitted testimonial data is used exclusively by the respective account holders for display on their public embed widgets and for generating marketing content.'
      },
      {
        h2: '3. Data Security & Storage',
        p: 'All data is secured using SSL/TLS encryption in transit and stored safely in pooled serverless PostgreSQL databases. We never sell your personal or business data to third-party brokers.'
      }
    ]
  },
  terms: {
    title: 'Terms of Service',
    updated: 'September 2026',
    content: [
      {
        h2: '1. Service Scope',
        p: 'TruProof provides tools for collecting, moderating, embedding, and transforming verified customer testimonials into marketing copy.'
      },
      {
        h2: '2. User Conduct & Authenticity',
        p: 'Users agree not to forge fraudulent testimonials or submit abusive, defamatory, or unlawful content. TruProof reserves the right to suspend accounts that violate authenticity standards.'
      },
      {
        h2: '3. Service Availability',
        p: 'We provide our platform on an "as is" and "as available" basis, aiming for 99.9% uptime on our edge global network.'
      }
    ]
  },
  refund: {
    title: 'Refund & Cancellation Policy',
    updated: 'September 2026',
    content: [
      {
        h2: '1. 7-Day Money-Back Guarantee',
        p: 'We offer a no-questions-asked 100% refund within 7 days of your initial plan upgrade if TruProof does not meet your business expectations.'
      },
      {
        h2: '2. Refund Request Process',
        p: 'To claim a refund, email support@truproof.app with your registered account email and transaction ID. Refunds are processed to the original payment method within 5–7 business days.'
      },
      {
        h2: '3. Subscription Cancellation',
        p: 'You can cancel recurring subscriptions at any time via your dashboard. Your access will remain active until the end of the current billing cycle.'
      }
    ]
  }
};

export default function PolicyPage({ params }) {
  const policyKey = params?.policy?.toLowerCase();
  const policy = policyData[policyKey];

  if (!policy) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-xl font-bold text-slate-800">Page Not Found</h1>
        <Link href="/" className="mt-4 text-sm text-blue-600 hover:underline">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-20">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-black text-xl tracking-tight text-blue-600">TruProof</Link>
          <Link href="/dashboard" className="text-xs font-semibold text-slate-600 hover:text-blue-600">Dashboard</Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-12 space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">{policy.title}</h1>
          <p className="text-xs text-slate-500 mt-2">Last updated: {policy.updated}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6 shadow-sm">
          {policy.content.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h2 className="text-base font-bold text-slate-800">{sec.h2}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{sec.p}</p>
            </div>
          ))}
        </div>

        {/* Footer links to other policies */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap gap-4 text-xs text-slate-500 justify-center">
          <Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-blue-600">Terms of Service</Link>
          <span>•</span>
          <Link href="/refund" className="hover:text-blue-600">7-Day Refund Policy</Link>
        </div>
      </main>
    </div>
  );
}
