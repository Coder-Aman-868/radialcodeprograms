import { NextResponse } from 'next/server';
import { mockPrograms, mockStudents } from '@/lib/mockData';

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
  const program = mockPrograms.find(p => p.id === parseInt(id));

  if (!program) {
    return NextResponse.json({ error: 'Program not found' }, { status: 404 });
  }

  return NextResponse.json(program);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = checkAuth(request);
  if (authError) return authError;

  const { id } = await params;
  const data = await request.json();

  const index = mockPrograms.findIndex(p => p.id === parseInt(id));
  if (index === -1) {
    return NextResponse.json({ error: 'Program not found' }, { status: 404 });
  }

  // If name is being updated, regenerate slug
  let updatedData = { ...data };
  if (data.name && data.name !== mockPrograms[index].name) {
    // Import generateSlug function
    const { generateSlug } = require('@/lib/mockData');
    // Temporarily remove current program from array to avoid self-conflict in slug generation
    const currentProgram = mockPrograms[index];
    mockPrograms.splice(index, 1);
    updatedData.slug = generateSlug(data.name);
    // Put the program back
    mockPrograms.splice(index, 0, currentProgram);
  }

  mockPrograms[index] = {
    ...mockPrograms[index],
    ...updatedData,
    updatedAt: new Date().toISOString()
  };

  return NextResponse.json(mockPrograms[index]);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = checkAuth(request);
  if (authError) return authError;

  const { id } = await params;
  const programId = parseInt(id);
  const index = mockPrograms.findIndex(p => p.id === programId);

  if (index === -1) {
    return NextResponse.json({ error: 'Program not found' }, { status: 404 });
  }

  // Delete all students associated with this program
  const studentsToDelete = mockStudents.filter(student => student.programId === programId);
  const deletedStudentsCount = studentsToDelete.length;

  // Remove students from the array
  for (let i = mockStudents.length - 1; i >= 0; i--) {
    if (mockStudents[i].programId === programId) {
      mockStudents.splice(i, 1);
    }
  }

  // Delete the program
  mockPrograms.splice(index, 1);

  return NextResponse.json({ 
    success: true, 
    message: `Program deleted successfully. ${deletedStudentsCount} associated students were also deleted.`
  });
}