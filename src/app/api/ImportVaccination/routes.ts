// File: /src/app/api/import-vaccinations/route.ts

import axios from 'axios';
import { NextResponse } from 'next/server';
import connectDB from '@root/lib/mongodb';
import Vaccination from '@root/models/vaccination';

export async function POST() {
  try {
    await connectDB();

    const baseURL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Fetch JSON data from public file
    const response = await axios.get(`${baseURL}/pet-vaccination.json`);
    const vaccinations = response.data;

    // Optional: clear existing data (comment out if you want to keep existing)
    // await Vaccination.deleteMany({});

    // Use bulkWrite with upsert to insert/update without duplicates
    await Vaccination.bulkWrite(
      vaccinations.map((v: any) => ({
        updateOne: {
          filter: {
            petName: v.petName,
            vaccinationType: v.vaccinationType,
            lastCompletedDate: new Date(v.lastCompletedDate),
          },
          update: {
            $set: {
              petName: v.petName,
              vaccinationType: v.vaccinationType,
              lastCompletedDate: new Date(v.lastCompletedDate),
              dueDate: new Date(v.dueDate),
            },
          },
          upsert: true,
        },
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
