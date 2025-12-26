import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const programId = searchParams.get('programId');
  const studentId = searchParams.get('studentId');
  
  // Mock certificate status logic
  const certificateReady = Math.random() > 0.5; // Random for demo
  const downloadUrl = certificateReady ? `/certificates/${studentId}-${programId}.pdf` : null;
  
  return NextResponse.json({
    certificateReady,
    downloadUrl
  });
}