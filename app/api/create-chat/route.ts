import { NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { supabase } from '@/services/SupabaseClient';
import { GoogleGenerativeAI } from '@google/generative-ai';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userEmail = user.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
      return NextResponse.json({ error: 'User email not found' }, { status: 400 });
    }

    const formData = await request.json();
    const requiredFields = ['crop', 'season', 'state', 'annualRainfall', 'area', 'fertilizer', 'pesticide', 'cropYear'];
    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    const predictResponse = await fetch(`${request.headers.get('origin')}/api/predict-yield`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!predictResponse.ok) {
      throw new Error(`Predict API failed with status: ${predictResponse.status}`);
    }
    const predictionData = await predictResponse.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not set');
    }
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const titlePrompt = `Summarize this crop form data into a short, descriptive title (max 50 characters): ${JSON.stringify(formData)}`;
    const titleResult = await model.generateContent(titlePrompt);
    const title = titleResult.response.text().trim().slice(0, 50);

    const systemPrompt = 'You are a crop yield predicting and suggesting AI. Provide helpful advice on farming, yields, and improvements.';
    const initialPrompt = `${systemPrompt}\nBased on this crop data: ${JSON.stringify(formData)}\nAnd prediction: ${JSON.stringify(predictionData)}\nGive a succinct yield prediction and initial assessment.`;
    const initialResult = await model.generateContent(initialPrompt);
    const initialMessage = initialResult.response.text().trim();

    const chatId = crypto.randomUUID();
    const chatHistory = [{ role: 'bot', content: initialMessage }];
    const formDataAndResponse = JSON.stringify({ formData, prediction: predictionData });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, error } = await supabase
      .from('Data')
      .insert({
        Chat_Id: chatId,
        userEmail,
        Title: title,
        Chat: chatHistory,
        FormDataAndResponse: formDataAndResponse,
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      throw new Error(`Failed to insert into Supabase: ${error.message}`);
    }

    return NextResponse.json({ chatId, title, initialMessage });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating chat:', error);
    return NextResponse.json(
      { error: 'Failed to create chat', details: error.message },
      { status: 500 }
    );
  }
}