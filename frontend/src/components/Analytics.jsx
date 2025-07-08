import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Calendar, 
  Brain, 
  AlertTriangle,
  CheckCircle,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { mockChartData, mockRiskData } from '../data/mockData';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedChart, setSelectedChart] = useState('documents');

  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const chartTypes = [
    { value: 'documents', label: 'Document Analysis', icon: 'BarChart' },
    { value: 'accuracy', label: 'AI Accuracy', icon: 'TrendingUp' },
    { value: 'risk', label: 'Risk Distribution', icon: 'AlertTriangle' }
  ];

  const aiInsights = [
    {
      type: 'trend',
      title: 'Document Volume Trending Up',
      description: 'Document uploads increased 23% compared to last month',
      confidence: 95,
      impact: 'medium'
    },
    {
      type: 'accuracy',
      title: 'AI Accuracy Improved',
      description: 'Analysis accuracy reached 96.8%, up from 94.2% last week',
      confidence: 89,
      impact: 'high'
    },
    {
      type: 'risk',
      title: 'Operational Risk Alert',
      description: 'Detected potential compliance issues in 3 recent documents',
      confidence: 87,
      impact: 'high'
    }
  ];

  const getInsightIcon = (type) => {
    switch (type) {
      case 'trend': return <TrendingUp className="w-4 h-4 text-blue-500" />;
      case 'accuracy': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'risk': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderChart = () => {
    switch (selectedChart) {
      case 'documents':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="documents" fill="#4F46E5" name="Documents" />
              <Bar dataKey="analyzed" fill="#10B981" name="Analyzed" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'accuracy':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#4F46E5" 
                strokeWidth={2}
                name="AI Accuracy %"
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'risk':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockRiskData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {mockRiskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <div className="flex space-x-1">
            {timeRanges.map(range => (
              <Button
                key={range.value}
                variant={timeRange === range.value ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeRange(range.value)}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Controls */}
      <div className="flex space-x-2">
        {chartTypes.map(chart => (
          <Button
            key={chart.value}
            variant={selectedChart === chart.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedChart(chart.value)}
          >
            {chart.label}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart className="w-5 h-5" />
              <span>
                {chartTypes.find(c => c.value === selectedChart)?.label || 'Analytics'}
              </span>
              <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                <Brain className="w-3 h-3 mr-1" />
                AI Enhanced
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderChart()}
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>AI Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getInsightIcon(insight.type)}
                      <h3 className="font-medium text-gray-900">{insight.title}</h3>
                    </div>
                    <Badge variant="secondary" className={getImpactColor(insight.impact)}>
                      {insight.impact}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Confidence: {insight.confidence}%
                    </span>
                    <div className="w-16 bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-indigo-600 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${insight.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Analysis</p>
                <p className="text-2xl font-bold text-gray-900">1,847</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BarChart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">+12.5% from last week</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">96.8%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">+2.3% improvement</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Processing Time</p>
                <p className="text-2xl font-bold text-gray-900">1.2min</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-600">18% faster</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;