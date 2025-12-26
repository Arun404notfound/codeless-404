
import React, { useState, useEffect } from 'react';
import { Search, Terminal, Box, ChevronRight, Hash, Filter } from 'lucide-react';
import { Problem } from '../types';
import { problemService } from '../services/problemService';

interface MissionControlProps {
  onSelectProblem: (problem: Problem) => void;
}

const MissionControl: React.FC<MissionControlProps> = ({ onSelectProblem }) => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    problemService.getAllProblems().then(data => {
      setProblems(data);
      setLoading(false);
    });
  }, []);

  const filteredProblems = problems.filter(p => {
    const term = search.toLowerCase().replace(/\s+/g, '');
    const titleMatch = p.title.toLowerCase().replace(/\s+/g, '').includes(term);
    const idMatch = p.id.toString() === term || `#${p.id}` === term;
    return titleMatch || idMatch;
  });

  return (
    <div className="min-h-screen w-full bg-[#0D1117] flex flex-col items-center p-8 overflow-y-auto">
      <div className="w-full max-w-5xl">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-4 uppercase tracking-widest">
            <Terminal size={14} /> System Initialized
          </div>
          <h1 className="text-5xl font-extrabold tracking-tighter mb-4 text-[#E6EDF3]">
            MISSION <span className="text-blue-500">CONTROL</span>
          </h1>
          <p className="text-[#8B949E] text-lg max-w-xl mx-auto">
            Welcome back, Sir. Which logic module are we stress-testing in the Lab today?
          </p>
        </header>

        <div className="relative mb-12 group max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#484F58] group-focus-within:text-blue-400 transition-colors">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search by ID (#1) or Problem Title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#161B22] border-2 border-[#30363D] focus:border-blue-500/50 rounded-2xl py-4 pl-12 pr-4 text-lg focus:outline-none transition-all shadow-2xl"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
             <span className="text-[10px] font-bold bg-[#30363D] px-2 py-1 rounded text-[#8B949E]">CMD + K</span>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
             <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
             <span className="text-[#8B949E] font-mono uppercase text-xs tracking-widest">Scanning Databases...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProblems.map(p => (
              <button
                key={p.id}
                onClick={() => onSelectProblem(p)}
                className="group relative flex flex-col text-left bg-[#161B22] border border-[#30363D] hover:border-blue-500/40 rounded-2xl p-6 transition-all hover:translate-y-[-4px] shadow-lg overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Box size={80} />
                </div>
                
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2 text-blue-400 font-mono text-xs font-bold">
                    <Hash size={12} />
                    <span>{p.id.toString().padStart(3, '0')}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                    p.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
                    p.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 
                    'bg-red-500/10 text-red-500 border border-red-500/20'
                  }`}>
                    {p.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{p.title}</h3>
                <p className="text-sm text-[#8B949E] line-clamp-2 mb-6">
                  {p.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#484F58]">JAVASCRIPT ENABLED</span>
                  <div className="flex items-center gap-1 text-blue-400 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Initialize <ChevronRight size={14} />
                  </div>
                </div>
              </button>
            ))}
            {filteredProblems.length === 0 && (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-[#30363D] rounded-2xl">
                <p className="text-[#8B949E]">No missions found for "{search}". Try searching by ID.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MissionControl;
