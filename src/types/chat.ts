export type UserRole = 'homeowner' | 'provider';

export type MessageType = 'text' | 'system' | 'warning';

export interface ViolationType {
  type: 'contact_info' | 'payment_circumvention' | 'subtle_circumvention' | 'explicit_contact' | 'none';
  severity: 'low' | 'medium' | 'high';
  detectedPattern?: string;
  confidence: number;
  matchedText?: string; // Full text that matched the pattern, for highlighting
}

export interface ChatMessage {
  id: string;
  sender: UserRole;
  content: string;
  timestamp: Date;
  type: MessageType;
  violations: ViolationType[];
  originalContent?: string; // If content was modified due to violations
}

export interface Conversation {
  id: string;
  title: string;
  homeowner: {
    id: string;
    name: string;
  };
  provider: {
    id: string;
    name: string;
    service: string;
  };
  messages: ChatMessage[];
  hasViolations: boolean;
  category: 'normal' | 'subtle_circumvention' | 'explicit_contact' | 'payment_circumvention';
}

export interface DetectionMetrics {
  totalMessages: number;
  totalViolations: number;
  violationsByType: Record<string, number>;
  falsePositives: number;
  falseNegatives: number;
  detectionRate: number;
}