'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input, Textarea, Button, DateTimeInput } from '@/components/Form';
import { getProgram, updateProgram } from '@/lib/api/admin';
import { ArrowLeftIcon, SaveIcon } from '@/components/Icons';
import Link from 'next/link';

interface ProgramForm {
  name: string;
  date: string;
  venue: string;
  description: string;
  certificateActive: boolean;
}

interface EditProgramProps {
  params: Promise<{ id: string }>;
}

export default function EditProgram({ params }: EditProgramProps) {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [programId, setProgramId] = useState<string>('');
  const router = useRouter();

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<ProgramForm>();

  useEffect(() => {
    const loadProgram = async () => {
      const { id } = await params;
      setProgramId(id);
      
      try {
        const program = await getProgram(id);
        reset({
          name: program.name,
          date: program.date,
          venue: program.venue,
          description: program.description,
          certificateActive: program.certificateActive
        });
      } catch (error) {
        console.error('Failed to load program:', error);
        alert('Failed to load program details');
      } finally {
        setInitialLoading(false);
      }
    };

    loadProgram();
  }, [params, reset]);

  const onSubmit = async (data: ProgramForm) => {
    setLoading(true);

    try {
      await updateProgram(programId, data);
      router.push('/admin/programs');
    } catch (error) {
      alert('Failed to update program');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-8 text-center">
        <p className="text-slate-600">Loading program details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link
            href={`/admin/programs/${programId}`}
            className="p-2 text-slate-600 hover:text-primary hover:bg-white/60 rounded-lg transition-colors"
          >
            <ArrowLeftIcon size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-primary drop-shadow-sm">Edit Program</h1>
            <p className="text-slate-600 font-medium">Update program details</p>
          </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Program Name"
            name="name"
            register={register}
            errors={errors}
            required
            placeholder="e.g., Advanced React Development Workshop"
          />

          <DateTimeInput
            label="Date & Time"
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
            placeholder="Describe what participants will learn in this program..."
            rows={4}
          />

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="certificateActive"
              {...register('certificateActive')}
              className="w-4 h-4 text-primary bg-white/70 border-slate-300 rounded focus:ring-primary/30 focus:ring-2"
            />
            <label htmlFor="certificateActive" className="text-sm font-medium text-slate-700">
              Enable certificates for this program
            </label>
          </div>

          <div className="flex space-x-4 pt-6">
            <Button
              type="submit"
              disabled={loading}
              className="flex items-center"
            >
              <SaveIcon className="mr-2" size={16} />
              {loading ? 'Updating...' : 'Update Program'}
            </Button>
            
            <Link
              href={`/admin/programs/${programId}`}
              className="px-6 py-3 bg-slate-200/70 text-slate-700 rounded-lg hover:bg-slate-300/70 transition-colors font-medium"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}