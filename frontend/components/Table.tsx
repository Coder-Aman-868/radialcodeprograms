interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

const Table = ({ headers, children }: TableProps) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg shadow-slate-200/50">
      <table className="min-w-full bg-white/80 backdrop-blur-sm border border-slate-200/50">
        <thead>
          <tr className="bg-slate-50/80 backdrop-blur-sm border-b border-slate-200/50">
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider border-r border-slate-200/30 last:border-r-0 text-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white/60 backdrop-blur-sm divide-y divide-slate-200/30">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;