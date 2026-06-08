import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Bot, User, FileText, Briefcase, GraduationCap } from 'lucide-react';

const SUGGESTIONS = [
  { icon: <FileText className="w-4 h-4" />, text: "Review my resume for backend roles" },
  { icon: <Briefcase className="w-4 h-4" />, text: "Mock interview for Amazon" },
  { icon: <GraduationCap className="w-4 h-4" />, text: "Learning path for System Design" }
];

const CareerCoach = () => {
  const [messages, setMessages] = useState<{id: number, sender: 'ai' | 'user', text: string}[]>([
    { id: 1, sender: 'ai', text: 'Hello! I am your AI Career Coach. Based on your profile, I see you are interested in Backend Development. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMsgId = Date.now();
    setMessages(prev => [...prev, { id: newMsgId, sender: 'user', text }]);
    setInput('');
    setIsTyping(true);

    try {
      // Mock LLM delay
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: Date.now() + 1,
          sender: 'ai', 
          text: `Based on your goal to become a Backend Engineer, I recommend focusing on System Design and advanced Node.js patterns. Should I generate a 4-week learning plan for you?` 
        }]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col max-w-5xl mx-auto">
      <div className="mb-6 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Bot className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-['Outfit'] text-white flex items-center gap-2">
            AI Career <span className="text-gradient">Coach</span>
          </h1>
          <p className="text-slate-400 mt-1 text-sm font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Online and ready to help
          </p>
        </div>
      </div>

      <Card className="flex-1 flex flex-col p-0 overflow-hidden border border-white/5 bg-[#0f172a]/80 backdrop-blur-xl relative">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative z-10">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user' 
                    ? 'bg-slate-800 border border-white/10' 
                    : 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30'
                }`}>
                  {msg.sender === 'user' ? <User className="w-5 h-5 text-slate-300" /> : <Bot className="w-5 h-5 text-blue-400" />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[75%] p-4 rounded-2xl ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-sm shadow-lg shadow-blue-900/20' 
                    : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-sm backdrop-blur-sm'
                }`}>
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-4 flex-row"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                <Bot className="w-5 h-5 text-blue-400" />
              </div>
              <div className="bg-white/5 p-4 rounded-2xl rounded-tl-sm border border-white/10 backdrop-blur-sm flex gap-1.5 items-center h-12">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} className="h-4" />
        </div>

        {/* Input Area */}
        <div className="p-4 sm:p-6 border-t border-white/5 bg-[#0f172a]/90 backdrop-blur-xl relative z-10">
          {messages.length === 1 && !isTyping && (
            <div className="flex flex-wrap gap-2 mb-4">
              {SUGGESTIONS.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(suggestion.text)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {suggestion.icon} {suggestion.text}
                </button>
              ))}
            </div>
          )}
          
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
            className="flex gap-3 items-end"
          >
            <div className="relative flex-1">
              <textarea
                rows={1}
                className="block w-full pl-4 pr-12 py-3.5 border border-white/10 rounded-xl leading-5 bg-white/5 text-slate-200 placeholder-slate-500 focus:outline-none focus:bg-white/10 focus:border-blue-500/50 transition-colors custom-scrollbar resize-none max-h-32 min-h-[52px]"
                placeholder="Ask your AI coach anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
              />
              <div className="absolute right-3 bottom-3 flex items-center pointer-events-none text-slate-500">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <Button 
              type="submit" 
              variant="primary" 
              disabled={!input.trim() || isTyping}
              className="h-[52px] w-[52px] p-0 flex items-center justify-center shrink-0 rounded-xl shadow-lg shadow-blue-500/20"
            >
              <Send className="w-5 h-5 ml-1" />
            </Button>
          </form>
          <p className="text-center text-xs text-slate-500 mt-3 font-medium">
            AI can make mistakes. Always verify important career advice.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default CareerCoach;
