'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl text-center">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          HouseHappy AI Demonstrations
        </h1>
        <p className="mt-6 text-xl leading-8 text-gray-700 mb-10 max-w-3xl mx-auto">
          Explore our cutting-edge AI solutions that transform the home services marketplace, enhancing trust, communication, and platform integrity while delivering exceptional user experiences.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full max-w-6xl mb-12">
        <Link 
          href="/ai-dashboard" 
          className="block bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 text-white text-center py-5 px-8 rounded-xl shadow-xl text-xl font-semibold transform hover:scale-105 hover:shadow-2xl"
        >
          Explore the AI Dashboard Demo
        </Link>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Circumvention Prevention Demo */}
        <motion.div 
          whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          className="bg-white shadow-xl rounded-xl overflow-hidden border border-indigo-100">
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-5">
            <h2 className="text-2xl font-semibold text-white flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
              Message Monitoring
            </h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-6">
              Our advanced NLP system detects and prevents platform circumvention by identifying contact sharing, payment attempts, and subtle hints in real-time with 98.7% accuracy.
            </p>
            <ul className="text-gray-600 text-sm mb-6 space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Real-time NLP message analysis</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Automatic detection of contact info</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Smart response to violation attempts</span>
              </li>
            </ul>
            <div className="mb-6 bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-800 mb-2">Key Benefits:</h4>
              <p className="text-sm text-indigo-700">Reduces revenue leakage by 42% and increases platform transaction volume by 37% annually.</p>
            </div>
            <Link 
              href="/circumvention-demo" 
              className="block w-full bg-indigo-600 text-white text-center py-3 rounded-lg font-medium hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <span>Try the Interactive Demo</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* AI Communication Assistant Demo */}
        <motion.div 
          whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          className="bg-white shadow-xl rounded-xl overflow-hidden border border-purple-100">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-5">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
                </svg>
                AI Communication
              </h2>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-6">
              Our AI-powered communication system reduces response time by 78% while increasing customer satisfaction by 42% through intelligent response suggestions and automated follow-ups.
            </p>
            <div className="mb-6 bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">Key Benefits:</h4>
              <p className="text-sm text-purple-700">Providers save an average of 5.2 hours per week on customer communications while improving conversion rates.</p>
            </div>
            <ul className="text-gray-600 text-sm mb-6 space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Smart reply suggestions</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Guided information gathering</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-purple-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Automated scheduling assistant</span>
              </li>
            </ul>
            <Link
              href="/ai-communication"
              className="block w-full bg-purple-600 text-white text-center py-3 rounded-lg font-medium hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <span>Try AI Communication Demo</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* Trust and Verification Demo */}
        <motion.div 
          whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          className="bg-white shadow-xl rounded-xl overflow-hidden border border-teal-100">
          <div className="bg-gradient-to-r from-teal-600 to-teal-800 p-5">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-white flex items-center">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                Trust & Verification
              </h2>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-6">
              Our AI verification system validates contractor credentials in seconds with 99.8% accuracy, reducing fraud by 67% and increasing customer trust scores by 48 points on average.
            </p>
            <div className="mb-6 bg-teal-50 p-4 rounded-lg">
              <h4 className="font-semibold text-teal-800 mb-2">Key Benefits:</h4>
              <p className="text-sm text-teal-700">Reduces verification time from 2-3 days to under 5 minutes while significantly improving platform security.</p>
            </div>
            <ul className="text-gray-600 text-sm mb-6 space-y-2">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-teal-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>AI document verification</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-teal-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>License & insurance validation</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-teal-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Real-time fraud detection</span>
              </li>
            </ul>
            <Link
              href="/trust-verification"
              className="block w-full bg-green-600 text-white text-center py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
            >
              <span>Try Trust Verification Demo</span>
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mt-20 text-center text-gray-500 text-sm border-t border-gray-200 pt-8 w-full max-w-6xl"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="font-medium text-gray-700">© 2025 HouseHappy AI. All rights reserved.</p>
            <p className="mt-1">Transforming home services with artificial intelligence</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </motion.footer>
    </main>
  );
}
