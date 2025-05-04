// Mock data for AI dashboard demonstration

export const mockMetrics = {
  // Message Monitoring metrics
  messageMonitoring: {
    totalMessages: 12487,
    violationsDetected: 342,
    detectionRate: 98.5,
    falsePositives: 1.2,
    recentViolations: [
      {
        user: "John D. (Homeowner)",
        time: "10:45 AM",
        message: "Let's continue this conversation at john.doe@email.com",
        type: "Contact Info"
      },
      {
        user: "Quality Plumbing (Provider)",
        time: "Yesterday",
        message: "I can give you a 15% discount if you pay in cash directly",
        type: "Payment Circumvention"
      },
      {
        user: "Sarah M. (Homeowner)",
        time: "Yesterday",
        message: "Can we talk outside this app? It would be easier.",
        type: "Subtle Circumvention"
      },
      {
        user: "Elite Electricians (Provider)",
        time: "2 days ago",
        message: "Call me at (555) 123-4567 to discuss the details",
        type: "Contact Info"
      },
      {
        user: "Michael T. (Homeowner)",
        time: "3 days ago",
        message: "I'd prefer to pay you via Venmo to avoid the fees",
        type: "Payment Circumvention"
      }
    ]
  },

  // Communication Assistant metrics
  communicationAssistant: {
    messagesAssisted: 8754,
    responseTimeSaved: 42,
    suggestionAccuracy: 94.3,
    userSatisfaction: 8.7,
    smartReplies: [
      {
        context: "Initial inquiry about bathroom renovation",
        suggestion: "Thank you for your interest in our bathroom renovation services! I'd be happy to provide a free estimate. Could you share some details about the scope of your project and your timeline?",
        confidence: 95
      },
      {
        context: "Scheduling a consultation",
        suggestion: "I have availability this Thursday at 2 PM or Friday at 10 AM. Would either of those times work for you? I'll need about 45-60 minutes to properly assess your project.",
        confidence: 92
      },
      {
        context: "Quote follow-up",
        suggestion: "I've attached a detailed quote based on our discussion. The total includes all materials, labor, and permits. Please let me know if you have any questions or would like to make any adjustments.",
        confidence: 88
      },
      {
        context: "Addressing a concern about timeline",
        suggestion: "I understand your concerns about the timeline. While we typically estimate 3-4 weeks for this type of project, we can prioritize certain aspects to ensure your primary bathroom is functional within 2 weeks. Would that work better for your needs?",
        confidence: 85
      }
    ]
  },

  // Trust & Verification metrics
  trustVerification: {
    providersVerified: 1245,
    verificationRate: 87.6,
    fraudDetected: 23,
    trustScoreAvg: 8.4,
    recentVerifications: [
      {
        provider: "Superior Plumbing",
        service: "Plumbing Services",
        time: "Today",
        verifications: ["License", "Insurance", "Identity"]
      },
      {
        provider: "Green Landscaping",
        service: "Lawn & Garden",
        time: "Yesterday",
        verifications: ["Identity", "Insurance"]
      },
      {
        provider: "Modern Electric",
        service: "Electrical Services",
        time: "2 days ago",
        verifications: ["License", "Identity", "Background Check"]
      },
      {
        provider: "Perfect Painting",
        service: "Interior Painting",
        time: "3 days ago",
        verifications: ["Identity", "Insurance"]
      }
    ]
  },

  // Analytics metrics
  analytics: {
    revenueProtected: 245000,
    timeSaved: 3450,
    conversionIncrease: 28,
    userRetention: 94
  }
};
