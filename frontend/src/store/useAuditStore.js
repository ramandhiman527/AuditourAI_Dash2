import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

// Real-time audit store with advanced state management
const useAuditStore = create(
  subscribeWithSelector((set, get) => ({
    // Real-time data
    realTimeData: {
      activeUsers: 12,
      processingDocuments: 3,
      aiSystemLoad: 67,
      lastUpdate: new Date().toISOString(),
    },

    // WebSocket connection status
    connectionStatus: 'connecting', // 'connected', 'disconnected', 'connecting', 'error'
    
    // Advanced metrics with predictions
    metrics: {
      totalDocuments: { value: 2847, change: 12.3, prediction: 3100, confidence: 94 },
      aiAnalysisScore: { value: 94.2, change: 5.1, prediction: 96.5, confidence: 89 },
      riskLevel: { value: 'Low', change: -2.3, prediction: 'Low', confidence: 92 },
      processingTime: { value: 1.2, change: -18.5, prediction: 0.9, confidence: 87 },
    },

    // Document processing pipeline
    processingPipeline: [
      { 
        id: 1, 
        name: 'Financial_Report_Q4.pdf', 
        stage: 'upload', 
        progress: 100, 
        aiProgress: 0,
        estimatedTime: '2 min',
        priority: 'high'
      },
      { 
        id: 2, 
        name: 'Compliance_Audit.docx', 
        stage: 'analysis', 
        progress: 100, 
        aiProgress: 67,
        estimatedTime: '1 min',
        priority: 'medium'
      },
      { 
        id: 3, 
        name: 'Risk_Assessment.xlsx', 
        stage: 'complete', 
        progress: 100, 
        aiProgress: 100,
        estimatedTime: 'Complete',
        priority: 'low'
      },
    ],

    // AI conversation context
    conversationContext: {
      sessionId: 'audit-session-' + Date.now(),
      activeTopics: ['financial audit', 'compliance', 'risk assessment'],
      userPreferences: {
        detailLevel: 'detailed',
        focusAreas: ['compliance', 'efficiency'],
        notificationSettings: { realTime: true, summary: true }
      }
    },

    // Anomaly detection data
    anomalies: [
      {
        id: 1,
        type: 'data_inconsistency',
        severity: 'medium',
        description: 'Unusual pattern in expense categorization',
        confidence: 78,
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        status: 'investigating'
      },
      {
        id: 2,
        type: 'compliance_deviation',
        severity: 'high',
        description: 'Document approval workflow bypassed',
        confidence: 94,
        timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
        status: 'resolved'
      }
    ],

    // Workflow automation
    automationRules: [
      {
        id: 1,
        name: 'Auto-categorize Financial Documents',
        trigger: 'document_upload',
        condition: 'contains_financial_keywords',
        action: 'categorize_and_route',
        enabled: true,
        successRate: 96.2
      },
      {
        id: 2,
        name: 'Risk Alert Notifications',
        trigger: 'risk_level_change',
        condition: 'risk_above_threshold',
        action: 'send_notification',
        enabled: true,
        successRate: 98.7
      }
    ],

    // Chart data with predictions
    chartData: {
      historical: [
        { date: '2024-01', documents: 120, accuracy: 94, risk: 15 },
        { date: '2024-02', documents: 150, accuracy: 96, risk: 12 },
        { date: '2024-03', documents: 180, accuracy: 93, risk: 18 },
        { date: '2024-04', documents: 220, accuracy: 97, risk: 8 },
        { date: '2024-05', documents: 190, accuracy: 95, risk: 10 },
        { date: '2024-06', documents: 240, accuracy: 98, risk: 6 },
        { date: '2024-07', documents: 280, accuracy: 96, risk: 9 },
      ],
      predictions: [
        { date: '2024-08', documents: 310, accuracy: 97, risk: 7, confidence: 0.89 },
        { date: '2024-09', documents: 340, accuracy: 98, risk: 5, confidence: 0.84 },
        { date: '2024-10', documents: 360, accuracy: 96, risk: 8, confidence: 0.78 },
      ]
    },

    // Actions
    updateRealTimeData: (data) => set((state) => ({
      realTimeData: { ...state.realTimeData, ...data, lastUpdate: new Date().toISOString() }
    })),

    setConnectionStatus: (status) => set({ connectionStatus: status }),

    updateMetric: (metricKey, updates) => set((state) => ({
      metrics: {
        ...state.metrics,
        [metricKey]: { ...state.metrics[metricKey], ...updates }
      }
    })),

    updateProcessingPipeline: (updates) => set((state) => ({
      processingPipeline: state.processingPipeline.map(item => 
        item.id === updates.id ? { ...item, ...updates } : item
      )
    })),

    addProcessingItem: (item) => set((state) => ({
      processingPipeline: [item, ...state.processingPipeline]
    })),

    removeProcessingItem: (id) => set((state) => ({
      processingPipeline: state.processingPipeline.filter(item => item.id !== id)
    })),

    addAnomaly: (anomaly) => set((state) => ({
      anomalies: [anomaly, ...state.anomalies].slice(0, 10) // Keep only latest 10
    })),

    updateAnomalyStatus: (id, status) => set((state) => ({
      anomalies: state.anomalies.map(anomaly => 
        anomaly.id === id ? { ...anomaly, status } : anomaly
      )
    })),

    updateConversationContext: (updates) => set((state) => ({
      conversationContext: { ...state.conversationContext, ...updates }
    })),

    toggleAutomationRule: (id) => set((state) => ({
      automationRules: state.automationRules.map(rule => 
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    })),

    // Advanced selectors
    getProcessingProgress: () => {
      const { processingPipeline } = get();
      const total = processingPipeline.length;
      const completed = processingPipeline.filter(item => item.stage === 'complete').length;
      return total > 0 ? (completed / total) * 100 : 0;
    },

    getActiveAnomalies: () => {
      const { anomalies } = get();
      return anomalies.filter(anomaly => anomaly.status !== 'resolved');
    },

    getPredictionTrend: (metric) => {
      const { chartData } = get();
      const lastHistorical = chartData.historical[chartData.historical.length - 1];
      const firstPrediction = chartData.predictions[0];
      
      if (lastHistorical && firstPrediction) {
        const change = ((firstPrediction[metric] - lastHistorical[metric]) / lastHistorical[metric]) * 100;
        return {
          direction: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
          percentage: Math.abs(change).toFixed(1)
        };
      }
      return { direction: 'stable', percentage: '0' };
    },
  }))
);

export default useAuditStore;