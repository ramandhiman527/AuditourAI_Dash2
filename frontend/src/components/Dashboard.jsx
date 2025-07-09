import React, { useState } from 'react';
import { 
  FileText, 
  Brain, 
  Shield, 
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ScrollArea } from './ui/scroll-area';
import { mockMetrics, mockActivities, mockAIConversation } from '../data/mockData';
import AIMetricCard from './AIMetricCard';
import DocumentUploadZone from './DocumentUploadZone';
import AIConversationPanel from './AIConversationPanel';

const Dashboard = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const iconMap = {
    FileText: <FileText className="w-5 h-5 text-indigo-600" />,
    Brain: <Brain className="w-5 h-5 text-indigo-600" />,
    Shield: <Shield className="w-5 h-5 text-indigo-600" />,
    Clock: <Clock className="w-5 h-5 text-indigo-600" />
  };

  const handleFileUpload = (files) => {
    setUploadedFiles(prev => [...prev, ...files]);
    console.log('Files uploaded:', files);
  };

  const handleMetricClick = (metricData) => {
    console.log('Metric clicked:', metricData);
    // You can implement navigation to detailed view here
  };

  const handleSendMessage = (message) => {
    console.log('Message sent:', message);
    // Handle message sending logic here
  };

  const getActivityIcon = (type) => {
    const iconClasses = "w-4 h-4";
    switch (type) {
      case 'document_upload': return <FileText className={`${iconClasses} text-blue-500`} />;
      case 'ai_analysis': return <Brain className={`${iconClasses} text-purple-500`} />;
      case 'risk_alert': return <Shield className={`${iconClasses} text-red-500`} />;
      default: return <FileText className={`${iconClasses} text-gray-500`} />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Enhanced Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric) => (
          <AIMetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            aiInsight={metric.aiInsight}
            icon={iconMap[metric.icon]}
            trend={metric.trend}
            onDetailsClick={handleMetricClick}
            confidence={Math.floor(Math.random() * 20) + 80} // Random confidence between 80-100
            additionalData={{
              recommendations: [
                "Review monthly performance trends",
                "Focus on high-impact areas",
                "Implement suggested improvements"
              ]
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enhanced File Upload Zone */}
        <Card className="lg:col-span-1">
          <DocumentUploadZone
            onUpload={handleFileUpload}
            processing={false}
            maxFiles={10}
            aiAnalysisEnabled={true}
          />
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-80">
              <div className="space-y-4">
                {mockActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-600">{activity.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{activity.timestamp}</span>
                        <span className="text-xs text-gray-500">{activity.user}</span>
                      </div>
                      {activity.aiAction && (
                        <p className="text-xs text-indigo-600 bg-indigo-50 p-2 rounded">
                          🤖 {activity.aiAction}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Enhanced AI Conversation Panel */}
        <div className="lg:col-span-1">
          <AIConversationPanel
            initialMessages={mockAIConversation}
            onSendMessage={handleSendMessage}
            aiStatus="online"
            showQuickActions={true}
            showConfidence={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;