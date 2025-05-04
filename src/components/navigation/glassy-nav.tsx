'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Heroicons imports
import { 
  ChartBarIcon, 
  ChatBubbleLeftRightIcon, 
  ShieldCheckIcon,
  ChatBubbleOvalLeftEllipsisIcon
} from '@heroicons/react/24/outline';

export default function GlassyNav() {
  const pathname = usePathname();
  
  // Check if the current path is active
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <div className="relative">
      {/* Hero Background */}
      <div className="relative h-32 w-full overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
        <div className="absolute inset-0 opacity-20">
          {/* Abstract pattern overlay */}
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.5" />
              </pattern>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <rect width="100" height="100" fill="url(#smallGrid)" />
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1" opacity="0.8" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Link href="/" className="group">
            <h1 className="text-3xl font-bold text-white drop-shadow-lg group-hover:scale-105 transition-transform duration-200">HouseHappy Demo</h1>
            <div className="h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300 mx-auto mt-1"></div>
          </Link>
        </div>
      </div>
      
      {/* Glassy Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-lg bg-white/30 rounded-lg shadow-lg border border-white/20 p-2">
            <ul className="flex items-center justify-center space-x-2 md:space-x-6">
              <li>
                <Link 
                  href="/ai-dashboard" 
                  className={`flex items-center px-3 py-2 rounded-md transition duration-200 ${
                    isActive('/ai-dashboard') 
                      ? 'bg-white/30 text-blue-900 font-medium' 
                      : 'text-blue-900 hover:bg-white/20'
                  }`}
                >
                  <ChartBarIcon className="w-5 h-5 mr-2" />
                  <span>AI Dashboard</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/circumvention-demo" 
                  className={`flex items-center px-3 py-2 rounded-md transition duration-200 ${
                    isActive('/circumvention-demo') 
                      ? 'bg-white/30 text-blue-900 font-medium' 
                      : 'text-blue-900 hover:bg-white/20'
                  }`}
                >
                  <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                  <span>Message Monitoring</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/ai-communication" 
                  className={`flex items-center px-3 py-2 rounded-md transition duration-200 ${
                    pathname === '/ai-communication'
                      ? 'bg-white/30 text-blue-900 font-medium' 
                      : 'text-blue-900 hover:bg-white/20'
                  }`}
                >
                  <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 mr-2" />
                  <span>AI Communication</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/trust-verification" 
                  className={`flex items-center px-3 py-2 rounded-md transition duration-200 ${
                    isActive('/trust-verification') 
                      ? 'bg-white/30 text-blue-900 font-medium' 
                      : 'text-blue-900 hover:bg-white/20'
                  }`}
                >
                  <ShieldCheckIcon className="w-5 h-5 mr-2" />
                  <span>Trust Verification</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
