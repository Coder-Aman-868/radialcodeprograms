import { NextResponse } from 'next/server';
import { mockPrograms } from '@/lib/mockData';

export async function GET() {
  return NextResponse.json(mockPrograms);
}