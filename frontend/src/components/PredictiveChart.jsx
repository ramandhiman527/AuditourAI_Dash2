import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import useAuditStore from '../store/useAuditStore';

const PredictiveChart = ({ 
  title = "Predictive Analytics", 
  metric = "documents",
  height = 400 
}) => {
  const { chartData } = useAuditStore();
  const [showPredictions, setShowPredictions] = useState(true);
  const [showAnomalies, setShowAnomalies] = useState(true);
  const [showConfidenceInterval, setShowConfidenceInterval] = useState(true);

  // Process data for visualization
  const processedData = useMemo(() => {
    const historical = chartData.historical.map(item => ({
      ...item,
      date: new Date(item.date + '-01'),
      type: 'historical'
    }));

    const predictions = chartData.predictions.map(item => ({
      ...item,
      date: new Date(item.date + '-01'),
      type: 'prediction'
    }));

    // Generate anomalies (simulated)
    const anomalies = [
      { date: new Date('2024-03-01'), value: 180, severity: 'medium' },
      { date: new Date('2024-06-01'), value: 240, severity: 'low' }
    ];

    return { historical, predictions, anomalies };
  }, [chartData]);

  // Create Plotly traces
  const traces = [];

  // Historical data trace
  traces.push({
    x: processedData.historical.map(d => d.date),
    y: processedData.historical.map(d => d[metric]),
    type: 'scatter',
    mode: 'lines+markers',
    name: 'Historical Data',
    line: { color: '#4F46E5', width: 3 },
    marker: { size: 8, color: '#4F46E5' },
    hovertemplate: '<b>%{x}</b><br>Value: %{y}<br>Type: Historical<extra></extra>'
  });

  // Prediction trace
  if (showPredictions) {
    traces.push({
      x: processedData.predictions.map(d => d.date),
      y: processedData.predictions.map(d => d[metric]),
      type: 'scatter',
      mode: 'lines+markers',
      name: 'AI Predictions',
      line: { color: '#10B981', width: 3, dash: 'dash' },
      marker: { size: 8, color: '#10B981', symbol: 'diamond' },
      hovertemplate: '<b>%{x}</b><br>Predicted: %{y}<br>Confidence: %{customdata}%<extra></extra>',
      customdata: processedData.predictions.map(d => Math.round(d.confidence * 100))
    });

    // Confidence interval
    if (showConfidenceInterval) {
      const upperBound = processedData.predictions.map(d => d[metric] * (1 + (1 - d.confidence) * 0.2));
      const lowerBound = processedData.predictions.map(d => d[metric] * (1 - (1 - d.confidence) * 0.2));

      traces.push({
        x: processedData.predictions.map(d => d.date),
        y: upperBound,
        type: 'scatter',
        mode: 'lines',
        name: 'Upper Confidence',
        line: { color: '#10B981', width: 0 },
        showlegend: false,
        hoverinfo: 'skip'
      });

      traces.push({
        x: processedData.predictions.map(d => d.date),
        y: lowerBound,
        type: 'scatter',
        mode: 'lines',
        name: 'Lower Confidence',
        line: { color: '#10B981', width: 0 },
        fill: 'tonexty',
        fillcolor: 'rgba(16, 185, 129, 0.2)',
        showlegend: false,
        hoverinfo: 'skip'
      });
    }
  }

  // Anomaly markers
  if (showAnomalies) {
    traces.push({
      x: processedData.anomalies.map(d => d.date),
      y: processedData.anomalies.map(d => d.value),
      type: 'scatter',
      mode: 'markers',
      name: 'Anomalies',
      marker: { 
        size: 15, 
        color: 'rgba(239, 68, 68, 0.8)',
        symbol: 'x',
        line: { color: '#EF4444', width: 2 }
      },
      hovertemplate: '<b>%{x}</b><br>Anomaly Value: %{y}<br>Severity: %{customdata}<extra></extra>',
      customdata: processedData.anomalies.map(d => d.severity)
    });
  }

  const layout = {
    title: {
      text: title,
      font: { size: 16, family: 'Inter' }
    },
    xaxis: {
      title: 'Time Period',
      gridcolor: 'rgba(156, 163, 175, 0.3)',
      showgrid: true
    },
    yaxis: {
      title: 'Value',
      gridcolor: 'rgba(156, 163, 175, 0.3)',
      showgrid: true
    },
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    font: { family: 'Inter', size: 12 },
    showlegend: true,
    legend: {
      orientation: 'h',
      y: -0.2,
      x: 0.5,
      xanchor: 'center'
    },
    margin: { t: 40, r: 20, b: 60, l: 60 },
    hovermode: 'closest'
  };

  const config = {
    displayModeBar: true,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
    displaylogo: false,
    responsive: true
  };

  // AI Insights
  const getAIInsights = () => {
    const trend = chartData.predictions[0]?.[metric] > chartData.historical[chartData.historical.length - 1]?.[metric];
    const confidence = chartData.predictions[0]?.confidence || 0.8;
    
    return {
      trend: trend ? 'increasing' : 'decreasing',
      confidence: Math.round(confidence * 100),
      recommendation: trend 
        ? 'Positive trend detected. Consider resource scaling.'
        : 'Declining trend observed. Review optimization strategies.',
      risk: confidence > 0.8 ? 'low' : confidence > 0.6 ? 'medium' : 'high'
    };
  };

  const insights = getAIInsights();

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>{title}</span>
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
              <Brain className="w-3 h-3 mr-1" />
              AI Enhanced
            </Badge>
          </CardTitle>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Target className="w-4 h-4 mr-1" />
              Insights
            </Button>
          </div>
        </div>
        
        {/* Chart Controls */}
        <div className="flex items-center space-x-4 mt-2">
          <div className="flex items-center space-x-2">
            <Switch 
              checked={showPredictions} 
              onCheckedChange={setShowPredictions}
            />
            <span className="text-sm text-gray-600">Predictions</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              checked={showAnomalies} 
              onCheckedChange={setShowAnomalies}
            />
            <span className="text-sm text-gray-600">Anomalies</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              checked={showConfidenceInterval} 
              onCheckedChange={setShowConfidenceInterval}
            />
            <span className="text-sm text-gray-600">Confidence</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Plot
            data={traces}
            layout={layout}
            config={config}
            style={{ width: '100%', height: `${height}px` }}
          />
        </motion.div>
        
        {/* AI Insights Panel */}
        <motion.div 
          className="mt-4 p-4 bg-gray-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center space-x-2 mb-3">
            <Brain className="w-4 h-4 text-indigo-600" />
            <span className="font-medium text-gray-900">AI Analysis</span>
            <Badge variant="secondary" className={`${
              insights.risk === 'low' ? 'bg-green-100 text-green-700' :
              insights.risk === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {insights.confidence}% Confidence
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                {insights.trend === 'increasing' ? 
                  <TrendingUp className="w-4 h-4 text-green-500" /> :
                  <TrendingDown className="w-4 h-4 text-red-500" />
                }
                <span className="text-sm font-medium">
                  Trend: {insights.trend}
                </span>
              </div>
              <p className="text-xs text-gray-600">{insights.recommendation}</p>
            </div>
            
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <AlertTriangle className={`w-4 h-4 ${
                  insights.risk === 'low' ? 'text-green-500' :
                  insights.risk === 'medium' ? 'text-yellow-500' :
                  'text-red-500'
                }`} />
                <span className="text-sm font-medium">
                  Risk Level: {insights.risk}
                </span>
              </div>
              <p className="text-xs text-gray-600">
                Based on historical patterns and prediction confidence
              </p>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default PredictiveChart;