'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import AdminWrapper from '@/components/AdminWrapper';
import Header from '@/components/Header';
import { Input, Textarea, Button, DateTimeInput } from '@/components/Form';
import { programs } from '@/lib/api';
import { Program } from '@/lib/types';
import { PencilIcon, RocketIcon, BoltIcon, ArrowLeftIcon, XCircleIcon } from '@/components/Icons';

interface ProgramForm {
  name: string;
  date: string;
  venue: string;
  description: string;
}

interface EditProgramProps {
  params: Promise<{ id: string }>;
}

function EditProgramContent({ params }: EditProgramProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [program, setProgram] = useState<Program | null>(null);
  const [id, setId] = useState<string>('');
  const router = useRouter();
  
  const { register, handleSubmit, control, formState: { errors }, setValue } = useForm<ProgramForm>();

  useEffect(() => {
    params.then(({ id }) => setId(id));
  }, [params]);

  const loadProgram = useCallback(async () => {
    if (!id) return;
    
    try {
      const response = await programs.getAll();
      const foundProgram = response.data.find((p: Program) => p.id === parseInt(id));
      if (foundProgram) {
        setProgram(foundProgram);
        setValue('name', foundProgram.attributes.name);
        setValue('date', foundProgram.attributes.date);
        setValue('venue', foundProgram.attributes.venue);
        setValue('description', foundProgram.attributes.description);
      }
    } catch (error) {
      console.error('Error loading program:', error);
    }
  }, [id, setValue]);

  useEffect(() => {
    if (id) {
      loadProgram();
    }
  }, [id, loadProgram]);

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const onSubmit = async (data: ProgramForm) => {
    if (!program) return;
    
    setLoading(true);
    setError('');
    
    try {
      const slug = generateSlug(data.name);
      await programs.update(program.id, {
        ...data,
        slug
      });
      
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.error?.message || 'Error updating program');
    } finally {
      setLoading(false);
    }
  };

  if (!program) {
    return (
      <div className="min-h-screen bg-slate-50" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
        `
      }}>
        <Header />
        <div className="max-w-4xl mx-auto py-16 px-4">
          <div className="text-center">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-12 max-w-sm mx-auto">
              <div className="animate-spin text-4xl mb-4">⚡</div>
              <p className="text-slate-600 font-medium">Loading program details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50" style={{
      backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
      `
    }}>
      <Header />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-white/30">
            <div className="flex items-center mb-2">
              <PencilIcon className="text-primary mr-3" size={32} />
              <h1 className="text-4xl font-bold text-primary drop-shadow-sm">Edit Program</h1>
            </div>
            <p className="text-slate-600 font-medium">Update the program details and settings</p>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-8">
          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-700 px-6 py-4 rounded-xl mb-6 shadow-lg shadow-red-100/50">
              <div className="flex items-center mb-2">
                <XCircleIcon className="text-red-600 mr-2" size={20} />
                <div className="font-semibold">Error</div>
              </div>
              <p>{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Program Name"
              name="name"
              register={register}
              errors={errors}
              required
            />
            
            <DateTimeInput
              label="Program Date & Time"
              name="date"
              control={control}
              errors={errors}
              required
            />
            
            <Input
              label="Venue"
              name="venue"
              register={register}
              errors={errors}
              required
            />
            
            <Textarea
              label="Description"
              name="description"
              register={register}
              errors={errors}
              required
              rows={6}
            />
            
            <div className="flex space-x-4 pt-4">
              <Button type="submit" disabled={loading} className="flex items-center">
                {loading ? (
                  <>
                    <BoltIcon className="mr-2" size={20} />
                    Updating...
                  </>
                ) : (
                  <>
                    <RocketIcon className="mr-2" size={20} />
                    Update Program
                  </>
                )}
              </Button>
              
              <Button 
                variant="secondary" 
                onClick={() => router.push('/dashboard')}
                className="flex items-center"
              >
                <ArrowLeftIcon className="mr-2" size={16} />
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function EditProgram({ params }: EditProgramProps) {
  return (
    <AdminWrapper>
      <EditProgramContent params={params} />
    </AdminWrapper>
  );
}