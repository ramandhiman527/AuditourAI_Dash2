import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  Clock, 
  Upload, 
  CheckCircle, 
  X,
  Calendar,
  FileText,
  Brain,
  Target,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  Shield
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { mockMissingDocuments } from '../data/documentMockData';

const MissingDocsAlert = ({ 
  auditPhase = 'fieldwork',
  missingDocs = mockMissingDocuments,
  recommendations = true,
  onUploadClick,
  onDismiss
}) => {
  const [dismissed, setDismissed] = useState(new Set());
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const handleDismiss = (id) => {
    const newDismissed = new Set(dismissed);
    newDismissed.add(id);
    setDismissed(newDismissed);
    
    if (onDismiss) {
      onDismiss(id);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'low': return <Target className="w-4 h-4 text-green-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getPhaseIcon = (phase) => {
    switch (phase) {
      case 'planning': return <Brain className="w-4 h-4 text-blue-600" />;
      case 'fieldwork': return <FileText className="w-4 h-4 text-purple-600" />;
      case 'substantive': return <Shield className="w-4 h-4 text-orange-600" />;
      case 'completion': return <CheckCircle className="w-4 h-4 text-green-600" />;
      default: return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const formatDeadline = (deadline) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: 'Overdue', color: 'text-red-600', urgent: true };
    } else if (diffDays === 0) {
      return { text: 'Due Today', color: 'text-red-600', urgent: true };
    } else if (diffDays === 1) {
      return { text: 'Due Tomorrow', color: 'text-orange-600', urgent: true };
    } else if (diffDays <= 7) {
      return { text: `Due in ${diffDays} days`, color: 'text-yellow-600', urgent: false };
    } else {
      return { text: `Due in ${diffDays} days`, color: 'text-green-600', urgent: false };
    }
  };

  const activeDocs = missingDocs.filter(doc => !dismissed.has(doc.id));
  const totalDocs = activeDocs.length;
  const highPriority = activeDocs.filter(doc => doc.priority === 'high').length;
  const overdueDocs = activeDocs.filter(doc => formatDeadline(doc.deadline).urgent).length;

  const getCompletionPercentage = () => {
    const totalExpected = missingDocs.length + 20; // Assuming 20 total expected docs
    const completed = 20; // Assuming 20 docs already obtained
    return Math.round((completed / totalExpected) * 100);
  };

  if (activeDocs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full"
      >
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold text-green-900">
                  All Required Documents Obtained
                </h3>
                <p className="text-green-700">
                  Great job! All necessary documents for the {auditPhase} phase have been collected.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Summary Card */}
      <Card className="bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <span>Missing Documents Alert</span>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                {auditPhase.charAt(0).toUpperCase() + auditPhase.slice(1)} Phase
              </Badge>
            </CardTitle>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-red-300 text-red-700">
                {totalDocs} Missing
              </Badge>
              {highPriority > 0 && (
                <Badge variant="secondary" className="bg-red-100 text-red-700">
                  {highPriority} High Priority
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{totalDocs}</div>
              <div className="text-sm text-gray-600">Documents Needed</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl font-bold text-red-600">{overdueDocs}</div>
              <div className="text-sm text-gray-600">Urgent Items</div>
            </div>
            <div className="text-center p-3 bg-white rounded-lg">
              <div className="text-2xl font-bold text-green-600">{getCompletionPercentage()}%</div>
              <div className="text-sm text-gray-600">Overall Progress</div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Audit Documentation Progress</span>
              <span className="font-medium">{getCompletionPercentage()}%</span>
            </div>
            <Progress value={getCompletionPercentage()} className="h-2" />
          </div>
          
          {recommendations && (
            <div className="bg-white rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Brain className="w-4 h-4 text-indigo-600" />
                <span className="font-medium text-gray-900">AI Recommendations</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Lightbulb className="w-3 h-3 text-yellow-500" />
                  <span className="text-gray-700">Focus on high-priority items first to reduce audit risk</span>
                </div>
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-gray-700">Contact stakeholders now to avoid delays</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-3 h-3 text-blue-500" />
                  <span className="text-gray-700">Set up automated reminders for upcoming deadlines</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Missing Documents List */}
      <div className="space-y-3">
        <AnimatePresence>
          {activeDocs.map((doc, index) => {
            const deadline = formatDeadline(doc.deadline);
            const isExpanded = expandedItems.has(doc.id);
            
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="w-full"
              >
                <Card className={`hover:shadow-md transition-shadow ${
                  deadline.urgent ? 'ring-1 ring-red-200' : ''
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="mt-1">
                          {getPriorityIcon(doc.priority)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-gray-900">{doc.documentType}</h4>
                            <Badge variant="secondary" className={getPriorityColor(doc.priority)}>
                              {doc.priority.toUpperCase()}
                            </Badge>
                            <Badge variant="outline" className="flex items-center space-x-1">
                              {getPhaseIcon(doc.auditPhase)}
                              <span className="capitalize">{doc.auditPhase}</span>
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                          
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span className={deadline.color}>{deadline.text}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Shield className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600 capitalize">{doc.estimatedRisk} risk</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleExpanded(doc.id)}
                        >
                          {isExpanded ? 'Less' : 'More'}
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDismiss(doc.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden mt-4 pt-4 border-t"
                        >
                          <div className="space-y-4">
                            {/* Impact */}
                            <div>
                              <h5 className="text-sm font-medium text-gray-800 mb-1">Impact</h5>
                              <p className="text-sm text-gray-600">{doc.impact}</p>
                            </div>
                            
                            {/* AI Recommendation */}
                            <div>
                              <h5 className="text-sm font-medium text-gray-800 mb-1 flex items-center space-x-1">
                                <Brain className="w-3 h-3 text-indigo-600" />
                                <span>AI Recommendation</span>
                              </h5>
                              <p className="text-sm text-indigo-700 bg-indigo-50 p-2 rounded">
                                {doc.aiRecommendation}
                              </p>
                            </div>
                            
                            {/* Related Transactions */}
                            {doc.relatedTransactions && (
                              <div>
                                <h5 className="text-sm font-medium text-gray-800 mb-2">Related Items</h5>
                                <div className="flex flex-wrap gap-1">
                                  {doc.relatedTransactions.map((transaction, i) => (
                                    <Badge key={i} variant="outline" className="text-xs">
                                      {transaction}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            {/* Action Buttons */}
                            <div className="flex items-center space-x-2 pt-2">
                              <Button
                                size="sm"
                                onClick={() => onUploadClick && onUploadClick(doc.documentType)}
                                className="bg-indigo-600 hover:bg-indigo-700"
                              >
                                <Upload className="w-3 h-3 mr-1" />
                                Upload Document
                              </Button>
                              <Button variant="outline" size="sm">
                                <Calendar className="w-3 h-3 mr-1" />
                                Set Reminder
                              </Button>
                              <Button variant="outline" size="sm">
                                <ArrowRight className="w-3 h-3 mr-1" />
                                Contact Source
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MissingDocsAlert;