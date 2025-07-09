import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Brain, 
  Target, 
  AlertTriangle,
  BarChart3,
  LineChart,
  PieChart,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import PredictiveChart from './PredictiveChart';
import AnomalyDetection from './AnomalyDetection';
import useAuditStore from '../store/useAuditStore';

const PredictiveAnalyticsPage = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('90d');
  const [selectedMetric, setSelectedMetric] = useState('documents');
  
  const { getPredictionTrend } = useAuditStore();
  
  const timeframes = [
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '6m', label: '6 Months' },
    { value: '1y', label: '1 Year' }
  ];

  const metrics = [
    { value: 'documents', label: 'Document Volume', icon: BarChart3 },
    { value: 'accuracy', label: 'AI Accuracy', icon: Target },
    { value: 'risk', label: 'Risk Level', icon: AlertTriangle }
  ];

  const documentTrend = getPredictionTrend('documents');
  const accuracyTrend = getPredictionTrend('accuracy');
  const riskTrend = getPredictionTrend('risk');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Predictive Analytics</h1>
          <p className="text-gray-600 mt-1">AI-powered forecasting and trend analysis</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            {timeframes.map(timeframe => (
              <Button
                key={timeframe.value}
                variant={selectedTimeframe === timeframe.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedTimeframe(timeframe.value)}
              >
                <Calendar className="w-4 h-4 mr-1" />
                {timeframe.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Prediction Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: 'Document Volume Trend',
            trend: documentTrend,
            icon: BarChart3,
            color: 'blue',
            prediction: 'Projected 25% increase next quarter'
          },
          {
            title: 'AI Accuracy Trend',
            trend: accuracyTrend,
            icon: Target,
            color: 'green',
            prediction: 'Accuracy expected to reach 98.5%'
          },
          {
            title: 'Risk Level Trend',
            trend: riskTrend,
            icon: AlertTriangle,
            color: 'yellow',
            prediction: 'Risk levels stabilizing at low range'
          }
        ].map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <card.icon className={`w-8 h-8 text-${card.color}-600`} />
                  <Badge variant="secondary" className={`bg-${card.color}-100 text-${card.color}-700`}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {card.trend.direction === 'up' ? '+' : card.trend.direction === 'down' ? '-' : ''}{card.trend.percentage}%
                  </Badge>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.prediction}</p>
                
                <div className="mt-4 flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs text-indigo-600">AI Confidence: 89%</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Analytics Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Primary Predictive Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <PredictiveChart 
            title="Multi-Metric Predictive Analysis"
            metric={selectedMetric}
            height={500}
          />
        </motion.div>

        {/* Anomaly Detection */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <AnomalyDetection />
        </motion.div>
      </div>

      {/* Metric Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Metric Deep Dive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {metrics.map(metric => (
                <Button
                  key={metric.value}
                  variant={selectedMetric === metric.value ? 'default' : 'outline'}
                  className="h-20 flex flex-col items-center justify-center space-y-2"
                  onClick={() => setSelectedMetric(metric.value)}
                >
                  <metric.icon className="w-6 h-6" />
                  <span>{metric.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* AI Insights Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-indigo-600" />
              <span>AI Predictive Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Key Predictions</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Document processing volume expected to increase 25% next quarter</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Target className="w-4 h-4 text-blue-500 mt-0.5" />
                    <span>AI analysis accuracy trending toward 98.5% by Q2</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <span>Risk levels stabilizing with 15% improvement in compliance</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recommendations</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-500">•</span>
                    <span>Scale processing infrastructure to handle increased volume</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-500">•</span>
                    <span>Implement additional quality checks for accuracy optimization</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-indigo-500">•</span>
                    <span>Focus on automation rules to maintain risk reduction</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default PredictiveAnalyticsPage;