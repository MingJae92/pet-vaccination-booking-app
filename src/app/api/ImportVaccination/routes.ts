// File: /src/app/api/import-vaccinations/route.ts

import axios from 'axios';
import { NextResponse } from 'next/server';
import connectDB from '@root/lib/mongodb';
import Vaccination from '@root/models/vaccination';

export async function POST() {
  try {
    await connectDB();

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Fetch JSON data using axios
    const response = await axios.get(`${baseURL}/pet-vaccination.json`);
    const vaccinations = response.data;

    // Optional: clear existing data
    await Vaccination.deleteMany({});

    // Insert new data into MongoDB
    await Vaccination.insertMany(
      vaccinations.map((v: any) => ({
        type: v.type,
        lastCompleted: new Date(v.lastCompleted),
        dueDate: new Date(v.dueDate),
        status: v.status,
      }))
    );

    return NextResponse.json({ message: 'Data imported successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Import failed' },
      { status: 500 }
    );
  }
}
