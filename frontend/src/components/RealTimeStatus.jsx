import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Users, 
  FileText, 
  Cpu, 
  Wifi, 
  WifiOff, 
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import useAuditStore from '../store/useAuditStore';

const RealTimeStatus = () => {
  const { 
    realTimeData, 
    connectionStatus, 
    getProcessingProgress,
    getActiveAnomalies 
  } = useAuditStore();

  const processingProgress = getProcessingProgress();
  const activeAnomalies = getActiveAnomalies();

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'connecting':
        return <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <Activity className="w-4 h-4 text-yellow-500" />
        </motion.div>;
      case 'disconnected':
        return <WifiOff className="w-4 h-4 text-gray-500" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getConnectionStatus = () => {
    switch (connectionStatus) {
      case 'connected':
        return { text: 'Live', color: 'bg-green-100 text-green-700' };
      case 'connecting':
        return { text: 'Connecting', color: 'bg-yellow-100 text-yellow-700' };
      case 'disconnected':
        return { text: 'Offline', color: 'bg-gray-100 text-gray-700' };
      case 'error':
        return { text: 'Error', color: 'bg-red-100 text-red-700' };
      default:
        return { text: 'Unknown', color: 'bg-gray-100 text-gray-700' };
    }
  };

  const status = getConnectionStatus();

  const realTimeMetrics = [
    {
      icon: Users,
      label: 'Active Users',
      value: realTimeData.activeUsers,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: FileText,
      label: 'Processing',
      value: realTimeData.processingDocuments,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Cpu,
      label: 'AI Load',
      value: `${realTimeData.aiSystemLoad}%`,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ scale: connectionStatus === 'connected' ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {getConnectionIcon()}
            </motion.div>
            <span className="text-sm font-medium">Real-Time Status</span>
            <Badge variant="secondary" className={status.color}>
              {status.text}
            </Badge>
          </div>
          
          <div className="text-xs text-gray-500">
            Updated: {new Date(realTimeData.lastUpdate).toLocaleTimeString()}
          </div>
        </div>

        {/* Real-time metrics */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {realTimeMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${metric.bgColor} mb-1`}>
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
              </div>
              <div className="text-lg font-bold text-gray-900">{metric.value}</div>
              <div className="text-xs text-gray-600">{metric.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Processing Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Processing Pipeline</span>
            <span className="text-xs text-gray-500">{processingProgress.toFixed(0)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className="bg-indigo-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${processingProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Active Anomalies */}
        {activeAnomalies.length > 0 && (
          <div className="border-t pt-3">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Active Alerts</span>
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                {activeAnomalies.length}
              </Badge>
            </div>
            <div className="space-y-1">
              {activeAnomalies.slice(0, 2).map((anomaly) => (
                <div key={anomaly.id} className="text-xs text-gray-600 flex items-center space-x-1">
                  <div className={`w-2 h-2 rounded-full ${
                    anomaly.severity === 'high' ? 'bg-red-500' :
                    anomaly.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <span className="truncate">{anomaly.description}</span>
                </div>
              ))}
              {activeAnomalies.length > 2 && (
                <div className="text-xs text-gray-500">
                  +{activeAnomalies.length - 2} more alerts
                </div>
              )}
            </div>
          </div>
        )}

        {/* System Health Indicator */}
        <div className="border-t pt-3 mt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-700">System Health</span>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              Optimal
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeStatus;