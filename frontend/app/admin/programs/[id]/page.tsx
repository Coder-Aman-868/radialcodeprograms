'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getProgramStudents, deleteStudent, getProgram } from '@/lib/api/admin';
import { ArrowLeftIcon, PencilIcon, TrashIcon, ShareIcon } from '@/components/Icons';

interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  college: string;
  course: string;
  submittedOn: string;
  certificateStatus: string;
}

interface Program {
  id: number;
  slug: string;
  name: string;
}

interface ProgramDetailsProps {
  params: Promise<{ id: string }>;
}

export default function ProgramDetails({ params }: ProgramDetailsProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const [programId, setProgramId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const { id } = await params;
      setProgramId(id);
      fetchStudents(id);
      fetchProgram(id);
    };
    loadData();
  }, [params]);

  const fetchStudents = async (id: string) => {
    try {
      const data = await getProgramStudents(id);
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgram = async (id: string) => {
    try {
      const data = await getProgram(id);
      setProgram(data);
    } catch (error) {
      console.error('Failed to fetch program:', error);
    }
  };

  const handleShareLink = async () => {
    if (!program) return;
    
    const publicUrl = `${window.location.origin}/program/${program.slug}`;
    
    try {
      await navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = publicUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDeleteStudent = async (studentId: number, studentName: string) => {
    if (confirm(`Are you sure you want to delete student "${studentName}"?`)) {
      try {
        await deleteStudent(studentId.toString());
        setStudents(students.filter(s => s.id !== studentId));
      } catch (error) {
        alert('Failed to delete student');
      }
    }
  };

  if (loading) {
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
            href="/admin/programs"
            className="p-2 text-slate-600 hover:text-primary hover:bg-white/60 rounded-lg transition-colors"
          >
            <ArrowLeftIcon size={20} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-primary drop-shadow-sm">Program Details</h1>
            <p className="text-slate-600 font-medium">Manage students and certificates</p>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <Link
            href={`/admin/programs/edit/${programId}`}
            className="bg-primary/90 text-white px-6 py-2 rounded-lg hover:bg-primary transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30 backdrop-blur-sm transform hover:-translate-y-0.5 font-medium flex items-center"
          >
            <PencilIcon className="mr-2" size={16} />
            Edit Program
          </Link>
          <button
            onClick={handleShareLink}
            className="bg-primary/90 text-white px-6 py-2 rounded-lg hover:bg-primary transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30 backdrop-blur-sm transform hover:-translate-y-0.5 font-medium flex items-center"
           >
            <ShareIcon className="mr-2" size={16} />
            {copied ? 'Link Copied!' : 'Share Public Link'}
          </button>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Registered Students ({students.length})</h2>
        </div>

        {students.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 font-medium">No students registered yet</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/50 border-b border-slate-200/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Student Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">College</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Course</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Certificate Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-slate-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-semibold text-slate-800">{student.name}</h3>
                        <p className="text-sm text-slate-600">{student.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {student.email}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {student.college}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {student.course}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        student.certificateStatus === 'Downloaded' 
                          ? 'bg-green-100 text-green-700'
                          : student.certificateStatus === 'Generated'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {student.certificateStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteStudent(student.id, student.name)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Student"
                      >
                        <TrashIcon size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}