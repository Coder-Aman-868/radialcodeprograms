'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import AdminWrapper from '@/components/AdminWrapper';
import Header from '@/components/Header';
import { Input, Textarea, Button, DateTimeInput } from '@/components/Form';
import { programs } from '@/lib/api';
import { SparklesIcon, RocketIcon, BoltIcon, ArrowLeftIcon, XCircleIcon } from '@/components/Icons';

interface ProgramForm {
  name: string;
  date: string;
  venue: string;
  description: string;
}

function CreateProgramContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const { register, handleSubmit, control, formState: { errors } } = useForm<ProgramForm>();

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const onSubmit = async (data: ProgramForm) => {
    setLoading(true);
    setError('');
    
    try {
      const slug = generateSlug(data.name);
      await programs.create({
        ...data,
        slug,
        certificateStatus: 'Not Ready'
      });
      
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.error?.message || 'Error creating program');
    } finally {
      setLoading(false);
    }
  };

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
              <SparklesIcon className="text-primary mr-3" size={32} />
              <h1 className="text-4xl font-bold text-primary drop-shadow-sm">Create New Program</h1>
            </div>
            <p className="text-slate-600 font-medium">Fill in the details to create a new program for student registrations</p>
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
              placeholder="e.g., Web Development Bootcamp"
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
              placeholder="e.g., Tech Hub, Downtown"
            />
            
            <Textarea
              label="Description"
              name="description"
              register={register}
              errors={errors}
              required
              placeholder="Describe the program objectives and content..."
              rows={6}
            />
            
            <div className="flex space-x-4 pt-4">
              <Button type="submit" disabled={loading} className="flex items-center">
                {loading ? (
                  <>
                    <BoltIcon className="mr-2" size={20} />
                    Creating...
                  </>
                ) : (
                  <>
                    <RocketIcon className="mr-2" size={20} />
                    Create Program
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

export default function CreateProgram() {
  return (
    <AdminWrapper>
      <CreateProgramContent />
    </AdminWrapper>
  );
}