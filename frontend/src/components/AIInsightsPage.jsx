import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle,
  Target,
  Zap,
  Eye,
  BarChart3,
  FileText,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import EnhancedAIConversation from './EnhancedAIConversation';
import IntelligentDocumentCard from './IntelligentDocumentCard';
import useAuditStore from '../store/useAuditStore';

const AIInsightsPage = () => {
  const [selectedInsightType, setSelectedInsightType] = useState('all');
  const { metrics, getActiveAnomalies } = useAuditStore();
  
  const insightTypes = [
    { value: 'all', label: 'All Insights', icon: Brain },
    { value: 'trends', label: 'Trends', icon: TrendingUp },
    { value: 'risks', label: 'Risks', icon: AlertTriangle },
    { value: 'opportunities', label: 'Opportunities', icon: Target }
  ];

  const aiInsights = [
    {
      id: 1,
      type: 'trend',
      priority: 'high',
      title: 'Document Processing Acceleration',
      description: 'AI detected a 23% increase in document processing efficiency over the last 30 days.',
      confidence: 94,
      impact: 'Projected 2.5 hours saved per week',
      recommendations: [
        'Scale processing infrastructure',
        'Implement automated categorization',
        'Optimize workflow routing'
      ],
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'risk',
      priority: 'medium',
      title: 'Compliance Deviation Pattern',
      description: 'Unusual pattern in approval workflows detected across financial documents.',
      confidence: 87,
      impact: 'Potential compliance risk if unchecked',
      recommendations: [
        'Review approval processes',
        'Implement additional checks',
        'Update compliance training'
      ],
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      type: 'opportunity',
      priority: 'high',
      title: 'Automation Potential Identified',
      description: 'AI identified 3 repetitive tasks that can be fully automated with 96% accuracy.',
      confidence: 96,
      impact: 'Potential 15 hours saved monthly',
      recommendations: [
        'Create automation rules',
        'Set up monitoring alerts',
        'Train team on new workflows'
      ],
      timestamp: '6 hours ago'
    },
    {
      id: 4,
      type: 'trend',
      priority: 'low',
      title: 'Quality Score Improvement',
      description: 'Consistent improvement in audit quality scores with AI assistance.',
      confidence: 91,
      impact: '12% improvement in accuracy',
      recommendations: [
        'Continue current practices',
        'Document best practices',
        'Share insights with team'
      ],
      timestamp: '1 day ago'
    }
  ];

  const filteredInsights = selectedInsightType === 'all' 
    ? aiInsights 
    : aiInsights.filter(insight => insight.type === selectedInsightType.slice(0, -1));

  const getInsightIcon = (type) => {
    switch (type) {
      case 'trend': return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'risk': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'opportunity': return <Target className="w-4 h-4 text-green-500" />;
      default: return <Lightbulb className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const insightStats = {
    totalInsights: aiInsights.length,
    highPriority: aiInsights.filter(i => i.priority === 'high').length,
    averageConfidence: Math.round(aiInsights.reduce((acc, i) => acc + i.confidence, 0) / aiInsights.length),
    trendsDetected: aiInsights.filter(i => i.type === 'trend').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Insights</h1>
          <p className="text-gray-600 mt-1">Intelligent analysis and recommendations powered by AI</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            <Brain className="w-3 h-3 mr-1" />
            {insightStats.totalInsights} Active Insights
          </Badge>
          <Button>
            <Eye className="w-4 h-4 mr-1" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Insights',
            value: insightStats.totalInsights,
            icon: Brain,
            color: 'purple'
          },
          {
            title: 'High Priority',
            value: insightStats.highPriority,
            icon: AlertTriangle,
            color: 'red'
          },
          {
            title: 'Avg Confidence',
            value: `${insightStats.averageConfidence}%`,
            icon: Target,
            color: 'green'
          },
          {
            title: 'Trends Detected',
            value: insightStats.trendsDetected,
            icon: TrendingUp,
            color: 'blue'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.title}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Insight Type Filters */}
      <div className="flex space-x-2">
        {insightTypes.map(type => (
          <Button
            key={type.value}
            variant={selectedInsightType === type.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedInsightType(type.value)}
            className="flex items-center space-x-1"
          >
            <type.icon className="w-4 h-4" />
            <span>{type.label}</span>
          </Button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* AI Insights List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-2 space-y-4"
        >
          {filteredInsights.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      {getInsightIcon(insight.type)}
                      <div>
                        <h3 className="font-semibold text-gray-900">{insight.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className={getPriorityColor(insight.priority)}>
                        {insight.priority}
                      </Badge>
                      <Badge variant="outline" className={getConfidenceColor(insight.confidence)}>
                        {insight.confidence}%
                      </Badge>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="w-4 h-4 text-indigo-600" />
                      <span className="font-medium text-gray-900">Impact</span>
                    </div>
                    <p className="text-sm text-gray-700">{insight.impact}</p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-gray-900">Recommendations</span>
                    </div>
                    <ul className="space-y-1">
                      {insight.recommendations.map((rec, recIndex) => (
                        <li key={recIndex} className="text-sm text-gray-700 flex items-center space-x-2">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500">{insight.timestamp}</span>
                    <Button variant="outline" size="sm">
                      <Eye className="w-3 h-3 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* AI Assistant and Document Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Enhanced AI Conversation */}
          <div className="h-[500px]">
            <EnhancedAIConversation />
          </div>

          {/* Smart Document Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Smart Document Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <IntelligentDocumentCard />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* AI Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-purple-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span>AI System Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-700">96.8%</div>
                <div className="text-sm text-purple-600">Analysis Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-700">1.2s</div>
                <div className="text-sm text-indigo-600">Avg Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-700">127</div>
                <div className="text-sm text-blue-600">Insights Generated Today</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AIInsightsPage;