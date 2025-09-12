import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const requiredFields = ['crop', 'season', 'state', 'annualRainfall', 'area', 'fertilizer', 'pesticide', 'cropYear'];
    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    return NextResponse.json({
      model: "Random Forest",
      predicted_yield: "2017.7 kg/hectare",
      total_expected_production: "20.18 tons",
      assessment: "Good yield expected"
    });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error in predict-yield API:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error.message },
      { status: 500 }
    );
  }
}