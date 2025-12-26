'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProgramClient from './ProgramClient';
import Link from 'next/link';
import { ExclamationTriangleIcon } from '@/components/Icons';

interface Program {
  id: number;
  slug: string;
  name: string;
  date: string;
  venue: string;
  description: string;
  certificateActive: boolean;
}

export default function ProgramPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const decodedSlug = decodeURIComponent(slug);
        const response = await fetch(`/api/program/${decodedSlug}`);
        
        if (response.status === 404) {
          setNotFound(true);
          return;
        }
        
        if (!response.ok) {
          throw new Error('Failed to fetch program');
        }
        
        const data = await response.json();
        setProgram(data);
      } catch (error) {
        console.error('Error fetching program:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProgram();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600">Loading program...</p>
        </div>
      </div>
    );
  }

  if (notFound || !program) {
    return (
      <div className="min-h-screen bg-slate-50" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
        `
      }}>
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-lg shadow-slate-200/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center py-6">
              <img src="/assets/images/svg/logo.svg" alt="Logo" className="h-12 w-auto" />
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-12 text-center">
            <ExclamationTriangleIcon className="mx-auto mb-6 text-amber-500" size={64} />
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Program Not Found</h1>
            <p className="text-xl text-slate-600 mb-8">
              The program you&apos;re looking for doesn&apos;t exist or may have been removed.
            </p>
            <Link 
              href="/"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <ProgramClient program={program} />;
}