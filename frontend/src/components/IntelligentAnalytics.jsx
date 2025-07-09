import React, { useState, useEffect } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart,
  Area,
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
  ComposedChart,
  ReferenceLine,
  ReferenceArea,
  Legend
} from 'recharts';
import { 
  Brain, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Target,
  Eye,
  MessageSquare,
  Zap,
  Search,
  Filter,
  Calendar,
  BarChart3,
  Lightbulb,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronRight,
  Play,
  Pause,
  RefreshCw,
  Settings,
  Maximize2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';

const IntelligentAnalytics = () => {
  const [selectedChart, setSelectedChart] = useState('documents');
  const [timeRange, setTimeRange] = useState('30d');
  const [narrativeMode, setNarrativeMode] = useState(true);
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);
  const [aiNarrating, setAiNarrating] = useState(false);

  // Enhanced mock data with anomalies and predictions
  const documentTrendsData = [
    { date: '2024-01', actual: 120, predicted: 125, anomaly: false, confidence: 95 },
    { date: '2024-02', actual: 150, predicted: 155, anomaly: false, confidence: 93 },
    { date: '2024-03', actual: 280, predicted: 175, anomaly: true, confidence: 85, severity: 'high' }, // Anomaly
    { date: '2024-04', actual: 220, predicted: 215, anomaly: false, confidence: 97 },
    { date: '2024-05', actual: 190, predicted: 195, anomaly: false, confidence: 92 },
    { date: '2024-06', actual: 240, predicted: 245, anomaly: false, confidence: 94 },
    { date: '2024-07', actual: null, predicted: 270, anomaly: false, confidence: 88 }, // Future prediction
    { date: '2024-08', actual: null, predicted: 290, anomaly: false, confidence: 82 },
    { date: '2024-09', actual: null, predicted: 310, anomaly: false, confidence: 78 }
  ];

  const accuracyData = [
    { date: '2024-01', accuracy: 94.2, threshold: 95, predicted: 94.5, confidence: 90 },
    { date: '2024-02', accuracy: 96.1, threshold: 95, predicted: 96.0, confidence: 93 },
    { date: '2024-03', accuracy: 93.8, threshold: 95, predicted: 95.5, confidence: 87 },
    { date: '2024-04', accuracy: 97.2, threshold: 95, predicted: 96.8, confidence: 95 },
    { date: '2024-05', accuracy: 95.9, threshold: 95, predicted: 96.2, confidence: 92 },
    { date: '2024-06', accuracy: 98.1, threshold: 95, predicted: 97.5, confidence: 96 },
    { date: '2024-07', accuracy: null, threshold: 95, predicted: 97.8, confidence: 89 },
    { date: '2024-08', accuracy: null, threshold: 95, predicted: 98.2, confidence: 85 }
  ];

  const riskDistributionData = [
    { name: 'Low Risk', value: 65, color: '#10B981', trend: '+5%' },
    { name: 'Medium Risk', value: 25, color: '#F59E0B', trend: '-2%' },
    { name: 'High Risk', value: 10, color: '#EF4444', trend: '-3%' }
  ];

  const anomalies = [
    {
      id: 1,
      type: 'volume_spike',
      title: 'Document Volume Anomaly',
      description: 'Unexpected 86% increase in document uploads in March 2024',
      severity: 'high',
      confidence: 95,
      date: '2024-03',
      impact: 'System performance degraded by 23%',
      suggestedActions: [
        'Review system capacity',
        'Investigate source of volume increase',
        'Consider scaling resources'
      ],
      status: 'investigating'
    },
    {
      id: 2,
      type: 'accuracy_drop',
      title: 'AI Accuracy Variance',
      description: 'Accuracy dropped below threshold in specific document categories',
      severity: 'medium',
      confidence: 87,
      date: '2024-03',
      impact: 'Processing accuracy affected for financial documents',
      suggestedActions: [
        'Retrain model on financial documents',
        'Review data quality',
        'Update classification rules'
      ],
      status: 'resolved'
    }
  ];

  const aiNarratives = {
    documents: {
      title: "Document Processing Trends",
      narrative: "Your document processing shows steady growth with a 23% month-over-month increase. I detected an unusual spike in March that may require attention. The prediction model suggests continued growth with 88% confidence for the next quarter.",
      keyInsights: [
        "Processing volume increased 60% over 6 months",
        "March anomaly resolved without system impact",
        "Predicted 15% growth next quarter"
      ],
      confidence: 92
    },
    accuracy: {
      title: "AI Performance Analytics", 
      narrative: "AI accuracy consistently exceeds the 95% threshold with peak performance at 98.1% in June. The system shows strong predictive capabilities with improving confidence scores. Recent optimizations contributed to a 4% accuracy improvement.",
      keyInsights: [
        "Accuracy exceeds target 83% of the time",
        "Peak performance: 98.1% in June 2024",
        "Confidence trending upward (+12%)"
      ],
      confidence: 96
    },
    risk: {
      title: "Risk Distribution Analysis",
      narrative: "Risk profile is improving with 65% of documents classified as low risk. High-risk documents decreased by 3% this quarter, indicating better document quality or improved processing capabilities.",
      keyInsights: [
        "Low risk documents increased 5%",
        "High risk trend: -3% improvement",
        "Risk assessment accuracy: 94%"
      ],
      confidence: 91
    }
  };

  const predictiveInsights = [
    {
      title: "Capacity Planning Alert",
      description: "Based on current trends, you'll need 40% more processing capacity by Q4 2024",
      type: "capacity",
      urgency: "medium",
      confidence: 87,
      timeframe: "3 months",
      action: "Plan infrastructure scaling"
    },
    {
      title: "Quality Improvement Opportunity", 
      description: "Implementing suggested model updates could increase accuracy to 99.2%",
      type: "quality",
      urgency: "low",
      confidence: 82,
      timeframe: "2 weeks",
      action: "Schedule model training"
    },
    {
      title: "Risk Mitigation Success",
      description: "Current risk reduction trend will achieve target 5% high-risk threshold by next month",
      type: "risk",
      urgency: "low", 
      confidence: 94,
      timeframe: "1 month",
      action: "Continue current strategy"
    }
  ];

  const customDashboardSuggestions = [
    {
      title: "Compliance Dashboard",
      description: "Track regulatory compliance metrics and deadlines",
      chartTypes: ["Timeline", "Compliance Score", "Risk Heat Map"],
      aiReason: "Your audit patterns suggest heavy focus on compliance tracking",
      confidence: 89
    },
    {
      title: "Performance Optimization",
      description: "Monitor system performance and processing efficiency",
      chartTypes: ["Processing Time", "Throughput", "Error Rates"],
      aiReason: "Recent performance improvements warrant dedicated monitoring",
      confidence: 92
    }
  ];

  const handleAnomalyClick = (anomaly) => {
    setSelectedAnomaly(anomaly);
  };

  const startNarration = () => {
    setAiNarrating(true);
    // Simulate AI narration
    setTimeout(() => setAiNarrating(false), 3000);
  };

  const getCurrentNarrative = () => {
    return aiNarratives[selectedChart] || aiNarratives.documents;
  };

  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    if (payload.anomaly) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill="#EF4444"
          stroke="#FFFFFF"
          strokeWidth={2}
          className="cursor-pointer animate-pulse"
          onClick={() => handleAnomalyClick(anomalies.find(a => a.date === payload.date))}
        />
      );
    }
    return null;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
              {data.confidence && (
                <span className="text-xs text-gray-500 ml-2">
                  (Confidence: {data.confidence}%)
                </span>
              )}
            </p>
          ))}
          {data.anomaly && (
            <p className="text-red-500 text-sm font-medium">⚠️ Anomaly Detected</p>
          )}
        </div>
      );
    }
    return null;
  };

  const renderMainChart = () => {
    switch (selectedChart) {
      case 'documents':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={documentTrendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {/* Confidence interval area */}
              <Area
                type="monotone"
                dataKey="predicted"
                stroke="none"
                fill="#E0E7FF"
                fillOpacity={0.3}
                name="Confidence Band"
              />
              
              {/* Actual data line */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#4F46E5"
                strokeWidth={3}
                dot={<CustomDot />}
                name="Actual Documents"
              />
              
              {/* Predicted data line */}
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#10B981"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Predicted"
              />
              
              {/* Threshold reference line */}
              <ReferenceLine y={200} stroke="#F59E0B" strokeDasharray="3 3" label="Target" />
            </ComposedChart>
          </ResponsiveContainer>
        );

      case 'accuracy':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis domain={[90, 100]} stroke="#666" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {/* Threshold area */}
              <ReferenceArea y1={95} y2={100} fill="#D1FAE5" fillOpacity={0.3} />
              
              {/* Actual accuracy */}
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="#10B981"
                strokeWidth={3}
                name="Actual Accuracy"
              />
              
              {/* Predicted accuracy */}
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#3B82F6"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Predicted"
              />
              
              {/* Threshold line */}
              <ReferenceLine y={95} stroke="#EF4444" strokeDasharray="3 3" label="Minimum Target (95%)" />
            </ComposedChart>
          </ResponsiveContainer>
        );

      case 'risk':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={riskDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent, trend }) => `${name}: ${(percent * 100).toFixed(0)}% (${trend})`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {riskDistributionData.map((entry, index) => (
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
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl font-bold text-gray-900">Intelligent Analytics</h1>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            <Brain className="w-3 h-3 mr-1" />
            AI-Powered
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-1" />
            Configure
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Chart Type Selector */}
      <Tabs value={selectedChart} onValueChange={setSelectedChart} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documents" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Document Trends</span>
          </TabsTrigger>
          <TabsTrigger value="accuracy" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>AI Performance</span>
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Risk Analysis</span>
          </TabsTrigger>
        </TabsList>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          
          {/* Left Column - AI Narrative Panel */}
          <div className="lg:col-span-3 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>AI Narrative</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={startNarration}
                    disabled={aiNarrating}
                  >
                    {aiNarrating ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className={`transition-all duration-300 ${aiNarrating ? 'animate-pulse' : ''}`}>
                    <h3 className="font-semibold text-gray-900">
                      {getCurrentNarrative().title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                      {getCurrentNarrative().narrative}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Key Insights:</h4>
                    {getCurrentNarrative().keyInsights.map((insight, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Lightbulb className="w-3 h-3 text-yellow-500 mt-1 flex-shrink-0" />
                        <span className="text-xs text-gray-600">{insight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-xs text-gray-500">AI Confidence</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getCurrentNarrative().confidence}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{getCurrentNarrative().confidence}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Anomaly Detection Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <span>Anomaly Detection</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {anomalies.map((anomaly) => (
                    <div 
                      key={anomaly.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedAnomaly?.id === anomaly.id ? 'border-orange-300 bg-orange-50' : 'border-gray-200'
                      }`}
                      onClick={() => handleAnomalyClick(anomaly)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              anomaly.severity === 'high' ? 'bg-red-500' : 
                              anomaly.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                            }`} />
                            <h4 className="font-medium text-sm">{anomaly.title}</h4>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{anomaly.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${
                                anomaly.status === 'resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                              }`}
                            >
                              {anomaly.status}
                            </Badge>
                            <span className="text-xs text-gray-500">{anomaly.confidence}% confidence</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Main Charts */}
          <div className="lg:col-span-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>{getCurrentNarrative().title}</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      <Brain className="w-3 h-3 mr-1" />
                      Interactive
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Maximize2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderMainChart()}
                
                {/* Chart Controls */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <select 
                      value={timeRange} 
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="text-sm border rounded px-2 py-1"
                    >
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                      <option value="90d">Last 90 days</option>
                      <option value="1y">Last year</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={narrativeMode ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNarrativeMode(!narrativeMode)}
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      AI Narratives
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Insights Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Predictive Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>Predictive Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {predictiveInsights.map((insight, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm text-gray-900">{insight.title}</h4>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            insight.urgency === 'high' ? 'bg-red-100 text-red-700' :
                            insight.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}
                        >
                          {insight.urgency}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{insight.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{insight.timeframe}</span>
                        <span>{insight.confidence}% confidence</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-2 text-xs">
                        {insight.action}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Custom Dashboard Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  <span>AI Suggestions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customDashboardSuggestions.map((suggestion, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <h4 className="font-medium text-sm text-gray-900 mb-1">{suggestion.title}</h4>
                      <p className="text-xs text-gray-600 mb-2">{suggestion.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {suggestion.chartTypes.map((chart, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {chart}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-xs text-blue-600 mb-2">
                        💡 {suggestion.aiReason}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{suggestion.confidence}% match</span>
                        <Button variant="outline" size="sm" className="text-xs">
                          Create Dashboard
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span>System Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">AI Model Performance</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={96} className="w-16 h-2" />
                      <span className="text-sm font-medium">96%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Processing Speed</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={89} className="w-16 h-2" />
                      <span className="text-sm font-medium">89%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Data Quality</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={94} className="w-16 h-2" />
                      <span className="text-sm font-medium">94%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Anomaly Investigation Modal */}
        {selectedAnomaly && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <span>Anomaly Investigation</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedAnomaly(null)}
                  >
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedAnomaly.title}</h3>
                    <p className="text-gray-600 mt-1">{selectedAnomaly.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Severity</span>
                      <Badge className={`block w-fit mt-1 ${
                        selectedAnomaly.severity === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {selectedAnomaly.severity}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Confidence</span>
                      <p className="font-medium">{selectedAnomaly.confidence}%</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Impact</h4>
                    <p className="text-sm text-gray-600">{selectedAnomaly.impact}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Suggested Actions</h4>
                    <div className="space-y-2">
                      {selectedAnomaly.suggestedActions.map((action, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-4 border-t">
                    <Button size="sm" className="flex-1">
                      <Search className="w-4 h-4 mr-1" />
                      Investigate
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      Create Alert
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default IntelligentAnalytics;