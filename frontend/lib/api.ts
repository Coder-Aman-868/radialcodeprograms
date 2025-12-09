import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const PUBLIC_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Add auth token to requests when available
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Create a public API instance with API token if available
const createPublicApi = () => {
  const publicApi = axios.create({
    baseURL: `${API_URL}/api`,
    timeout: 5000,
  });
  
  if (PUBLIC_API_TOKEN) {
    publicApi.defaults.headers.common['Authorization'] = `Bearer ${PUBLIC_API_TOKEN}`;
  }
  
  return publicApi;
};

export const auth = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/local', {
      identifier: email,
      password,
    });
    return response.data;
  },
  
  me: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
};

// Mock programs data for fallback when backend is not available
const mockPrograms = [
  {
    id: 1,
    attributes: {
      name: "Advanced React Development Workshop",
      date: "2024-12-15",
      venue: "Tech Hub, Downtown",
      description: "Learn advanced React patterns, hooks, and state management techniques in this comprehensive workshop.",
      slug: "advanced-react-workshop",
      certificateStatus: "Ready" as const,
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z"
    }
  },
  {
    id: 2,
    attributes: {
      name: "Full Stack JavaScript Bootcamp",
      date: "2024-12-20",
      venue: "Innovation Center",
      description: "Complete bootcamp covering Node.js, Express, React, and MongoDB for full-stack development.",
      slug: "fullstack-javascript-bootcamp",
      certificateStatus: "Not Ready" as const,
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z"
    }
  },
  {
    id: 3,
    attributes: {
      name: "Python Data Science Workshop",
      date: "2024-12-25",
      venue: "Data Lab, University Campus",
      description: "Hands-on workshop covering pandas, numpy, matplotlib, and machine learning basics with Python.",
      slug: "python-data-science-workshop",
      certificateStatus: "Ready" as const,
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z"
    }
  },
  {
    id: 4,
    attributes: {
      name: "Aman's Programming Workshop",
      date: "2024-12-30",
      venue: "Digital Learning Center",
      description: "Comprehensive programming workshop covering modern development practices and industry best practices.",
      slug: "aman",
      certificateStatus: "Ready" as const,
      createdAt: "2024-12-01T00:00:00.000Z",
      updatedAt: "2024-12-01T00:00:00.000Z"
    }
  }
];

export const programs = {
  getAll: async () => {
    try {
      const publicApi = createPublicApi();
      const response = await publicApi.get('/programs?populate=*');
      return response.data;
    } catch (error: any) {
      console.warn('Public API failed for getAll:', error.response?.status, error.message);
      try {
        const response = await api.get('/programs?populate=*');
        return response.data;
      } catch (authError) {
        console.warn('Backend not available, using mock data');
        return { data: mockPrograms };
      }
    }
  },
  
  getBySlug: async (slug: string) => {
    const isDev = process.env.NODE_ENV === 'development';
    if (isDev) console.log('getBySlug called with slug:', slug);
    
    // First try the backend APIs with public API token
    const publicApi = createPublicApi();
    
    try {
      if (isDev) console.log('Trying public API with token...');
      const response = await publicApi.get(`/programs?filters[slug][$eq]=${slug}&populate=*`);
      if (response.data && response.data.data && response.data.data.length > 0) {
        const program = response.data.data[0];
        if (isDev) console.log('Found program in public API:', program.attributes.name);
        return program;
      } else {
        if (isDev) console.log('No program found in backend for slug:', slug);
      }
    } catch (error: any) {
      if (isDev) console.warn('Public API failed:', error.response?.status, error.message);
      
      // If it's a 403 (forbidden), try with user auth token
      if (error.response?.status === 403) {
        if (isDev) console.log('Public API returned 403, trying with user auth...');
        try {
          const response = await api.get(`/programs?filters[slug][$eq]=${slug}&populate=*`);
          if (response.data && response.data.data && response.data.data.length > 0) {
            const program = response.data.data[0];
            if (isDev) console.log('Found program in auth API:', program.attributes.name);
            return program;
          }
        } catch (authError: any) {
          if (isDev) console.warn('Auth API also failed:', authError.response?.status, authError.message);
        }
      }
    }
    
    // If backend fails, check mock data as fallback
    const mockProgram = mockPrograms.find(p => p.attributes.slug === slug);
    if (isDev) {
      console.log('Available mock slugs:', mockPrograms.map(p => p.attributes.slug));
      console.log('Mock program found:', mockProgram ? 'Yes' : 'No');
    }
    
    if (mockProgram) {
      if (isDev) console.log('Returning mock program:', mockProgram.attributes.name);
      return mockProgram;
    }
    
    // Return null if program not found anywhere
    if (isDev) console.log('Program not found anywhere for slug:', slug);
    return null;
  },
  
  create: async (data: any) => {
    const response = await api.post('/programs', { data });
    return response.data;
  },
  
  update: async (id: number, data: any) => {
    const response = await api.put(`/programs/${id}`, { data });
    return response.data;
  },
  
  delete: async (id: number) => {
    const response = await api.delete(`/programs/${id}`);
    return response.data;
  },
};

// Mock students data for fallback
const mockStudents: any[] = [];

export const students = {
  getByProgram: async (programId: number) => {
    try {
      const response = await api.get(`/students?filters[program][id][$eq]=${programId}&populate=*`);
      return response.data;
    } catch (error) {
      console.warn('Backend not available for students, using mock data');
      return { data: mockStudents.filter(s => s.attributes.program?.data?.id === programId) };
    }
  },
  
  create: async (data: any) => {
    // Create a public API instance for student registration
    const publicApi = axios.create({
      baseURL: `${API_URL}/api`,
    });
    
    try {
      const response = await publicApi.post('/students', { data });
      return response.data;
    } catch (error) {
      try {
        // If public API fails, try with auth (for admin access)
        const response = await api.post('/students', { data });
        return response.data;
      } catch (authError) {
        // Fallback to mock storage
        console.warn('Backend not available, storing in mock data');
        const newStudent = {
          id: mockStudents.length + 1,
          attributes: {
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        };
        mockStudents.push(newStudent);
        return { data: newStudent };
      }
    }
  },
  
  delete: async (id: number) => {
    try {
      const response = await api.delete(`/students/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Backend not available for delete operation');
      const index = mockStudents.findIndex(s => s.id === id);
      if (index > -1) {
        mockStudents.splice(index, 1);
      }
      return { data: null };
    }
  },
  
  getByEmailAndProgram: async (email: string, programSlug: string) => {
    // Create a public API instance for certificate download
    const publicApi = axios.create({
      baseURL: `${API_URL}/api`,
    });
    
    try {
      const response = await publicApi.get(`/students?filters[email][$eq]=${email}&filters[program][slug][$eq]=${programSlug}&populate=*`);
      return response.data;
    } catch (error) {
      try {
        // If public API fails, try with auth (for admin access)
        const response = await api.get(`/students?filters[email][$eq]=${email}&filters[program][slug][$eq]=${programSlug}&populate=*`);
        return response.data;
      } catch (authError) {
        // Fallback to mock data
        console.warn('Backend not available, checking mock students');
        const matchingStudents = mockStudents.filter(s => 
          s.attributes.email === email && 
          s.attributes.program?.data?.attributes?.slug === programSlug
        );
        return { data: matchingStudents };
      }
    }
  },
};

// Mock certificates data for fallback
const mockCertificates: any[] = [];

export const certificates = {
  getByProgram: async (programId: number) => {
    // Create a public API instance for certificate access
    const publicApi = axios.create({
      baseURL: `${API_URL}/api`,
    });
    
    try {
      const response = await publicApi.get(`/certificates?filters[program][id][$eq]=${programId}&populate=*`);
      return response.data;
    } catch (error) {
      try {
        // If public API fails, try with auth (for admin access)
        const response = await api.get(`/certificates?filters[program][id][$eq]=${programId}&populate=*`);
        return response.data;
      } catch (authError) {
        // Fallback to mock data
        console.warn('Backend not available for certificates, using mock data');
        return { data: mockCertificates.filter(c => c.attributes.program?.data?.id === programId) };
      }
    }
  },
  
  create: async (data: any) => {
    try {
      const response = await api.post('/certificates', { data });
      return response.data;
    } catch (error) {
      console.warn('Backend not available for certificate creation');
      const newCertificate = {
        id: mockCertificates.length + 1,
        attributes: {
          ...data,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      };
      mockCertificates.push(newCertificate);
      return { data: newCertificate };
    }
  },
  
  update: async (id: number, data: any) => {
    try {
      const response = await api.put(`/certificates/${id}`, { data });
      return response.data;
    } catch (error) {
      console.warn('Backend not available for certificate update');
      const index = mockCertificates.findIndex(c => c.id === id);
      if (index > -1) {
        mockCertificates[index].attributes = { ...mockCertificates[index].attributes, ...data };
      }
      return { data: mockCertificates[index] || null };
    }
  },
};

export default api;