'use client';

import React, { useState } from 'react';
import { mockMetrics } from '@/data/dashboard/mock-data';
import ChatAssistantDemo from '@/components/communication-assistant/chat-demo';

// Sample conversation data with follow-up questions
const sampleConversations = [
  {
    id: 1,
    homeowner: "Hi, I need help with a leaking pipe under my kitchen sink. How soon can someone come out?",
    suggestions: [
      { text: "Thank you for reaching out! I'd be happy to help with your leaking pipe. We have availability tomorrow between 9am-12pm or Wednesday 1pm-4pm. Would either of those work for you?", confidence: 95 },
      { text: "I understand how urgent a leaking pipe can be. We can have a plumber at your home within 3 hours today for emergency service, or schedule for tomorrow at a lower rate. What would you prefer?", confidence: 92 },
      { text: "Thanks for contacting us about your leaking pipe. Before scheduling, could you tell me if you've turned off the water supply to that area? I'll get a plumber out to you as soon as possible.", confidence: 88 }
    ],
    followUp: {
      homeowner: "Tomorrow morning works. Do I need to do anything to prepare before the plumber arrives?",
      response: "Great! I've scheduled you for tomorrow between 9am-12pm. To prepare, please ensure clear access to the sink area and, if possible, remove any items stored underneath. Also, it's helpful to turn off the water supply to that sink. Our plumber will call you 30 minutes before arrival. Is there anything else you need to know?"
    }
  },
  {
    id: 2,
    homeowner: "I'm interested in getting my house painted. Do you offer free estimates?",
    suggestions: [
      { text: "Yes, we absolutely offer free estimates for painting services! I'd be happy to schedule one for you. Could you let me know your address and when would be a convenient time for our estimator to visit?", confidence: 97 },
      { text: "We do provide complimentary estimates for all painting projects. Our estimator can assess the space, discuss color options, and provide a detailed quote. When were you thinking of having the work done?", confidence: 94 },
      { text: "Thanks for your interest in our painting services. We offer free, no-obligation estimates. Before scheduling, could you share some details about the project - interior, exterior, or both? And approximately how many rooms/square footage?", confidence: 91 }
    ],
    followUp: {
      homeowner: "It's for exterior painting. My house is about 2,000 sq ft. Can you also tell me what kind of paint you use?",
      response: "Thank you for those details! For exterior projects, we use premium weather-resistant paints from Sherwin-Williams and Benjamin Moore that come with a 10-year warranty against peeling and fading. For a 2,000 sq ft home, our estimate appointment typically takes about 45-60 minutes. We can have someone visit this week - would you prefer a morning or afternoon appointment?"
    }
  },
  {
    id: 3,
    homeowner: "My AC isn't cooling properly. The air is blowing but it's not cold. Can you help?",
    suggestions: [
      { text: "I'm sorry to hear about your AC issue. Based on your description, it could be a refrigerant issue or a problem with the compressor. We have technicians available today who can diagnose and repair this. Would you like us to send someone out?", confidence: 96 },
      { text: "Thank you for reaching out about your AC. Before scheduling a service call, could you check if the outdoor unit is running and if the filter is clean? These simple checks might help us identify the issue faster when our technician arrives.", confidence: 93 },
      { text: "I understand how uncomfortable a malfunctioning AC can be, especially in this weather. We can have a certified technician at your home today between 2-5pm or tomorrow morning. Would either time work for you?", confidence: 90 }
    ],
    followUp: {
      homeowner: "I checked and the outdoor unit is running. The filter looks clean too. I'd prefer someone to come tomorrow morning if possible.",
      response: "Thank you for checking those things - that's very helpful information for our technician. I've scheduled an appointment for tomorrow morning between 8am-11am. Our technician will call you 30 minutes before arrival. The diagnostic fee is $89, which will be applied toward any repairs if you choose to proceed. Is there anything else you need to know before tomorrow?"
    }
  }
];

// ImprovedChatDemo component with pre-populated Q&A and follow-up questions
function ImprovedChatDemo() {
  const [selectedConversation, setSelectedConversation] = useState(sampleConversations[0]);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState<{type: string, text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);

  // Function to handle selecting a pre-populated conversation
  const selectConversation = (conversation: typeof sampleConversations[0]) => {
    setSelectedConversation(conversation);
    setShowFollowUp(false);
    setMessages([]);
    setUserInput('');
    setSelectedSuggestion(null);
  };

  // Function to handle user input submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message
    setMessages([...messages, {type: 'user', text: userInput}]);
    setUserInput('');
    
    // Simulate AI thinking
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  // Function to show follow-up conversation
  const handleShowFollowUp = () => {
    if (selectedSuggestion !== null) {
      setMessages([
        {type: 'user', text: selectedConversation.homeowner},
        {type: 'assistant', text: selectedConversation.suggestions[selectedSuggestion].text},
        {type: 'user', text: selectedConversation.followUp.homeowner},
        {type: 'assistant', text: selectedConversation.followUp.response}
      ]);
    } else {
      setShowFollowUp(true);
      setMessages([
        {type: 'user', text: selectedConversation.homeowner},
        {type: 'user', text: selectedConversation.followUp.homeowner},
        {type: 'assistant', text: selectedConversation.followUp.response}
      ]);
    }
  };

  // Function to select an AI suggestion
  const handleSelectSuggestion = (index: number) => {
    setSelectedSuggestion(index);
    setMessages([
      {type: 'user', text: selectedConversation.homeowner},
      {type: 'assistant', text: selectedConversation.suggestions[index].text}
    ]);
  };

  return (
    <div className="border border-purple-100 rounded-lg overflow-hidden">
      {/* Conversation selector */}
      <div className="bg-purple-50 p-3 border-b border-purple-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-purple-800">Example Scenarios</h3>
          <button 
            onClick={() => {
              setMessages([]);
              setUserInput('');
              setSelectedSuggestion(null);
              setShowFollowUp(false);
            }}
            className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
          >
            Clear Chat
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {sampleConversations.map((convo) => (
            <button
              key={convo.id}
              onClick={() => selectConversation(convo)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${selectedConversation.id === convo.id ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'}`}
            >
              Scenario {convo.id}
            </button>
          ))}
        </div>
      </div>

      {/* Chat messages */}
      <div className="bg-gray-50 p-4 h-80 overflow-y-auto">
        {messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3/4 rounded-lg p-3 ${msg.type === 'user' ? 'bg-purple-100 text-purple-900' : 'bg-white border border-gray-200 text-gray-800'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
              </svg>
            </div>
            <p className="text-gray-500 text-sm mb-2">Select a scenario above or type your own message below</p>
            <p className="text-purple-600 font-medium text-sm">{selectedConversation.homeowner}</p>
          </div>
        )}
      </div>

      {/* AI suggestions */}
      {messages.length === 0 && (
        <div className="bg-white p-4 border-t border-b border-purple-100">
          <h3 className="text-sm font-medium text-purple-800 mb-2">AI-Suggested Responses:</h3>
          <div className="space-y-3">
            {selectedConversation.suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="bg-white border border-purple-100 rounded-lg p-3 hover:shadow-sm transition-shadow cursor-pointer"
                onClick={() => handleSelectSuggestion(index)}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full">Suggestion {index + 1}</span>
                  <span className="text-xs text-white bg-purple-600 px-2 py-0.5 rounded-full">{suggestion.confidence}% match</span>
                </div>
                <p className="text-sm text-gray-700">{suggestion.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Follow-up button */}
      {(messages.length === 2 && selectedSuggestion !== null && !showFollowUp) && (
        <div className="bg-purple-50 p-3 border-t border-purple-100 flex justify-center">
          <button 
            onClick={handleShowFollowUp}
            className="text-sm px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors flex items-center"
          >
            <span>Show Follow-up Question</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      )}

      {/* Input form */}
      <form onSubmit={handleSubmit} className="bg-white p-3 border-t border-purple-100 flex items-center">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type a message as a homeowner..."
          className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        <button 
          type="submit"
          className="ml-2 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </button>
      </form>
    </div>
  );
}

export default function AICommunicationPage() {
  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">AI Communication Assistant</h1>
              <p className="text-gray-600 mt-2">
                Enhance service provider communication with AI-powered smart replies and conversation assistance
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="#demo" className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition flex items-center">
              <span>Try the Demo</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
            <a href="/ai-dashboard#communication" className="px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition flex items-center">
              <span>View Metrics</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* How It Works Section - Condensed */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 mb-8 border border-purple-100">
        <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-purple-700 font-semibold">1</span>
              </div>
              <h4 className="font-medium text-purple-900">Message Analysis</h4>
            </div>
            <p className="text-sm text-gray-600">AI analyzes incoming messages to understand context, intent, and required information.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-purple-700 font-semibold">2</span>
              </div>
              <h4 className="font-medium text-purple-900">Smart Suggestions</h4>
            </div>
            <p className="text-sm text-gray-600">System generates contextually relevant responses based on message history and best practices.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-purple-700 font-semibold">3</span>
              </div>
              <h4 className="font-medium text-purple-900">Continuous Learning</h4>
            </div>
            <p className="text-sm text-gray-600">AI improves over time by learning from user selections and conversation outcomes.</p>
          </div>
        </div>
      </div>

      {/* Interactive Demo Section - Full Width and Prominent */}
      <div id="demo" className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-purple-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            Interactive Demo
          </h2>
          <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            Live Preview
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg mb-6">
          <p className="text-gray-700">
            <span className="font-medium">How to use:</span> This demo shows how the AI Communication Assistant helps service providers respond to customer inquiries. You can:
          </p>
          <ul className="list-disc ml-5 mt-2 text-sm text-gray-700 space-y-1">
            <li>Type a message as if you were a homeowner asking about services</li>
            <li>See AI-suggested responses for the service provider</li>
            <li>View example conversations with follow-up questions</li>
          </ul>
        </div>
        
        <ImprovedChatDemo />
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h4 className="font-medium text-purple-800 mb-2">Time-Saving</h4>
            <p className="text-sm text-gray-600">Providers save an average of 5.2 hours per week on customer communications.</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h4 className="font-medium text-purple-800 mb-2">Accuracy</h4>
            <p className="text-sm text-gray-600">94.3% of AI-suggested responses are accepted with minimal or no edits.</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <h4 className="font-medium text-purple-800 mb-2">Satisfaction</h4>
            <p className="text-sm text-gray-600">Customer satisfaction scores increased by 32% after implementing the assistant.</p>
          </div>
        </div>
      </div>
      
      {/* Smart Reply Examples */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-semibold mb-6 text-purple-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Smart Reply Examples
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockMetrics.communicationAssistant.smartReplies.map((reply, index) => (
            <div key={index} className="bg-white border border-purple-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-medium text-purple-800 bg-purple-50 px-2 py-1 rounded">{reply.context}</span>
                <span className="text-xs text-white bg-purple-600 px-2 py-1 rounded-full">{reply.confidence}% match</span>
              </div>
              <p className="text-sm mt-2 bg-gray-50 p-3 rounded border border-gray-100 text-gray-700">{reply.suggestion}</p>
              <div className="mt-3 flex justify-end">
                <button className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors">
                  Use This Reply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Additional Features Section */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6 mb-8 border border-purple-100">
        <h3 className="text-xl font-semibold mb-6 text-purple-800">Additional Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <h4 className="font-medium mb-2 text-purple-800">Multilingual Support</h4>
            <p className="text-sm text-gray-600">Communicate with customers in 37 different languages with automatic translation.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-medium mb-2 text-purple-800">Sentiment Analysis</h4>
            <p className="text-sm text-gray-600">Detect customer sentiment and adjust response tone accordingly.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="font-medium mb-2 text-purple-800">Automated Follow-ups</h4>
            <p className="text-sm text-gray-600">Schedule and send automated follow-up messages based on conversation context.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
