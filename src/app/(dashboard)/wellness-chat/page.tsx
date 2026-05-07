'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Send, Loader2, MessageCircle } from 'lucide-react';

export default function WellnessChatPage() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your Wellness Advisor, powered by AI. I\'m here to listen, support, and provide guidance for your mental wellbeing. What\'s on your mind today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/wellness-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP ${response.status}: Failed to get response`);
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message || 'I understand. Tell me more.'
      }]);
    } catch (error: any) {
      console.error('Chat error:', error);
      const errorMessage = error.message || 'I encountered an issue. Please try again.';
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `⚠️ ${errorMessage}`
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <MessageCircle className="w-8 h-8 text-primary" />
          Wellness Advisor
        </h1>
        <p className="text-muted-foreground mt-2">Chat with your AI-powered wellness guide</p>
      </div>

      {/* Chat Container */}
      <Card className="glass border-white/10 flex flex-col h-[600px]">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-white/10 text-foreground rounded-bl-none'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm text-muted-foreground">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-white/10 p-4">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Share your thoughts..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-full bg-white/5 border border-white/10 focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              size="icon"
              className="rounded-full h-12 w-12"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </form>
        </div>
      </Card>

      {/* Info Card */}
      <Card className="glass border-white/10 p-4">
        <p className="text-sm text-muted-foreground">
          💡 <strong>Tip:</strong> The Wellness Advisor is here to listen and provide support. For urgent mental health concerns, please reach out to a professional or contact a mental health crisis line.
        </p>
      </Card>
    </div>
  );
}
