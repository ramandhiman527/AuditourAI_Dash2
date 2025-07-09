import React from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Brain, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  FileText,
  Zap,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import useAuditStore from '../store/useAuditStore';

const ProcessingPipeline = () => {
  const { processingPipeline, updateProcessingPipeline } = useAuditStore();

  const getStageIcon = (stage) => {
    switch (stage) {
      case 'upload':
        return <Upload className="w-4 h-4" />;
      case 'analysis':
        return <Brain className="w-4 h-4" />;
      case 'complete':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'upload':
        return 'bg-blue-100 text-blue-700';
      case 'analysis':
        return 'bg-purple-100 text-purple-700';
      case 'complete':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const stages = [
    { key: 'upload', label: 'Upload', description: 'File received and validated' },
    { key: 'analysis', label: 'AI Analysis', description: 'Processing with AI algorithms' },
    { key: 'complete', label: 'Complete', description: 'Analysis finished and results ready' }
  ];

  const getStageProgress = (currentStage, targetStage) => {
    const stageOrder = ['upload', 'analysis', 'complete'];
    const currentIndex = stageOrder.indexOf(currentStage);
    const targetIndex = stageOrder.indexOf(targetStage);
    
    if (currentIndex >= targetIndex) return 100;
    if (currentIndex === targetIndex - 1) return 50;
    return 0;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5" />
          <span>Processing Pipeline</span>
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
            Real-time
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Pipeline Stage Overview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            {stages.map((stage, index) => (
              <React.Fragment key={stage.key}>
                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    processingPipeline.some(item => item.stage === stage.key && item.stage !== 'complete')
                      ? 'bg-indigo-600 text-white animate-pulse'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {getStageIcon(stage.key)}
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{stage.label}</div>
                    <div className="text-xs text-gray-500 max-w-20">{stage.description}</div>
                  </div>
                </div>
                
                {index < stages.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div className="h-1 bg-gray-200 rounded-full">
                      <motion.div 
                        className="h-1 bg-indigo-600 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ 
                          width: processingPipeline.some(item => 
                            stages.indexOf(stages.find(s => s.key === item.stage)) > index
                          ) ? '100%' : '30%'
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

        {/* Document Queue */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Current Queue ({processingPipeline.length} items)
          </h4>
          
          {processingPipeline.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-lg p-4 ${getPriorityColor(item.priority)} transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <FileText className="w-4 h-4 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-xs text-gray-600">Priority: {item.priority}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className={getStageColor(item.stage)}>
                    {getStageIcon(item.stage)}
                    <span className="ml-1 capitalize">{item.stage}</span>
                  </Badge>
                  <span className="text-xs text-gray-500">{item.estimatedTime}</span>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Upload Progress</span>
                    <span className="text-xs font-medium">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-1.5" />
                </div>

                {item.stage === 'analysis' && (
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-600">AI Analysis</span>
                      <span className="text-xs font-medium">{item.aiProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <motion.div 
                        className="bg-purple-600 h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${item.aiProgress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Stage Indicators */}
              <div className="mt-3 flex items-center space-x-2">
                {stages.map((stage, stageIndex) => (
                  <React.Fragment key={stage.key}>
                    <div className={`w-3 h-3 rounded-full transition-colors ${
                      item.stage === stage.key 
                        ? 'bg-indigo-600 animate-pulse' 
                        : getStageProgress(item.stage, stage.key) === 100
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`} />
                    {stageIndex < stages.length - 1 && (
                      <div className={`w-4 h-0.5 ${
                        getStageProgress(item.stage, stages[stageIndex + 1].key) > 0
                          ? 'bg-indigo-600'
                          : 'bg-gray-300'
                      }`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          ))}

          {processingPipeline.length === 0 && (
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

export default ProcessingPipeline;