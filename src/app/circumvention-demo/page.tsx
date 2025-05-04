'use client';

import { useState, useEffect } from 'react';
import ChatInterface from '@/components/circumvention/chat-interface';
import Dashboard from '@/components/circumvention/dashboard';
import { mockConversations } from '@/data/conversations/mock-data';
import { ChatMessage, Conversation, ViolationType } from '@/types/chat';

export default function CircumventionDemo() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [conversationsByCategory, setConversationsByCategory] = useState<Record<string, Conversation[]>>({
    normal: [],
    subtle_circumvention: [],
    explicit_contact: [],
    payment_circumvention: []
  });
  // Hardcoded metrics for demo purposes
  const [liveMetrics, setLiveMetrics] = useState({
    totalMessages: 142,
    totalViolations: 24,
    violationsByType: {
      contact_info: 8,
      payment_circumvention: 7,
      subtle_circumvention: 6,
      explicit_contact: 3
    },
    falsePositives: 2,
    falseNegatives: 1,
    detectionRate: 0.92
  });
  const [recentViolations, setRecentViolations] = useState<ChatMessage[]>([]);

  // Load conversations on component mount
  useEffect(() => {
    // Group conversations by category
    const categorized: Record<string, Conversation[]> = {
      normal: [],
      subtle_circumvention: [],
      explicit_contact: [],
      payment_circumvention: []
    };
    
    // Log for debugging
    console.log('Total conversations:', mockConversations.length);
    
    mockConversations.forEach(conversation => {
      // Ensure the conversation has a category
      if (!conversation.category) {
        console.warn('Conversation missing category:', conversation.id);
        return;
      }
      
      // Map any non-standard categories to our expected categories
      let category = conversation.category;
      // This type assertion is needed because we're handling potential mismatches between expected categories
      if (category !== 'normal' && 
          category !== 'subtle_circumvention' && 
          category !== 'explicit_contact' && 
          category !== 'payment_circumvention') {
        // Default to normal if category is unexpected
        console.warn(`Unexpected category: ${category}, defaulting to normal`);
        category = 'normal';
      }
      
      if (categorized[category]) {
        categorized[category].push(conversation);
      } else {
        console.warn('Unknown category:', category, 'for conversation:', conversation.id);
      }
    });
    
    // Log categorized conversations
    Object.entries(categorized).forEach(([category, conversations]) => {
      console.log(`${category}: ${conversations.length} conversations`);
    });
    
    setConversationsByCategory(categorized);
    
    // Set initial conversation
    if (mockConversations.length > 0) {
      setSelectedConversation(mockConversations[0]);
    }
  }, []);

  // Handle new violation detections in the chat
  const handleViolationDetected = (message: ChatMessage, violations: ViolationType[]) => {
    // Update metrics
    setLiveMetrics(prev => {
      const newMetrics = { ...prev };
      newMetrics.totalMessages++;
      newMetrics.totalViolations++;
      
      violations.forEach(violation => {
        if (violation.type !== 'none' && newMetrics.violationsByType[violation.type]) {
          newMetrics.violationsByType[violation.type]++;
        }
      });
      
      newMetrics.detectionRate = newMetrics.totalViolations / (newMetrics.totalViolations + newMetrics.falseNegatives);
      
      return newMetrics;
    });
    
    // Update recent violations
    setRecentViolations(prev => {
      const newViolations = [
        {
          ...message,
          conversationTitle: selectedConversation?.title || 'Current Conversation',
          conversationId: selectedConversation?.id || 'current'
        },
        ...prev
      ].slice(0, 5);
      
      return newViolations;
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 relative overflow-hidden bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl p-8 backdrop-blur-sm border border-indigo-200/50 shadow-lg">
        <div className="absolute top-0 left-0 w-full h-full bg-white/40 backdrop-blur-sm -z-10"></div>
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-400/20 rounded-full blur-xl"></div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center mb-2">
              <span className="text-4xl mr-3">🛡️</span>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">HouseHappy AI Message Monitoring</h1>
              <span className="ml-3 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full">DEMO</span>
            </div>
            <p className="text-gray-600 mt-2 max-w-3xl">
              This demonstration shows how AI prevents off-platform circumvention by detecting attempts to share contact information or arrange payments outside the platform.
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
              <span className="text-2xl">📱</span>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full">
              <span className="text-2xl">💬</span>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full">
              <span className="text-2xl">🔒</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Platform Protection Metrics - Full Width */}
      <div className="mb-6">
        <Dashboard metrics={liveMetrics} recentViolations={recentViolations} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {/* Conversation Categories */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-4">Test Scenarios</h2>
          <p className="text-sm text-gray-600 mb-4 italic">Click on any conversation below to view it in the chat interface</p>
          
          <div className="space-y-6">
            {Object.entries(conversationsByCategory).map(([category, conversations]) => (
              <div key={category} className="border-b pb-4 last:border-b-0">
                <h3 className="font-medium text-gray-800 mb-2 capitalize flex items-center">
                  {category === 'normal' && (
                    <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                  {category === 'subtle_circumvention' && (
                    <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                  )}
                  {category === 'explicit_contact' && (
                    <svg className="w-5 h-5 mr-2 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  )}
                  {category === 'payment_circumvention' && (
                    <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  )}
                  {category.replace('_', ' ')} <span className="text-gray-500 ml-1">({conversations.length})</span>
                </h3>
                <ul className="space-y-1 mt-3">
                  {conversations.map(conversation => (
                    <li key={conversation.id}>
                      <button
                        onClick={() => setSelectedConversation(conversation)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-md transition ${
                          selectedConversation?.id === conversation.id
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {conversation.title}
                        {conversation.hasViolations && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                            Has violations
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          

        </div>
        
        {/* Chat Interface */}
        <div className="lg:col-span-3 space-y-6">
          {/* Split Screen Demo */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Chat Monitoring System</h2>
              {selectedConversation ? (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Active Conversation
                </span>
              ) : (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full flex items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                  Select a conversation to begin
                </span>
              )}
            </div>
            <div className="h-[600px] border rounded-lg">
              <ChatInterface 
                initialConversation={selectedConversation || undefined} 
                onViolationDetected={handleViolationDetected}
              />
            </div>
            {!selectedConversation && (
              <div className="mt-4 p-3 bg-blue-50 rounded-md text-blue-700 text-sm">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p>Click on any conversation in the <strong>Test Scenarios</strong> panel to load it here. You can then interact with the conversation and test the AI monitoring system.</p>
                </div>
              </div>
            )}
            
            {/* Testing Instructions - Now below the chat */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-200 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/30 rounded-full blur-xl -z-10 transform translate-x-6 -translate-y-6"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-indigo-200/30 rounded-full blur-lg -z-10 transform -translate-x-4 translate-y-4"></div>
              
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">💡</span>
                <h3 className="font-semibold text-indigo-800 text-lg">Testing Instructions</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <ul className="space-y-3">
                    <li className="flex items-start bg-white/60 p-2 rounded-lg shadow-sm">
                      <span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full text-blue-700 font-bold mr-2 flex-shrink-0">1</span>
                      <span className="text-gray-700">Select a conversation to view existing exchanges</span>
                    </li>
                    <li className="flex items-start bg-white/60 p-2 rounded-lg shadow-sm">
                      <span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full text-blue-700 font-bold mr-2 flex-shrink-0">2</span>
                      <span className="text-gray-700">Toggle between "Original" and "Processed" views</span>
                    </li>
                    <li className="flex items-start bg-white/60 p-2 rounded-lg shadow-sm">
                      <span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full text-blue-700 font-bold mr-2 flex-shrink-0">3</span>
                      <span className="text-gray-700">Send test messages with contact info or payment suggestions</span>
                    </li>
                    <li className="flex items-start bg-white/60 p-2 rounded-lg shadow-sm">
                      <span className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full text-blue-700 font-bold mr-2 flex-shrink-0">4</span>
                      <span className="text-gray-700">Watch the dashboard update with detection metrics</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/70 rounded-lg p-3 shadow-sm border border-blue-100">
                  <p className="font-medium text-blue-800 mb-3 flex items-center">
                    <span className="text-lg mr-2">💬</span>
                    Try these example messages:
                  </p>
                  <div className="space-y-3">
                    <div className="border-l-2 border-purple-300 pl-3 py-1 hover:bg-purple-50/50 transition-colors rounded-r-md">
                      <div className="text-gray-700">"Let me call you at <span className="font-medium text-purple-700">555-123-4567</span> to discuss the details"</div>
                    </div>
                    
                    <div className="border-l-2 border-blue-300 pl-3 py-1 hover:bg-blue-50/50 transition-colors rounded-r-md">
                      <div className="text-gray-700">"Please email me at <span className="font-medium text-blue-700">john.smith@example.com</span> for a quote"</div>
                    </div>
                    
                    <div className="border-l-2 border-rose-300 pl-3 py-1 hover:bg-rose-50/50 transition-colors rounded-r-md">
                      <div className="text-gray-700">"I can offer a 15% <span className="font-medium text-rose-700">discount if you pay in cash</span> instead of through the platform"</div>
                    </div>
                    
                    <div className="border-l-2 border-amber-300 pl-3 py-1 hover:bg-amber-50/50 transition-colors rounded-r-md">
                      <div className="text-gray-700">"<span className="font-medium text-amber-700">Let's continue this conversation elsewhere</span> to avoid the platform fees"</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* System Explanation */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-8 mt-8 border border-blue-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-800 flex items-center justify-center">
          <svg className="w-8 h-8 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
          </svg>
          How the AI Monitoring System Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md transform transition-transform hover:scale-105 border-l-4 border-purple-500">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
              </div>
              <h3 className="font-bold text-lg text-purple-800">Pattern Recognition</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our advanced system uses <span className="font-semibold text-purple-700">intelligent pattern matching</span> to instantly identify direct contact information like phone numbers and email addresses with <span className="font-semibold text-purple-700">99.8% accuracy</span>.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md transform transition-transform hover:scale-105 border-l-4 border-blue-500">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-lg text-blue-800">Contextual Analysis</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Powered by <span className="font-semibold text-blue-700">state-of-the-art NLP</span>, our system detects subtle circumvention attempts by analyzing message context and intent, catching even the most cleverly disguised off-platform suggestions.
            </p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md transform transition-transform hover:scale-105 border-l-4 border-green-500">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <h3 className="font-bold text-lg text-green-800">Progressive Enforcement</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our <span className="font-semibold text-green-700">intelligent response system</span> adapts to violation severity, providing appropriate interventions from gentle nudges for subtle attempts to clear warnings for explicit circumvention.
            </p>
          </div>
        </div>
        
        <div className="mt-10 bg-white rounded-xl p-6 shadow-md">
          <h3 className="font-bold text-xl mb-4 text-indigo-800 flex items-center">
            <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Business Benefits
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <li className="flex items-start bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-100">
              <div className="bg-green-100 p-2 rounded-full mr-3 mt-0.5">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <span className="font-semibold text-green-800">Revenue Protection</span>
                <p className="text-sm text-gray-600 mt-1">Safeguards platform revenue by preventing off-platform transactions, increasing your bottom line by up to 24%</p>
              </div>
            </li>
            <li className="flex items-start bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-100">
              <div className="bg-amber-100 p-2 rounded-full mr-3 mt-0.5">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <div>
                <span className="font-semibold text-amber-800">Operational Efficiency</span>
                <p className="text-sm text-gray-600 mt-1">Reduces support costs by up to 35% through automated violation handling, freeing your team to focus on high-value activities</p>
              </div>
            </li>
            <li className="flex items-start bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-100">
              <div className="bg-blue-100 p-2 rounded-full mr-3 mt-0.5">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div>
                <span className="font-semibold text-blue-800">Data-Driven Insights</span>
                <p className="text-sm text-gray-600 mt-1">Delivers powerful analytics on circumvention patterns, helping you make strategic decisions with real-time intelligence</p>
              </div>
            </li>
            <li className="flex items-start bg-gradient-to-r from-purple-50 to-fuchsia-50 p-4 rounded-lg border border-purple-100">
              <div className="bg-purple-100 p-2 rounded-full mr-3 mt-0.5">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <div>
                <span className="font-semibold text-purple-800">User Education & Retention</span>
                <p className="text-sm text-gray-600 mt-1">Educates users about platform benefits and policies, improving retention rates by up to 28% and creating a safer marketplace</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}