import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Upload, 
  Brain, 
  Search, 
  BarChart3, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Eye,
  ChevronDown,
  ChevronUp,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { processingStages, mockProcessingPipeline } from '../data/documentMockData';

const ProcessingPipelineVisualization = ({ 
  documents = mockProcessingPipeline,
  showConfidence = true,
  expandableDetails = true 
}) => {
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

  const getStageIcon = (stage) => {
    switch (stage) {
      case 'upload':
        return <Upload className="w-4 h-4" />;
      case 'ai-scan':
        return <Brain className="w-4 h-4" />;
      case 'extract':
        return <Search className="w-4 h-4" />;
      case 'analyze':
        return <BarChart3 className="w-4 h-4" />;
      case 'complete':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStageColor = (stage, isActive = false) => {
    const colors = {
      upload: isActive ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700',
      'ai-scan': isActive ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700',
      extract: isActive ? 'bg-orange-600 text-white' : 'bg-orange-100 text-orange-700',
      analyze: isActive ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700',
      complete: isActive ? 'bg-gray-600 text-white' : 'bg-gray-100 text-gray-700'
    };
    return colors[stage] || 'bg-gray-100 text-gray-700';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getOverallProgress = () => {
    if (documents.length === 0) return 0;
    const totalStages = documents.length * processingStages.length;
    const completedStages = documents.reduce((acc, doc) => {
      return acc + doc.stageIndex + (doc.progress / 100);
    }, 0);
    return Math.round((completedStages / totalStages) * 100);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Processing Pipeline</span>
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
              Real-time
            </Badge>
          </CardTitle>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Progress: <span className="font-bold">{getOverallProgress()}%</span>
            </div>
            <Badge variant="outline">
              {documents.length} items
            </Badge>
          </div>
        </div>

        {/* Pipeline Stages Overview */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Pipeline Stages</span>
            <span className="text-xs text-gray-500">Confidence shown when available</span>
          </div>
          
          <div className="flex items-center space-x-2">
            {processingStages.map((stage, index) => (
              <React.Fragment key={stage.key}>
                <div className="flex flex-col items-center space-y-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    documents.some(doc => doc.stage === stage.key) 
                      ? getStageColor(stage.key, true)
                      : getStageColor(stage.key, false)
                  }`}>
                    {getStageIcon(stage.key)}
                  </div>
                  <span className="text-xs text-gray-600 text-center">{stage.label}</span>
                </div>
                
                {index < processingStages.length - 1 && (
                  <div className="flex-1 mx-2">
                    <div className="h-1 bg-gray-200 rounded-full">
                      <motion.div 
                        className="h-1 bg-indigo-600 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ 
                          width: documents.some(doc => doc.stageIndex > index) ? '100%' : '20%'
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <AnimatePresence>
            {documents.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                className="border rounded-lg hover:shadow-md transition-shadow"
              >
                {/* Main Item */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          getStageColor(item.stage, true)
                        }`}>
                          {getStageIcon(item.stage)}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900">{item.fileName}</h4>
                          {item.aiClassification && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                              {item.aiClassification}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="capitalize">{item.stage.replace('-', ' ')} stage</span>
                          <span>•</span>
                          <span>{item.estimatedTime}</span>
                          {showConfidence && item.confidence && (
                            <>
                              <span>•</span>
                              <span className={getConfidenceColor(item.confidence)}>
                                {item.confidence}% confidence
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {item.errors.length > 0 && (
                        <Badge variant="secondary" className="bg-red-100 text-red-700">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {item.errors.length} issues
                        </Badge>
                      )}
                      
                      {expandableDetails && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpanded(item.id)}
                        >
                          {expandedItems.has(item.id) ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>Stage Progress</span>
                      <span>{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>

                  {/* Stage Indicators */}
                  <div className="mt-3 flex items-center space-x-1">
                    {processingStages.map((stage, stageIndex) => (
                      <div
                        key={stage.key}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          stageIndex < item.stageIndex 
                            ? 'bg-green-500' 
                            : stageIndex === item.stageIndex
                            ? 'bg-indigo-600 animate-pulse'
                            : 'bg-gray-300'
                        }`}
                        title={stage.label}
                      />
                    ))}
                  </div>
                </div>

                {/* Expandable Details */}
                <AnimatePresence>
                  {expandedItems.has(item.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t bg-gray-50"
                    >
                      <div className="p-4 space-y-3">
                        {/* Confidence Breakdown */}
                        {showConfidence && item.confidence && (
                          <div>
                            <h5 className="text-sm font-medium text-gray-800 mb-2">
                              AI Confidence Analysis
                            </h5>
                            <div className="flex items-center space-x-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2">
                                <motion.div 
                                  className={`h-2 rounded-full ${
                                    item.confidence >= 90 ? 'bg-green-500' :
                                    item.confidence >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                  initial={{ width: 0 }}
                                  animate={{ width: `${item.confidence}%` }}
                                  transition={{ delay: 0.2, duration: 0.5 }}
                                />
                              </div>
                              <span className="text-sm font-medium">{item.confidence}%</span>
                            </div>
                          </div>
                        )}

                        {/* Extracted Data */}
                        {item.extractedData && (
                          <div>
                            <h5 className="text-sm font-medium text-gray-800 mb-2">
                              Extracted Information
                            </h5>
                            <div className="bg-white rounded p-3 space-y-1">
                              {Object.entries(item.extractedData).map(([key, value]) => (
                                <div key={key} className="flex justify-between text-sm">
                                  <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                  <span className="font-medium text-gray-900">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Errors */}
                        {item.errors.length > 0 && (
                          <div>
                            <h5 className="text-sm font-medium text-red-800 mb-2">
                              Issues Detected
                            </h5>
                            <ul className="space-y-1">
                              {item.errors.map((error, errorIndex) => (
                                <li key={errorIndex} className="flex items-center space-x-2 text-sm text-red-700">
                                  <AlertTriangle className="w-3 h-3" />
                                  <span>{error}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Stage Details */}
                        <div>
                          <h5 className="text-sm font-medium text-gray-800 mb-2">
                            Current Stage: {processingStages[item.stageIndex]?.label}
                          </h5>
                          <p className="text-sm text-gray-600">
                            {processingStages[item.stageIndex]?.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          {documents.length === 0 && (
            <motion.div 
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Pipeline Clear</h3>
              <p className="text-gray-600">No documents currently processing</p>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProcessingPipelineVisualization;