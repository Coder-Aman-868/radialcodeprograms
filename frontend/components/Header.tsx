import { useAuth } from '@/lib/auth-context';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-lg shadow-slate-200/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary drop-shadow-sm">Radial Code</h1>
            <span className="ml-4 text-slate-600 font-medium bg-slate-100/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm">Admin Portal</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-slate-700 font-medium bg-white/60 px-4 py-2 rounded-lg backdrop-blur-sm shadow-sm">
              Welcome, {user?.username || user?.email}
            </span>
            <button
              onClick={logout}
              className="bg-primary/90 text-white px-6 py-2 rounded-lg hover:bg-primary transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-primary/30 backdrop-blur-sm transform hover:-translate-y-0.5 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;