'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Tabs from '@/components/Tabs';
import { Input, Button } from '@/components/Form';
import { students, certificates } from '@/lib/api';
import { Program, Certificate } from '@/lib/types';
import {
    DocumentIcon,
    CalendarIcon,
    MapPinIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    XCircleIcon
} from '@/components/Icons';

interface RegistrationForm {
    name: string;
    email: string;
    phone: string;
    college: string;
    course: string;
}

interface DownloadForm {
    email: string;
    phone: string;
}

interface ProgramClientProps {
    program: Program;
}

export default function ProgramClient({ program }: ProgramClientProps) {
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [downloadError, setDownloadError] = useState('');

    const { register: registerForm, handleSubmit: handleRegistrationSubmit, formState: { errors: registrationErrors } } = useForm<RegistrationForm>();
    const { register: registerDownload, handleSubmit: handleDownloadSubmit, formState: { errors: downloadErrors } } = useForm<DownloadForm>();

    const onRegistrationSubmit = async (data: RegistrationForm) => {
        try {
            await students.create({
                ...data,
                program: program.id,
                submittedOn: new Date().toISOString(),
                certificateStatus: 'Not Generated'
            });

            setRegistrationSuccess(true);
        } catch (error: any) {
            alert(error.response?.data?.error?.message || 'Error submitting registration');
        }
    };

    const onDownloadSubmit = async (data: DownloadForm) => {
        setDownloadError('');

        try {
            // Find student by email and program
            const studentResponse = await students.getByEmailAndProgram(data.email, program.attributes.slug);

            if (studentResponse.data.length === 0) {
                setDownloadError('No registration found with this email for this program.');
                return;
            }

            const student = studentResponse.data[0];

            // Verify phone number
            if (student.attributes.phone !== data.phone) {
                setDownloadError('Phone number does not match our records.');
                return;
            }

            // Get certificate for this student
            const certificatesResponse = await certificates.getByProgram(program.id);
            const studentCertificate = certificatesResponse.data.find((cert: Certificate) =>
                cert.attributes.student.data.id === student.id && cert.attributes.isActive
            );

            if (!studentCertificate) {
                setDownloadError('Certificate is not yet available for download. Please check back later.');
                return;
            }

            // Generate and download certificate
            const { generateCertificate } = await import('@/lib/certificate');
            const pdfBlob = await generateCertificate(
                student.attributes.name,
                program.attributes.name,
                program.attributes.date,
                program.attributes.venue,
                studentCertificate.attributes.uniqueId
            );

            const url = URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `certificate-${student.attributes.name}-${studentCertificate.attributes.uniqueId}.pdf`;
            a.click();
            URL.revokeObjectURL(url);

        } catch (error: any) {
            setDownloadError(error.response?.data?.error?.message || 'Error downloading certificate');
        }
    };

    const certificatesReady = program.attributes.certificateStatus === 'Ready';

    const tabs = [
        {
            id: 'register',
            label: 'Registration',
            content: (
                <div className="max-w-2xl mx-auto">
                    {registrationSuccess ? (
                        <div className="text-center py-12">
                            <div className="bg-emerald-50/80 backdrop-blur-sm border border-emerald-200/50 text-emerald-700 px-6 py-4 rounded-xl mb-6 shadow-lg shadow-emerald-100/50">
                                <div className="flex items-center justify-center mb-3">
                                    <CheckCircleIcon className="text-emerald-600 mr-2" size={24} />
                                    <div className="text-lg font-semibold">Registration Successful!</div>
                                </div>
                                <p>You will receive your certificate after the program completion.</p>
                            </div>
                            <Button onClick={() => setRegistrationSuccess(false)}>
                                Register Another Person
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleRegistrationSubmit(onRegistrationSubmit)} className="space-y-6">
                            <div className="text-center mb-10">
                                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-white/30">
                                    <h2 className="text-3xl font-bold text-primary mb-3 drop-shadow-sm">Register for {program.attributes.name}</h2>
                                    <div className="flex items-center justify-center space-x-4 text-slate-600 mb-4">
                                        <span className="bg-slate-100/70 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm flex items-center">
                                            <CalendarIcon className="mr-1" size={16} />
                                            {new Date(program.attributes.date).toLocaleDateString()}
                                        </span>
                                        <span className="bg-slate-100/70 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm flex items-center">
                                            <MapPinIcon className="mr-1" size={16} />
                                            {program.attributes.venue}
                                        </span>
                                    </div>
                                    <p className="text-slate-700 leading-relaxed">{program.attributes.description}</p>
                                </div>
                            </div>

                            <Input
                                label="Full Name"
                                name="name"
                                register={registerForm}
                                errors={registrationErrors}
                                required
                                placeholder="Enter your full name"
                            />

                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                register={registerForm}
                                errors={registrationErrors}
                                required
                                placeholder="your.email@example.com"
                            />

                            <Input
                                label="Phone Number"
                                name="phone"
                                register={registerForm}
                                errors={registrationErrors}
                                required
                                placeholder="+1 (555) 123-4567"
                            />

                            <Input
                                label="College/University"
                                name="college"
                                register={registerForm}
                                errors={registrationErrors}
                                required
                                placeholder="Your institution name"
                            />

                            <Input
                                label="Course/Major"
                                name="course"
                                register={registerForm}
                                errors={registrationErrors}
                                required
                                placeholder="e.g., Computer Science, Engineering"
                            />

                            <Button type="submit" className="w-full">
                                Register for Program
                            </Button>
                        </form>
                    )}
                </div>
            )
        },
        {
            id: 'certificate',
            label: 'Download Certificate',
            content: (
                <div className="max-w-lg mx-auto">
                    <div className="text-center mb-10">
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-white/30">
                            <div className="flex items-center justify-center mb-3">
                                <DocumentIcon className="text-primary mr-2" size={32} />
                                <h2 className="text-3xl font-bold text-primary drop-shadow-sm">Download Your Certificate</h2>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                Enter your email and phone number to download your certificate
                            </p>
                        </div>
                    </div>

                    {!certificatesReady ? (
                        <div className="bg-amber-50/80 backdrop-blur-sm border border-amber-200/50 text-amber-700 px-6 py-4 rounded-xl text-center shadow-lg shadow-amber-100/50">
                            <div className="flex items-center justify-center mb-3">
                                <ExclamationTriangleIcon className="text-amber-600 mr-2" size={24} />
                                <div className="text-lg font-semibold">Certificates Not Ready</div>
                            </div>
                            <p>Certificates are not yet available for this program. Please check back later.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleDownloadSubmit(onDownloadSubmit)} className="space-y-6">
                            {downloadError && (
                                <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-700 px-6 py-4 rounded-xl shadow-lg shadow-red-100/50">
                                    <div className="flex items-center mb-2">
                                        <XCircleIcon className="text-red-600 mr-2" size={20} />
                                        <div className="font-semibold">Error</div>
                                    </div>
                                    <p>{downloadError}</p>
                                </div>
                            )}

                            <Input
                                label="Email Address"
                                name="email"
                                type="email"
                                register={registerDownload}
                                errors={downloadErrors}
                                required
                                placeholder="The email you used to register"
                            />

                            <Input
                                label="Phone Number"
                                name="phone"
                                register={registerDownload}
                                errors={downloadErrors}
                                required
                                placeholder="The phone number you used to register"
                            />

                            <Button type="submit" className="w-full">
                                Download Certificate
                            </Button>
                        </form>
                    )}
                </div>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50" style={{
            backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
      `
        }}>
            <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-lg shadow-slate-200/20 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center py-6">
                        <h1 className="text-3xl font-bold text-primary drop-shadow-sm">Radial Code</h1>
                    </div>
                </div>
            </header>

            <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl shadow-slate-300/20 border border-white/20 p-8">
                    <Tabs tabs={tabs} />
                </div>
            </div>
        </div>
    );
}