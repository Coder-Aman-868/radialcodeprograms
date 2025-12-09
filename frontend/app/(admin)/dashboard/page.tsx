'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminWrapper from '@/components/AdminWrapper';
import Header from '@/components/Header';
import Table from '@/components/Table';
import { Button } from '@/components/Form';
import { programs } from '@/lib/api';
import { Program } from '@/lib/types';
import { 
  SparklesIcon, 
  BookOpenIcon, 
  LoadingSpinner, 
  EyeIcon, 
  PencilIcon, 
  TrashIcon 
} from '@/components/Icons';

function AdminDashboardContent() {
  const [programList, setProgramList] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrograms();
  }, []);

  const loadPrograms = async () => {
    try {
      const response = await programs.getAll();
      setProgramList(response.data);
    } catch (error) {
      console.error('Error loading programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this program?')) {
      try {
        await programs.delete(id);
        loadPrograms();
      } catch (error) {
        console.error('Error deleting program:', error);
        alert('Error deleting program');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
        `
      }}>
        <Header />
        <div className="max-w-7xl mx-auto py-16 px-4">
          <div className="text-center">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-12 max-w-sm mx-auto">
              <LoadingSpinner className="mx-auto mb-4 text-primary" size={48} />
              <p className="text-slate-600 font-medium">Loading your dashboard...</p>
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
      
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary drop-shadow-sm mb-2">Admin Dashboard</h1>
            <p className="text-slate-600 font-medium">Manage your programs and track registrations</p>
          </div>
          <Link href="/programs/create">
            <Button className="shadow-xl flex items-center">
              <SparklesIcon className="mr-2" size={20} />
              Create New Program
            </Button>
          </Link>
        </div>

        {programList.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-12 max-w-md mx-auto">
              <BookOpenIcon className="mx-auto mb-4 text-slate-400" size={64} />
              <h3 className="text-xl font-bold text-slate-700 mb-3">No Programs Yet</h3>
              <p className="text-slate-600 mb-6">Create your first program to get started with student registrations.</p>
              <Link href="/programs/create">
                <Button className="flex items-center">
                  <SparklesIcon className="mr-2" size={20} />
                  Create Your First Program
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 overflow-hidden">
            <Table headers={['Program Name', 'Date', 'Venue', 'Registrations', 'Certificate Status', 'Actions']}>
              {programList.map((program) => (
                <tr key={program.id} className="hover:bg-white/60 transition-all duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-800">
                    {program.attributes.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                    {new Date(program.attributes.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                    {program.attributes.venue}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                    <span className="bg-slate-100/70 px-2 py-1 rounded-full text-xs font-bold">
                      {program.attributes.students?.data?.length || 0}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full backdrop-blur-sm ${
                      program.attributes.certificateStatus === 'Ready' 
                        ? 'bg-emerald-100/80 text-emerald-700 shadow-emerald-200/50' 
                        : 'bg-amber-100/80 text-amber-700 shadow-amber-200/50'
                    }`}>
                      {program.attributes.certificateStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 flex">
                    <Link href={`/programs/${program.id}`}>
                      <Button variant="secondary" className="text-xs px-3 py-1 flex items-center">
                        <EyeIcon className="mr-1" size={14} />
                        View
                      </Button>
                    </Link>
                    <Link href={`/programs/edit/${program.id}`}>
                      <Button variant="secondary" className="text-xs px-3 py-1 flex items-center">
                        <PencilIcon className="mr-1" size={14} />
                        Edit
                      </Button>
                    </Link>
                    <Button 
                      variant="danger" 
                      className="text-xs px-3 py-1 flex items-center"
                      onClick={() => handleDelete(program.id)}
                    >
                      <TrashIcon className="mr-1" size={14} />
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminWrapper>
      <AdminDashboardContent />
    </AdminWrapper>
  );
}