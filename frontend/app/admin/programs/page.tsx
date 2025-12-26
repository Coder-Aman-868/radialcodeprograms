'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAdminPrograms, deleteProgram } from '@/lib/api/admin';
import { Button } from '@/components/Form';
import { PencilIcon, TrashIcon, EyeIcon } from '@/components/Icons';
import { useRouter } from 'next/navigation';

interface Program {
  id: number;
  name: string;
  date: string;
  venue: string;
  description: string;
  certificateActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminPrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const data = await getAdminPrograms();
      setPrograms(data);
    } catch (error) {
      console.error('Failed to fetch programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProgram(id.toString());
        setPrograms(programs.filter(p => p.id !== id));
      } catch (error) {
        alert('Failed to delete program');
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-8 text-center">
        <p className="text-slate-600">Loading programs...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-primary drop-shadow-sm mb-2">Programs</h1>
            <p className="text-slate-600 font-medium">Manage all your programs</p>
          </div>
          <Link
            href="/admin/programs/create"
            className="bg-primary/90 text-white px-6 py-3 rounded-lg hover:bg-primary transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30 backdrop-blur-sm transform hover:-translate-y-0.5 font-medium"
          >
            Create New Program
          </Link>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/50 border-b border-slate-200/50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Program Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Venue</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Certificates</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50">
              {programs.map((program) => (
                <tr onClick={() => router.push(`/admin/programs/${program.id}`)} key={program.id} className="hover:bg-slate-50/30 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div>
                      <h3 className="font-semibold text-slate-800">{program.name}</h3>
                      <p className="text-sm text-slate-600 truncate max-w-xs">{program.description}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {new Date(program.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {program.venue}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${program.certificateActive
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {program.certificateActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/programs/${program.id}`}
                        title="View Details"
                      >
                      </Link>
                      <button
                        onClick={() => handleDelete(program.id, program.name)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Program"
                      >
                        <TrashIcon size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}