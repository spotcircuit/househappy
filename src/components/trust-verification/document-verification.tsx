'use client';

import { useState } from 'react';

interface VerificationStep {
  id: string;
  title: string;
  status: 'pending' | 'processing' | 'verified' | 'failed';
  details?: string;
}

export default function DocumentVerification() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSteps, setVerificationSteps] = useState<VerificationStep[]>([
    { id: 'doc-type', title: 'Document Type Recognition', status: 'pending' },
    { id: 'authenticity', title: 'Authenticity Check', status: 'pending' },
    { id: 'data-extract', title: 'Data Extraction', status: 'pending' },
    { id: 'validation', title: 'Information Validation', status: 'pending' }
  ]);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'success' | 'failure' | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      setIsVerifying(true);
      
      // Simulate verification process
      simulateVerification();
    }, 1500);
  };

  const simulateVerification = () => {
    // Step 1: Document Type Recognition
    setTimeout(() => {
      setVerificationSteps(prev => 
        prev.map(step => 
          step.id === 'doc-type' 
            ? { ...step, status: 'verified', details: 'Identified as Contractor License' } 
            : step
        )
      );
      
      // Step 2: Authenticity Check
      setTimeout(() => {
        setVerificationSteps(prev => 
          prev.map(step => 
            step.id === 'authenticity' 
              ? { ...step, status: 'verified', details: 'Digital watermarks and security features verified' } 
              : step
          )
        );
        
        // Step 3: Data Extraction
        setTimeout(() => {
          setVerificationSteps(prev => 
            prev.map(step => 
              step.id === 'data-extract' 
                ? { ...step, status: 'verified', details: 'License #: ABC123456, Expiration: 12/31/2026' } 
                : step
            )
          );
          
          // Step 4: Information Validation
          setTimeout(() => {
            setVerificationSteps(prev => 
              prev.map(step => 
                step.id === 'validation' 
                  ? { ...step, status: 'verified', details: 'Verified against state licensing database' } 
                  : step
              )
            );
            
            // Complete verification
            setIsVerifying(false);
            setVerificationComplete(true);
            setVerificationResult('success');
          }, 1500);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  const resetVerification = () => {
    setFile(null);
    setIsUploading(false);
    setIsVerifying(false);
    setVerificationSteps(verificationSteps.map(step => ({ ...step, status: 'pending', details: undefined })));
    setVerificationComplete(false);
    setVerificationResult(null);
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="bg-teal-600 text-white p-4">
        <h3 className="font-medium">License Verification Demo</h3>
        <p className="text-sm text-teal-100">See how AI verifies contractor credentials</p>
      </div>
      
      <div className="p-6">
        {!isVerifying && !verificationComplete && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Upload a contractor license document to see how our AI system verifies its authenticity and extracts key information.
            </p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {!file ? (
                <>
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">Upload a license document or drag and drop</p>
                  <input
                    type="file"
                    className="hidden"
                    id="license-upload"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="license-upload"
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 cursor-pointer"
                  >
                    Select File
                  </label>
                </>
              ) : (
                <>
                  <svg className="mx-auto h-12 w-12 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="mt-1 text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                  
                  <div className="mt-4 flex justify-center space-x-2">
                    <button
                      onClick={resetVerification}
                      className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Change
                    </button>
                    <button
                      onClick={handleUpload}
                      disabled={isUploading}
                      className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {isUploading ? 'Uploading...' : 'Verify Document'}
                    </button>
                  </div>
                </>
              )}
            </div>
            
            <div className="text-xs text-gray-500 mt-2">
              <p>For demo purposes, any file will work. In a real system, we would verify actual license documents.</p>
            </div>
          </div>
        )}
        
        {(isVerifying || verificationComplete) && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Verification Process</h4>
            
            <div className="space-y-3">
              {verificationSteps.map((step) => (
                <div key={step.id} className="border rounded-md p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{step.title}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      step.status === 'pending' ? 'bg-gray-100 text-gray-600' :
                      step.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                      step.status === 'verified' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {step.status === 'pending' ? 'Pending' :
                       step.status === 'processing' ? 'Processing...' :
                       step.status === 'verified' ? 'Verified' :
                       'Failed'}
                    </span>
                  </div>
                  {step.details && (
                    <p className="text-xs text-gray-600 mt-1">{step.details}</p>
                  )}
                </div>
              ))}
            </div>
            
            {verificationComplete && (
              <div className={`mt-4 p-4 rounded-md ${
                verificationResult === 'success' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-start">
                  <div className={`flex-shrink-0 h-5 w-5 ${
                    verificationResult === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {verificationResult === 'success' ? (
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className={`text-sm font-medium ${
                      verificationResult === 'success' ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {verificationResult === 'success' ? 'Verification Successful' : 'Verification Failed'}
                    </h3>
                    <div className={`mt-2 text-sm ${
                      verificationResult === 'success' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      <p>
                        {verificationResult === 'success' 
                          ? 'This contractor license is valid and current. All information has been verified against official records.'
                          : 'We could not verify this document. Please ensure you are uploading a valid license document.'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={resetVerification}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    Verify Another Document
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
