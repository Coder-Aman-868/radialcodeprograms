import { NextResponse } from 'next/server';
import { mockStudents } from '@/lib/mockData';

function checkAuth(request: Request) {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const cookies = cookieHeader.split(';');
  const adminToken = cookies.find(cookie => cookie.trim().startsWith('admin-token='));

  if (!adminToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  return null;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = checkAuth(request);
  if (authError) return authError;

  const { id } = await params;
  const programId = parseInt(id);

  // Filter students by program ID
  const students = mockStudents.filter(s => s.programId === programId);

  return NextResponse.json(students);
}