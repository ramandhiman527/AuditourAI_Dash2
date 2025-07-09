// Mock data for AI-powered audit dashboard

export const mockMetrics = [
  {
    id: 1,
    title: "Total Documents",
    value: "2,847",
    change: "+12.3%",
    trend: "up",
    aiInsight: "Document volume increased 23% this month. AI suggests focusing on compliance docs.",
    icon: "FileText"
  },
  {
    id: 2,
    title: "AI Analysis Score",
    value: "94.2%",
    change: "+5.1%",
    trend: "up",
    aiInsight: "Audit quality improved. AI detected 15% fewer compliance issues.",
    icon: "Brain"
  },
  {
    id: 3,
    title: "Risk Level",
    value: "Low",
    change: "-2.3%",
    trend: "down",
    aiInsight: "Risk profile improved. AI recommends quarterly review adjustments.",
    icon: "Shield"
  },
  {
    id: 4,
    title: "Processing Time",
    value: "1.2h",
    change: "-18.5%",
    trend: "down",
    aiInsight: "AI processing speed optimized. Average analysis time reduced significantly.",
    icon: "Clock"
  }
];

export const mockDocuments = [
  {
    id: 1,
    name: "Financial_Audit_Q3_2024.pdf",
    type: "pdf",
    size: "2.4 MB",
    uploadDate: "2024-01-15",
    status: "analyzed",
    aiStatus: "completed",
    aiScore: 95,
    aiSummary: "Comprehensive financial audit with minor compliance notes. AI detected 3 potential areas for improvement.",
    tags: ["financial", "Q3", "audit"]
  },
  {
    id: 2,
    name: "Compliance_Report_2024.docx",
    type: "docx",
    size: "1.8 MB",
    uploadDate: "2024-01-14",
    status: "processing",
    aiStatus: "analyzing",
    aiScore: null,
    aiSummary: "AI analysis in progress...",
    tags: ["compliance", "2024"]
  },
  {
    id: 3,
    name: "Risk_Assessment_Matrix.xlsx",
    type: "xlsx",
    size: "945 KB",
    uploadDate: "2024-01-13",
    status: "analyzed",
    aiStatus: "completed",
    aiScore: 88,
    aiSummary: "Risk matrix shows moderate exposure. AI suggests focus on operational risks.",
    tags: ["risk", "assessment", "matrix"]
  },
  {
    id: 4,
    name: "Internal_Controls_Review.pdf",
    type: "pdf",
    size: "3.2 MB",
    uploadDate: "2024-01-12",
    status: "pending",
    aiStatus: "queued",
    aiScore: null,
    aiSummary: "Awaiting AI analysis...",
    tags: ["internal", "controls", "review"]
  }
];

export const mockActivities = [
  {
    id: 1,
    type: "document_upload",
    title: "New document uploaded",
    description: "Financial_Audit_Q3_2024.pdf",
    timestamp: "2 minutes ago",
    user: "Sarah Johnson",
    aiAction: "AI analysis started automatically"
  },
  {
    id: 2,
    type: "ai_analysis",
    title: "AI analysis completed",
    description: "Compliance_Report_2024.docx analyzed",
    timestamp: "15 minutes ago",
    user: "AI System",
    aiAction: "Generated 5 key insights and 2 recommendations"
  },
  {
    id: 3,
    type: "risk_alert",
    title: "Risk level updated",
    description: "Portfolio risk decreased to Low",
    timestamp: "1 hour ago",
    user: "AI System",
    aiAction: "Automatic risk recalculation triggered"
  },
  {
    id: 4,
    type: "user_action",
    title: "Report generated",
    description: "Monthly audit summary created",
    timestamp: "2 hours ago",
    user: "Mike Chen",
    aiAction: "AI enhanced report with predictive insights"
  }
];

export const mockChartData = [
  { name: 'Jan', documents: 120, analyzed: 115, accuracy: 94 },
  { name: 'Feb', documents: 150, analyzed: 142, accuracy: 96 },
  { name: 'Mar', documents: 180, analyzed: 175, accuracy: 93 },
  { name: 'Apr', documents: 220, analyzed: 218, accuracy: 97 },
  { name: 'May', documents: 190, analyzed: 185, accuracy: 95 },
  { name: 'Jun', documents: 240, analyzed: 238, accuracy: 98 },
  { name: 'Jul', documents: 280, analyzed: 275, accuracy: 96 }
];

export const mockRiskData = [
  { name: 'Financial', value: 25, color: '#EF4444' },
  { name: 'Operational', value: 35, color: '#F59E0B' },
  { name: 'Compliance', value: 15, color: '#10B981' },
  { name: 'Strategic', value: 25, color: '#4F46E5' }
];

export const mockAIConversation = [
  {
    id: 1,
    type: "ai",
    content: "Hello! I'm your AI audit assistant. I've analyzed your latest documents and found some interesting patterns. Would you like me to summarize the key findings?",
    timestamp: "10:30 AM",
    confidence: 95,
    liked: null
  },
  {
    id: 2,
    type: "user",
    content: "Yes, please give me a summary of the financial audit findings.",
    timestamp: "10:32 AM"
  },
  {
    id: 3,
    type: "ai",
    content: "Based on the Financial_Audit_Q3_2024.pdf analysis:\n\n• Overall compliance score: 95%\n• 3 minor discrepancies identified\n• Cash flow analysis shows strong liquidity\n• Recommended actions: Update depreciation schedule, review expense classifications\n\nWould you like me to elaborate on any specific area?",
    timestamp: "10:32 AM",
    confidence: 92,
    liked: true
  },
  {
    id: 4,
    type: "user",
    content: "Tell me more about the cash flow analysis.",
    timestamp: "10:35 AM"
  },
  {
    id: 5,
    type: "ai",
    content: "The cash flow analysis reveals:\n\n• Operating cash flow increased 18% QoQ\n• Strong working capital management\n• Debt-to-equity ratio improved to 0.45\n• Projected cash position remains healthy for next 12 months\n\nAI recommendation: Consider expanding investment in growth initiatives given the strong cash position.",
    timestamp: "10:35 AM",
    confidence: 88,
    liked: null
  }
];

export const mockSearchSuggestions = [
  "Financial audit Q3 2024",
  "Compliance report analysis",
  "Risk assessment matrix",
  "Internal controls review",
  "AI analysis summary",
  "Document processing status",
  "Audit recommendations",
  "Risk mitigation strategies"
];

export const mockNavigationItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: "LayoutDashboard",
    href: "/dashboard",
    active: true,
    aiPriority: "high",
    aiNote: "5 new insights available"
  },
  {
    id: 2,
    title: "Documents",
    icon: "FileText",
    href: "/documents",
    active: false,
    aiPriority: "medium",
    aiNote: "2 pending analysis"
  },
  {
    id: 3,
    title: "Analytics",
    icon: "BarChart3",
    href: "/analytics",
    active: false,
    aiPriority: "low",
    aiNote: "Reports updated"
  },
  {
    id: 4,
    title: "Risk Assessment",
    icon: "Shield",
    href: "/risk",
    active: false,
    aiPriority: "high",
    aiNote: "Risk level changed"
  },
  {
    id: 5,
    title: "Reports",
    icon: "FileBarChart",
    href: "/reports",
    active: false,
    aiPriority: "medium",
    aiNote: "3 new reports"
  },
  {
    id: 6,
    title: "Settings",
    icon: "Settings",
    href: "/settings",
    active: false,
    aiPriority: "low",
    aiNote: null
  }
];

export const mockUserProfile = {
  name: "Sarah Johnson",
  email: "sarah.johnson@company.com",
  role: "Senior Auditor",
  avatar: "SJ",
  notifications: 3,
  aiAssistantStatus: "active"
};

export const mockAIStatus = {
  status: "active",
  message: "AI systems operational",
  lastUpdate: "2 minutes ago",
  processingQueue: 2,
  accuracy: 96.8
};