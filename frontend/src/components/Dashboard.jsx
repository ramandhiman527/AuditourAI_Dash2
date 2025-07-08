import React, { useState } from 'react';
import { 
  FileText, 
  Brain, 
  Shield, 
  Clock,
  TrendingUp,
  TrendingDown,
  Upload,
  MessageCircle,
  Send,
  Bot,
  User
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { mockMetrics, mockActivities, mockAIConversation } from '../data/mockData';

const Dashboard = () => {
  const [dragActive, setDragActive] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [conversation, setConversation] = useState(mockAIConversation);

  const iconMap = {
    FileText,
    Brain,
    Shield,
    Clock
  };

  const getIcon = (iconName) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon className="w-5 h-5" /> : null;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // Mock file upload
      console.log('Files dropped:', files);
      // Here you would typically upload files to server
    }
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newUserMessage = {
        id: Date.now(),
        type: 'user',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setConversation([...conversation, newUserMessage]);
      setChatMessage('');
      
      // Mock AI response
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          type: 'ai',
          message: `I understand you're asking about "${chatMessage}". Based on my analysis of your audit documents, I can provide relevant insights. Would you like me to elaborate on any specific aspect?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setConversation(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'document_upload': return <Upload className="w-4 h-4 text-blue-500" />;
      case 'ai_analysis': return <Brain className="w-4 h-4 text-purple-500" />;
      case 'risk_alert': return <Shield className="w-4 h-4 text-red-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric) => (
          <Card key={metric.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    {getIcon(metric.icon)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                </div>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">{metric.aiInsight}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* File Upload Zone */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload Documents</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Drag & drop documents here, or click to select
              </p>
              <Button variant="outline" size="sm">
                Browse Files
              </Button>
              <div className="mt-4 text-xs text-gray-500">
                <p>Supported: PDF, DOCX, XLSX</p>
                <p>Max size: 10MB</p>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">AI Analysis</span>
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  Ready
                </Badge>
              </div>
              <div className="text-xs text-gray-500">
                Documents will be automatically analyzed by AI for insights and compliance checks.
              </div>
            </div>
          </CardContent>
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
                        <Badge variant="outline" className="text-xs">
                          {activity.user}
                        </Badge>
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

        {/* AI Conversation Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>AI Assistant</span>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                Online
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64 mb-4">
              <div className="space-y-4">
                {conversation.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-lg ${
                      message.type === 'user' 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <div className="flex items-center space-x-2 mb-1">
                        {message.type === 'ai' ? (
                          <Bot className="w-4 h-4" />
                        ) : (
                          <User className="w-4 h-4" />
                        )}
                        <span className="text-xs opacity-75">{message.timestamp}</span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="flex space-x-2">
              <Input
                placeholder="Ask AI about your audit data..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;