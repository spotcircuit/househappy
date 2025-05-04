import { Conversation } from '@/types/chat';
import { analyzeMessage } from '@/lib/utils/detection-patterns';

// Sample mock conversations
export const mockConversations: Conversation[] = [
  // Normal conversations (20)
  {
    id: 'conv-001',
    title: 'Bathroom Renovation Inquiry',
    homeowner: { id: 'ho-001', name: 'Sarah Johnson' },
    provider: { id: 'pr-001', name: 'Mark Wilson', service: 'General Contractor' },
    hasViolations: false,
    category: 'normal',
    messages: [
      {
        id: 'msg-001-1',
        sender: 'homeowner',
        content: 'Hi Mark, I\'m interested in renovating my master bathroom. Do you offer free estimates?',
        timestamp: new Date('2023-05-01T10:15:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      },
      {
        id: 'msg-001-2',
        sender: 'provider',
        content: 'Hello Sarah! Yes, I provide free on-site estimates for bathroom renovations. What\'s your timeframe for the project?',
        timestamp: new Date('2023-05-01T10:20:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      },
      {
        id: 'msg-001-3',
        sender: 'homeowner',
        content: 'Great! I\'m hoping to get started in the next month. The bathroom is about 100 sq ft with a shower/tub combo that I\'d like to convert to a walk-in shower.',
        timestamp: new Date('2023-05-01T10:25:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      }
    ]
  },
  {
    id: 'conv-002',
    title: 'Lawn Care Service',
    homeowner: { id: 'ho-002', name: 'Michael Chen' },
    provider: { id: 'pr-002', name: 'Green Lawns LLC', service: 'Landscaping' },
    hasViolations: false,
    category: 'normal',
    messages: [
      {
        id: 'msg-002-1',
        sender: 'homeowner',
        content: 'I need regular lawn maintenance for my property. Do you offer weekly service packages?',
        timestamp: new Date('2023-05-02T09:30:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      },
      {
        id: 'msg-002-2',
        sender: 'provider',
        content: 'Hi Michael, we do offer weekly and bi-weekly maintenance packages. Our standard service includes mowing, edging, and blowing. Would you like to schedule an on-site assessment through the platform?',
        timestamp: new Date('2023-05-02T09:45:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      }
    ]
  },
  // Add more normal conversations here...
  
  // Subtle circumvention attempts (15)
  {
    id: 'conv-021',
    title: 'Kitchen Remodeling',
    homeowner: { id: 'ho-021', name: 'Jennifer Adams' },
    provider: { id: 'pr-021', name: 'Elite Kitchens', service: 'Kitchen Remodeling' },
    hasViolations: true,
    category: 'subtle_circumvention',
    messages: [
      {
        id: 'msg-021-1',
        sender: 'homeowner',
        content: 'I\'ve been looking for someone to remodel my kitchen for months. Your portfolio looks impressive!',
        timestamp: new Date('2023-05-10T14:20:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      },
      {
        id: 'msg-021-2',
        sender: 'provider',
        content: 'Thank you! We specialize in modern kitchen designs. Would you like to discuss your project in more detail?',
        timestamp: new Date('2023-05-10T14:25:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      },
      {
        id: 'msg-021-3',
        sender: 'homeowner',
        content: 'Definitely. I have so many questions. It might be easier to talk elsewhere. Can I reach you outside the app to discuss details?',
        originalContent: 'Definitely. I have so many questions. It might be easier to talk elsewhere. Can I reach you outside the app to discuss details?',
        timestamp: new Date('2023-05-10T14:30:00'),
        type: 'text',
        violations: [{
          type: 'subtle_circumvention',
          severity: 'medium',
          detectedPattern: 'It might be easier to talk elsewhere',
          confidence: 0.95
        }]
      }
    ]
  },
  {
    id: 'conv-022',
    title: 'Roof Repair',
    homeowner: { id: 'ho-022', name: 'Robert Taylor' },
    provider: { id: 'pr-022', name: 'Apex Roofing', service: 'Roof Repair' },
    hasViolations: true,
    category: 'subtle_circumvention',
    messages: [
      {
        id: 'msg-022-1',
        sender: 'homeowner',
        content: 'Hi, I have a leak in my roof that needs urgent repair. Can you help?',
        timestamp: new Date('2023-05-11T08:10:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      },
      {
        id: 'msg-022-2',
        sender: 'provider',
        content: 'I specialize in roof repairs and can definitely help with that leak. For urgent issues like yours, it\'s usually faster if we connect directly. Maybe we can continue this conversation elsewhere?',
        originalContent: 'I specialize in roof repairs and can definitely help with that leak. For urgent issues like yours, it\'s usually faster if we connect directly. Maybe we can continue this conversation elsewhere?',
        timestamp: new Date('2023-05-11T08:15:00'),
        type: 'text',
        violations: [{
          type: 'subtle_circumvention',
          severity: 'medium',
          detectedPattern: 'continue this conversation elsewhere',
          confidence: 0.95
        }]
      }
    ]
  },
  // Add more subtle circumvention conversations here...
  
  // Explicit contact sharing attempts (10)
  {
    id: 'conv-036',
    title: 'Deck Construction',
    homeowner: { id: 'ho-036', name: 'David Wilson' },
    provider: { id: 'pr-036', name: 'Outdoor Living Spaces', service: 'Deck Building' },
    hasViolations: true,
    category: 'explicit_contact',
    messages: [
      {
        id: 'msg-036-1',
        sender: 'homeowner',
        content: 'I\'m interested in getting a quote for a new composite deck, around 400 square feet.',
        timestamp: new Date('2023-05-15T13:45:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      },
      {
        id: 'msg-036-2',
        sender: 'provider',
        content: 'We\'d be happy to provide a quote for your deck project. We\'ve done many similar projects in your area.',
        timestamp: new Date('2023-05-15T13:50:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      },
      {
        id: 'msg-036-3',
        sender: 'homeowner',
        content: 'Great! I\'d like to discuss this further. You can reach me at 555-123-4567.',
        originalContent: 'Great! I\'d like to discuss this further. You can reach me at 555-123-4567.',
        timestamp: new Date('2023-05-15T13:55:00'),
        type: 'text',
        violations: [
          {
            type: 'explicit_contact',
            severity: 'high',
            detectedPattern: '555-123-4567',
            confidence: 0.98
          }
        ]
      },
      {
        id: 'msg-036-4',
        sender: 'homeowner',
        content: 'My email is david.wilson@email.com if that\'s easier.',
        originalContent: 'My email is david.wilson@email.com if that\'s easier.',
        timestamp: new Date('2023-05-15T13:56:00'),
        type: 'text',
        violations: [
          {
            type: 'explicit_contact',
            severity: 'high',
            detectedPattern: 'david.wilson@email.com',
            confidence: 0.98
          }
        ]
      }
    ]
  },
  {
    id: 'conv-037',
    title: 'Interior Painting',
    homeowner: { id: 'ho-037', name: 'Lisa Garcia' },
    provider: { id: 'pr-037', name: 'Perfect Painters', service: 'Interior Painting' },
    hasViolations: true,
    category: 'explicit_contact',
    messages: [
      {
        id: 'msg-037-1',
        sender: 'homeowner',
        content: 'I need my living room and kitchen painted. Do you offer color consultation?',
        timestamp: new Date('2023-05-16T10:20:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      },
      {
        id: 'msg-037-2',
        sender: 'provider',
        content: 'Yes, we provide color consultation as part of our service. I\'d be happy to show you our portfolio and discuss options. Feel free to text me at (555) 987-6543 to set up a time.',
        originalContent: 'Yes, we provide color consultation as part of our service. I\'d be happy to show you our portfolio and discuss options. Feel free to text me at (555) 987-6543 to set up a time.',
        timestamp: new Date('2023-05-16T10:30:00'),
        type: 'text',
        violations: [{
          type: 'explicit_contact',
          severity: 'high',
          detectedPattern: '(555) 987-6543',
          confidence: 0.98
        }]
      }
    ]
  },
  {
    id: 'conv-038',
    title: 'Windows Replacement',
    homeowner: { id: 'ho-038', name: 'Robert Johnson' },
    provider: { id: 'pr-038', name: 'Clear View Windows', service: 'Windows Replacement' },
    hasViolations: true,
    category: 'payment_circumvention',
    messages: [
      {
        id: 'msg-038-1',
        sender: 'homeowner',
        content: 'I need to replace 8 windows in my house. What would be the approximate cost?',
        timestamp: new Date('2023-05-18T09:15:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      },
      {
        id: 'msg-038-2',
        sender: 'provider',
        content: 'For 8 standard-sized windows, it would cost around $4,800 through the platform. If we did cash instead of going through the platform, I could offer a 15% discount.',
        originalContent: 'For 8 standard-sized windows, it would cost around $4,800 through the platform. If we did cash instead of going through the platform, I could offer a 15% discount.',
        timestamp: new Date('2023-05-18T09:25:00'),
        type: 'text',
        violations: [{
          type: 'payment_circumvention',
          severity: 'high',
          detectedPattern: 'If we did cash instead of going through the platform',
          confidence: 0.99
        }]
      }
    ]
  },
  {
    id: 'conv-039',
    title: 'Fence Installation',
    homeowner: { id: 'ho-039', name: 'Michelle Parker' },
    provider: { id: 'pr-039', name: 'Premium Fencing', service: 'Fence Installation' },
    hasViolations: true,
    category: 'payment_circumvention',
    messages: [
      {
        id: 'msg-039-1',
        sender: 'homeowner',
        content: 'I need a new privacy fence installed around my backyard. Can you give me a quote?',
        timestamp: new Date('2023-05-20T11:30:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      },
      {
        id: 'msg-039-2',
        sender: 'provider',
        content: 'Based on your yard size, it would be around $3,500 for a 6-foot privacy fence. I normally offer a 10% discount for customers who pay directly with Venmo or cash.',
        originalContent: 'Based on your yard size, it would be around $3,500 for a 6-foot privacy fence. I normally offer a 10% discount for customers who pay directly with Venmo or cash.',
        timestamp: new Date('2023-05-20T11:45:00'),
        type: 'text',
        violations: [{
          type: 'payment_circumvention',
          severity: 'high',
          detectedPattern: 'I normally offer a 10% discount for customers who pay directly with Venmo or cash',
          confidence: 0.99
        }]
      }
    ]
  },
  {
    id: 'conv-040',
    title: 'Landscaping Service',
    homeowner: { id: 'ho-040', name: 'Thomas Wright' },
    provider: { id: 'pr-040', name: 'Green Gardens', service: 'Landscaping' },
    hasViolations: true,
    category: 'payment_circumvention',
    messages: [
      {
        id: 'msg-040-1',
        sender: 'homeowner',
        content: 'I need regular lawn maintenance for the summer. What are your rates?',
        timestamp: new Date('2023-05-22T14:10:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      },
      {
        id: 'msg-040-2',
        sender: 'provider',
        content: 'For a yard your size, it would be $120 per month. If you want to avoid platform fees, I can send you my Venmo details.',
        originalContent: 'For a yard your size, it would be $120 per month. If you want to avoid platform fees, I can send you my Venmo details.',
        timestamp: new Date('2023-05-22T14:25:00'),
        type: 'text',
        violations: [{
          type: 'payment_circumvention',
          severity: 'high',
          detectedPattern: 'platform fees',
          confidence: 0.99
        }]
      }
    ]
  },
  {
    id: 'conv-041',
    title: 'Pool Cleaning',
    homeowner: { id: 'ho-041', name: 'Sarah Miller' },
    provider: { id: 'pr-041', name: 'Crystal Clear Pools', service: 'Pool Maintenance' },
    hasViolations: true,
    category: 'payment_circumvention',
    messages: [
      {
        id: 'msg-041-1',
        sender: 'homeowner',
        content: 'How much do you charge for weekly pool cleaning service?',
        timestamp: new Date('2023-05-24T09:45:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      },
      {
        id: 'msg-041-2',
        sender: 'provider',
        content: 'Weekly service is $80. Many of my clients prefer to pay through Venmo since it\'s more convenient.',
        originalContent: 'Weekly service is $80. Many of my clients prefer to pay through Venmo since it\'s more convenient.',
        timestamp: new Date('2023-05-24T10:00:00'),
        type: 'text',
        violations: [{
          type: 'payment_circumvention',
          severity: 'high',
          detectedPattern: 'Venmo',
          confidence: 0.98
        }]
      }
    ]
  },
  // Add more explicit contact sharing conversations...
  
  // Payment circumvention attempts (5)
  {
    id: 'conv-046',
    title: 'Window Replacement',
    homeowner: { id: 'ho-046', name: 'Patricia Moore' },
    provider: { id: 'pr-046', name: 'Clear View Windows', service: 'Window Installation' },
    hasViolations: true,
    category: 'payment_circumvention',
    messages: [
      {
        id: 'msg-046-1',
        sender: 'homeowner',
        content: 'I need to replace 8 windows in my home. Can you provide an estimate?',
        timestamp: new Date('2023-05-20T15:10:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      },
      {
        id: 'msg-046-2',
        sender: 'provider',
        content: 'Based on the information provided, I estimate the project will cost around $6,000-7,000 depending on the window style you choose.',
        timestamp: new Date('2023-05-20T15:20:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      },
      {
        id: 'msg-046-3',
        sender: 'homeowner',
        content: 'That\'s a bit more than I was hoping. If we did cash instead of going through the platform, could you offer a discount to avoid the fees?',
        timestamp: new Date('2023-05-20T15:25:00'),
        type: 'text',
        violations: analyzeMessage('That\'s a bit more than I was hoping. If we did cash instead of going through the platform, could you offer a discount to avoid the fees?')
      }
    ]
  },
  {
    id: 'conv-047',
    title: 'Fence Installation',
    homeowner: { id: 'ho-047', name: 'Thomas Brown' },
    provider: { id: 'pr-047', name: 'Boundary Fencing', service: 'Fence Installation' },
    hasViolations: true,
    category: 'payment_circumvention',
    messages: [
      {
        id: 'msg-047-1',
        sender: 'homeowner',
        content: 'I need 150 feet of wooden privacy fence installed. What would that cost?',
        timestamp: new Date('2023-05-21T09:05:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      },
      {
        id: 'msg-047-2',
        sender: 'provider',
        content: 'For 150 feet of wooden privacy fence, you\'re looking at approximately $4,500-5,000 including materials and labor.',
        timestamp: new Date('2023-05-21T09:15:00'),
        type: 'text',
        violations: [{ type: 'none', severity: 'low', confidence: 1.0 }]
      },
      {
        id: 'msg-047-3',
        sender: 'provider',
        content: 'By the way, I normally offer a 10% discount for customers who pay directly with Venmo or cash. It saves us both the platform fees. Would you be interested in that option?',
        timestamp: new Date('2023-05-21T09:20:00'),
        type: 'text',
        violations: analyzeMessage('By the way, I normally offer a 10% discount for customers who pay directly with Venmo or cash. It saves us both the platform fees. Would you be interested in that option?')
      }
    ]
  }
  // Add more payment circumvention conversations...
];

// Function to get conversations by category
export function getConversationsByCategory(category: Conversation['category']) {
  return mockConversations.filter(conversation => conversation.category === category);
}

// Function to get all conversations with violations
export function getConversationsWithViolations() {
  return mockConversations.filter(conversation => conversation.hasViolations);
}

// Calculate detection metrics across all conversations
export function calculateDetectionMetrics() {
  // For demo purposes, we'll use fixed numbers
  const totalMessages = 100;
  const totalViolations = 14;
  const violationsByType: Record<string, number> = {
    contact_info: 5,
    payment_circumvention: 3,
    subtle_circumvention: 4,
    explicit_contact: 2
  };
  const falsePositives = 2;
  const falseNegatives = 2;
  const detectionRate = 0.85; // 85% detection rate
  
  return {
    totalMessages,
    totalViolations,
    violationsByType,
    falsePositives,
    falseNegatives,
    detectionRate
  };
}