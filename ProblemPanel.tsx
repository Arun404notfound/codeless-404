
import React from 'react';
import { Problem } from '../types';
import { BookOpen, AlertCircle, Terminal } from 'lucide-react';

interface ProblemPanelProps {
  problem: Problem;
}

const ProblemPanel: React.FC<ProblemPanelProps> = ({ problem }) => {
  return (
    <div className="flex flex-col h-full bg-[#0D1117] border-r border-[#30363D] overflow-y-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-blue-600/20 p-2 rounded-lg text-blue-400">
          <BookOpen size={20} />
        </div>
        <h1 className="text-xl font-bold tracking-tight">{problem.title}</h1>
      </div>

      <div className="flex gap-2 mb-6">
        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
          problem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 
          problem.difficulty === 'Medium' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 
          'bg-red-500/10 text-red-500 border border-red-500/20'
        }`}>
          {problem.difficulty}
        </span>
        <span className="px-2 py-0.5 rounded text-xs font-semibold bg-[#161B22] text-[#8B949E] border border-[#30363D]">
          LeetCode #1
        </span>
      </div>

      <section className="mb-8">
        <h2 className="text-[#8B949E] text-xs font-bold uppercase tracking-wider mb-3">Description</h2>
        <div className="text-[15px] leading-relaxed whitespace-pre-line">
          {problem.description}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-[#8B949E] text-xs font-bold uppercase tracking-wider mb-4">Examples</h2>
        <div className="space-y-4">
          {problem.examples.map((ex, idx) => (
            <div key={idx} className="bg-[#161B22] rounded-lg border border-[#30363D] p-4 font-mono text-sm">
              <div className="mb-2">
                <span className="text-blue-400 font-bold">Input:</span> <span className="text-[#C9D1D9]">{ex.input}</span>
              </div>
              <div className="mb-2">
                <span className="text-emerald-400 font-bold">Output:</span> <span className="text-[#C9D1D9]">{ex.output}</span>
              </div>
              {ex.explanation && (
                <div>
                  <span className="text-purple-400 font-bold">Explanation:</span> <span className="text-[#8B949E]">{ex.explanation}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle size={16} className="text-orange-400" />
          <h2 className="text-[#8B949E] text-xs font-bold uppercase tracking-wider">Constraints</h2>
        </div>
        <ul className="list-disc list-inside space-y-1 text-sm text-[#8B949E]">
          {problem.constraints.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </section>
      
      <div className="mt-auto pt-6 border-t border-[#30363D] flex items-center justify-between text-xs text-[#484F58]">
        <div className="flex items-center gap-1">
          <Terminal size={14} />
          <span>Status: Analyzing</span>
        </div>
        <span>v3.0 Mark VII</span>
      </div>
    </div>
  );
};

export default ProblemPanel;
