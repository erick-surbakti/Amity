import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      console.error('GROQ_API_KEY is not configured');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content: `You are a compassionate and empathetic wellness advisor for Amity, a mental health support platform. Your role is to:
1. Listen actively and validate the user's feelings
2. Provide supportive and encouraging responses
3. Offer practical wellness suggestions when appropriate
4. Be non-judgmental and create a safe space for conversation
5. Suggest professional help if the user mentions crisis situations
6. Never provide medical diagnosis or treatment advice

Always respond with empathy, warmth, and genuine care. Keep responses concise and conversational.`
          },
          ...messages.map((msg: any) => ({
            role: msg.role,
            content: msg.content
          }))
        ],
        max_tokens: 1024,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      console.error('Groq API error:', error, 'Status:', response.status);
      return NextResponse.json(
        { error: `AI service error: ${error.error?.message || 'Unknown error'}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content || 'I understand. Tell me more about how you\'re feeling.';

    return NextResponse.json({
      message: assistantMessage,
      success: true
    });
  } catch (error: any) {
    console.error('Wellness chat error:', error.message || error);
    return NextResponse.json(
      { error: `Server error: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}
