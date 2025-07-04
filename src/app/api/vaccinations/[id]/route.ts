// File: app/api/vaccinations/[id]/route.ts

import { NextResponse } from 'next/server';
import connectDB from '@root/lib/mongodb';
import Vaccination from '@root/models/vaccination';
import { isValidObjectId } from 'mongoose';

// PATCH: update vaccination by _id
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const body = await req.json();
    const updated = await Vaccination.findByIdAndUpdate(id, body, { new: true });

    if (!updated) {
      return NextResponse.json({ error: 'Vaccination not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update vaccination' }, { status: 500 });
  }
}

// DELETE: delete vaccination by _id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  const { id } = params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const deleted = await Vaccination.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ error: 'Vaccination not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete vaccination' }, { status: 500 });
  }
}
