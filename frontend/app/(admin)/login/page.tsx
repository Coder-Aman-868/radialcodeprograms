'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input, Button } from '@/components/Form';
import { useAuth } from '@/lib/auth-context';
import { LockIcon, RocketIcon, BoltIcon, XCircleIcon } from '@/components/Icons';

interface LoginForm {
  email: string;
  password: string;
}

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError('');

    const result = await login(data.email, data.password);

    if (!result.success) {
      setError(result.error || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50" style={{
      backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
      `
    }}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-8 mb-8">
            <LockIcon className="mx-auto mb-4 text-primary" size={48} />
            <h2 className="text-3xl font-bold text-primary drop-shadow-sm mb-2">
              Radial Code Admin
            </h2>
            <p className="text-slate-600 font-medium">
              Sign in to your admin account
            </p>
          </div>
        </div>

        <form className="space-y-6 bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20" onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 text-red-700 px-6 py-4 rounded-xl shadow-lg shadow-red-100/50">
              <div className="flex items-center mb-2">
                <XCircleIcon className="text-red-600 mr-2" size={20} />
                <div className="font-semibold">Error</div>
              </div>
              <p>{error}</p>
            </div>
          )}

          <Input
            label="Email"
            name="email"
            type="email"
            register={register}
            errors={errors}
            required
            placeholder="admin@radialcode.com"
          />

          <Input
            label="Password"
            name="password"
            type="password"
            register={register}
            errors={errors}
            required
            placeholder="Enter your password"
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center"
          >
            {loading ? (
              <>
                <BoltIcon className="mr-2" size={20} />
                Signing in...
              </>
            ) : (
              <>
                <RocketIcon className="mr-2" size={20} />
                Sign In
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}