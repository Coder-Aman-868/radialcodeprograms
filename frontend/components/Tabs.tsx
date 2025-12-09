import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
}

const Tabs = ({ tabs, defaultTab }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  return (
    <div className="w-full">
      <div className="border-b border-slate-200/50 bg-slate-50/30 rounded-t-xl backdrop-blur-sm">
        <nav className="-mb-px flex space-x-2 p-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-6 rounded-lg font-semibold text-sm transition-all duration-300 backdrop-blur-sm ${
                activeTab === tab.id
                  ? 'bg-primary/90 text-white shadow-lg shadow-primary/20 transform -translate-y-0.5'
                  : 'text-slate-600 hover:text-primary hover:bg-white/60 hover:shadow-md transform hover:-translate-y-0.5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mt-8 p-2">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;