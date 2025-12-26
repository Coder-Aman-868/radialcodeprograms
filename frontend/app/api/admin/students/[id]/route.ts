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

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const authError = checkAuth(request);
    if (authError) return authError;

    const { id } = await params;
    const studentId = parseInt(id);

    const index = mockStudents.findIndex(s => s.id === studentId);

    if (index === -1) {
        return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    mockStudents.splice(index, 1);

    return NextResponse.json({ success: true });
}