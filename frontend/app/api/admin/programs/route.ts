import { NextResponse } from 'next/server';
import { mockPrograms, getNextProgramId, generateSlug } from '@/lib/mockData';

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

export async function GET(request: Request) {
  const authError = checkAuth(request);
  if (authError) return authError;
  
  return NextResponse.json(mockPrograms);
}

export async function POST(request: Request) {
  const authError = checkAuth(request);
  if (authError) return authError;
  
  const data = await request.json();
  
  const newProgram = {
    id: getNextProgramId(),
    slug: generateSlug(data.name),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  mockPrograms.push(newProgram);
  
  return NextResponse.json(newProgram);
}