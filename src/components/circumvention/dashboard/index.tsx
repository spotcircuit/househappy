'use client';

import { useState, useEffect } from 'react';
import { DetectionMetrics, Conversation, ChatMessage } from '@/types/chat';
import { calculateDetectionMetrics, getConversationsWithViolations } from '@/data/conversations/mock-data';

interface DashboardProps {
  metrics?: DetectionMetrics;
  recentViolations?: ChatMessage[];
}

export default function Dashboard({ metrics: initialMetrics }: DashboardProps) {
  const [metrics, setMetrics] = useState<DetectionMetrics | null>(initialMetrics || null);
  const [recentViolations, setRecentViolations] = useState<ChatMessage[]>([]);
  
  useEffect(() => {
    if (!metrics) {
      // Get metrics from the mock data if not provided
      setMetrics(calculateDetectionMetrics());
    }
    
    // Get recent violations
    const violationConversations = getConversationsWithViolations();
    const violations: ChatMessage[] = [];
    
    violationConversations.forEach(conversation => {
      conversation.messages.forEach(message => {
        if (message.violations && message.violations.some(v => v.type !== 'none')) {
          violations.push({
            ...message,
            // Add conversation context to the message
            conversationTitle: conversation.title,
            conversationId: conversation.id
          } as ChatMessage & { conversationTitle: string; conversationId: string });
        }
      });
    });
    
    // Sort by timestamp (most recent first) and take the top 5
    const sortedViolations = violations.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 5);
    
    setRecentViolations(sortedViolations);
  }, [metrics]);
  
  if (!metrics) {
    return <div>Loading metrics...</div>;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Platform Protection Metrics</h2>
        <span className="text-sm text-blue-600 font-medium">Live Monitoring</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3 mb-4">
        {/* Left side: Key metrics */}
        <div className="col-span-2 md:col-span-4 lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Total Messages Card */}
          <div className="bg-blue-50 p-3 rounded-lg">
            <h3 className="text-xs font-medium text-blue-700">Total Messages</h3>
            <p className="text-xl font-bold text-blue-900">{metrics.totalMessages}</p>
          </div>
          
          {/* Detection Rate Card */}
          <div className="bg-green-50 p-3 rounded-lg">
            <h3 className="text-xs font-medium text-green-700">Detection Rate</h3>
            <p className="text-xl font-bold text-green-900">{(metrics.detectionRate * 100).toFixed(1)}%</p>
          </div>
          
          {/* Total Violations Card */}
          <div className="bg-amber-50 p-3 rounded-lg">
            <h3 className="text-xs font-medium text-amber-700">Total Violations</h3>
            <p className="text-xl font-bold text-amber-900">{metrics.totalViolations}</p>
          </div>
          
          {/* False Positives Card */}
          <div className="bg-red-50 p-3 rounded-lg">
            <h3 className="text-xs font-medium text-red-700">False Positives</h3>
            <p className="text-xl font-bold text-red-900">{metrics.falsePositives}</p>
          </div>
        </div>
        
        {/* Right side: System Effectiveness */}
        <div className="col-span-2 md:col-span-4 lg:col-span-5 flex items-center bg-gray-50 p-3 rounded-lg">
          <div className="grid grid-cols-3 gap-4 w-full">
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-1">Platform Protection</h4>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div style={{ width: "95%" }} className="bg-green-500 h-2 rounded-full transition-all duration-1000 ease-out"></div>
                </div>
                <span className="text-xs font-medium text-green-600">95%</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-1">Revenue Protection</h4>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div style={{ width: "92%" }} className="bg-blue-500 h-2 rounded-full transition-all duration-1000 ease-out"></div>
                </div>
                <span className="text-xs font-medium text-blue-600">92%</span>
              </div>
            </div>
            
            <div>
              <h4 className="text-xs font-medium text-gray-700 mb-1">User Experience</h4>
              <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div style={{ width: "85%" }} className="bg-yellow-500 h-2 rounded-full transition-all duration-1000 ease-out"></div>
                </div>
                <span className="text-xs font-medium text-yellow-600">85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Violations by Type */}
        <div className="border rounded-lg p-3">
          <h3 className="text-sm font-medium mb-2">Violations by Type</h3>
          <div className="space-y-2">
            {Object.entries(metrics.violationsByType).map(([type, count]) => (
              <div key={type} className="flex items-center">
                <div className="flex-grow">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700">
                      {type.replace('_', ' ')}
                    </span>
                    <span className="text-xs text-gray-600">
                      {count} ({(count / metrics.totalViolations * 100).toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-1000 ease-out ${type === 'contact_info' 
                        ? 'bg-purple-600' 
                        : type === 'payment_circumvention' 
                          ? 'bg-rose-600' 
                          : type === 'subtle_circumvention' 
                            ? 'bg-amber-500'
                            : 'bg-blue-600'}`} 
                      style={{ width: `${(count / metrics.totalViolations) * 100}%` }}>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recent Violations */}
        <div className="border rounded-lg p-3">
          <h3 className="text-sm font-medium mb-2">Recent Violations</h3>
          {recentViolations.length > 0 ? (
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
              {recentViolations.slice(0, 3).map((message, index) => (
                <div key={message.id} className="border-b pb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-500">
                      {new Date(message.timestamp).toLocaleDateString()}
                    </span>
                    <span className="text-xs text-gray-500">
                      {(message as any).conversationTitle || 'Conversation'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-800 mb-1 line-clamp-1">{message.content}</p>
                  <div className="flex flex-wrap gap-1">
                    {message.violations?.filter(violation => violation.type !== 'none').map((violation, idx) => (
                        <span 
                          key={idx} 
                          className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                            violation.type === 'contact_info' 
                              ? 'bg-purple-100 text-purple-800' 
                              : violation.type === 'payment_circumvention' 
                                ? 'bg-rose-100 text-rose-800' 
                                : violation.type === 'subtle_circumvention'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-blue-100 text-blue-800'
                          }`}>
                          {violation.type.replace('_', ' ')}
                        </span>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-xs">No recent violations</p>
          )}
        </div>
      </div>
      
      {/* Effectiveness Section */}
      <div className="mt-8 border-t pt-6">
        <h3 className="text-lg font-medium mb-3">System Effectiveness</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Platform Protection</h4>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                    Effective
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-green-600">
                    {95}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                <div style={{ width: "95%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-1000 ease-out"></div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Revenue Protection</h4>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    Strong
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {92}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                <div style={{ width: "92%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-1000 ease-out"></div>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-700 mb-2">User Experience</h4>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-yellow-600 bg-yellow-200">
                    Good
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-yellow-600">
                    {85}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-yellow-200">
                <div style={{ width: "85%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-yellow-500 transition-all duration-1000 ease-out"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}