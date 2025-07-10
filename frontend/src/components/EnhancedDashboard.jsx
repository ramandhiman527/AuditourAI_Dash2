import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  ThemedCard,
  ThemedCardHeader,
  ThemedCardTitle,
  ThemedCardSubtitle,
  ThemedCardContent,
  ThemedProgress,
  ThemedButton,
  StatusBadge,
  MetricCard,
} from "./ui/themed-card";
import {
  Activity,
  TrendingUp,
  Brain,
  FileText,
  AlertTriangle,
} from "lucide-react";
import useAuditStore from "../store/useAuditStore";
import websocketService from "../services/websocketService";

// Import Phase 2 components
import RealTimeStatus from "./RealTimeStatus";
import AIMetricCard from "./AIMetricCard";
import DocumentUploadZone from "./DocumentUploadZone";
import EnhancedAIConversation from "./EnhancedAIConversation";

const EnhancedDashboard = () => {
  const { metrics, realTimeData, connectionStatus } = useAuditStore();

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
    Activity: <Activity className="w-5 h-5 text-indigo-600" />,
  };

  const handleMetricClick = (metricData) => {
    console.log("Enhanced metric clicked:", metricData);
  };

  const handleFileUpload = (files) => {
    console.log("Files uploaded:", files);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6 bg-gray-50 min-h-screen"
    >
      {/* Real-time Status Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold text-gray-900">
              Enhanced AI Audit Dashboard
            </h1>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Activity className="w-3 h-3 mr-1" />
              Live
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Active Users:{" "}
              <span className="font-bold text-indigo-600">
                {realTimeData.activeUsers}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              Processing:{" "}
              <span className="font-bold text-purple-600">
                {realTimeData.processingDocuments}
              </span>
            </div>
            <div className="text-sm text-gray-600">
              AI Load:{" "}
              <span className="font-bold text-blue-600">
                {realTimeData.aiSystemLoad}%
              </span>
            </div>
          </div>
        </div>
        <RealTimeStatus />
      </div>

      {/* Enhanced Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {Object.entries(metrics).map(([key, metric]) => (
          <AIMetricCard
            key={key}
            title={
              key.charAt(0).toUpperCase() +
              key.slice(1).replace(/([A-Z])/g, " $1")
            }
            value={
              typeof metric.value === "number"
                ? metric.value.toLocaleString()
                : metric.value
            }
            change={`${metric.change > 0 ? "+" : ""}${metric.change}%`}
            aiInsight={`AI predicts ${metric.prediction}. Confidence: ${metric.confidence}%`}
            icon={
              iconMap[
                key === "totalDocuments"
                  ? "FileText"
                  : key === "aiAnalysisScore"
                    ? "Brain"
                    : key === "riskLevel"
                      ? "AlertTriangle"
                      : "Activity"
              ]
            }
            trend={
              metric.change > 0 ? "up" : metric.change < 0 ? "down" : "neutral"
            }
            onDetailsClick={handleMetricClick}
            confidence={metric.confidence}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Document Upload with AI Analysis */}
          <DocumentUploadZone
            onUpload={handleFileUpload}
            processing={false}
            maxFiles={10}
            aiAnalysisEnabled={true}
          />

          {/* System Performance */}
          <Card className="bg-gradient-to-r from-gray-900 to-indigo-900 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">System Performance</h3>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700"
                >
                  All Systems Operational
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">
                    {connectionStatus === "connected" ? "100%" : "0%"}
                  </div>
                  <div className="text-sm text-gray-300">Connection Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">
                    {realTimeData.processingDocuments}
                  </div>
                  <div className="text-sm text-gray-300">Processing Items</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400">
                    96.8%
                  </div>
                  <div className="text-sm text-gray-300">AI Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">1.2s</div>
                  <div className="text-sm text-gray-300">Response Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Enhanced AI Conversation */}
        <div className="h-[600px]">
          <EnhancedAIConversation />
        </div>
      </div>
    </motion.div>
  );
};

export default EnhancedDashboard;
