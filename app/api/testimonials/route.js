import { NextResponse } from 'next/server';

// Server-memory storage (Zero-database hassle for fast MVP)
global.testimonials = global.testimonials || [];

export async function GET(req) {
  try {
    return NextResponse.json({ success: true, testimonials: global.testimonials });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { customerName, customerEmail, company, rating, reviewText, videoUrl } = body;

    if (!customerName || !reviewText) {
      return NextResponse.json({ error: 'Name aur Review zaroori hain' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    let caseStudy = `Challenge: ${company || customerName} needed better proof to convert high-ticket leads.\nSolution: Implemented streamlined systems with remarkable efficiency.\nResults: "${reviewText}"`;
    let linkedInPost = `Excited to see clients winning! 🚀\n\n"${reviewText}"\n\n- ${customerName} (${company || 'Client'})\n\nConsistency and solid proof always win. #buildinpublic #growth`;

    // Agar Gemini API key connected hai toh AI se live generation karein
    if (apiKey) {
      try {
        const prompt = `Aap ek B2B copywriter hain. Is testimonial se 2 marketing assets banayein:
Client: ${customerName} (${company || 'Client'})
Review: "${reviewText}"

Output strictly JSON me dein:
{"caseStudy": "300-word B2B case study with Challenge, Solution, Result", "linkedInPost": "Engaging high-converting LinkedIn post"}`;

        const aiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const aiData = await aiRes.json();
        const raw = aiData.candidates?.[0]?.content?.parts?.[0]?.text?.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(raw);
        if (parsed.caseStudy) caseStudy = parsed.caseStudy;
        if (parsed.linkedInPost) linkedInPost = parsed.linkedInPost;
      } catch (aiErr) {
        console.log('Fallback to default copy:', aiErr.message);
      }
    }

    const newTestimonial = {
      id: Date.now().toString(),
      customer_name: customerName,
      customer_email: customerEmail || '',
      company: company || '',
      rating: Number(rating) || 5,
      review_text: reviewText,
      video_url: videoUrl || '',
      case_study: caseStudy,
      linkedin_post: linkedInPost,
      created_at: new Date().toISOString()
    };

    global.testimonials.unshift(newTestimonial);

    return NextResponse.json({ success: true, testimonial: newTestimonial });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
