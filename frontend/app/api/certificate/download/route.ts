import { NextResponse } from 'next/server';
import { mockPrograms, mockStudents } from '@/lib/mockData';
import { generateCertificate, generateUniqueId } from '@/lib/certificate';

export async function POST(request: Request) {
  try {
    const { programId, email, phone } = await request.json();

    // Find the program
    const program = mockPrograms.find(p => p.id === parseInt(programId));
    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 });
    }

    // Check if certificates are active for this program
    if (!program.certificateActive) {
      return NextResponse.json({ error: 'Certificates are not yet available for this program' }, { status: 400 });
    }

    // Find the student by email and phone for this program
    const student = mockStudents.find(
      s => s.programId === parseInt(programId) && 
           s.email.toLowerCase() === email.toLowerCase() && 
           s.phone === phone
    );

    if (!student) {
      return NextResponse.json({ 
        error: 'No registration found with the provided email and phone number for this program' 
      }, { status: 404 });
    }

    // Generate the certificate PDF
    const uniqueId = generateUniqueId();
    const certificateBlob = await generateCertificate(
      student.name,
      program.name,
      program.date,
      program.venue,
      uniqueId
    );

    // Convert blob to buffer
    const arrayBuffer = await certificateBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Update student certificate status
    const studentIndex = mockStudents.findIndex(s => s.id === student.id);
    if (studentIndex !== -1) {
      mockStudents[studentIndex].certificateStatus = 'Downloaded';
    }

    // Return the PDF
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="certificate-${student.name.replace(/\s+/g, '-')}-${program.slug}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    return NextResponse.json({ error: 'Failed to generate certificate' }, { status: 500 });
  }
}