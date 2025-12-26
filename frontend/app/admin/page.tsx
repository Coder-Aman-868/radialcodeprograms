'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAdminPrograms } from '@/lib/api/admin';
import { BookOpenIcon, SparklesIcon, RocketIcon } from '@/components/Icons';

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

export default function AdminDashboard() {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPrograms = async () => {
            try {
                const data = await getAdminPrograms();
                setPrograms(data);
            } catch (error) {
                console.error('Failed to fetch programs:', error);
                // Set empty array on error so UI still renders
                setPrograms([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPrograms();
    }, []);

    const totalStudents = programs.length * 15; // Assume average 15 students per program

    if (loading) {
        return (
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-8 text-center">
                <p className="text-slate-600">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-8">
                <h1 className="text-3xl font-bold text-primary drop-shadow-sm mb-2">Admin Dashboard</h1>
                <p className="text-slate-600 font-medium">Manage your programs and students</p>
            </div>

            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-6">
                    <div className="flex items-center">
                        <BookOpenIcon className="text-primary mr-4" size={48} />
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800">{programs.length}</h3>
                            <p className="text-slate-600 font-medium">Total Programs</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-6">
                    <div className="flex items-center">
                        <SparklesIcon className="text-primary mr-4" size={48} />
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800">{totalStudents}</h3>
                            <p className="text-slate-600 font-medium">Total Students</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-6">
                    <div className="flex items-center">
                        <RocketIcon className="text-primary mr-4" size={48} />
                        <div>
                            <h3 className="text-2xl font-bold text-slate-800">{programs.filter(p => p.certificateActive).length}</h3>
                            <p className="text-slate-600 font-medium">Active Certificates</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Programs */}
            <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Recent Programs</h2>
                    <Link
                        href="/admin/programs"
                        className="bg-primary/90 text-white px-6 py-2 rounded-lg hover:bg-primary transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30 backdrop-blur-sm transform hover:-translate-y-0.5 font-medium"
                    >
                        View All Programs
                    </Link>
                </div>

                <div className="space-y-4">
                    {programs.slice(0, 5).map((program) => (
                        <div key={program.id} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-lg border border-slate-200/50">
                            <div>
                                <h3 className="font-semibold text-slate-800">{program.name}</h3>
                                <p className="text-sm text-slate-600">{new Date(program.date).toLocaleDateString()} • {program.venue}</p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${program.certificateActive
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {program.certificateActive ? 'Certificates Ready' : 'Certificates Pending'}
                                </span>
                                <Link
                                    href={`/admin/programs/${program.id}`}
                                    className="text-primary hover:text-primary/80 font-medium"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}