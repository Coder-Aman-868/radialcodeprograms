'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import AdminWrapper from '@/components/AdminWrapper';
import Header from '@/components/Header';
import Tabs from '@/components/Tabs';
import Table from '@/components/Table';
import { Button } from '@/components/Form';
import { programs, students, certificates } from '@/lib/api';
import { Program, Student, Certificate } from '@/lib/types';
import { generateCertificate, generateUniqueId } from '@/lib/certificate';

interface ProgramDetailProps {
  params: Promise<{ id: string }>;
}

function ProgramDetailContent({ params }: ProgramDetailProps) {
  const [program, setProgram] = useState<Program | null>(null);
  const [studentList, setStudentList] = useState<Student[]>([]);
  const [certificateList, setCertificateList] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    params.then(({ id }) => setId(id));
  }, [params]);

  const loadData = useCallback(async () => {
    if (!id) return;
    
    try {
      const [programResponse, studentsResponse, certificatesResponse] = await Promise.all([
        programs.getAll(),
        students.getByProgram(parseInt(id)),
        certificates.getByProgram(parseInt(id))
      ]);

      const foundProgram = programResponse.data.find((p: Program) => p.id === parseInt(id));
      setProgram(foundProgram);
      setStudentList(studentsResponse.data);
      setCertificateList(certificatesResponse.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id, loadData]);

  const handleDeleteStudent = async (studentId: number) => {
    if (confirm('Are you sure you want to delete this student?')) {
      try {
        await students.delete(studentId);
        loadData();
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Error deleting student');
      }
    }
  };

  const handleGenerateCertificate = async (student: Student) => {
    if (!program) return;

    try {
      const uniqueId = generateUniqueId();
      const pdfBlob = await generateCertificate(
        student.attributes.name,
        program.attributes.name,
        program.attributes.date,
        program.attributes.venue,
        uniqueId
      );

      // Create certificate record
      await certificates.create({
        student: student.id,
        program: program.id,
        uniqueId,
        isActive: false
      });

      // Download the PDF
      const url = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${student.attributes.name}-${uniqueId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);

      loadData();
    } catch (error) {
      console.error('Error generating certificate:', error);
      alert('Error generating certificate');
    }
  };

  const handleToggleCertificate = async (certificate: Certificate) => {
    try {
      await certificates.update(certificate.id, {
        isActive: !certificate.attributes.isActive
      });
      loadData();
    } catch (error) {
      console.error('Error updating certificate:', error);
      alert('Error updating certificate');
    }
  };

  const handleToggleProgramCertificates = async () => {
    if (!program) return;

    try {
      const newStatus = program.attributes.certificateStatus === 'Ready' ? 'Not Ready' : 'Ready';
      await programs.update(program.id, {
        certificateStatus: newStatus
      });
      loadData();
    } catch (error) {
      console.error('Error updating program certificate status:', error);
      alert('Error updating certificate status');
    }
  };

  const exportStudentsCSV = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'College', 'Course', 'Submitted On'],
      ...studentList.map(student => [
        student.attributes.name,
        student.attributes.email,
        student.attributes.phone,
        student.attributes.college,
        student.attributes.course,
        new Date(student.attributes.submittedOn).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `students-${program?.attributes.name}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading || !program) {
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
              <div className="animate-spin text-4xl mb-4">⚡</div>
              <p className="text-slate-600 font-medium">Loading program management...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: 'students',
      label: 'Student List',
      content: (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-primary">Registered Students ({studentList.length})</h3>
            <Button onClick={exportStudentsCSV}>Export CSV</Button>
          </div>

          {studentList.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No students registered yet.</p>
          ) : (
            <Table headers={['Name', 'Email', 'Phone', 'College', 'Course', 'Submitted On', 'Actions']}>
              {studentList.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.attributes.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.attributes.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.attributes.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.attributes.college}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.attributes.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(student.attributes.submittedOn).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <Button
                      variant="secondary"
                      className="text-xs"
                      onClick={() => handleGenerateCertificate(student)}
                    >
                      Generate Certificate
                    </Button>
                    <Button
                      variant="danger"
                      className="text-xs"
                      onClick={() => handleDeleteStudent(student.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </div>
      )
    },
    {
      id: 'certificates',
      label: 'Certificates',
      content: (
        <div>
          <h3 className="text-lg font-medium text-primary mb-4">Certificate Management</h3>

          {certificateList.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No certificates generated yet.</p>
          ) : (
            <Table headers={['Student', 'Certificate ID', 'Status', 'Generated On', 'Actions']}>
              {certificateList.map((certificate) => (
                <tr key={certificate.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {certificate.attributes.student.data.attributes.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                    {certificate.attributes.uniqueId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${certificate.attributes.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      {certificate.attributes.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(certificate.attributes.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button
                      variant={certificate.attributes.isActive ? 'danger' : 'primary'}
                      className="text-xs"
                      onClick={() => handleToggleCertificate(certificate)}
                    >
                      {certificate.attributes.isActive ? 'Deactivate' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </div>
      )
    },
    {
      id: 'settings',
      label: 'Settings',
      content: (
        <div>
          <h3 className="text-lg font-medium text-primary mb-4">Program Settings</h3>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Program Name</label>
                <p className="mt-1 text-sm text-gray-900">{program.attributes.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <p className="mt-1 text-sm text-gray-900">{new Date(program.attributes.date).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Venue</label>
                <p className="mt-1 text-sm text-gray-900">{program.attributes.venue}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Public URL</label>
                <p className="mt-1 text-sm text-primary font-mono">
                  /program/{program.attributes.slug}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <p className="mt-1 text-sm text-gray-900">{program.attributes.description}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Certificate Status</h4>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Current Status:
                  <span className={`ml-2 inline-flex px-3 py-1 text-xs font-bold rounded-full ${program.attributes.certificateStatus === 'Ready'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                    }`}>
                    {program.attributes.certificateStatus}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  {program.attributes.certificateStatus === 'Ready'
                    ? 'Students can download their certificates from the public portal.'
                    : 'Students will see "Certificates Not Ready" on the public portal.'
                  }
                </p>
              </div>
              <Button
                variant={program.attributes.certificateStatus === 'Ready' ? 'danger' : 'primary'}
                onClick={handleToggleProgramCertificates}
              >
                {program.attributes.certificateStatus === 'Ready' ? 'Disable Certificates' : 'Enable Certificates'}
              </Button>
            </div>
          </div>
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
      <Header />

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg shadow-slate-200/50 border border-white/30 flex-1 mr-6">
              <h1 className="text-4xl font-bold text-primary drop-shadow-sm mb-2">{program.attributes.name}</h1>
              <div className="flex items-center space-x-4 text-slate-600">
                <span className="bg-slate-100/70 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  📅 {new Date(program.attributes.date).toLocaleDateString()}
                </span>
                <span className="bg-slate-100/70 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  📍 {program.attributes.venue}
                </span>
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={() => router.push('/dashboard')}
            >
              ← Back to Dashboard
            </Button>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-8">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </div>
  );
}

export default function ProgramDetail({ params }: ProgramDetailProps) {
  return (
    <AdminWrapper>
      <ProgramDetailContent params={params} />
    </AdminWrapper>
  );
}