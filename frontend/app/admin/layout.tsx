import AdminAuthWrapper from '@/components/AdminAuthWrapper';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50" style={{
      backgroundImage: `
        radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.1) 0%, transparent 50%)
      `
    }}>
      <AdminAuthWrapper>
        {children}
      </AdminAuthWrapper>
    </div>
  );
}