// Enhanced mock data for Document Management page

export const mockDocuments = [
  {
    id: 1,
    name: 'Financial_Statements_Q3_2024.pdf',
    type: 'pdf',
    size: '3.2 MB',
    uploadDate: '2024-01-15T10:30:00Z',
    status: 'analyzed',
    aiRiskLevel: 'low',
    aiConfidence: 96,
    qualityScore: 94,
    category: 'financial',
    extractedMetadata: {
      amount: '$2,450,000',
      date: '2024-09-30',
      vendor: 'Ernst & Young LLP',
      documentType: 'Financial Statement',
      keyTerms: ['revenue', 'expenses', 'net income', 'balance sheet']
    },
    aiInsights: [
      'All required financial disclosures present',
      'Minor formatting inconsistency in footnotes',
      'Compliant with GAAP standards'
    ],
    riskFactors: [
      { factor: 'Completeness', score: 95, level: 'low' },
      { factor: 'Accuracy', score: 97, level: 'low' },
      { factor: 'Compliance', score: 94, level: 'low' }
    ],
    tags: ['Q3', 'financial', 'audited', 'GAAP'],
    aiSuggestions: ['Archive after review', 'Include in annual report']
  },
  {
    id: 2,
    name: 'Invoice_ABC_Corp_12045.pdf',
    type: 'pdf',
    size: '1.8 MB',
    uploadDate: '2024-01-14T14:22:00Z',
    status: 'processing',
    aiRiskLevel: 'high',
    aiConfidence: 87,
    qualityScore: 76,
    category: 'invoice',
    extractedMetadata: {
      amount: '$15,750.00',
      date: '2024-01-10',
      vendor: 'ABC Corporation',
      documentType: 'Invoice',
      invoiceNumber: '12045',
      keyTerms: ['services', 'consulting', 'payment terms']
    },
    aiInsights: [
      'Missing required approval signatures',
      'Amount exceeds $10k threshold',
      'Payment terms unclear'
    ],
    riskFactors: [
      { factor: 'Approval Process', score: 45, level: 'high' },
      { factor: 'Documentation', score: 62, level: 'medium' },
      { factor: 'Amount Verification', score: 89, level: 'low' }
    ],
    tags: ['invoice', 'high-value', 'missing-approval'],
    aiSuggestions: ['Obtain missing approvals', 'Verify payment terms', 'Flag for review']
  },
  {
    id: 3,
    name: 'Contract_Vendor_Services_2024.docx',
    type: 'docx',
    size: '945 KB',
    uploadDate: '2024-01-13T09:15:00Z',
    status: 'analyzed',
    aiRiskLevel: 'medium',
    aiConfidence: 92,
    qualityScore: 85,
    category: 'contract',
    extractedMetadata: {
      amount: '$85,000',
      date: '2024-01-01',
      vendor: 'ServicePro Inc.',
      documentType: 'Service Contract',
      duration: '12 months',
      keyTerms: ['liability', 'termination', 'deliverables']
    },
    aiInsights: [
      'Standard contract terms identified',
      'Liability clause needs legal review',
      'Performance metrics clearly defined'
    ],
    riskFactors: [
      { factor: 'Legal Review', score: 72, level: 'medium' },
      { factor: 'Terms Clarity', score: 91, level: 'low' },
      { factor: 'Compliance', score: 88, level: 'low' }
    ],
    tags: ['contract', 'annual', 'services'],
    aiSuggestions: ['Schedule legal review', 'Set up performance tracking']
  },
  {
    id: 4,
    name: 'Expense_Report_Travel_Jan2024.xlsx',
    type: 'xlsx',
    size: '1.2 MB',
    uploadDate: '2024-01-12T16:45:00Z',
    status: 'analyzed',
    aiRiskLevel: 'low',
    aiConfidence: 94,
    qualityScore: 91,
    category: 'expense',
    extractedMetadata: {
      amount: '$3,245.67',
      date: '2024-01-31',
      vendor: 'Multiple',
      documentType: 'Expense Report',
      period: 'January 2024',
      keyTerms: ['travel', 'meals', 'receipts']
    },
    aiInsights: [
      'All receipts properly attached',
      'Expenses within policy limits',
      'Proper categorization applied'
    ],
    riskFactors: [
      { factor: 'Policy Compliance', score: 96, level: 'low' },
      { factor: 'Documentation', score: 94, level: 'low' },
      { factor: 'Approval Status', score: 98, level: 'low' }
    ],
    tags: ['expense', 'travel', 'approved'],
    aiSuggestions: ['Process for reimbursement', 'Archive after payment']
  },
  {
    id: 5,
    name: 'Bank_Statement_Dec2023.pdf',
    type: 'pdf',
    size: '2.1 MB',
    uploadDate: '2024-01-11T11:20:00Z',
    status: 'pending',
    aiRiskLevel: 'medium',
    aiConfidence: 89,
    qualityScore: 82,
    category: 'bank-statement',
    extractedMetadata: {
      amount: 'Multiple transactions',
      date: '2023-12-31',
      vendor: 'First National Bank',
      documentType: 'Bank Statement',
      accountNumber: '****1234',
      keyTerms: ['balance', 'deposits', 'withdrawals']
    },
    aiInsights: [
      'Reconciliation pending',
      'Large withdrawal requires investigation',
      'Monthly pattern analysis available'
    ],
    riskFactors: [
      { factor: 'Reconciliation', score: 65, level: 'medium' },
      { factor: 'Unusual Activity', score: 71, level: 'medium' },
      { factor: 'Data Integrity', score: 92, level: 'low' }
    ],
    tags: ['bank-statement', 'reconciliation', 'pending'],
    aiSuggestions: ['Complete reconciliation', 'Investigate large transactions']
  }
];

export const mockProcessingPipeline = [
  {
    id: 101,
    fileName: 'Audit_Report_Draft_2024.pdf',
    stage: 'upload',
    stageIndex: 0,
    progress: 100,
    confidence: 98,
    aiClassification: 'Audit Document',
    estimatedTime: 'Complete',
    extractedData: null,
    errors: []
  },
  {
    id: 102,
    fileName: 'Purchase_Order_5678.pdf',
    stage: 'ai-scan',
    stageIndex: 1,
    progress: 67,
    confidence: 92,
    aiClassification: 'Purchase Order',
    estimatedTime: '45 seconds',
    extractedData: {
      amount: '$12,500',
      vendor: 'TechSupply Co.'
    },
    errors: []
  },
  {
    id: 103,
    fileName: 'Employee_Handbook_2024.docx',
    stage: 'extract',
    stageIndex: 2,
    progress: 34,
    confidence: 88,
    aiClassification: 'Policy Document',
    estimatedTime: '2 minutes',
    extractedData: null,
    errors: []
  },
  {
    id: 104,
    fileName: 'Tax_Return_2023.pdf',
    stage: 'analyze',
    stageIndex: 3,
    progress: 12,
    confidence: 95,
    aiClassification: 'Tax Document',
    estimatedTime: '3 minutes',
    extractedData: {
      taxYear: '2023',
      filingStatus: 'Corporate'
    },
    errors: ['Missing Schedule K-1']
  }
];

export const mockMissingDocuments = [
  {
    id: 1,
    documentType: 'Board Resolutions',
    priority: 'high',
    auditPhase: 'planning',
    description: 'Missing board resolutions for major transactions in Q3 2024',
    impact: 'Required for compliance testing',
    deadline: '2024-02-15',
    aiRecommendation: 'Contact corporate secretary for board meeting minutes',
    relatedTransactions: ['Acquisition of XYZ Corp', 'Bond issuance'],
    estimatedRisk: 'high'
  },
  {
    id: 2,
    documentType: 'Vendor Contracts',
    priority: 'medium',
    auditPhase: 'fieldwork',
    description: 'Service agreements for top 5 vendors by spend',
    impact: 'Needed for vendor audit and risk assessment',
    deadline: '2024-02-20',
    aiRecommendation: 'Request from procurement department',
    relatedTransactions: ['ServicePro Inc.', 'TechSupply Co.', 'ConsultCorp'],
    estimatedRisk: 'medium'
  },
  {
    id: 3,
    documentType: 'Insurance Policies',
    priority: 'medium',
    auditPhase: 'substantive',
    description: 'Current insurance coverage documentation',
    impact: 'Required for risk assessment and asset protection review',
    deadline: '2024-02-25',
    aiRecommendation: 'Obtain from risk management team',
    relatedTransactions: ['Property insurance', 'Liability coverage'],
    estimatedRisk: 'medium'
  },
  {
    id: 4,
    documentType: 'Employee Stock Options',
    priority: 'low',
    auditPhase: 'completion',
    description: 'Stock option grant agreements and exercise records',
    impact: 'Needed for equity compensation calculations',
    deadline: '2024-03-01',
    aiRecommendation: 'Request from HR and equity administration',
    relatedTransactions: ['2024 stock grants', 'Option exercises'],
    estimatedRisk: 'low'
  }
];

export const mockSearchSuggestions = [
  'Find invoices over $10k with missing approvals',
  'Show high-risk documents from last 30 days',
  'Documents requiring legal review',
  'Bank statements needing reconciliation',
  'Contracts expiring this quarter',
  'Financial statements by quarter',
  'Missing vendor documentation',
  'Expense reports pending approval',
  'Tax documents for 2023',
  'Insurance policies requiring renewal'
];

export const mockAIClassifications = {
  'financial-statement': { confidence: 96, category: 'Financial', subcategory: 'Statement' },
  'invoice': { confidence: 94, category: 'Procurement', subcategory: 'Invoice' },
  'contract': { confidence: 92, category: 'Legal', subcategory: 'Service Agreement' },
  'expense-report': { confidence: 97, category: 'Finance', subcategory: 'Expense' },
  'bank-statement': { confidence: 95, category: 'Finance', subcategory: 'Banking' },
  'tax-document': { confidence: 98, category: 'Tax', subcategory: 'Return' },
  'audit-report': { confidence: 93, category: 'Audit', subcategory: 'Report' },
  'policy': { confidence: 89, category: 'Compliance', subcategory: 'Policy' }
};

export const processingStages = [
  { key: 'upload', label: 'Upload', description: 'File received and validated' },
  { key: 'ai-scan', label: 'AI Scan', description: 'Document type classification' },
  { key: 'extract', label: 'Extract', description: 'Metadata and content extraction' },
  { key: 'analyze', label: 'Analyze', description: 'Risk and compliance analysis' },
  { key: 'complete', label: 'Complete', description: 'Analysis complete and indexed' }
];