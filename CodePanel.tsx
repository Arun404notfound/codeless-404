
import React from 'react';
import { Play, RotateCcw, ShieldCheck, Code2 } from 'lucide-react';

interface CodePanelProps {
  code: string;
  onCodeChange: (code: string) => void;
  onEvaluate: () => void;
  onReset: () => void;
  isEvaluating: boolean;
}

const CodePanel: React.FC<CodePanelProps> = ({ code, onCodeChange, onEvaluate, onReset, isEvaluating }) => {
  return (
    <div className="flex flex-col h-full bg-[#0D1117]">
      <header className="p-4 border-b border-[#30363D] flex items-center justify-between glass">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-400 border border-emerald-500/20">
            <Code2 size={18} />
          </div>
          <h2 className="text-sm font-bold tracking-tight">THE FORGE</h2>
        </div>
        <div className="flex items-center gap-4 text-[11px] font-mono text-[#484F58]">
          <span>LANGUAGE: JAVASCRIPT</span>
        </div>
      </header>

      <div className="flex-1 relative font-mono text-sm bg-[#0D1117] overflow-hidden group">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#161B22] border-r border-[#30363D] flex flex-col items-center pt-4 text-[#484F58] select-none">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="h-6 flex items-center leading-6">{i + 1}</div>
          ))}
        </div>
        <textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          spellCheck={false}
          className="absolute inset-0 pl-16 pt-4 bg-transparent text-[#E6EDF3] resize-none focus:outline-none w-full h-full leading-6 caret-blue-500 whitespace-pre"
          placeholder="// Write your logic here..."
        />
      </div>

      <div className="p-4 border-t border-[#30363D] flex items-center gap-4 glass">
        <button
          onClick={onEvaluate}
          disabled={isEvaluating}
          className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-[0_4px_10px_rgba(37,99,235,0.2)] active:scale-[0.98]"
        >
          {isEvaluating ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <ShieldCheck size={18} />
          )}
          <span>Evaluate Logic</span>
        </button>
        <button
          onClick={onReset}
          className="bg-[#161B22] hover:bg-[#30363D] text-[#8B949E] font-bold py-2.5 px-4 border border-[#30363D] rounded-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <RotateCcw size={18} />
          <span>Reset</span>
        </button>
      </div>
    </div>
  );
};

export default CodePanel;
