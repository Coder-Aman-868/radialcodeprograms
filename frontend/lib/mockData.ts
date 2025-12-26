// Shared mock data store for all API routes
export interface Program {
  id: number;
  slug: string;
  name: string;
  date: string;
  venue: string;
  description: string;
  certificateActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Student {
  id: number;
  programId: number;
  name: string;
  email: string;
  phone: string;
  college: string;
  course: string;
  submittedOn: string;
  certificateStatus: string;
}

// Shared programs data - this will be modified by all routes
export let mockPrograms: Program[] = [
  {
    id: 1,
    slug: "advanced-react-workshop",
    name: "Advanced React Development Workshop",
    date: "2024-12-15",
    venue: "Tech Hub, Downtown",
    description: "Learn advanced React patterns, hooks, and state management techniques in this comprehensive workshop.",
    certificateActive: true,
    createdAt: "2024-12-01T00:00:00.000Z",
    updatedAt: "2024-12-01T00:00:00.000Z"
  },
  {
    id: 2,
    slug: "fullstack-javascript-bootcamp",
    name: "Full Stack JavaScript Bootcamp",
    date: "2024-12-20",
    venue: "Innovation Center",
    description: "Complete bootcamp covering Node.js, Express, React, and MongoDB for full-stack development.",
    certificateActive: false,
    createdAt: "2024-12-01T00:00:00.000Z",
    updatedAt: "2024-12-01T00:00:00.000Z"
  },
  {
    id: 3,
    slug: "python-data-science-workshop",
    name: "Python Data Science Workshop",
    date: "2024-12-25",
    venue: "Data Lab, University Campus",
    description: "Hands-on workshop covering pandas, numpy, matplotlib, and machine learning basics with Python.",
    certificateActive: true,
    createdAt: "2024-12-01T00:00:00.000Z",
    updatedAt: "2024-12-01T00:00:00.000Z"
  },
  {
    id: 4,
    slug: "aman",
    name: "Aman's Programming Workshop",
    date: "2024-12-30",
    venue: "Digital Learning Center",
    description: "Comprehensive programming workshop covering modern development practices and industry best practices.",
    certificateActive: true,
    createdAt: "2024-12-01T00:00:00.000Z",
    updatedAt: "2024-12-01T00:00:00.000Z"
  },
  {
    id: 5,
    slug: "web-development-fundamentals",
    name: "Web Development Fundamentals",
    date: "2025-01-05",
    venue: "Tech Academy",
    description: "Learn the basics of HTML, CSS, and JavaScript to build modern web applications.",
    certificateActive: true,
    createdAt: "2024-12-01T00:00:00.000Z",
    updatedAt: "2024-12-01T00:00:00.000Z"
  },
  {
    id: 6,
    slug: "mobile-app-development",
    name: "Mobile App Development with React Native",
    date: "2025-01-10",
    venue: "Mobile Dev Center",
    description: "Build cross-platform mobile applications using React Native and modern development tools.",
    certificateActive: true,
    createdAt: "2024-12-01T00:00:00.000Z",
    updatedAt: "2024-12-01T00:00:00.000Z"
  }
];

// Shared students data
export let mockStudents: Student[] = [
  {
    id: 1,
    programId: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-0123",
    college: "Tech University",
    course: "Computer Science",
    submittedOn: "2024-12-01T10:30:00.000Z",
    certificateStatus: "Generated"
  },
  {
    id: 2,
    programId: 1,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1-555-0124",
    college: "Digital College",
    course: "Software Engineering",
    submittedOn: "2024-12-02T14:15:00.000Z",
    certificateStatus: "Downloaded"
  },
  {
    id: 3,
    programId: 2,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1-555-0125",
    college: "Code Academy",
    course: "Web Development",
    submittedOn: "2024-12-03T09:45:00.000Z",
    certificateStatus: "Pending"
  },
  {
    id: 4,
    programId: 5,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1-555-0126",
    college: "Tech Institute",
    course: "Frontend Development",
    submittedOn: "2024-12-04T16:20:00.000Z",
    certificateStatus: "Generated"
  },
  {
    id: 5,
    programId: 6,
    name: "Alex Chen",
    email: "alex.chen@example.com",
    phone: "+1-555-0127",
    college: "Mobile University",
    course: "Mobile Development",
    submittedOn: "2024-12-05T11:30:00.000Z",
    certificateStatus: "Pending"
  }
];

// Helper functions
export function getNextProgramId(): number {
  if (mockPrograms.length === 0) {
    return 1;
  }
  return Math.max(...mockPrograms.map(p => p.id)) + 1;
}

export function getNextStudentId(): number {
  if (mockStudents.length === 0) {
    return 1;
  }
  return Math.max(...mockStudents.map(s => s.id)) + 1;
}

export function generateSlug(name: string): string {
  const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  
  // Check if slug already exists
  const existingSlugs = mockPrograms.map(p => p.slug);
  let uniqueSlug = baseSlug;
  let counter = 1;
  
  while (existingSlugs.includes(uniqueSlug)) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return uniqueSlug;
}