import { NextResponse } from 'next/server';
import connectDB from '@root/lib/mongodb';
import Vaccination from '@root/models/models';

export async function GET() {
  try {
    await connectDB();
    console.log('✅ MongoDB connected');
    const vaccinations = await Vaccination.find();
    return NextResponse.json(vaccinations);
  } catch (error: any) {
    console.error('❌ Error fetching vaccinations:', error.message);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch vaccinations' },
      { status: 500 }
    );
  }
}
