const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 shadow-lg shadow-slate-200/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center py-6">
          <img src="/assets/images/svg/logo.svg" alt="Logo" className="h-12 w-auto" />
        </div>
      </div>
    </header>
  );
};

export default Header;