export interface Program {
  id: number;
  attributes: {
    name: string;
    date: string;
    venue: string;
    description: string;
    slug: string;
    certificateStatus: 'Not Ready' | 'Ready';
    createdAt: string;
    updatedAt: string;
    students?: {
      data: Student[];
    };
  };
}

export interface Student {
  id: number;
  attributes: {
    name: string;
    email: string;
    phone: string;
    college: string;
    course: string;
    submittedOn: string;
    certificateStatus: 'Not Generated' | 'Generated' | 'Downloaded';
    createdAt: string;
    updatedAt: string;
    program?: {
      data: Program;
    };
  };
}

export interface Certificate {
  id: number;
  attributes: {
    uniqueId: string;
    qrCode?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    student: {
      data: Student;
    };
    program: {
      data: Program;
    };
    pdfFile?: {
      data: {
        id: number;
        attributes: {
          url: string;
          name: string;
        };
      };
    };
  };
}

export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}