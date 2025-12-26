'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminHeader from '@/components/AdminHeader';
import { LoadingSpinner } from '@/components/Icons';

interface AdminAuthWrapperProps {
    children: React.ReactNode;
}

export default function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();
    const pathname = usePathname();
    
    useEffect(() => {
        // Check if user is authenticated by looking for the admin token cookie
        const checkAuth = () => {
            const cookies = document.cookie.split(';');
            const adminToken = cookies.find(cookie => cookie.trim().startsWith('admin-token='));

            if (adminToken && adminToken.split('=')[1]) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
                if (pathname !== '/admin/login') {
                    router.push('/admin/login');
                }
            }
        };

        checkAuth();
    }, [router, pathname]);

    // Show loading while checking authentication
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-12 text-center">
                    <LoadingSpinner className="mx-auto mb-4 text-primary" size={48} />
                    <p className="text-slate-600 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    // If not authenticated and not on login page, don't render anything (redirect will happen)
    if (!isAuthenticated && pathname !== '/admin/login') {
        return null;
    }

    // If authenticated, show with header
    if (isAuthenticated && pathname !== '/admin/login') {
        return (
            <>
                <AdminHeader />
                <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
            </>
        );
    }

    // For login page, just show children without header
    return <>{children}</>;
}