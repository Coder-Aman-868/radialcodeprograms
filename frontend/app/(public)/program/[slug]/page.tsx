import { notFound } from 'next/navigation';
import { programs } from '@/lib/api';
import ProgramClient from './ProgramClient';

interface ProgramPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  
  // Ensure slug is properly decoded and formatted
  const decodedSlug = decodeURIComponent(slug);
  
  let program;
  try {
    program = await programs.getBySlug(decodedSlug);
    if (process.env.NODE_ENV === 'development') {
      console.log('Program fetched successfully:', program ? 'Found' : 'Not found', program);
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching program:', error);
    }
    // Don't immediately return notFound, let the null check handle it
  }

  // Only return notFound if program is truly not found
  if (!program) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`Program not found for slug: ${decodedSlug}`);
    }
    notFound();
  }

  return <ProgramClient program={program} />;
}