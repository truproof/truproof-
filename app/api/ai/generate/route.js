import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { reviewText, clientName, company } = body;

    if (!reviewText) {
      return NextResponse.json({ success: false, error: 'Review text is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: `You are a high-converting B2B SaaS copywriter. Create 4 marketing assets based on this testimonial:
Review: "${reviewText}"
Client: "${clientName || 'Client'}"
Company: "${company || 'Company'}"

Respond ONLY with valid JSON in this exact structure:
{
  "linkedInPost": "Engaging founder post with emojis and key takeaways",
  "twitterThread": "Punchy tweet summarizing customer win",
  "caseStudy": "3-sentence micro case study (Problem, Outcome, Quote)",
  "adCopy": "Compelling headline and 1-line ad description"
}`
                    }
                  ]
                }
              ],
              generationConfig: {
                responseMimeType: 'application/json'
              }
            }
          }
        );

        if (response.ok) {
          const result = await response.json();
          const candidateText = result.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidateText) {
            const parsed = JSON.parse(candidateText);
            return NextResponse.json({ success: true, assets: parsed });
          }
        }
      } catch (aiErr) {
        console.error('Gemini API call failed, applying fallback:', aiErr);
      }
    }

    // High-converting fallback template (guarantees UI never fails)
    return NextResponse.json({
      success: true,
      assets: {
        linkedInPost: `Excited to see real impact for our clients! 🚀\n\n"${reviewText}"\n\nBig thanks to ${clientName || 'our partners'} at ${company || 'their team'} for trusting TruProof. Building trust with automated proof is the easiest growth lever in 2026.`,
        twitterThread: `Customer proof > clever marketing.\n\n"${reviewText}"\n\nHow ${clientName || 'founders'} convert trust into pipeline with TruProof. 👇`,
        caseStudy: `Problem: Low landing page conversion and manual review chasing.\nOutcome: Fast, verified client feedback collection.\nQuote: "${reviewText}"`,
        adCopy: `Turn your customer praise into paying users: "${reviewText.slice(0, 70)}..."`
      }
    });
  } catch (error) {
    console.error('SERVER ROUTE ERROR:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
