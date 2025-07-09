import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Eye,
  Download,
  Share2,
  MoreVertical,
  Clock,
  Target,
  Zap,
  Star
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';

const IntelligentDocumentCard = ({ 
  document = {
    id: 1,
    name: 'Financial_Audit_Q3_2024.pdf',
    type: 'pdf',
    size: '2.4 MB',
    uploadDate: '2024-01-15',
    aiAnalysis: {
      score: 94,
      status: 'completed',
      insights: [
        'Strong compliance indicators found',
        'Minor discrepancies in expense categorization',
        'Recommended for quarterly review'
      ],
      riskFactors: [
        { factor: 'Compliance Risk', level: 'Low', score: 15 },
        { factor: 'Financial Risk', level: 'Medium', score: 35 },
        { factor: 'Operational Risk', level: 'Low', score: 20 }
      ],
      predictions: {
        nextReviewDate: '2024-04-15',
        confidenceLevel: 92,
        recommendedActions: ['Update expense classifications', 'Schedule follow-up review']
      }
    },
    contextualActions: [
      { action: 'generate_summary', label: 'AI Summary', priority: 'high' },
      { action: 'compliance_check', label: 'Compliance Check', priority: 'medium' },
      { action: 'risk_analysis', label: 'Risk Analysis', priority: 'medium' }
    ]
  }
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAIDetails, setShowAIDetails] = useState(false);

  const getFileIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'docx': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'xlsx': return <FileText className="w-5 h-5 text-green-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'analyzing': return <Brain className="w-4 h-4 text-purple-500 animate-pulse" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRiskColor = (level) => {
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <Star className="w-3 h-3 text-red-500" />;
      case 'medium': return <Target className="w-3 h-3 text-yellow-500" />;
      case 'low': return <Clock className="w-3 h-3 text-green-500" />;
      default: return <Zap className="w-3 h-3 text-gray-500" />;
    }
  };

  const handleAction = (action) => {
    console.log(`Executing action: ${action} on document: ${document.name}`);
    // Implement action logic here
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 hover:border-indigo-200">
        <CardContent className="p-0">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="mt-1"
                >
                  {getFileIcon(document.type)}
                </motion.div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 group-hover:text-indigo-700 transition-colors">
                    {document.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                    <span>{document.size}</span>
                    <span>•</span>
                    <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleAction('view')}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Document
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('download')}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('share')}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* AI Analysis Status */}
          <div className="px-4 py-3 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getStatusIcon(document.aiAnalysis.status)}
                <span className="text-sm font-medium capitalize">
                  AI Analysis {document.aiAnalysis.status}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                  <Brain className="w-3 h-3 mr-1" />
                  Score: {document.aiAnalysis.score}%
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAIDetails(!showAIDetails)}
                  className="text-xs"
                >
                  {showAIDetails ? 'Hide' : 'Show'} Details
                </Button>
              </div>
            </div>

            <Progress value={document.aiAnalysis.score} className="h-2 mb-2" />
            
            <div className="text-xs text-gray-600">
              Confidence: {document.aiAnalysis.predictions.confidenceLevel}% • 
              Next Review: {new Date(document.aiAnalysis.predictions.nextReviewDate).toLocaleDateString()}
            </div>
          </div>

          {/* Expandable AI Details */}
          <AnimatePresence>
            {showAIDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-gray-100"
              >
                <div className="p-4 space-y-4">
                  {/* AI Insights */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
                      <Brain className="w-4 h-4 mr-1 text-indigo-600" />
                      Key Insights
                    </h4>
                    <ul className="space-y-1">
                      {document.aiAnalysis.insights.map((insight, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="text-xs text-gray-600 flex items-start space-x-2"
                        >
                          <span className="text-indigo-500 mt-1">•</span>
                          <span>{insight}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Risk Factors */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1 text-yellow-600" />
                      Risk Assessment
                    </h4>
                    <div className="space-y-2">
                      {document.aiAnalysis.riskFactors.map((risk, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between"
                        >
                          <span className="text-xs text-gray-700">{risk.factor}</span>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary" className={`text-xs ${getRiskColor(risk.level)}`}>
                              {risk.level}
                            </Badge>
                            <span className="text-xs text-gray-500">{risk.score}%</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Actions */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-2 flex items-center">
                      <Target className="w-4 h-4 mr-1 text-green-600" />
                      Recommended Actions
                    </h4>
                    <div className="space-y-1">
                      {document.aiAnalysis.predictions.recommendedActions.map((action, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="text-xs text-gray-600 flex items-center space-x-2"
                        >
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{action}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Contextual Actions */}
          <div className="p-4 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-700">AI Suggested Actions</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-xs"
              >
                {isExpanded ? 'Less' : 'More'}
              </Button>
            </div>
            
            <div className={`grid gap-2 ${isExpanded ? 'grid-cols-1' : 'grid-cols-3'}`}>
              {document.contextualActions.slice(0, isExpanded ? undefined : 3).map((action, index) => (
                <motion.button
                  key={action.action}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleAction(action.action)}
                  className="flex items-center space-x-1 px-2 py-1 bg-white hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 rounded text-xs transition-all group"
                >
                  {getPriorityIcon(action.priority)}
                  <span className="text-gray-700 group-hover:text-indigo-700 truncate">
                    {action.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default IntelligentDocumentCard;