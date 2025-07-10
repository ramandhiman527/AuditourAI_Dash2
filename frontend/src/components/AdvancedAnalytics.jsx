import React, { useState, useEffect, useCallback } from "react";
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
  Legend,
  Scatter,
  ScatterChart,
} from "recharts";
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
  Maximize2,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Bot,
  Sparkles,
  ChartLine,
  PieChart as PieChartIcon,
  BarChart4,
  Shield,
  Layers,
  Move,
  Plus,
  X,
  Download,
  Upload,
  MousePointer,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { Slider } from "./ui/slider";

const AdvancedAnalytics = () => {
  const [selectedChart, setSelectedChart] = useState("performance");
  const [timeRange, setTimeRange] = useState("30d");
  const [aiNarrating, setAiNarrating] = useState(false);
  const [narrativeSpeed, setNarrativeSpeed] = useState(1);
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);
  const [confidenceFilter, setConfidenceFilter] = useState([80, 100]);
  const [draggedWidget, setDraggedWidget] = useState(null);
  const [customDashboard, setCustomDashboard] = useState([]);
  const [selectedDataPoint, setSelectedDataPoint] = useState(null);
  const [predictionMode, setPredictionMode] = useState("optimistic");
  const [realTimeEnabled, setRealTimeEnabled] = useState(true);
  const [narrativeVoice, setNarrativeVoice] = useState(true);

  // Enhanced mock data with real-time anomaly detection
  const performanceData = [
    {
      date: "2024-01",
      actual: 1240,
      predicted: 1250,
      confidenceUpper: 1300,
      confidenceLower: 1200,
      anomaly: false,
      confidence: 96,
      events: ["model_update"],
      sentiment: 0.85,
    },
    {
      date: "2024-02",
      actual: 1580,
      predicted: 1550,
      confidenceUpper: 1620,
      confidenceLower: 1480,
      anomaly: false,
      confidence: 94,
      events: [],
      sentiment: 0.92,
    },
    {
      date: "2024-03",
      actual: 2890,
      predicted: 1750,
      confidenceUpper: 1820,
      confidenceLower: 1680,
      anomaly: true,
      confidence: 78,
      severity: "high",
      events: ["data_surge", "system_alert"],
      sentiment: 0.45,
    },
    {
      date: "2024-04",
      actual: 2200,
      predicted: 2150,
      confidenceUpper: 2250,
      confidenceLower: 2050,
      anomaly: false,
      confidence: 91,
      events: ["optimization"],
      sentiment: 0.78,
    },
    {
      date: "2024-05",
      actual: 1890,
      predicted: 1950,
      confidenceUpper: 2020,
      confidenceLower: 1880,
      anomaly: false,
      confidence: 93,
      events: [],
      sentiment: 0.88,
    },
    {
      date: "2024-06",
      actual: 2450,
      predicted: 2480,
      confidenceUpper: 2580,
      confidenceLower: 2380,
      anomaly: false,
      confidence: 95,
      events: ["capacity_increase"],
      sentiment: 0.91,
    },
    {
      date: "2024-07",
      actual: null,
      predicted: 2750,
      confidenceUpper: 2950,
      confidenceLower: 2550,
      anomaly: false,
      confidence: 89,
      events: [],
      sentiment: 0.85,
    },
    {
      date: "2024-08",
      actual: null,
      predicted: 3100,
      confidenceUpper: 3400,
      confidenceLower: 2800,
      anomaly: false,
      confidence: 84,
      events: [],
      sentiment: 0.82,
    },
    {
      date: "2024-09",
      actual: null,
      predicted: 3450,
      confidenceUpper: 3800,
      confidenceLower: 3100,
      anomaly: false,
      confidence: 79,
      events: [],
      sentiment: 0.8,
    },
  ];

  const accuracyTrendsData = [
    {
      date: "2024-01",
      accuracy: 94.2,
      benchmark: 95,
      predicted: 94.5,
      confidence: 92,
      errors: 58,
    },
    {
      date: "2024-02",
      accuracy: 96.1,
      benchmark: 95,
      predicted: 96.0,
      confidence: 95,
      errors: 39,
    },
    {
      date: "2024-03",
      accuracy: 93.8,
      benchmark: 95,
      predicted: 95.5,
      confidence: 87,
      errors: 62,
      anomaly: true,
    },
    {
      date: "2024-04",
      accuracy: 97.2,
      benchmark: 95,
      predicted: 96.8,
      confidence: 97,
      errors: 28,
    },
    {
      date: "2024-05",
      accuracy: 95.9,
      benchmark: 95,
      predicted: 96.2,
      confidence: 94,
      errors: 41,
    },
    {
      date: "2024-06",
      accuracy: 98.1,
      benchmark: 95,
      predicted: 97.5,
      confidence: 98,
      errors: 19,
    },
    {
      date: "2024-07",
      accuracy: null,
      benchmark: 95,
      predicted: 97.8,
      confidence: 91,
      errors: null,
    },
    {
      date: "2024-08",
      accuracy: null,
      benchmark: 95,
      predicted: 98.2,
      confidence: 87,
      errors: null,
    },
  ];

  const riskAnalysisData = [
    {
      category: "Critical",
      value: 12,
      color: "#EF4444",
      trend: -15,
      impact: "High",
      probability: 0.85,
    },
    {
      category: "High",
      value: 28,
      color: "#F97316",
      trend: -8,
      impact: "Medium",
      probability: 0.72,
    },
    {
      category: "Medium",
      value: 45,
      color: "#F59E0B",
      trend: 5,
      impact: "Low",
      probability: 0.45,
    },
    {
      category: "Low",
      value: 115,
      color: "#10B981",
      trend: 12,
      impact: "Minimal",
      probability: 0.23,
    },
  ];

  // Real-time anomaly detection with severity levels
  const liveAnomalies = [
    {
      id: "ano_001",
      timestamp: "2024-06-15T14:32:00Z",
      type: "performance_spike",
      title: "Processing Volume Anomaly",
      description:
        "Detected 127% increase in document processing volume - significantly above predicted range",
      severity: "high",
      confidence: 94,
      impact: "System latency increased by 340ms",
      location: "Document Processing Pipeline",
      suggestedActions: [
        "Scale up processing capacity by 40%",
        "Investigate source of volume increase",
        "Activate load balancing protocols",
        "Monitor memory usage patterns",
      ],
      status: "active",
      affectedMetrics: ["processing_time", "queue_depth", "memory_usage"],
      rootCause: "Bulk document upload from legal department",
      timeToResolve: "15-30 minutes",
      similarIncidents: 3,
      businessImpact: "Medium - Processing delays for new submissions",
    },
    {
      id: "ano_002",
      timestamp: "2024-06-15T11:45:00Z",
      type: "accuracy_deviation",
      title: "Model Accuracy Drift",
      description:
        "AI model accuracy dropped below threshold for financial document classification",
      severity: "medium",
      confidence: 87,
      impact: "Classification accuracy down to 91.2% for financial docs",
      location: "Classification Engine",
      suggestedActions: [
        "Retrain model with recent financial data",
        "Review classification thresholds",
        "Update training dataset",
        "Implement ensemble voting",
      ],
      status: "investigating",
      affectedMetrics: ["accuracy_score", "false_positive_rate"],
      rootCause: "New financial document formats not in training data",
      timeToResolve: "2-4 hours",
      similarIncidents: 1,
      businessImpact: "Low - Manual review required for some documents",
    },
    {
      id: "ano_003",
      timestamp: "2024-06-15T09:20:00Z",
      type: "data_quality",
      title: "Data Quality Alert",
      description:
        "Increased null values detected in metadata extraction pipeline",
      severity: "low",
      confidence: 91,
      impact: "Metadata completion rate decreased by 12%",
      location: "Metadata Extraction Service",
      suggestedActions: [
        "Review OCR configuration",
        "Check document format compatibility",
        "Update extraction rules",
      ],
      status: "resolved",
      affectedMetrics: ["metadata_completion"],
      rootCause: "OCR engine update changed output format",
      timeToResolve: "1 hour",
      similarIncidents: 0,
      businessImpact: "Minimal - Metadata fields can be manually filled",
    },
  ];

  // AI-generated narratives with emotional context
  const aiNarratives = {
    performance: {
      title: "System Performance Deep Dive",
      narrative:
        "Your system shows remarkable resilience with a 94% confidence trajectory. The March anomaly, while concerning at first glance, actually revealed hidden capacity that we've now optimized. I'm particularly excited about the 23% efficiency gain we achieved through intelligent load balancing. The predictive model suggests we're entering a growth phase that will require strategic scaling decisions.",
      emotion: "optimistic",
      keyInsights: [
        "Performance improved 34% after anomaly resolution",
        "Predictive accuracy increased to 95% post-optimization",
        "System capacity utilization optimized to 78%",
        "Next scaling point predicted for Q4 2024",
      ],
      confidence: 94,
      riskFactors: [
        "Potential capacity constraints in Q4",
        "Model drift after 6 months",
      ],
      opportunities: [
        "Implement predictive scaling",
        "Deploy advanced caching",
      ],
      nextActions: [
        "Plan Q4 capacity review",
        "Optimize prediction algorithms",
      ],
    },
    accuracy: {
      title: "AI Model Performance Intelligence",
      narrative:
        "The AI ecosystem is performing exceptionally well, exceeding our 95% accuracy target 78% of the time. What's particularly impressive is the model's ability to self-correct and learn from the March dip. The confidence intervals are tightening, which indicates the model is becoming more certain about its predictions. The recent 98.1% peak shows we're approaching human-level accuracy.",
      emotion: "confident",
      keyInsights: [
        "Model achieved 98.1% peak accuracy in June",
        "Self-correction mechanisms improved by 45%",
        "Confidence intervals narrowed by 18%",
        "Error rate decreased 67% over 6 months",
      ],
      confidence: 97,
      riskFactors: [
        "Potential overfitting at high accuracy",
        "Model complexity increasing",
      ],
      opportunities: [
        "Deploy ensemble methods",
        "Implement real-time learning",
      ],
      nextActions: [
        "Monitor for overfitting",
        "Plan model architecture review",
      ],
    },
    risk: {
      title: "Risk Intelligence Dashboard",
      narrative:
        "The risk landscape is evolving positively with critical risks down 15% this quarter. Our proactive approach is working - most risks are being caught in the medium category before escalating. The AI is getting better at predicting which medium risks might become high risks, giving us more time to intervene. I'm seeing patterns that suggest we can prevent 60% of high-risk scenarios.",
      emotion: "analytical",
      keyInsights: [
        "Critical risks reduced by 15% this quarter",
        "Early detection accuracy improved to 89%",
        "Medium-to-high risk escalation prevented in 60% of cases",
        "Risk prediction horizon extended to 45 days",
      ],
      confidence: 91,
      riskFactors: [
        "Seasonal risk patterns emerging",
        "New risk categories detected",
      ],
      opportunities: [
        "Implement predictive risk modeling",
        "Automate risk mitigation",
      ],
      nextActions: ["Analyze seasonal patterns", "Enhance risk categorization"],
    },
  };

  // Predictive scenarios with confidence intervals
  const predictionScenarios = {
    optimistic: {
      name: "Best Case Scenario",
      confidence: 85,
      description: "Assuming optimal conditions and continued improvements",
      multiplier: 1.15,
      color: "#10B981",
    },
    realistic: {
      name: "Most Likely Scenario",
      confidence: 92,
      description: "Based on current trends and normal operations",
      multiplier: 1.0,
      color: "#3B82F6",
    },
    conservative: {
      name: "Conservative Scenario",
      confidence: 96,
      description: "Accounting for potential challenges and constraints",
      multiplier: 0.85,
      color: "#F59E0B",
    },
  };

  // Custom dashboard widget suggestions
  const widgetSuggestions = [
    {
      id: "compliance_timeline",
      title: "Compliance Timeline",
      description: "Track regulatory deadlines and compliance status",
      chartType: "timeline",
      aiReason: "Your audit patterns show 73% focus on compliance tracking",
      confidence: 91,
      estimatedValue: "High",
      implementationTime: "2 days",
      dataSourcesNeeded: ["compliance_db", "calendar_api"],
      previewData: { events: 12, upcoming: 3, overdue: 0 },
    },
    {
      id: "sentiment_analysis",
      title: "Document Sentiment Trends",
      description: "Track sentiment in processed documents over time",
      chartType: "area",
      aiReason: "Detected emotional patterns in your document content",
      confidence: 88,
      estimatedValue: "Medium",
      implementationTime: "3 days",
      dataSourcesNeeded: ["document_content", "sentiment_api"],
      previewData: { positive: 67, neutral: 28, negative: 5 },
    },
    {
      id: "resource_optimizer",
      title: "Resource Optimization",
      description: "Monitor and optimize system resource usage",
      chartType: "gauge",
      aiReason: "System shows 23% optimization potential",
      confidence: 94,
      estimatedValue: "High",
      implementationTime: "1 day",
      dataSourcesNeeded: ["system_metrics", "performance_logs"],
      previewData: { cpu: 67, memory: 72, storage: 45 },
    },
    {
      id: "predictive_maintenance",
      title: "Predictive Maintenance",
      description: "Predict and prevent system maintenance needs",
      chartType: "scatter",
      aiReason: "Historical data suggests predictable maintenance patterns",
      confidence: 86,
      estimatedValue: "Medium",
      implementationTime: "5 days",
      dataSourcesNeeded: ["maintenance_logs", "system_health"],
      previewData: { nextMaintenance: "14 days", confidence: 86 },
    },
  ];

  // Drag and drop functionality
  const handleDragStart = (widget) => {
    setDraggedWidget(widget);
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      if (draggedWidget) {
        setCustomDashboard((prev) => [
          ...prev,
          { ...draggedWidget, id: Date.now() },
        ]);
        setDraggedWidget(null);
      }
    },
    [draggedWidget],
  );

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Real-time data simulation
  useEffect(() => {
    if (!realTimeEnabled) return;

    const interval = setInterval(() => {
      // Simulate real-time anomaly detection
      const now = new Date();
      const shouldTriggerAnomaly = Math.random() > 0.95; // 5% chance every 5 seconds

      if (shouldTriggerAnomaly) {
        // Add new anomaly logic here
        console.log("Real-time anomaly detected at", now.toISOString());
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeEnabled]);

  // AI narration functionality
  const startNarration = () => {
    setAiNarrating(true);
    const narrative = getCurrentNarrative();
    const words = narrative.narrative.split(" ");
    const wordsPerSecond = 3 * narrativeSpeed;
    const totalTime = (words.length / wordsPerSecond) * 1000;

    if (narrativeVoice && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(narrative.narrative);
      utterance.rate = narrativeSpeed;
      utterance.pitch = 1;
      utterance.voice =
        speechSynthesis
          .getVoices()
          .find((voice) => voice.name.includes("Google")) ||
        speechSynthesis.getVoices()[0];
      speechSynthesis.speak(utterance);
    }

    setTimeout(() => setAiNarrating(false), totalTime);
  };

  const stopNarration = () => {
    setAiNarrating(false);
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
    }
  };

  const getCurrentNarrative = () => {
    return aiNarratives[selectedChart] || aiNarratives.performance;
  };

  const handleAnomalyClick = (anomaly) => {
    setSelectedAnomaly(anomaly);
  };

  const handleDataPointClick = (data, chart) => {
    setSelectedDataPoint({ ...data, chart });
  };

  // Enhanced custom tooltip with AI insights
  const AITooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const narrative = getCurrentNarrative();

      return (
        <div className="bg-white p-4 border rounded-lg shadow-xl max-w-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold">{label}</p>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              <Brain className="w-3 h-3 mr-1" />
              AI
            </Badge>
          </div>

          {payload.map((entry, index) => (
            <div key={index} className="mb-1">
              <p style={{ color: entry.color }} className="font-medium">
                {entry.name}:{" "}
                {typeof entry.value === "number"
                  ? entry.value.toLocaleString()
                  : entry.value}
              </p>
            </div>
          ))}

          {data.confidence && (
            <div className="mt-2 p-2 bg-gray-50 rounded">
              <div className="flex items-center justify-between text-xs">
                <span>AI Confidence</span>
                <span className="font-medium">{data.confidence}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div
                  className="bg-green-600 h-1.5 rounded-full transition-all"
                  style={{ width: `${data.confidence}%` }}
                />
              </div>
            </div>
          )}

          {data.anomaly && (
            <div className="mt-2 p-2 bg-red-50 rounded border border-red-200">
              <div className="flex items-center text-red-700 text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" />
                <span className="font-medium">Anomaly Detected</span>
              </div>
              <p className="text-xs text-red-600 mt-1">
                Click for detailed analysis
              </p>
            </div>
          )}

          {data.events && data.events.length > 0 && (
            <div className="mt-2 p-2 bg-blue-50 rounded">
              <p className="text-xs font-medium text-blue-700 mb-1">Events:</p>
              {data.events.map((event, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="text-xs mr-1 mb-1"
                >
                  {event.replace("_", " ")}
                </Badge>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Enhanced anomaly dot with severity indication
  const AnomalyDot = (props) => {
    const { cx, cy, payload } = props;
    if (payload.anomaly) {
      const severity = payload.severity || "medium";
      const severityColors = {
        high: "#EF4444",
        medium: "#F59E0B",
        low: "#10B981",
      };

      return (
        <g>
          <circle
            cx={cx}
            cy={cy}
            r={8}
            fill={severityColors[severity]}
            stroke="#FFFFFF"
            strokeWidth={3}
            className="cursor-pointer animate-pulse"
            onClick={() =>
              handleAnomalyClick(
                liveAnomalies.find((a) => a.type.includes(payload.date)),
              )
            }
          />
          <circle
            cx={cx}
            cy={cy}
            r={12}
            fill="none"
            stroke={severityColors[severity]}
            strokeWidth={2}
            strokeOpacity={0.5}
            className="animate-ping"
          />
        </g>
      );
    }
    return null;
  };

  // Chart rendering with enhanced interactivity
  const renderMainChart = () => {
    const scenarioMultiplier = predictionScenarios[predictionMode].multiplier;

    switch (selectedChart) {
      case "performance":
        return (
          <ResponsiveContainer width="100%" height={450}>
            <ComposedChart
              data={performanceData.map((d) => ({
                ...d,
                predicted: d.predicted
                  ? d.predicted * scenarioMultiplier
                  : null,
                confidenceUpper: d.confidenceUpper
                  ? d.confidenceUpper * scenarioMultiplier
                  : null,
                confidenceLower: d.confidenceLower
                  ? d.confidenceLower * scenarioMultiplier
                  : null,
              }))}
              onClick={(data) =>
                data?.activePayload &&
                handleDataPointClick(
                  data.activePayload[0].payload,
                  "performance",
                )
              }
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip content={<AITooltip />} />
              <Legend />

              {/* Confidence interval band */}
              <Area
                type="monotone"
                dataKey="confidenceUpper"
                stroke="none"
                fill="#E0E7FF"
                fillOpacity={0.2}
                name="Confidence Band"
              />
              <Area
                type="monotone"
                dataKey="confidenceLower"
                stroke="none"
                fill="#FFFFFF"
                fillOpacity={1}
                name=""
              />

              {/* Actual performance line */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#4F46E5"
                strokeWidth={4}
                dot={<AnomalyDot />}
                name="Actual Performance"
                activeDot={{ r: 6, fill: "#4F46E5" }}
              />

              {/* Predicted performance line */}
              <Line
                type="monotone"
                dataKey="predicted"
                stroke={predictionScenarios[predictionMode].color}
                strokeWidth={3}
                strokeDasharray="8 4"
                dot={false}
                name={`Predicted (${predictionScenarios[predictionMode].name})`}
              />

              {/* Performance target line */}
              <ReferenceLine
                y={2000}
                stroke="#10B981"
                strokeDasharray="4 4"
                label="Target Performance"
              />
            </ComposedChart>
          </ResponsiveContainer>
        );

      case "accuracy":
        return (
          <ResponsiveContainer width="100%" height={450}>
            <ComposedChart data={accuracyTrendsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis yAxisId="accuracy" domain={[90, 100]} stroke="#666" />
              <YAxis yAxisId="errors" orientation="right" stroke="#EF4444" />
              <Tooltip content={<AITooltip />} />
              <Legend />

              {/* Success zone */}
              <ReferenceArea
                y1={95}
                y2={100}
                fill="#D1FAE5"
                fillOpacity={0.3}
              />

              {/* Accuracy trend */}
              <Line
                yAxisId="accuracy"
                type="monotone"
                dataKey="accuracy"
                stroke="#10B981"
                strokeWidth={4}
                name="Actual Accuracy"
                dot={<AnomalyDot />}
              />

              {/* Predicted accuracy */}
              <Line
                yAxisId="accuracy"
                type="monotone"
                dataKey="predicted"
                stroke="#3B82F6"
                strokeWidth={3}
                strokeDasharray="6 3"
                name="Predicted Accuracy"
              />

              {/* Error count bars */}
              <Bar
                yAxisId="errors"
                dataKey="errors"
                fill="#FEE2E2"
                stroke="#EF4444"
                strokeWidth={1}
                name="Error Count"
                opacity={0.7}
              />

              {/* Accuracy threshold */}
              <ReferenceLine
                yAxisId="accuracy"
                y={95}
                stroke="#EF4444"
                strokeDasharray="4 4"
                label="Minimum Target (95%)"
              />
            </ComposedChart>
          </ResponsiveContainer>
        );

      case "risk":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[450px]">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">
                Risk Distribution
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={riskAnalysisData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value, trend }) =>
                      `${name}: ${value} (${trend > 0 ? "+" : ""}${trend}%)`
                    }
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {riskAnalysisData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-center">
                Risk vs Impact Analysis
              </h3>
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={riskAnalysisData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="probability"
                    name="Probability"
                    domain={[0, 1]}
                    tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                  />
                  <YAxis dataKey="value" name="Count" />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    formatter={(value, name) => [
                      name === "probability"
                        ? `${(value * 100).toFixed(1)}%`
                        : value,
                      name === "probability" ? "Probability" : "Count",
                    ]}
                  />
                  <Scatter dataKey="value" fill="#8884d8" r={6} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Header with AI Status */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Advanced Analytics
            </h1>
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border border-purple-200"
            >
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
          </div>

          {/* Real-time status indicator */}
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${realTimeEnabled ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
            />
            <span className="text-sm text-gray-600">
              {realTimeEnabled ? "Live" : "Static"}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={realTimeEnabled ? "default" : "outline"}
            size="sm"
            onClick={() => setRealTimeEnabled(!realTimeEnabled)}
          >
            <Activity className="w-4 h-4 mr-1" />
            {realTimeEnabled ? "Live Mode" : "Enable Live"}
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-1" />
            Configure
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* AI Confidence Filter */}
      <Card className="border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">AI Confidence Filter:</span>
              <div className="flex items-center space-x-2">
                <span className="text-xs">{confidenceFilter[0]}%</span>
                <Slider
                  value={confidenceFilter}
                  onValueChange={setConfidenceFilter}
                  max={100}
                  min={50}
                  step={5}
                  className="w-32"
                />
                <span className="text-xs">{confidenceFilter[1]}%</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Prediction Scenario:</span>
              <select
                value={predictionMode}
                onChange={(e) => setPredictionMode(e.target.value)}
                className="text-sm border rounded px-3 py-1 bg-white"
              >
                {Object.entries(predictionScenarios).map(([key, scenario]) => (
                  <option key={key} value={key}>
                    {scenario.name} ({scenario.confidence}%)
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Chart Type Selector with Enhanced Tabs */}
      <Tabs
        value={selectedChart}
        onValueChange={setSelectedChart}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 bg-white border">
          <TabsTrigger
            value="performance"
            className="flex items-center space-x-2 data-[state=active]:bg-blue-100"
          >
            <ChartLine className="w-4 h-4" />
            <span>Performance Analytics</span>
          </TabsTrigger>
          <TabsTrigger
            value="accuracy"
            className="flex items-center space-x-2 data-[state=active]:bg-green-100"
          >
            <Target className="w-4 h-4" />
            <span>AI Accuracy Trends</span>
          </TabsTrigger>
          <TabsTrigger
            value="risk"
            className="flex items-center space-x-2 data-[state=active]:bg-red-100"
          >
            <Shield className="w-4 h-4" />
            <span>Risk Intelligence</span>
          </TabsTrigger>
        </TabsList>

        {/* Enhanced 3-Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-6">
          {/* Left Column - AI Narrative Panel */}
          <div className="xl:col-span-3 space-y-4">
            {/* AI Narrator Card */}
            <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-purple-600" />
                    <span>AI Narrator</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setNarrativeVoice(!narrativeVoice)}
                    >
                      {narrativeVoice ? (
                        <Volume2 className="w-4 h-4" />
                      ) : (
                        <VolumeX className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={aiNarrating ? stopNarration : startNarration}
                      disabled={!narrativeVoice && !aiNarrating}
                    >
                      {aiNarrating ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Narrative Speed Control */}
                  {narrativeVoice && (
                    <div className="flex items-center space-x-2 text-xs">
                      <span>Speed:</span>
                      <Slider
                        value={[narrativeSpeed]}
                        onValueChange={(value) => setNarrativeSpeed(value[0])}
                        max={2}
                        min={0.5}
                        step={0.25}
                        className="flex-1"
                      />
                      <span>{narrativeSpeed}x</span>
                    </div>
                  )}

                  <div
                    className={`transition-all duration-300 ${aiNarrating ? "animate-pulse" : ""}`}
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <h3 className="font-semibold text-gray-900">
                        {getCurrentNarrative().title}
                      </h3>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          getCurrentNarrative().emotion === "optimistic"
                            ? "bg-green-100 text-green-700"
                            : getCurrentNarrative().emotion === "confident"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {getCurrentNarrative().emotion}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {getCurrentNarrative().narrative}
                    </p>
                  </div>

                  {/* Key Insights */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <Lightbulb className="w-4 h-4 mr-1 text-yellow-500" />
                      Key Insights
                    </h4>
                    {getCurrentNarrative().keyInsights.map((insight, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <ArrowUpRight className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-xs text-gray-600">{insight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Risk Factors */}
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1 text-orange-500" />
                      Risk Factors
                    </h4>
                    {getCurrentNarrative().riskFactors.map((risk, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <ArrowDownRight className="w-3 h-3 text-orange-500 mt-1 flex-shrink-0" />
                        <span className="text-xs text-gray-600">{risk}</span>
                      </div>
                    ))}
                  </div>

                  {/* AI Confidence Meter */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <span className="text-xs text-gray-500">AI Confidence</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2.5 rounded-full transition-all duration-500"
                          style={{
                            width: `${getCurrentNarrative().confidence}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-medium text-green-600">
                        {getCurrentNarrative().confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Anomaly Detection */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <span>Live Anomaly Detection</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-ping" />
                    <span className="text-xs text-orange-600">
                      {
                        liveAnomalies.filter((a) => a.status === "active")
                          .length
                      }{" "}
                      Active
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {liveAnomalies.map((anomaly) => (
                    <div
                      key={anomaly.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        selectedAnomaly?.id === anomaly.id
                          ? "border-orange-300 bg-orange-50"
                          : anomaly.status === "active"
                            ? "border-red-200 bg-red-50"
                            : "border-gray-200"
                      }`}
                      onClick={() => handleAnomalyClick(anomaly)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <div
                              className={`w-2.5 h-2.5 rounded-full ${
                                anomaly.severity === "high"
                                  ? "bg-red-500 animate-pulse"
                                  : anomaly.severity === "medium"
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                              }`}
                            />
                            <h4 className="font-medium text-sm">
                              {anomaly.title}
                            </h4>
                            <Badge
                              variant="secondary"
                              className={`text-xs ${
                                anomaly.status === "active"
                                  ? "bg-red-100 text-red-700"
                                  : anomaly.status === "resolved"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {anomaly.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-600 mb-2">
                            {anomaly.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Confidence: {anomaly.confidence}%</span>
                            <span>{anomaly.timeToResolve}</span>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span className="text-xs">
                                {new Date(
                                  anomaly.timestamp,
                                ).toLocaleTimeString()}
                              </span>
                            </div>
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
          <div className="xl:col-span-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-5 h-5" />
                    <span>{getCurrentNarrative().title}</span>
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700"
                    >
                      <Brain className="w-3 h-3 mr-1" />
                      Interactive
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={`${
                        predictionMode === "optimistic"
                          ? "bg-green-100 text-green-700"
                          : predictionMode === "conservative"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {predictionScenarios[predictionMode].name}
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

                {/* Enhanced Chart Controls */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="text-sm border rounded px-2 py-1 bg-white"
                      >
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                        <option value="1y">Last year</option>
                        <option value="2y">Last 2 years</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        Confidence: {confidenceFilter[0]}%-{confidenceFilter[1]}
                        %
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Search className="w-4 h-4 mr-1" />
                      Explore
                    </Button>
                    <Button variant="outline" size="sm">
                      <MousePointer className="w-4 h-4 mr-1" />
                      Annotate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Insights Sidebar */}
          <div className="xl:col-span-3 space-y-4">
            {/* Predictive Insights */}
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span>Predictive Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {getCurrentNarrative().opportunities.map(
                    (opportunity, index) => (
                      <div
                        key={index}
                        className="p-3 border rounded-lg bg-gradient-to-r from-green-50 to-blue-50"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm text-gray-900">
                            Future Opportunity
                          </h4>
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-700 text-xs"
                          >
                            High Value
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          {opportunity}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Next 30 days</span>
                          <span>85% confidence</span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2 text-xs"
                        >
                          Plan Implementation
                        </Button>
                      </div>
                    ),
                  )}

                  {getCurrentNarrative().nextActions.map((action, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm text-gray-900">
                          Recommended Action
                        </h4>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700 text-xs"
                        >
                          Priority
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">{action}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-2 text-xs"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Execute
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Dashboard Builder */}
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  <span>AI Dashboard Builder</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="text-xs text-gray-600 mb-3">
                    Drag widgets to create your custom dashboard
                  </div>

                  {/* Widget Suggestions */}
                  {widgetSuggestions.map((widget) => (
                    <div
                      key={widget.id}
                      draggable
                      onDragStart={() => handleDragStart(widget)}
                      className="p-3 border rounded-lg cursor-move hover:shadow-md transition-all bg-white"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm text-gray-900">
                          {widget.title}
                        </h4>
                        <Badge variant="secondary" className="text-xs">
                          {widget.estimatedValue}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        {widget.description}
                      </p>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {widget.chartType}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {widget.implementationTime}
                        </span>
                      </div>
                      <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                        💡 {widget.aiReason}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-gray-500">
                          {widget.confidence}% match
                        </span>
                        <Move className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}

                  {/* Custom Dashboard Drop Zone */}
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    className="border-2 border-dashed border-purple-300 rounded-lg p-4 text-center min-h-24 bg-purple-50"
                  >
                    {customDashboard.length === 0 ? (
                      <div className="text-sm text-purple-600">
                        <Plus className="w-5 h-5 mx-auto mb-1" />
                        Drop widgets here to build your dashboard
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {customDashboard.map((widget, index) => (
                          <div
                            key={widget.id}
                            className="bg-white p-2 rounded border text-left"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium">
                                {widget.title}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  setCustomDashboard((prev) =>
                                    prev.filter((w) => w.id !== widget.id),
                                  )
                                }
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          Preview Dashboard
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Intelligence */}
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span>System Intelligence</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        96%
                      </div>
                      <div className="text-xs text-green-600">
                        AI Performance
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        89%
                      </div>
                      <div className="text-xs text-blue-600">
                        Processing Speed
                      </div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">
                        94%
                      </div>
                      <div className="text-xs text-purple-600">
                        Data Quality
                      </div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">
                        3
                      </div>
                      <div className="text-xs text-orange-600">
                        Active Alerts
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Prediction Accuracy</span>
                      <span className="font-medium">96%</span>
                    </div>
                    <Progress value={96} className="h-2" />

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">System Load</span>
                      <span className="font-medium">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Anomaly Detection</span>
                      <span className="font-medium">91%</span>
                    </div>
                    <Progress value={91} className="h-2" />
                  </div>

                  <div className="pt-3 border-t">
                    <div className="text-xs text-gray-500 mb-2">
                      Next maintenance in 14 days
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Settings className="w-3 h-3 mr-1" />
                      System Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enhanced Anomaly Investigation Modal */}
        {selectedAnomaly && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-6 h-6 text-orange-500" />
                    <span>Advanced Anomaly Analysis</span>
                    <Badge
                      variant="secondary"
                      className={`${
                        selectedAnomaly.severity === "high"
                          ? "bg-red-100 text-red-700"
                          : selectedAnomaly.severity === "medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                      }`}
                    >
                      {selectedAnomaly.severity} severity
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedAnomaly(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column - Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-xl mb-2">
                        {selectedAnomaly.title}
                      </h3>
                      <p className="text-gray-600">
                        {selectedAnomaly.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-500">
                          Confidence Score
                        </span>
                        <div className="flex items-center space-x-2 mt-1">
                          <Progress
                            value={selectedAnomaly.confidence}
                            className="flex-1 h-2"
                          />
                          <span className="font-semibold">
                            {selectedAnomaly.confidence}%
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-500">Status</span>
                        <p className="font-semibold mt-1 capitalize">
                          {selectedAnomaly.status}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-500">
                          Time to Resolve
                        </span>
                        <p className="font-semibold mt-1">
                          {selectedAnomaly.timeToResolve}
                        </p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm text-gray-500">
                          Similar Incidents
                        </span>
                        <p className="font-semibold mt-1">
                          {selectedAnomaly.similarIncidents}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Business Impact</h4>
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          {selectedAnomaly.businessImpact}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Root Cause Analysis</h4>
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                          {selectedAnomaly.rootCause}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Actions & Metrics */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-3">Affected Metrics</h4>
                      <div className="space-y-2">
                        {selectedAnomaly.affectedMetrics.map(
                          (metric, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-2 h-2 bg-red-500 rounded-full" />
                              <span className="text-sm capitalize">
                                {metric.replace("_", " ")}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">
                        AI-Recommended Actions
                      </h4>
                      <div className="space-y-3">
                        {selectedAnomaly.suggestedActions.map(
                          (action, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                              <div className="flex-1">
                                <span className="text-sm">{action}</span>
                              </div>
                              <Button variant="outline" size="sm">
                                Execute
                              </Button>
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4 border-t">
                      <Button size="sm" className="flex-1">
                        <Search className="w-4 h-4 mr-1" />
                        Deep Investigation
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Create Alert Rule
                      </Button>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-1" />
                        Export Report
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Upload className="w-4 h-4 mr-1" />
                        Share Analysis
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Data Point Details Modal */}
        {selectedDataPoint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Data Point Analysis</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedDataPoint(null)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-500">Date</span>
                      <p className="font-semibold">{selectedDataPoint.date}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Value</span>
                      <p className="font-semibold">
                        {selectedDataPoint.actual ||
                          selectedDataPoint.predicted}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Confidence</span>
                      <p className="font-semibold">
                        {selectedDataPoint.confidence}%
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Chart</span>
                      <p className="font-semibold capitalize">
                        {selectedDataPoint.chart}
                      </p>
                    </div>
                  </div>

                  {selectedDataPoint.anomaly && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-medium text-red-800 mb-1">
                        Anomaly Detected
                      </h4>
                      <p className="text-sm text-red-700">
                        This data point shows unusual patterns that require
                        investigation.
                      </p>
                    </div>
                  )}

                  {selectedDataPoint.events &&
                    selectedDataPoint.events.length > 0 && (
                      <div>
                        <h4 className="font-medium mb-2">Related Events</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedDataPoint.events.map((event, index) => (
                            <Badge key={index} variant="secondary">
                              {event.replace("_", " ")}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </Tabs>
    </div>
  );
};

export default AdvancedAnalytics;
