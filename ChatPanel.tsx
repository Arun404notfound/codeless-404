
import React, { useState, useRef, useEffect } from 'react';
import { Message } from '../types';
import { Send, Zap, Cpu, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  isTyping: boolean;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSendMessage, isTyping }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-[#0D1117] border-r border-[#30363D]">
      <header className="p-4 border-b border-[#30363D] flex items-center justify-between glass sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]">
            <Cpu size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tight">JARVIS</h2>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-[#8B949E] uppercase tracking-widest font-bold">Online</span>
            </div>
          </div>
        </div>
        <Zap size={18} className="text-orange-400" />
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                msg.role === 'user' ? 'bg-[#30363D] text-[#C9D1D9]' : 'bg-indigo-950 text-indigo-400 border border-indigo-500/30'
              }`}>
                {msg.role === 'user' ? <User size={16} /> : <Cpu size={16} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-[#161B22] border border-[#30363D] text-[#E6EDF3] rounded-tr-none' 
                  : 'bg-indigo-900/10 border border-indigo-500/20 text-[#E6EDF3] rounded-tl-none prose prose-invert prose-sm max-w-none'
              }`}>
                {msg.role === 'user' ? (
                  <p>{msg.content}</p>
                ) : (
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                )}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="flex gap-3 max-w-[85%]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-500/30 flex items-center justify-center">
                <Cpu size={16} />
              </div>
              <div className="bg-indigo-900/10 border border-indigo-500/20 p-4 rounded-2xl rounded-tl-none">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-[#30363D] bg-[#0D1117]">
        <form onSubmit={handleSubmit} className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder="Ask JARVIS for a hint..."
            className="w-full bg-[#161B22] border border-[#30363D] rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all placeholder-[#484F58]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1.5 p-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
        <p className="text-[10px] text-center mt-3 text-[#484F58]">
          JARVIS is an AI. Always double-check logic.
        </p>
      </div>
    </div>
  );
};

export default ChatPanel;
