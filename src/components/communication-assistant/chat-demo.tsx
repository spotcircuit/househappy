'use client';

import { useState } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: Date;
}

export default function ChatAssistantDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm interested in getting my kitchen remodeled. Do you offer free estimates?",
      sender: 'user',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const suggestions = [
    "Thank you for your interest in our kitchen remodeling services! Yes, we offer free in-home estimates. Would you like to schedule one?",
    "We'd be happy to provide a free estimate for your kitchen remodel. Could you share some details about what you're looking to change?",
    "Thanks for reaching out! We do provide complimentary estimates for kitchen renovations. What's your timeline for the project?"
  ];

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);
    setShowSuggestions(false);
    
    // Simulate AI response after delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'll analyze this request and suggest some smart replies for the service provider...",
        sender: 'system',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      // Show suggestions after another delay
      setTimeout(() => {
        setShowSuggestions(true);
      }, 1000);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="flex flex-col h-[500px] border rounded-lg overflow-hidden bg-white">
      {/* Chat header */}
      <div className="bg-purple-600 text-white p-4">
        <h3 className="font-medium">AI Communication Assistant Demo</h3>
        <p className="text-sm text-purple-200">See how AI helps service providers respond efficiently</p>
      </div>
      
      {/* Messages area */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === 'system' 
                    ? 'bg-yellow-50 border border-yellow-200 text-yellow-800' 
                    : message.sender === 'user' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-white border border-gray-200'
                }`}
              >
                <div className="text-sm">{message.content}</div>
                <div className={`text-xs mt-1 ${
                  message.sender === 'system' 
                    ? 'text-yellow-600' 
                    : message.sender === 'user' 
                      ? 'text-purple-200' 
                      : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-200 p-3 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Smart reply suggestions */}
      {showSuggestions && (
        <div className="p-3 border-t border-gray-200 bg-purple-50">
          <p className="text-xs text-purple-700 mb-2">AI-generated smart replies:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(suggestion)}
                className="text-sm bg-white border border-purple-300 text-purple-700 px-3 py-2 rounded-md hover:bg-purple-100 transition text-left"
              >
                {suggestion.length > 70 ? suggestion.substring(0, 70) + '...' : suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Input area */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            rows={2}
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim()}
            className="px-4 py-2 bg-purple-600 text-white rounded-md self-end disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-purple-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
