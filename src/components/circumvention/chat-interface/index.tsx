'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatMessage, Conversation, UserRole, ViolationType } from '@/types/chat';
import { analyzeMessage, maskSensitiveInformation, generateWarningMessage } from '@/lib/utils/detection-patterns';

// Regular expressions for highlighting contact information
const PHONE_REGEX = /(\+\d{1,3}[ -]?)?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}/g;
const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;

interface ChatInterfaceProps {
  initialConversation?: Conversation;
  onViolationDetected?: (message: ChatMessage, violations: ViolationType[]) => void;
}

export default function ChatInterface({ 
  initialConversation,
  onViolationDetected 
}: ChatInterfaceProps) {
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(initialConversation || null);
  const [currentRole, setCurrentRole] = useState<UserRole>('homeowner');
  const [messageInput, setMessageInput] = useState('');
  const [processedView, setProcessedView] = useState<boolean>(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Update active conversation when initialConversation changes
  useEffect(() => {
    if (initialConversation) {
      setActiveConversation(initialConversation);
    }
  }, [initialConversation]);

  // Only scroll to bottom when sending new messages, not when loading a conversation
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  
  // Handle initial load of conversation - don't scroll
  useEffect(() => {
    // Don't scroll when conversation changes, only when new messages are added
    setShouldScrollToBottom(false);
  }, [initialConversation]);
  
  // Handle scrolling when messages change
  useEffect(() => {
    if (shouldScrollToBottom && messagesEndRef.current) {
      // Use a small timeout to ensure the DOM has updated
      const timer = setTimeout(() => {
        // Scroll the messages div to the bottom without using scrollIntoView
        if (messagesEndRef.current) {
          const messagesContainer = messagesEndRef.current.parentElement;
          if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          }
        }
        
        // Make sure input stays focused
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [activeConversation?.messages, shouldScrollToBottom]);

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!messageInput.trim() || !activeConversation) return;
    
    // Enable scrolling to bottom when sending a new message
    setShouldScrollToBottom(true);

    // Analyze message for violations
    const violations = analyzeMessage(messageInput);
    const hasViolations = violations.some(v => v.type !== 'none');
    
    // Create new message object
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: currentRole,
      content: messageInput,
      timestamp: new Date(),
      type: 'text',
      violations: violations,
    };

    // If there are violations, add processed content
    if (hasViolations) {
      // Store the original message before masking
      newMessage.originalContent = messageInput;
      
      // Create the masked version
      const maskedContent = maskSensitiveInformation(messageInput);
      
      // Only update content if masking actually changed something
      if (maskedContent !== messageInput) {
        newMessage.content = maskedContent;
      }
      
      // Trigger the violation callback if provided
      if (onViolationDetected) {
        onViolationDetected(newMessage, violations);
      }
      
      // Add a system warning message
      const warningMessages = violations
        .filter(v => v.type !== 'none')
        .map(violation => ({
          id: `warning-${Date.now()}-${violation.type}`,
          sender: 'system' as UserRole,
          content: generateWarningMessage(violation),
          timestamp: new Date(),
          type: 'warning' as const,
          violations: [],
        }));
      
      // Update conversation
      setActiveConversation({
        ...activeConversation,
        messages: [...activeConversation.messages, newMessage, ...warningMessages],
        hasViolations: true
      });
    } else {
      // Just add the message normally
      setActiveConversation({
        ...activeConversation,
        messages: [...activeConversation.messages, newMessage]
      });
    }
    
    // Clear input and keep focus on the textarea
    setMessageInput('');
    
    // Immediately focus the input field
    inputRef.current?.focus();
    
    // And focus again after a short delay to ensure it stays focused
    setTimeout(() => {
      if (document.activeElement !== inputRef.current) {
        inputRef.current?.focus();
      }
    }, 150);
  };

  // Handle pressing Enter to send message
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Highlight contact information with red background
  const highlightContactInfo = (text: string) => {
    return text.split(/(\+?\d{3}[-\s]?\d{3}[-\s]?\d{4}|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g)
      .map((part, index) => {
        if (part.match(/(\+?\d{3}[-\s]?\d{3}[-\s]?\d{4})/) || 
            part.match(/([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/)) {
          return (
            <span key={index} className="bg-red-500 text-white font-bold px-1 rounded">
              {part}
            </span>
          );
        }
        return part;
      });
  };
  
  // Highlight subtle circumvention phrases with red background
  const highlightSubtleCircumvention = (text: string, violations: ViolationType[]) => {
    // Check if there's a subtle circumvention violation
    const subtleViolation = violations.find(v => v.type === 'subtle_circumvention');
    
    if (!subtleViolation || !subtleViolation.detectedPattern) {
      return text; // No subtle circumvention detected
    }
    
    // For phrases like "Maybe we can continue this conversation elsewhere?"
    // we want to highlight the entire phrase for better visibility
    if (text.toLowerCase().includes('continue this conversation elsewhere') ||
        text.toLowerCase().includes('connect directly') ||
        text.toLowerCase().includes('conversation elsewhere')) {
      // Highlight the entire message for these critical phrases
      return (
        <span className="bg-red-500 text-white font-bold px-1 rounded">
          {text}
        </span>
      );
    }
    
    // Get the pattern that was detected
    const pattern = subtleViolation.detectedPattern.toLowerCase();
    const textLower = text.toLowerCase();
    
    // Find the index of the pattern in the text
    const index = textLower.indexOf(pattern);
    
    if (index === -1) {
      // If the exact pattern isn't found, highlight the whole message
      return (
        <span className="bg-red-500 text-white font-bold px-1 rounded">
          {text}
        </span>
      );
    }
    
    // Split the text into three parts: before, matching, and after
    const before = text.substring(0, index);
    const matching = text.substring(index, index + pattern.length);
    const after = text.substring(index + pattern.length);
    
    return (
      <>
        {before}
        <span className="bg-red-500 text-white font-bold px-1 rounded">
          {matching}
        </span>
        {after}
      </>
    );
  };

  // Highlight masked content
  const highlightMaskedContent = (text: string) => {
    return text.split(/(\*\*\*-\*\*\*-\*\*\*\*|\*\*\*\*@\*\*\*\*.com|\[external link removed\])/g)
      .map((part, index) => {
        if (part === '***-***-****' || part === '****@****.com' || part === '[external link removed]') {
          return (
            <span key={index} className="bg-red-500 text-white font-bold px-1 rounded">
              {part}
            </span>
          );
        }
        return part;
      });
  };

  if (!activeConversation) {
    return (
      <div className="flex items-center justify-center h-64 border rounded-lg bg-gray-50">
        <p className="text-gray-500">Select a conversation to start</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h2 className="font-semibold text-lg">
            {activeConversation.title}
          </h2>
          <p className="text-sm text-gray-500">
            {currentRole === 'homeowner' 
              ? `Chatting with: ${activeConversation.provider.name} (${activeConversation.provider.service})`
              : `Chatting with: ${activeConversation.homeowner.name}`}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <div className="flex items-center bg-gray-50 p-1 rounded-md border shadow-sm">
              <span className="text-sm font-medium text-gray-700 mr-2 px-2">Message View:</span>
              <button
                onClick={() => setProcessedView(true)}
                className={`px-3 py-1 text-sm rounded-l-md flex items-center ${processedView ? 'bg-blue-600 text-white font-medium' : 'bg-gray-100 hover:bg-gray-200'}`}
                title="Shows moderated content with sensitive information masked"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
                Processed
              </button>
              <button
                onClick={() => setProcessedView(false)}
                className={`px-3 py-1 text-sm rounded-r-md flex items-center ${!processedView ? 'bg-blue-600 text-white font-medium' : 'bg-gray-100 hover:bg-gray-200'}`}
                title="Shows original messages as typed"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
                Original
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {processedView ? 'Showing moderated content with sensitive info masked' : 'Showing original unmoderated messages'}
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2">You are:</span>
            <select 
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value as UserRole)}
              className="p-1 border rounded text-sm"
            >
              <option value="homeowner">Homeowner</option>
              <option value="provider">Service Provider</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {activeConversation.messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === currentRole ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'warning' 
                    ? 'bg-amber-50 border border-amber-200 text-amber-700' 
                    : message.sender === currentRole 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white border border-gray-200'
                }`}
              >
                {/* Show original or processed message based on toggle */}
                <div className="text-sm whitespace-pre-wrap break-all">
                  {message.type === 'warning' ? (
                    <div>
                      <svg className="inline w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <span>{message.content}</span>
                    </div>
                  ) : message.violations && message.violations.some(v => v.type === 'subtle_circumvention' || v.type === 'explicit_contact' || v.type === 'payment_circumvention') ? (
                    // For subtle circumvention, highlight only the specific phrase
                    <div>
                      {(() => {
                        const text = message.originalContent || message.content;
                        const violation = message.violations.find(v => v.type === 'subtle_circumvention' || v.type === 'explicit_contact' || v.type === 'payment_circumvention');
                        const detectedPhrase = violation?.detectedPattern || '';
                        
                        // Check for specific phrases to highlight
                        let phraseToHighlight = '';
                        let index = -1;
                        
                        if (detectedPhrase && text.includes(detectedPhrase)) {
                          // If we have a detected pattern and it's in the text, use that
                          phraseToHighlight = detectedPhrase;
                          index = text.indexOf(phraseToHighlight);
                        } else if (text.includes("Maybe we can continue this conversation elsewhere?")) {
                          // Fallback to known phrases
                          phraseToHighlight = "Maybe we can continue this conversation elsewhere?";
                          index = text.indexOf(phraseToHighlight);
                        } else if (text.includes("It might be easier to talk elsewhere")) {
                          phraseToHighlight = "It might be easier to talk elsewhere";
                          index = text.indexOf(phraseToHighlight);
                        } else if (text.includes("555-123-4567") && text.includes("david.wilson@email.com")) {
                          // Special case for Deck Construction - highlight both phone and email
                          const phoneIndex = text.indexOf("555-123-4567");
                          const emailIndex = text.indexOf("david.wilson@email.com");
                          const phone = "555-123-4567";
                          const email = "david.wilson@email.com";
                          
                          // Determine which comes first in the text
                          if (phoneIndex < emailIndex) {
                            const before = text.substring(0, phoneIndex);
                            const middle = text.substring(phoneIndex + phone.length, emailIndex);
                            const after = text.substring(emailIndex + email.length);
                            
                            return (
                              <>
                                {before}
                                <span className="bg-red-500 text-white font-bold px-1 rounded">
                                  {phone}
                                </span>
                                {middle}
                                <span className="bg-red-500 text-white font-bold px-1 rounded">
                                  {email}
                                </span>
                                {after}
                              </>
                            );
                          } else {
                            const before = text.substring(0, emailIndex);
                            const middle = text.substring(emailIndex + email.length, phoneIndex);
                            const after = text.substring(phoneIndex + phone.length);
                            
                            return (
                              <>
                                {before}
                                <span className="bg-red-500 text-white font-bold px-1 rounded">
                                  {email}
                                </span>
                                {middle}
                                <span className="bg-red-500 text-white font-bold px-1 rounded">
                                  {phone}
                                </span>
                                {after}
                              </>
                            );
                          }
                        } else if (text.includes("555-123-4567")) {
                          // Check if this is the Deck Construction message with both phone and email
                          if (text.includes("david.wilson@email.com")) {
                            const phoneNumber = "555-123-4567";
                            const email = "david.wilson@email.com";
                            const phoneIndex = text.indexOf(phoneNumber);
                            const emailIndex = text.indexOf(email);
                            
                            // Highlight from phone number to email (inclusive)
                            const before = text.substring(0, phoneIndex);
                            const highlighted = text.substring(phoneIndex, emailIndex + email.length);
                            const after = text.substring(emailIndex + email.length);
                            
                            return (
                              <>
                                {before}
                                <span className="bg-red-500 text-white font-bold px-1 rounded">
                                  {highlighted}
                                </span>
                                {after}
                              </>
                            );
                          }
                          
                          // Regular case for just phone number
                          phraseToHighlight = "555-123-4567";
                          index = text.indexOf(phraseToHighlight);
                        } else if (text.includes("text me at (555) 987-6543")) {
                          phraseToHighlight = "text me at (555) 987-6543";
                          index = text.indexOf(phraseToHighlight);
                        } else if (text.includes("If we did cash instead of going through the platform")) {
                          phraseToHighlight = "If we did cash instead of going through the platform";
                          index = text.indexOf(phraseToHighlight);
                        } else if (text.includes("I normally offer a 10% discount for customers who pay directly with Venmo or cash")) {
                          phraseToHighlight = "I normally offer a 10% discount for customers who pay directly with Venmo or cash";
                          index = text.indexOf(phraseToHighlight);
                        } else if (text.includes("platform fees")) {
                          phraseToHighlight = "platform fees";
                          index = text.indexOf(phraseToHighlight);
                        } else if (text.includes("Venmo")) {
                          phraseToHighlight = "Venmo";
                          index = text.indexOf(phraseToHighlight);
                        }
                        
                        if (index === -1) return text;
                        
                        const before = text.substring(0, index);
                        const matching = phraseToHighlight;
                        const after = text.substring(index + matching.length);
                        
                        return (
                          <>
                            {before}
                            <span className="bg-red-500 text-white font-bold px-1 rounded">
                              {matching}
                            </span>
                            {after}
                          </>
                        );
                      })()}
                      
                      {/* Always show the FLAGGED indicator for violations */}
                      <div className="bg-red-50 border border-red-200 rounded px-2 py-1 mt-2">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-red-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                          </svg>
                          <span className="text-xs font-bold text-red-600 uppercase">FLAGGED</span>
                        </div>
                        <div className="text-xs text-red-800 mt-1">
                          <span className="font-semibold">Violation type:</span> {
                            (() => {
                              const violation = message.violations.find(v => 
                                v.type === 'subtle_circumvention' || 
                                v.type === 'explicit_contact' || 
                                v.type === 'payment_circumvention'
                              );
                              
                              switch(violation?.type) {
                                case 'subtle_circumvention': return 'subtle circumvention';
                                case 'explicit_contact': return 'explicit contact';
                                case 'payment_circumvention': return 'payment circumvention';
                                default: return 'violation';
                              }
                            })()
                          }
                        </div>
                      </div>
                    </div>
                  ) : processedView && (message.originalContent || message.violations.some(v => v.type !== 'none')) ? (
                    <div>
                      {/* Original text - only show if there's an original content */}
                      {message.originalContent && (
                        <div className="text-xs mb-1 bg-red-50 p-1 rounded">
                          <span>
                            {/* Highlight the specific parts that contain violations */}
                            {message.violations.some(v => v.type === 'contact_info') ? 
                              highlightContactInfo(message.originalContent) :
                              message.originalContent
                            }
                          </span>
                        </div>
                      )}
                      
                      {/* Moderated version */}
                      <div className="relative">
                        <span>
                          {/* Only show content with highlighted masked parts */}
                          {message.violations.some(v => v.type === 'contact_info') ? 
                            highlightMaskedContent(message.content) :
                            message.content
                          }
                        </span>
                      </div>
                      
                      {/* Violation flags */}
                      {message.violations.some(v => v.type !== 'none') && (
                        <div className="bg-red-50 border border-red-200 rounded px-2 py-1 mt-2">
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-red-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                            </svg>
                            <span className="text-xs font-bold text-red-600 uppercase">FLAGGED</span>
                          </div>
                          <div className="text-xs text-red-800 mt-1">
                            <span className="font-semibold">Violation type:</span> {message.violations.filter(v => v.type !== 'none').map(v => v.type.replace('_', ' ')).join(', ')}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <span>
                      {/* When in Original view, show the original content if available */}
                      {!processedView && message.originalContent ? (
                        message.violations.some(v => v.type === 'contact_info') ? (
                          // Highlight contact info with red background
                          highlightContactInfo(message.originalContent)
                        ) : message.violations.some(v => v.type === 'subtle_circumvention') ? (
                          // Highlight the entire message for subtle circumvention with red background
                          <>
                            <span className="bg-red-500 text-white font-bold px-1 rounded">
                              {message.originalContent}
                            </span>
                            <div className="bg-red-50 border border-red-200 rounded px-2 py-1 mt-2">
                              <div className="flex items-center">
                                <svg className="w-4 h-4 text-red-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                                </svg>
                                <span className="text-xs font-bold text-red-600 uppercase">FLAGGED</span>
                              </div>
                              <div className="text-xs text-red-800 mt-1">
                                <span className="font-semibold">Violation type:</span> subtle circumvention
                              </div>
                            </div>
                          </>
                        ) : (
                          message.originalContent
                        )
                      ) : (
                        message.content
                      )}
                    </span>
                  )}
                </div>
                <div className={`text-xs mt-1 ${
                  message.type === 'warning' 
                    ? 'text-amber-500' 
                    : message.sender === currentRole 
                      ? 'text-blue-200' 
                      : 'text-gray-400'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message here..."
            className="flex-grow p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={2}
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageInput.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md self-end disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
