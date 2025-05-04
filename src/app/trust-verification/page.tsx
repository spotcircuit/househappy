'use client';

import React from 'react';
import Link from 'next/link';
import { mockMetrics } from '@/data/dashboard/mock-data';
import DocumentVerification from '@/components/trust-verification/document-verification';

export default function TrustVerification() {
  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <header className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-blue-600">Trust & Verification System</h1>
              <p className="text-gray-600 mt-2">
                Advanced AI-powered verification tools to ensure platform integrity and user trust
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <a href="#demo" className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition flex items-center">
              <span>Try the Demo</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
            <a href="/ai-dashboard#trust-verification" className="px-4 py-2 border border-teal-600 text-teal-600 rounded-md hover:bg-teal-50 transition flex items-center">
              <span>View Metrics</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </a>
          </div>
        </div>
      </header>
      
      {/* How It Works Section */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-6 mb-8 border border-teal-100">
        <h3 className="text-lg font-semibold text-teal-800 mb-3 flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          How It Works
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-teal-700 font-semibold">1</span>
              </div>
              <h4 className="font-medium text-teal-900">Document Submission</h4>
            </div>
            <p className="text-sm text-gray-600">Service providers submit identity documents, licenses, and insurance information.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-teal-700 font-semibold">2</span>
              </div>
              <h4 className="font-medium text-teal-900">AI Verification</h4>
            </div>
            <p className="text-sm text-gray-600">Advanced AI analyzes documents for authenticity and cross-references with official databases.</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-teal-700 font-semibold">3</span>
              </div>
              <h4 className="font-medium text-teal-900">Trust Score Generation</h4>
            </div>
            <p className="text-sm text-gray-600">System generates a comprehensive trust score based on verification results and history.</p>
          </div>
        </div>
      </div>

      {/* Interactive Demo Section */}
      <div id="demo" className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-teal-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Interactive Verification Demo
          </h2>
          <div className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-medium">
            Live Preview
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 p-4 rounded-lg mb-6">
          <p className="text-gray-700 mb-2">
            <span className="font-medium">How to use:</span> This demo shows how the Trust Verification system validates service provider credentials. Upload a document to see the AI verification process in action.
          </p>
          <div className="mt-3">
            <h4 className="text-sm font-medium text-teal-800 mb-2">Supported Document Types:</h4>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">Contractor License</span>
              <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">Business License</span>
              <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">Insurance Certificate</span>
              <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">Professional Certification</span>
              <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">Liability Insurance</span>
              <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">Workers' Compensation</span>
              <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">Bonding Certificate</span>
              <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">State ID/Driver's License</span>
            </div>
          </div>
        </div>
        
        <div className="border border-teal-100 rounded-lg overflow-hidden">
          <DocumentVerification />
        </div>
        
        {/* Sample Verification Result */}
        <div className="mt-6 border border-teal-200 rounded-lg overflow-hidden">
          <div className="bg-teal-50 p-3 border-b border-teal-200">
            <h3 className="font-medium text-teal-800">Sample Verification Result</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Contractor License #C-10-123456</h4>
                <p className="text-sm text-gray-600">Electrical Contractor License - California</p>
              </div>
              <div className="ml-auto">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Verified</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4">
              <h5 className="text-sm font-medium text-gray-700 mb-2">Verification Details</h5>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">License Status</span>
                  <span className="text-sm font-medium text-green-600">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Expiration Date</span>
                  <span className="text-sm font-medium">June 30, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Verified With</span>
                  <span className="text-sm font-medium">CA Contractors State License Board</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Verification Date</span>
                  <span className="text-sm font-medium">May 2, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Document Authenticity</span>
                  <span className="text-sm font-medium text-green-600">100% Authentic</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-teal-50 p-3 rounded-lg border border-teal-100">
                <h4 className="font-medium text-teal-800 mb-1 text-sm">Fraud Detection</h4>
                <p className="text-xs text-gray-600">No signs of tampering or fraud detected in document.</p>
              </div>
              <div className="bg-teal-50 p-3 rounded-lg border border-teal-100">
                <h4 className="font-medium text-teal-800 mb-1 text-sm">Verification Speed</h4>
                <p className="text-xs text-gray-600">Completed in 1m 47s via direct database integration.</p>
              </div>
              <div className="bg-teal-50 p-3 rounded-lg border border-teal-100">
                <h4 className="font-medium text-teal-800 mb-1 text-sm">Trust Impact</h4>
                <p className="text-xs text-gray-600">+2.5 points added to provider's trust score.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Verification Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-teal-600 p-4">
            <h2 className="text-xl font-semibold text-white">Document Verification</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="bg-teal-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-teal-800">License Verification</h3>
                    <p className="text-sm text-gray-600">Contractor license validation with state databases</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-medium text-teal-700">Success Rate</span>
                  <span className="text-sm font-bold text-teal-700">98.2%</span>
                </div>
                <div className="w-full bg-teal-200 rounded-full h-2 mt-1">
                  <div className="bg-teal-600 h-2 rounded-full" style={{ width: '98.2%' }}></div>
                </div>
              </div>
              
              <div className="bg-teal-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-teal-800">Identity Verification</h3>
                    <p className="text-sm text-gray-600">Secure identity verification for service providers</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-sm font-medium text-teal-700">Success Rate</span>
                  <span className="text-sm font-bold text-teal-700">99.5%</span>
                </div>
                <div className="w-full bg-teal-200 rounded-full h-2 mt-1">
                  <div className="bg-teal-600 h-2 rounded-full" style={{ width: '99.5%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 p-4">
            <h2 className="text-xl font-semibold text-white">Trust Scoring System</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800">Provider Trust Score</h3>
                    <p className="text-sm text-gray-600">AI-powered evaluation of service provider reliability</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center">
                  <div className="flex-1 grid grid-cols-10 gap-1">
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`h-4 rounded ${i < 8 ? 'bg-blue-600' : 'bg-blue-200'}`}
                      ></div>
                    ))}
                  </div>
                  <span className="ml-3 font-bold text-blue-800">8.0/10</span>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800">Review Verification</h3>
                    <p className="text-sm text-gray-600">AI analysis to detect fraudulent reviews</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="bg-white p-2 rounded border border-blue-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-blue-800">Authentic</span>
                      <span className="text-xs font-bold text-blue-800">92%</span>
                    </div>
                    <div className="w-full bg-blue-100 rounded-full h-1.5 mt-1">
                      <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div className="bg-white p-2 rounded border border-blue-100">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-red-800">Fraudulent</span>
                      <span className="text-xs font-bold text-red-800">8%</span>
                    </div>
                    <div className="w-full bg-red-100 rounded-full h-1.5 mt-1">
                      <div className="bg-red-600 h-1.5 rounded-full" style={{ width: '8%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">System Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <h3 className="font-medium">Increased Platform Trust</h3>
            </div>
            <p className="text-sm text-gray-600">94% of users report higher confidence in verified providers</p>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <h3 className="font-medium">Reduced Fraud</h3>
            </div>
            <p className="text-sm text-gray-600">Fraudulent activity reduced by 87% since implementation</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <h3 className="font-medium">Higher Completion Rate</h3>
            </div>
            <p className="text-sm text-gray-600">Project completion rate increased by 32% with verified providers</p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <p className="text-center text-gray-500 italic">This is a non-interactive mockup of the Trust & Verification system</p>
      </div>
    </div>
  );
}
