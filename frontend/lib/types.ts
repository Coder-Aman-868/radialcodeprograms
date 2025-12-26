export interface Program {
  id: number;
  slug: string;
  name: string;
  date: string;
  venue: string;
  description: string;
  certificateActive: boolean;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  college: string;
  course: string;
  programId: number;
  submittedOn: string;
}

export interface CertificateStatus {
  certificateReady: boolean;
  downloadUrl: string | null;
}