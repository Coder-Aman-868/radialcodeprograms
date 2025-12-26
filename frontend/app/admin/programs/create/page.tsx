'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input, Textarea, Button, DateTimeInput } from '@/components/Form';
import { createProgram } from '@/lib/api/admin';
import { ArrowLeftIcon, SaveIcon } from '@/components/Icons';
import Link from 'next/link';

interface ProgramForm {
  name: string;
  date: string;
  venue: string;
  description: string;
  certificateActive: boolean;
}

export default function CreateProgram() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { register, handleSubmit, control, formState: { errors } } = useForm<ProgramForm>();

  const onSubmit = async (data: ProgramForm) => {
    setLoading(true);

    try {
      await createProgram(data);
      router.push('/admin/programs');
    } catch (error) {
      alert('Failed to create program');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link
            href="/admin/programs"
            className="p-2 text-slate-600 hover:text-primary hover:bg-white/60 rounded-lg transition-colors"
          >
            <ArrowLeftIcon size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-primary drop-shadow-sm">Create New Program</h1>
            <p className="text-slate-600 font-medium">Add a new program to your catalog</p>
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
              {loading ? 'Creating...' : 'Create Program'}
            </Button>
            
            <Link
              href="/admin/programs"
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