module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "auth",
    ()=>auth,
    "certificates",
    ()=>certificates,
    "default",
    ()=>__TURBOPACK__default__export__,
    "programs",
    ()=>programs,
    "students",
    ()=>students
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)");
;
;
const API_URL = ("TURBOPACK compile-time value", "http://localhost:1337") || 'http://localhost:1337';
const PUBLIC_API_TOKEN = ("TURBOPACK compile-time value", "4e95641adcf04a4e3187249e0315a2c1666eaf0ef681b1c541052293bfb3224024fcf85ebfe4327c64ef44eb67f8868a638f454679cd59eb2e58e99ff283e810b116a42f72d701719865c3ca8c65d724fcbfd65b077179264d514a5c16686fadc0b9c5af2a709dc7f95133731254738ecfff4fc928aa6fb6203fa0b767e34b67");
const api = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: `${API_URL}/api`
});
// Add auth token to requests when available
api.interceptors.request.use((config)=>{
    const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// Create a public API instance with API token if available
const createPublicApi = ()=>{
    const publicApi = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
        baseURL: `${API_URL}/api`,
        timeout: 5000
    });
    if ("TURBOPACK compile-time truthy", 1) {
        publicApi.defaults.headers.common['Authorization'] = `Bearer ${PUBLIC_API_TOKEN}`;
    }
    return publicApi;
};
const auth = {
    login: async (email, password)=>{
        const response = await api.post('/auth/local', {
            identifier: email,
            password
        });
        return response.data;
    },
    me: async ()=>{
        const response = await api.get('/users/me');
        return response.data;
    }
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
            certificateStatus: "Ready",
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
            certificateStatus: "Not Ready",
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
            certificateStatus: "Ready",
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
            certificateStatus: "Ready",
            createdAt: "2024-12-01T00:00:00.000Z",
            updatedAt: "2024-12-01T00:00:00.000Z"
        }
    }
];
const programs = {
    getAll: async ()=>{
        try {
            const publicApi = createPublicApi();
            const response = await publicApi.get('/programs?populate=*');
            return response.data;
        } catch (error) {
            console.warn('Public API failed for getAll:', error.response?.status, error.message);
            try {
                const response = await api.get('/programs?populate=*');
                return response.data;
            } catch (authError) {
                console.warn('Backend not available, using mock data');
                return {
                    data: mockPrograms
                };
            }
        }
    },
    getBySlug: async (slug)=>{
        const isDev = ("TURBOPACK compile-time value", "development") === 'development';
        if ("TURBOPACK compile-time truthy", 1) console.log('getBySlug called with slug:', slug);
        // First try the backend APIs with public API token
        const publicApi = createPublicApi();
        try {
            if ("TURBOPACK compile-time truthy", 1) console.log('Trying public API with token...');
            const response = await publicApi.get(`/programs?filters[slug][$eq]=${slug}&populate=*`);
            if (response.data && response.data.data && response.data.data.length > 0) {
                const program = response.data.data[0];
                if ("TURBOPACK compile-time truthy", 1) console.log('Found program in public API:', program.attributes.name);
                return program;
            } else {
                if ("TURBOPACK compile-time truthy", 1) console.log('No program found in backend for slug:', slug);
            }
        } catch (error) {
            if ("TURBOPACK compile-time truthy", 1) console.warn('Public API failed:', error.response?.status, error.message);
            // If it's a 403 (forbidden), try with user auth token
            if (error.response?.status === 403) {
                if ("TURBOPACK compile-time truthy", 1) console.log('Public API returned 403, trying with user auth...');
                try {
                    const response = await api.get(`/programs?filters[slug][$eq]=${slug}&populate=*`);
                    if (response.data && response.data.data && response.data.data.length > 0) {
                        const program = response.data.data[0];
                        if ("TURBOPACK compile-time truthy", 1) console.log('Found program in auth API:', program.attributes.name);
                        return program;
                    }
                } catch (authError) {
                    if ("TURBOPACK compile-time truthy", 1) console.warn('Auth API also failed:', authError.response?.status, authError.message);
                }
            }
        }
        // If backend fails, check mock data as fallback
        const mockProgram = mockPrograms.find((p)=>p.attributes.slug === slug);
        if ("TURBOPACK compile-time truthy", 1) {
            console.log('Available mock slugs:', mockPrograms.map((p)=>p.attributes.slug));
            console.log('Mock program found:', mockProgram ? 'Yes' : 'No');
        }
        if (mockProgram) {
            if ("TURBOPACK compile-time truthy", 1) console.log('Returning mock program:', mockProgram.attributes.name);
            return mockProgram;
        }
        // Return null if program not found anywhere
        if ("TURBOPACK compile-time truthy", 1) console.log('Program not found anywhere for slug:', slug);
        return null;
    },
    create: async (data)=>{
        const response = await api.post('/programs', {
            data
        });
        return response.data;
    },
    update: async (id, data)=>{
        const response = await api.put(`/programs/${id}`, {
            data
        });
        return response.data;
    },
    delete: async (id)=>{
        const response = await api.delete(`/programs/${id}`);
        return response.data;
    }
};
// Mock students data for fallback
const mockStudents = [];
const students = {
    getByProgram: async (programId)=>{
        try {
            const response = await api.get(`/students?filters[program][id][$eq]=${programId}&populate=*`);
            return response.data;
        } catch (error) {
            console.warn('Backend not available for students, using mock data');
            return {
                data: mockStudents.filter((s)=>s.attributes.program?.data?.id === programId)
            };
        }
    },
    create: async (data)=>{
        // Create a public API instance for student registration
        const publicApi = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
            baseURL: `${API_URL}/api`
        });
        try {
            const response = await publicApi.post('/students', {
                data
            });
            return response.data;
        } catch (error) {
            try {
                // If public API fails, try with auth (for admin access)
                const response = await api.post('/students', {
                    data
                });
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
                return {
                    data: newStudent
                };
            }
        }
    },
    delete: async (id)=>{
        try {
            const response = await api.delete(`/students/${id}`);
            return response.data;
        } catch (error) {
            console.warn('Backend not available for delete operation');
            const index = mockStudents.findIndex((s)=>s.id === id);
            if (index > -1) {
                mockStudents.splice(index, 1);
            }
            return {
                data: null
            };
        }
    },
    getByEmailAndProgram: async (email, programSlug)=>{
        // Create a public API instance for certificate download
        const publicApi = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
            baseURL: `${API_URL}/api`
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
                const matchingStudents = mockStudents.filter((s)=>s.attributes.email === email && s.attributes.program?.data?.attributes?.slug === programSlug);
                return {
                    data: matchingStudents
                };
            }
        }
    }
};
// Mock certificates data for fallback
const mockCertificates = [];
const certificates = {
    getByProgram: async (programId)=>{
        // Create a public API instance for certificate access
        const publicApi = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
            baseURL: `${API_URL}/api`
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
                return {
                    data: mockCertificates.filter((c)=>c.attributes.program?.data?.id === programId)
                };
            }
        }
    },
    create: async (data)=>{
        try {
            const response = await api.post('/certificates', {
                data
            });
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
            return {
                data: newCertificate
            };
        }
    },
    update: async (id, data)=>{
        try {
            const response = await api.put(`/certificates/${id}`, {
                data
            });
            return response.data;
        } catch (error) {
            console.warn('Backend not available for certificate update');
            const index = mockCertificates.findIndex((c)=>c.id === id);
            if (index > -1) {
                mockCertificates[index].attributes = {
                    ...mockCertificates[index].attributes,
                    ...data
                };
            }
            return {
                data: mockCertificates[index] || null
            };
        }
    }
};
const __TURBOPACK__default__export__ = api;
}),
"[project]/lib/auth-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/js-cookie/dist/js.cookie.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const token = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].get('token');
        if (token) {
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"].me().then(setUser).catch(()=>{
                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove('token');
            }).finally(()=>setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);
    const login = async (email, password)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["auth"].login(email, password);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].set('token', response.jwt);
            setUser(response.user);
            router.push('/dashboard');
            return {
                success: true
            };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.error?.message || 'Login failed'
            };
        }
    };
    const logout = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].remove('token');
        setUser(null);
        router.push('/login');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            loading,
            login,
            logout
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/auth-context.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e3804593._.js.map