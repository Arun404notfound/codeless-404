
import React, { useState, useCallback } from 'react';
import ProblemPanel from './components/ProblemPanel';
import ChatPanel from './components/ChatPanel';
import CodePanel from './components/CodePanel';
import MissionControl from './components/MissionControl';
import { Message, Problem } from './types';
import { jarvisAI } from './services/geminiService';
import { ArrowLeft } from 'lucide-react';

const App: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [code, setCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleSelectProblem = useCallback((problem: Problem) => {
    setSelectedProblem(problem);
    setCode(problem.startingCode);
    setMessages([
      {
        role: 'model',
        content: `Protocol **${problem.title}** active. I've prepped the workspace. Don't make me regret picking an '${problem.difficulty}' one for you, Sir. Ready when you are.`,
        timestamp: new Date()
      }
    ]);
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!selectedProblem) return;
    const userMsg: Message = { role: 'user', content: text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const response = await jarvisAI.sendMessage(messages, text);
      const modelMsg: Message = { role: 'model', content: response, timestamp: new Date() };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  }, [messages, selectedProblem]);

  const handleEvaluate = useCallback(async () => {
    if (isEvaluating || !selectedProblem) return;
    setIsEvaluating(true);
    setIsTyping(true);
    
    const logMsg: Message = { 
      role: 'user', 
      content: `Analyze this logic for **${selectedProblem.title}**:\n\`\`\`javascript\n${code}\n\`\`\``, 
      timestamp: new Date() 
    };
    setMessages(prev => [...prev, logMsg]);

    try {
      const evaluation = await jarvisAI.evaluateLogic(selectedProblem.description, code);
      const jarvisFeedback: Message = { 
        role: 'model', 
        content: evaluation, 
        timestamp: new Date() 
      };
      setMessages(prev => [...prev, jarvisFeedback]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEvaluating(false);
      setIsTyping(false);
    }
  }, [code, isEvaluating, selectedProblem]);

  const handleReset = useCallback(() => {
    if (selectedProblem && window.confirm("Are you sure? JARVIS won't be happy about the wasted cycles.")) {
      setCode(selectedProblem.startingCode);
    }
  }, [selectedProblem]);

  if (!selectedProblem) {
    return <MissionControl onSelectProblem={handleSelectProblem} />;
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#0D1117] text-[#E6EDF3]">
      {/* Navigation / Back to Selection */}
      <button 
        onClick={() => setSelectedProblem(null)}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all group"
        title="Return to Mission Control"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      <div className="w-[28%] min-w-[320px]">
        <ProblemPanel problem={selectedProblem} />
      </div>

      <div className="flex-1 min-w-[400px]">
        <ChatPanel 
          messages={messages} 
          onSendMessage={handleSendMessage} 
          isTyping={isTyping} 
        />
      </div>

      <div className="w-[35%] min-w-[450px]">
        <CodePanel 
          code={code} 
          onCodeChange={setCode} 
          onEvaluate={handleEvaluate} 
          onReset={handleReset}
          isEvaluating={isEvaluating}
        />
      </div>
    </div>
  );
};

export default App;
