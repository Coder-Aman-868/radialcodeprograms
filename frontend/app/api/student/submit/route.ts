import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json();
  
  // Mock student ID generation
  const mockStudentId = Math.random().toString(36).substr(2, 9);
  
  return NextResponse.json({
    success: true,
    studentId: mockStudentId,
    message: "Student registration successful"
  });
}