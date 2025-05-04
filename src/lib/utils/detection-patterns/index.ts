import { ViolationType } from '@/types/chat';

// Regular expressions for detecting contact information
const PHONE_REGEX = /(\+\d{1,3}[ -]?)?\(?(\d{3})\)?[ -]?(\d{3})[ -]?(\d{4})/g;
const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
const SOCIAL_MEDIA_REGEX = /\b(?:facebook|instagram|twitter|snapchat|whatsapp|telegram|signal|discord)\b/gi;
const URL_REGEX = /\b(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/g;

// Keywords suggesting payment circumvention
const PAYMENT_KEYWORDS = [
  'cash', 'venmo', 'paypal', 'zelle', 'cashapp', 'check', 'direct payment',
  'pay directly', 'off the books', 'avoid fees', 'cheaper if', 'save on fees', 
  'no commission', 'no platform fee', 'e-transfer', 'direct deposit', 'money order'
];

// Phrases suggesting subtle circumvention
const SUBTLE_CIRCUMVENTION_PHRASES = [
  'text me', 'call me', 'reach me', 'contact me', 'offline', 'outside the app', 
  'outside the platform', 'my number is', 'my email is', 'direct message', 
  'private message', 'dm me', 'pm me', 'continue elsewhere', 'talk elsewhere',
  'connect outside', 'phone number', 'my cell', 'my cell is', 'my cell number',
  'continue this conversation elsewhere', 'connect directly', 'faster if we connect',
  'maybe we can continue', 'conversation elsewhere'
];

export function detectContactInformation(message: string): ViolationType | null {
  // Check for phone numbers
  const phoneMatches = message.match(PHONE_REGEX);
  if (phoneMatches) {
    return {
      type: 'contact_info',
      severity: 'high',
      detectedPattern: phoneMatches[0],
      confidence: 0.95
    };
  }

  // Check for email addresses
  const emailMatches = message.match(EMAIL_REGEX);
  if (emailMatches) {
    return {
      type: 'contact_info',
      severity: 'high',
      detectedPattern: emailMatches[0],
      confidence: 0.95
    };
  }

  // Check for social media references with context
  const socialMatches = message.match(SOCIAL_MEDIA_REGEX);
  if (socialMatches) {
    // Look for context indicating sharing profiles (not just mentioning the platform)
    const messageLower = message.toLowerCase();
    const contextPatterns = ['my', 'find me', 'message me', 'dm me', 'username', 'handle', 'profile'];
    
    const hasContext = contextPatterns.some(pattern => 
      messageLower.includes(`${pattern} on ${socialMatches[0].toLowerCase()}`) || 
      messageLower.includes(`${pattern} at ${socialMatches[0].toLowerCase()}`)
    );

    if (hasContext) {
      return {
        type: 'contact_info',
        severity: 'medium',
        detectedPattern: socialMatches[0],
        confidence: 0.85
      };
    }
  }

  // Check for URLs
  const urlMatches = message.match(URL_REGEX);
  if (urlMatches) {
    return {
      type: 'contact_info',
      severity: 'medium',
      detectedPattern: urlMatches[0],
      confidence: 0.8
    };
  }

  return null;
}

export function detectPaymentCircumvention(message: string): ViolationType | null {
  const messageLower = message.toLowerCase();
  
  for (const keyword of PAYMENT_KEYWORDS) {
    if (messageLower.includes(keyword.toLowerCase())) {
      // Check for more context to improve confidence
      const circumventionContext = [
        'cheaper', 'discount', 'save', 'avoid', 'skip', 'bypass', 'instead of'
      ];
      
      const hasStrongContext = circumventionContext.some(context => 
        messageLower.includes(context)
      );
      
      return {
        type: 'payment_circumvention',
        severity: hasStrongContext ? 'high' : 'medium',
        detectedPattern: keyword,
        confidence: hasStrongContext ? 0.9 : 0.7
      };
    }
  }
  
  return null;
}

export function detectSubtleCircumvention(message: string): ViolationType | null {
  const messageLower = message.toLowerCase();
  
  for (const phrase of SUBTLE_CIRCUMVENTION_PHRASES) {
    if (messageLower.includes(phrase.toLowerCase())) {
      return {
        type: 'subtle_circumvention',
        severity: 'low',
        detectedPattern: phrase,
        confidence: 0.75,
        matchedText: message // Store the full message to highlight it later
      };
    }
  }
  
  return null;
}

export function analyzeMessage(message: string): ViolationType[] {
  const violations: ViolationType[] = [];
  
  const contactViolation = detectContactInformation(message);
  if (contactViolation) violations.push(contactViolation);
  
  const paymentViolation = detectPaymentCircumvention(message);
  if (paymentViolation) violations.push(paymentViolation);
  
  const subtleViolation = detectSubtleCircumvention(message);
  if (subtleViolation) violations.push(subtleViolation);
  
  return violations.length > 0 ? violations : [{ 
    type: 'none', 
    severity: 'low',
    confidence: 1.0
  }];
}

export function maskSensitiveInformation(message: string): string {
  // Mask phone numbers
  let maskedMessage = message.replace(PHONE_REGEX, '***-***-****');
  
  // Mask email addresses
  maskedMessage = maskedMessage.replace(EMAIL_REGEX, '****@****.com');
  
  // Mask URLs
  maskedMessage = maskedMessage.replace(URL_REGEX, '[external link removed]');
  
  return maskedMessage;
}

export function generateWarningMessage(violation: ViolationType): string {
  switch (violation.type) {
    case 'contact_info':
      return 'Sharing contact information outside the platform violates our terms of service and removes your protection guarantees. Please keep all communications within HouseHappy.';
    
    case 'payment_circumvention':
      return 'Arranging payments outside the platform violates our terms of service and removes payment protection for both parties. HouseHappy securely processes all payments with dispute resolution.';
    
    case 'subtle_circumvention':
      return 'For your protection and service guarantee, please keep all project communications within HouseHappy. This ensures quality and accountability.';
    
    default:
      return '';
  }
}