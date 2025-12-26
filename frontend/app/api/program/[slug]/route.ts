import { NextResponse } from 'next/server';
import { mockPrograms } from '@/lib/mockData';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const program = mockPrograms.find(p => p.slug === slug);

  if (!program) {
    return NextResponse.json({ error: 'Program not found' }, { status: 404 });
  }

  return NextResponse.json(program);
}