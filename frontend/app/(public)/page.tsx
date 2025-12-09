import Link from 'next/link';
import { RocketIcon, BookOpenIcon, SparklesIcon } from '@/components/Icons';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50" style={{
      backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
      `
    }}>
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-lg shadow-slate-200/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-primary drop-shadow-sm">Radial Code</h1>
            <Link
              href="/login"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Admin Login
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-12 max-w-4xl mx-auto">
            <RocketIcon className="mx-auto mb-6 text-primary" size={64} />
            <h1 className="text-5xl font-bold text-primary drop-shadow-sm mb-6">
              Welcome to Radial Code
            </h1>
            <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Your gateway to professional development programs and certifications.
              Explore our programs and register for upcoming events.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-8 text-center">
            <BookOpenIcon className="mx-auto mb-4 text-primary" size={48} />
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Browse Programs</h3>
            <p className="text-slate-600 mb-6">
              Discover our latest programs and workshops designed to enhance your skills and career prospects.
            </p>
            <div className="text-sm text-slate-500">
              Visit program-specific pages directly via their unique URLs
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-8 text-center">
            <SparklesIcon className="mx-auto mb-4 text-primary" size={48} />
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Get Certified</h3>
            <p className="text-slate-600 mb-6">
              Complete our programs and receive industry-recognized certificates to boost your professional profile.
            </p>
            <div className="text-sm text-slate-500">
              Download certificates after program completion
            </div>
          </div>
        </div>

        {/* Test Program Links */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-300/20 border border-white/20 p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Available Programs</h3>
          <div className="grid gap-4">
            <Link
              href="/program/advanced-react-workshop"
              className="block p-4 bg-primary/5 hover:bg-primary/10 rounded-lg border border-primary/20 transition-colors"
            >
              <h4 className="font-semibold text-primary">Advanced React Development Workshop</h4>
              <p className="text-sm text-slate-600">December 15, 2024 • Tech Hub, Downtown</p>
            </Link>
            <Link
              href="/program/fullstack-javascript-bootcamp"
              className="block p-4 bg-primary/5 hover:bg-primary/10 rounded-lg border border-primary/20 transition-colors"
            >
              <h4 className="font-semibold text-primary">Full Stack JavaScript Bootcamp</h4>
              <p className="text-sm text-slate-600">December 20, 2024 • Innovation Center</p>
            </Link>
            <Link
              href="/program/python-data-science-workshop"
              className="block p-4 bg-primary/5 hover:bg-primary/10 rounded-lg border border-primary/20 transition-colors"
            >
              <h4 className="font-semibold text-primary">Python Data Science Workshop</h4>
              <p className="text-sm text-slate-600">December 25, 2024 • Data Lab, University Campus</p>
            </Link>
            <Link
              href="/program/aman"
              className="block p-4 bg-primary/5 hover:bg-primary/10 rounded-lg border border-primary/20 transition-colors"
            >
              <h4 className="font-semibold text-primary">Aman's Programming Workshop</h4>
              <p className="text-sm text-slate-600">December 30, 2024 • Digital Learning Center</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}