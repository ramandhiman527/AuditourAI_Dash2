import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Brain, 
  TrendingUp,
  Eye,
  MoreVertical,
  Filter,
  Search
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import useAuditStore from '../store/useAuditStore';

const AnomalyDetection = () => {
  const { anomalies, updateAnomalyStatus } = useAuditStore();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAnomalies = anomalies.filter(anomaly => {
    const matchesFilter = filter === 'all' || anomaly.status === filter || anomaly.severity === filter;
    const matchesSearch = anomaly.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         anomaly.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <AlertTriangle className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'investigating':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-700';
      case 'investigating': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleStatusChange = (anomalyId, newStatus) => {
    updateAnomalyStatus(anomalyId, newStatus);
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const anomalyStats = {
    total: anomalies.length,
    active: anomalies.filter(a => a.status !== 'resolved').length,
    high: anomalies.filter(a => a.severity === 'high').length,
    resolved: anomalies.filter(a => a.status === 'resolved').length
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>Anomaly Detection</span>
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
              AI Powered
            </Badge>
          </CardTitle>
          
          <Button variant="outline" size="sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            View Trends
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <motion.div 
            className="text-center p-3 bg-gray-50 rounded-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-lg font-bold text-gray-900">{anomalyStats.total}</div>
            <div className="text-xs text-gray-600">Total</div>
          </motion.div>
          <motion.div 
            className="text-center p-3 bg-yellow-50 rounded-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-lg font-bold text-yellow-700">{anomalyStats.active}</div>
            <div className="text-xs text-yellow-600">Active</div>
          </motion.div>
          <motion.div 
            className="text-center p-3 bg-red-50 rounded-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-lg font-bold text-red-700">{anomalyStats.high}</div>
            <div className="text-xs text-red-600">High Priority</div>
          </motion.div>
          <motion.div 
            className="text-center p-3 bg-green-50 rounded-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-lg font-bold text-green-700">{anomalyStats.resolved}</div>
            <div className="text-xs text-green-600">Resolved</div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <div className="flex items-center space-x-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search anomalies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-1" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFilter('all')}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('high')}>High Priority</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('investigating')}>Investigating</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilter('resolved')}>Resolved</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          <AnimatePresence>
            {filteredAnomalies.map((anomaly, index) => (
              <motion.div
                key={anomaly.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="mt-1">
                      {getSeverityIcon(anomaly.severity)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900 capitalize">
                          {anomaly.type.replace('_', ' ')}
                        </span>
                        <Badge variant="secondary" className={getSeverityColor(anomaly.severity)}>
                          {anomaly.severity}
                        </Badge>
                        <Badge variant="secondary" className={getStatusColor(anomaly.status)}>
                          {getStatusIcon(anomaly.status)}
                          <span className="ml-1">{anomaly.status}</span>
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-2">{anomaly.description}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Confidence: {anomaly.confidence}%</span>
                        <span>{getTimeAgo(anomaly.timestamp)}</span>
                      </div>
                      
                      {/* Confidence visualization */}
                      <div className="mt-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">AI Confidence:</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                            <motion.div 
                              className={`h-1.5 rounded-full ${
                                anomaly.confidence >= 80 ? 'bg-green-500' :
                                anomaly.confidence >= 60 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${anomaly.confidence}%` }}
                              transition={{ delay: index * 0.1, duration: 0.5 }}
                            />
                          </div>
                          <span className="text-xs font-medium">{anomaly.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleStatusChange(anomaly.id, 'investigating')}>
                        <Clock className="w-4 h-4 mr-2" />
                        Mark Investigating
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleStatusChange(anomaly.id, 'resolved')}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Resolved
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {filteredAnomalies.length === 0 && (
            <motion.div 
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Anomalies Found</h3>
              <p className="text-gray-600">
                {searchTerm || filter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Your system is running smoothly!'
                }
              </p>
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AnomalyDetection;