import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(request) {
  try {
    const { reviewText, clientName, company } = await request.json();

    if (!reviewText) {
      return NextResponse.json({ success: false, error: 'Review text is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // Fallback if API key is temporarily unavailable
    if (!apiKey) {
      return NextResponse.json({
        success: true,
        assets: {
          linkedInPost: `Excited to see results like this! "${reviewText}" - thanks ${clientName || 'our client'}!`,
          twitterThread: `Customer proof matters: "${reviewText}" 🚀`,
          caseStudy: `Problem: Scaling operations\nResult: 5-star customer satisfaction.\nFeedback: "${reviewText}"`,
          adCopy: `See why ${clientName || 'leaders'} trust TruProof: "${reviewText.slice(0, 80)}..."`
        }
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a high-converting B2B SaaS copywriter. Based on this client testimonial:
Review: "${reviewText}"
Client: "${clientName || 'Client'}"
Company: "${company || 'Company'}"

Generate 4 distinct marketing assets in clean JSON format:
1. "linkedInPost": An engaging founder post sharing this win with key takeaways.
2. "twitterThread": A short, punchy tweet hook.
3. "caseStudy": A 3-sentence micro case study (Problem, Outcome, Quote).
4. "adCopy": A short high-converting ad headline and description.

Return ONLY raw JSON with keys: linkedInPost, twitterThread, caseStudy, adCopy. Do not add markdown backticks.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    // Clean potential markdown backticks
    const cleanedText = responseText.replace(/^```json/, '').replace(/```$/, '').trim();
    const assets = JSON.parse(cleanedText);

    return NextResponse.json({ success: true, assets });
  } catch (error) {
    console.error('AI GENERATE ERROR:', error);
    // Graceful fallback so user experience is never blocked
    return NextResponse.json({
      success: true,
      assets: {
        linkedInPost: `Another happy customer sharing their growth journey with us! "${reviewText}"`,
        twitterThread: 'Proof builds trust. Grateful for our clients sharing real feedback.',
        caseStudy: 'Verified feedback demonstrating real SaaS business impact.',
        adCopy: 'Join hundreds of satisfied founders growing with TruProof.'
      }
    });
  }
}
