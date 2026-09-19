import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <nav className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-lg">T</div>
          <span className="text-2xl font-extrabold text-blue-600 tracking-tight">TruProof</span>
        </div>
        <Link href="/dashboard" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition shadow-sm">
          Open Dashboard
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
          Proof that sells.
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-slate-950 tracking-tight leading-tight">
          Collect testimonials automatically. <br />
          <span className="text-blue-600">Turn proof into revenue.</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Collect text & video reviews from clients in 2 minutes. Gemini AI instantly creates viral LinkedIn posts, case studies, and ad copies.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/dashboard" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-base font-bold shadow-lg shadow-blue-500/25 transition">
            Get Started Free
          </Link>
          <a href="#features" className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-base font-semibold transition">
            Explore Features
          </a>
        </div>

        <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 text-left">
          <div className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm">
            <div className="text-blue-600 font-extrabold text-lg mb-2">1. Share 2-Min Link</div>
            <p className="text-slate-600 text-sm">Send a ready WhatsApp/Email link to clients for video & text reviews.</p>
          </div>
          <div className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm">
            <div className="text-blue-600 font-extrabold text-lg mb-2">2. Gemini AI Engine</div>
            <p className="text-slate-600 text-sm">Auto-generate 300-word Case Study, viral LinkedIn post, and Twitter thread.</p>
          </div>
          <div className="p-6 border border-slate-200 rounded-2xl bg-white shadow-sm">
            <div className="text-blue-600 font-extrabold text-lg mb-2">3. Embed Widget</div>
            <p className="text-slate-600 text-sm">Drop 1 line of code on your website to show live social proof.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
