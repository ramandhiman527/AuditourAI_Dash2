import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Activity, 
  TrendingUp, 
  Brain, 
  Zap,
  BarChart3,
  FileText,
  AlertTriangle,
  Users
} from 'lucide-react';
import useAuditStore from '../store/useAuditStore';
import websocketService from '../services/websocketService';

// Import Phase 2 components
import RealTimeStatus from './RealTimeStatus';
import PredictiveChart from './PredictiveChart';
import AnomalyDetection from './AnomalyDetection';
import ProcessingPipeline from './ProcessingPipeline';
import WorkflowAutomation from './WorkflowAutomation';
import EnhancedAIConversation from './EnhancedAIConversation';
import IntelligentDocumentCard from './IntelligentDocumentCard';

// Phase 1 components
import AIMetricCard from './AIMetricCard';
import DocumentUploadZone from './DocumentUploadZone';

const EnhancedDashboard = () => {
  const { 
    metrics, 
    realTimeData, 
    connectionStatus,
    processingPipeline,
    getActiveAnomalies 
  } = useAuditStore();

  useEffect(() => {
    // Initialize WebSocket connection for real-time features
    websocketService.connect();
    
    return () => {
      websocketService.disconnect();
    };
  }, []);

  const iconMap = {
    FileText: <FileText className="w-5 h-5 text-indigo-600" />,
    Brain: <Brain className="w-5 h-5 text-indigo-600" />,
    AlertTriangle: <AlertTriangle className="w-5 h-5 text-indigo-600" />,
    Activity: <Activity className="w-5 h-5 text-indigo-600" />
  };

  const handleMetricClick = (metricData) => {
    console.log('Enhanced metric clicked:', metricData);
  };

  const handleFileUpload = (files) => {
    console.log('Files uploaded:', files);
  };

  const activeAnomalies = getActiveAnomalies();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6 bg-gray-50 min-h-screen"
    >
      {/* Real-time Status Bar */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-gray-900">Enhanced AI Audit Dashboard</h1>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Activity className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Active Users: <span className="font-bold text-indigo-600">{realTimeData.activeUsers}</span>
            </div>
            <div className="text-sm text-gray-600">
              Processing: <span className="font-bold text-purple-600">{realTimeData.processingDocuments}</span>
            </div>
            <div className="text-sm text-gray-600">
              AI Load: <span className="font-bold text-blue-600">{realTimeData.aiSystemLoad}%</span>
            </div>
          </div>
        </div>
        <RealTimeStatus />
      </motion.div>

      {/* Enhanced Metric Cards */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {Object.entries(metrics).map(([key, metric]) => (
            <AIMetricCard
              key={key}
              title={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
              value={typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
              change={`${metric.change > 0 ? '+' : ''}${metric.change}%`}
              aiInsight={`AI predicts ${metric.prediction}. Confidence: ${metric.confidence}%`}
              icon={iconMap[key === 'totalDocuments' ? 'FileText' : 
                          key === 'aiAnalysisScore' ? 'Brain' : 
                          key === 'riskLevel' ? 'AlertTriangle' : 'Activity']}
              trend={metric.change > 0 ? 'up' : metric.change < 0 ? 'down' : 'neutral'}
              onDetailsClick={handleMetricClick}
              confidence={metric.confidence}
              additionalData={{
                prediction: metric.prediction,
                recommendations: [
                  "Monitor trend continuation",
                  "Review performance indicators",
                  "Optimize based on AI insights"
                ]
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - Analytics and Predictions */}
        <motion.div variants={itemVariants} className="xl:col-span-2 space-y-6">
          {/* Predictive Analytics Chart */}
          <PredictiveChart 
            title="Document Processing Trends & Predictions"
            metric="documents"
            height={400}
          />
          
          {/* Anomaly Detection */}
          <AnomalyDetection />
          
          {/* Processing Pipeline */}
          <ProcessingPipeline />
        </motion.div>

        {/* Right Column - AI and Automation */}
        <motion.div variants={itemVariants} className="space-y-6">
          {/* Enhanced AI Conversation */}
          <div className="h-[600px]">
            <EnhancedAIConversation />
          </div>
          
          {/* Document Upload with AI Analysis */}
          <DocumentUploadZone
            onUpload={handleFileUpload}
            processing={false}
            maxFiles={10}
            aiAnalysisEnabled={true}
          />
        </motion.div>
      </div>

      {/* Advanced Features Row */}
      <motion.div variants={itemVariants}>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Workflow Automation */}
          <WorkflowAutomation />
          
          {/* Intelligent Document Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>Intelligent Document Analysis</span>
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  AI Enhanced
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <IntelligentDocumentCard />
                
                {/* Additional smart insights */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Zap className="w-4 h-4 text-indigo-600" />
                    <span className="font-medium text-gray-900">Smart Insights</span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-center justify-between">
                      <span>Document Processing Efficiency</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        +23%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>AI Analysis Accuracy</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        96.8%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Automation Success Rate</span>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        94.2%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* System Performance Metrics */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">System Performance</h3>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                All Systems Operational
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{connectionStatus === 'connected' ? '100%' : '0%'}</div>
                <div className="text-sm text-gray-300">Connection Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">{processingPipeline.length}</div>
                <div className="text-sm text-gray-300">Items in Pipeline</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">{activeAnomalies.length}</div>
                <div className="text-sm text-gray-300">Active Anomalies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">1.2s</div>
                <div className="text-sm text-gray-300">Avg Response Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedDashboard;