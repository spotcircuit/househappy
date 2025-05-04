'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockMetrics } from '@/data/dashboard/mock-data';
import ChatAssistantDemo from '@/components/communication-assistant/chat-demo';
import DocumentVerification from '@/components/trust-verification/document-verification';
import DataVisualization from '@/components/analytics/data-visualization';

// Module types
type ModuleType = 'message-monitoring' | 'communication-assistant' | 'trust-verification' | 'analytics';

export default function AIDashboard() {
  const [activeModule, setActiveModule] = useState<ModuleType>('message-monitoring');
  
  // Check for hash in URL and set active module accordingly
  useEffect(() => {
    const handleHashNavigation = () => {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash;
        if (hash === '#communication') {
          setActiveModule('communication-assistant');
          // Scroll to the communication section
          setTimeout(() => {
            const communicationSection = document.getElementById('communication');
            if (communicationSection) {
              communicationSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } else if (hash === '#message-monitoring') {
          setActiveModule('message-monitoring');
        } else if (hash === '#trust-verification') {
          setActiveModule('trust-verification');
        } else if (hash === '#analytics') {
          setActiveModule('analytics');
        }
      }
    };
    
    // Initial check
    handleHashNavigation();
    
    // Also listen for hash changes while on the page
    window.addEventListener('hashchange', handleHashNavigation);
    return () => window.removeEventListener('hashchange', handleHashNavigation);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <header className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">HouseHappy Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Explore how artificial intelligence enhances the home services marketplace experience
            </p>
          </div>
        </div>
      </header>
      
      {/* Module Navigation */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-wrap gap-4">
          <a
            href="#message-monitoring"
            onClick={(e) => {
              e.preventDefault();
              setActiveModule('message-monitoring');
              window.history.pushState(null, '', '#message-monitoring');
            }}
            className={`px-4 py-2 rounded-md transition cursor-pointer ${
              activeModule === 'message-monitoring' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Message Monitoring
          </a>
          <a
            href="#communication"
            onClick={(e) => {
              e.preventDefault();
              setActiveModule('communication-assistant');
              window.history.pushState(null, '', '#communication');
              const communicationSection = document.getElementById('communication');
              if (communicationSection) {
                communicationSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`px-4 py-2 rounded-md transition cursor-pointer ${
              activeModule === 'communication-assistant' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            AI Communication
          </a>
          <a
            href="#trust-verification"
            onClick={(e) => {
              e.preventDefault();
              setActiveModule('trust-verification');
              window.history.pushState(null, '', '#trust-verification');
            }}
            className={`px-4 py-2 rounded-md transition cursor-pointer ${
              activeModule === 'trust-verification' 
                ? 'bg-teal-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Trust & Verification
          </a>
          <a
            href="#analytics"
            onClick={(e) => {
              e.preventDefault();
              setActiveModule('analytics');
              window.history.pushState(null, '', '#analytics');
            }}
            className={`px-4 py-2 rounded-md transition cursor-pointer ${
              activeModule === 'analytics' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Platform Analytics
          </a>
        </div>
      </div>
      
      {/* Module Content */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeModule === 'message-monitoring' && (
          <MessageMonitoringModule />
        )}
        
        {activeModule === 'communication-assistant' && (
          <div id="communication">
            <CommunicationAssistantModule />
          </div>
        )}
        
        {activeModule === 'trust-verification' && (
          <TrustVerificationModule />
        )}
        
        {activeModule === 'analytics' && (
          <AnalyticsModule />
        )}
      </div>
    </div>
  );
}

// Module Components
function MessageMonitoringModule() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
            Message Monitoring
          </h2>
          <p className="text-gray-600 mt-1">AI-powered platform circumvention prevention system</p>
        </div>
        <div className="bg-green-100 px-3 py-1 rounded-full flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          <span className="text-green-800 text-sm font-medium">Active</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            Detection Metrics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow border border-indigo-100 hover:shadow-md transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-gray-500">Total Messages</p>
                <div className="bg-blue-100 rounded-full p-1">
                  <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800 mt-2">{mockMetrics.messageMonitoring.totalMessages}</p>
              <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-indigo-100 hover:shadow-md transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-gray-500">Violations Detected</p>
                <div className="bg-red-100 rounded-full p-1">
                  <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-indigo-600 mt-2">{mockMetrics.messageMonitoring.violationsDetected}</p>
              <p className="text-xs text-red-600 mt-1">+8.3% from last month</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-indigo-100 hover:shadow-md transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-gray-500">Detection Rate</p>
                <div className="bg-green-100 rounded-full p-1">
                  <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800 mt-2">{mockMetrics.messageMonitoring.detectionRate}%</p>
              <p className="text-xs text-green-600 mt-1">+2.1% from last month</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border border-indigo-100 hover:shadow-md transition-all duration-300 transform hover:scale-105">
              <div className="flex justify-between items-start">
                <p className="text-sm font-medium text-gray-500">False Positives</p>
                <div className="bg-yellow-100 rounded-full p-1">
                  <svg className="w-3 h-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-800 mt-2">{mockMetrics.messageMonitoring.falsePositives}%</p>
              <p className="text-xs text-green-600 mt-1">-0.8% from last month</p>
            </div>
          </div>
          
          <h3 className="font-semibold text-lg mt-8 mb-4 text-gray-800 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
            </svg>
            Violation Types
          </h3>
          <div className="bg-white p-5 rounded-lg shadow border border-indigo-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></div>
                <span className="text-sm font-medium">Contact Info</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-bold mr-2">65%</span>
                <div className="w-32 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-purple-600 mr-2"></div>
                <span className="text-sm font-medium">Payment</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-bold mr-2">25%</span>
                <div className="w-32 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-600 mr-2"></div>
                <span className="text-sm font-medium">Subtle Hints</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-bold mr-2">10%</span>
                <div className="w-32 bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Most Common Keywords</span>
                <span className="text-xs text-gray-500">Frequency</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">phone number</span>
                  <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">42%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">email</span>
                  <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">28%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">venmo</span>
                  <span className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">15%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800 flex items-center">
            <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            Recent Violations
          </h3>
          <div className="space-y-4">
            {mockMetrics.messageMonitoring.recentViolations.map((violation, index) => (
              <div key={index} className="bg-white border border-indigo-100 rounded-lg p-4 shadow hover:shadow-md transition-all duration-300">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold mr-2">
                      {violation.user.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">{violation.user}</span>
                  </div>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{violation.time}</span>
                </div>
                <div className="mt-3 bg-gray-50 p-3 rounded-lg border-l-2 border-indigo-500">
                  <p className="text-sm text-gray-700">{violation.message}</p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full font-medium">
                    {violation.type}
                  </span>
                  <div className="flex space-x-2">
                    <button className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200 transition-colors flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Resolve
                    </button>
                    <button className="text-xs px-2 py-1 bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunicationAssistantModule() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-700">AI Communication</h2>
            <p className="text-gray-600 text-sm">AI-powered platform for smart replies and conversation assistance</p>
          </div>
        </div>
        <div>
          <a 
            href="/ai-communication" 
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition flex items-center"
          >
            <span>View Full Demo</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
          <p className="text-sm text-gray-500">Messages Assisted</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-800">{mockMetrics.communicationAssistant.messagesAssisted}</p>
            <span className="text-sm font-bold text-green-600">↑ 12%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">From last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
          <p className="text-sm text-gray-500">Response Time Saved</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-800">{mockMetrics.communicationAssistant.responseTimeSaved}%</p>
            <span className="text-sm font-bold text-green-600">↑ 8%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">From last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
          <p className="text-sm text-gray-500">Suggestion Accuracy</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-800">{mockMetrics.communicationAssistant.suggestionAccuracy}%</p>
            <span className="text-sm font-bold text-green-600">↑ 3%</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">From last month</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
          <p className="text-sm text-gray-500">User Satisfaction</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-gray-800">{mockMetrics.communicationAssistant.userSatisfaction}/10</p>
            <span className="text-sm font-bold text-green-600">↑ 0.5</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">From last month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-medium text-lg mb-3">Usage Breakdown</h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Smart Replies</span>
                <span className="text-sm">45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Information Extraction</span>
                <span className="text-sm">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Scheduling Assistance</span>
                <span className="text-sm">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h3 className="font-medium text-lg mb-3">Recent Activity</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start border-b pb-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-purple-700 font-semibold text-sm">SP</span>
                </div>
                <div>
                  <p className="text-sm font-medium">Service Provider #{item}</p>
                  <p className="text-xs text-gray-500">Used smart replies to respond to 5 customer inquiries</p>
                  <p className="text-xs text-gray-400 mt-1">Today at {10 + item}:30 AM</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustVerificationModule() {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Trust & Verification</h2>
        <Link 
          href="/trust-verification" 
          className="text-sm flex items-center text-teal-600 hover:text-teal-700 transition-colors"
        >
          <span>View Full Demo</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-medium text-lg mb-3">Verification Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Providers Verified</p>
              <p className="text-2xl font-bold text-gray-800">{mockMetrics.trustVerification.providersVerified}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Verification Rate</p>
              <p className="text-2xl font-bold text-teal-600">{mockMetrics.trustVerification.verificationRate}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Fraud Detected</p>
              <p className="text-2xl font-bold text-gray-800">{mockMetrics.trustVerification.fraudDetected}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Trust Score Avg</p>
              <p className="text-2xl font-bold text-gray-800">{mockMetrics.trustVerification.trustScoreAvg}/10</p>
            </div>
          </div>
          
          <h3 className="font-medium text-lg mt-6 mb-3">Verification Types</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-teal-600 h-4 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <span className="ml-2 text-sm">Identity (40%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-teal-600 h-4 rounded-full" style={{ width: '35%' }}></div>
              </div>
              <span className="ml-2 text-sm">Licenses (35%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="bg-teal-600 h-4 rounded-full" style={{ width: '25%' }}></div>
              </div>
              <span className="ml-2 text-sm">Insurance (25%)</span>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="font-medium text-lg mb-3">Recent Verifications</h3>
          <div className="space-y-3">
            {mockMetrics.trustVerification.recentVerifications.map((verification, index) => (
              <div key={index} className="border rounded-lg p-3">
                <div className="flex justify-between items-start">
                  <span className="text-sm font-medium">{verification.provider}</span>
                  <span className="text-xs text-gray-500">{verification.time}</span>
                </div>
                <p className="text-sm mt-1">{verification.service}</p>
                <div className="mt-1 flex items-center gap-2">
                  {verification.verifications.map((v, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-teal-100 text-teal-800 rounded-full">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsModule() {
  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-blue-700">Platform Analytics</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-4 text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            Interactive Data Visualization
          </h3>
          <DataVisualization />
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-4 text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Business Impact
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 transform transition-transform hover:scale-105">
              <p className="text-sm text-blue-500 font-medium">Revenue Protected</p>
              <p className="text-2xl font-bold text-blue-800">${mockMetrics.analytics.revenueProtected.toLocaleString()}</p>
              <div className="mt-2 h-1 w-full bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 transform transition-transform hover:scale-105">
              <p className="text-sm text-blue-500 font-medium">Time Saved (hours)</p>
              <p className="text-2xl font-bold text-blue-800">{mockMetrics.analytics.timeSaved.toLocaleString()}</p>
              <div className="mt-2 h-1 w-full bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 transform transition-transform hover:scale-105">
              <p className="text-sm text-blue-500 font-medium">Conversion Increase</p>
              <p className="text-2xl font-bold text-blue-800">{mockMetrics.analytics.conversionIncrease}%</p>
              <div className="mt-2 h-1 w-full bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100 transform transition-transform hover:scale-105">
              <p className="text-sm text-blue-500 font-medium">User Retention</p>
              <p className="text-2xl font-bold text-blue-800">{mockMetrics.analytics.userRetention}%</p>
              <div className="mt-2 h-1 w-full bg-blue-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
          
          <h3 className="font-semibold text-lg mt-6 mb-4 text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            AI Feature Usage
          </h3>
          <div className="space-y-4">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-blue-800">Message Monitoring</span>
                <span className="text-sm font-bold text-blue-600">45%</span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-blue-800">Communication Assistant</span>
                <span className="text-sm font-bold text-blue-600">30%</span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-blue-800">Trust & Verification</span>
                <span className="text-sm font-bold text-blue-600">25%</span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-3 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-sm">
          <h3 className="font-semibold text-lg mb-4 text-blue-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Platform Health Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 transform transition-transform hover:scale-105">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Response Time</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xl font-bold text-blue-800">2.8 hrs</p>
                  <p className="text-xs text-gray-500">from 5.2 hrs</p>
                </div>
                <span className="text-sm font-bold text-green-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                  </svg>
                  45%
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 transform transition-transform hover:scale-105">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Completion Rate</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xl font-bold text-blue-800">95%</p>
                  <p className="text-xs text-gray-500">from 72%</p>
                </div>
                <span className="text-sm font-bold text-green-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  23%
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 transform transition-transform hover:scale-105">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Satisfaction</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xl font-bold text-blue-800">9.2/10</p>
                  <p className="text-xs text-gray-500">from 7.8/10</p>
                </div>
                <span className="text-sm font-bold text-green-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  18%
                </span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 transform transition-transform hover:scale-105">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Circumvention</span>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xl font-bold text-blue-800">1.8%</p>
                  <p className="text-xs text-gray-500">from 12%</p>
                </div>
                <span className="text-sm font-bold text-green-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  85%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
