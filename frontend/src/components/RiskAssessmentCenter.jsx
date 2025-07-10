import React, { useState, useEffect, useCallback } from "react";
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Brain,
  Zap,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Play,
  Pause,
  RefreshCw,
  Settings,
  Eye,
  Target,
  Lightbulb,
  Bell,
  MapPin,
  BarChart3,
  LineChart,
  PieChart,
  Gauge,
  Workflow,
  Download,
  Filter,
  Calendar,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Cpu,
  Database,
  Globe,
  DollarSign,
  Users,
  Lock,
  Server,
  Wifi,
  FileText,
  CreditCard,
  Building,
  Briefcase,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  LineChart as RechartsLineChart,
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ComposedChart,
  ReferenceLine,
  ReferenceArea,
  Legend,
  RadialBarChart,
  RadialBar,
} from "recharts";

const RiskAssessmentCenter = () => {
  const [currentRiskLevel, setCurrentRiskLevel] = useState(8.7);
  const [aiConfidence, setAiConfidence] = useState(94);
  const [trajectory, setTrajectory] = useState("increasing");
  const [predictedLevel, setPredictedLevel] = useState(9.2);
  const [selectedRiskArea, setSelectedRiskArea] = useState(null);
  const [autoResponseEnabled, setAutoResponseEnabled] = useState(true);
  const [realTimeUpdates, setRealTimeUpdates] = useState(true);
  const [selectedScenario, setSelectedScenario] = useState("likely");
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [expandedRisk, setExpandedRisk] = useState(null);

  // Risk Heat Map Data
  const riskAreas = [
    {
      id: "financial",
      name: "Financial",
      icon: DollarSign,
      currentScore: 8.9,
      trend: "increasing",
      change: "+0.8",
      color: "#EF4444",
      bgColor: "#FEE2E2",
      details: {
        subCategories: [
          "Credit Risk",
          "Market Risk",
          "Liquidity Risk",
          "Operational Risk",
        ],
        lastUpdated: "2 minutes ago",
        keyFactors: [
          "Market volatility",
          "Credit defaults",
          "Cash flow issues",
        ],
        mitigationStatus: "In Progress",
      },
    },
    {
      id: "operational",
      name: "Operational",
      icon: Briefcase,
      currentScore: 6.2,
      trend: "stable",
      change: "+0.1",
      color: "#F59E0B",
      bgColor: "#FEF3C7",
      details: {
        subCategories: [
          "Process Risk",
          "Human Error",
          "System Failures",
          "Supply Chain",
        ],
        lastUpdated: "5 minutes ago",
        keyFactors: [
          "Staff shortages",
          "Process bottlenecks",
          "Equipment aging",
        ],
        mitigationStatus: "Monitoring",
      },
    },
    {
      id: "compliance",
      name: "Compliance",
      icon: FileText,
      currentScore: 4.1,
      trend: "decreasing",
      change: "-0.3",
      color: "#10B981",
      bgColor: "#D1FAE5",
      details: {
        subCategories: [
          "Regulatory Risk",
          "Legal Risk",
          "Audit Risk",
          "Policy Violations",
        ],
        lastUpdated: "1 minute ago",
        keyFactors: ["New regulations", "Audit findings", "Policy updates"],
        mitigationStatus: "Compliant",
      },
    },
    {
      id: "cyber",
      name: "Cyber Security",
      icon: Lock,
      currentScore: 7.5,
      trend: "increasing",
      change: "+0.5",
      color: "#DC2626",
      bgColor: "#FEE2E2",
      details: {
        subCategories: [
          "Data Breach",
          "Malware",
          "Phishing",
          "System Intrusion",
        ],
        lastUpdated: "30 seconds ago",
        keyFactors: [
          "Increased attacks",
          "Vulnerability patches",
          "User behavior",
        ],
        mitigationStatus: "Active Response",
      },
    },
  ];

  // Emerging Risk Patterns
  const emergingRisks = [
    {
      id: "pattern_1",
      title: "Coordinated Cyber Attack Pattern",
      description:
        "AI detected unusual network traffic patterns indicating potential coordinated attack",
      confidence: 92,
      severity: "high",
      probability: 0.87,
      timeframe: "24-48 hours",
      affectedAreas: ["cyber", "operational"],
      indicators: [
        "Increased failed login attempts (340% above baseline)",
        "Unusual data access patterns detected",
        "Network latency spikes in critical systems",
      ],
      aiRecommendations: [
        "Immediately activate incident response team",
        "Enable enhanced monitoring on all critical systems",
        "Implement temporary access restrictions",
        "Notify relevant stakeholders and regulatory bodies",
      ],
      status: "active",
      triggeredActions: ["Enhanced Monitoring", "Team Notification"],
    },
    {
      id: "pattern_2",
      title: "Market Volatility Correlation",
      description:
        "AI identified strong correlation between current market conditions and historical crisis patterns",
      confidence: 87,
      severity: "medium",
      probability: 0.74,
      timeframe: "7-14 days",
      affectedAreas: ["financial"],
      indicators: [
        "Market volatility index exceeded threshold",
        "Currency fluctuations match 2008 patterns",
        "Client withdrawal requests increasing",
      ],
      aiRecommendations: [
        "Review and adjust investment portfolios",
        "Increase cash reserves by 15%",
        "Prepare client communication strategy",
        "Monitor competitor actions closely",
      ],
      status: "monitoring",
      triggeredActions: ["Portfolio Review Scheduled"],
    },
    {
      id: "pattern_3",
      title: "Operational Capacity Strain",
      description:
        "Predictive models show potential operational capacity issues during peak season",
      confidence: 95,
      severity: "medium",
      probability: 0.91,
      timeframe: "2-3 weeks",
      affectedAreas: ["operational"],
      indicators: [
        "Staff utilization approaching 95%",
        "System response times degrading",
        "Customer complaints trending upward",
      ],
      aiRecommendations: [
        "Schedule additional temporary staff",
        "Optimize system performance",
        "Implement customer expectation management",
        "Consider outsourcing non-critical tasks",
      ],
      status: "planning",
      triggeredActions: ["Capacity Planning Review"],
    },
  ];

  // Historical Risk Data
  const riskTrajectoryData = [
    {
      date: "2024-01",
      financial: 6.2,
      operational: 5.8,
      compliance: 3.2,
      cyber: 6.1,
      overall: 5.3,
    },
    {
      date: "2024-02",
      financial: 6.8,
      operational: 6.1,
      compliance: 3.5,
      cyber: 6.4,
      overall: 5.7,
    },
    {
      date: "2024-03",
      financial: 7.2,
      operational: 5.9,
      compliance: 3.8,
      cyber: 6.8,
      overall: 5.9,
    },
    {
      date: "2024-04",
      financial: 7.8,
      operational: 6.0,
      compliance: 4.2,
      cyber: 7.1,
      overall: 6.3,
    },
    {
      date: "2024-05",
      financial: 8.1,
      operational: 6.2,
      compliance: 4.0,
      cyber: 7.3,
      overall: 6.4,
    },
    {
      date: "2024-06",
      financial: 8.7,
      operational: 6.2,
      compliance: 4.1,
      cyber: 7.5,
      overall: 6.6,
    },
    // Predicted future data
    {
      date: "2024-07",
      financial: 9.2,
      operational: 6.5,
      compliance: 4.3,
      cyber: 7.8,
      overall: 6.9,
      predicted: true,
    },
    {
      date: "2024-08",
      financial: 9.5,
      operational: 6.8,
      compliance: 4.5,
      cyber: 8.1,
      overall: 7.2,
      predicted: true,
    },
    {
      date: "2024-09",
      financial: 9.8,
      operational: 7.1,
      compliance: 4.8,
      cyber: 8.4,
      overall: 7.5,
      predicted: true,
    },
  ];

  // Scenario modeling data
  const scenarioData = {
    best: { multiplier: 0.7, name: "Best Case", confidence: 78 },
    likely: { multiplier: 1.0, name: "Most Likely", confidence: 94 },
    worst: { multiplier: 1.3, name: "Worst Case", confidence: 82 },
  };

  // Automated Response Workflows
  const automatedWorkflows = [
    {
      id: "workflow_1",
      name: "High Risk Cyber Alert",
      trigger: "Cyber risk > 8.0",
      status: "active",
      lastTriggered: "2 minutes ago",
      actions: [
        "Send immediate alert to CISO",
        "Activate incident response team",
        "Increase monitoring frequency",
        "Prepare preliminary assessment",
      ],
      nextExecution: "Continuous monitoring",
    },
    {
      id: "workflow_2",
      name: "Financial Risk Escalation",
      trigger: "Financial risk > 8.5",
      status: "triggered",
      lastTriggered: "15 minutes ago",
      actions: [
        "Notify CFO and risk committee",
        "Generate detailed risk report",
        "Schedule emergency board meeting",
        "Activate crisis communication plan",
      ],
      nextExecution: "Pending board response",
    },
    {
      id: "workflow_3",
      name: "Compliance Monitoring",
      trigger: "Compliance risk > 6.0",
      status: "standby",
      lastTriggered: "Never",
      actions: [
        "Alert compliance team",
        "Generate compliance report",
        "Schedule regulatory review",
        "Update compliance dashboard",
      ],
      nextExecution: "Monitoring thresholds",
    },
  ];

  // Real-time updates simulation
  useEffect(() => {
    if (!realTimeUpdates) return;

    const interval = setInterval(() => {
      // Simulate risk score fluctuations
      setCurrentRiskLevel((prev) => {
        const change = (Math.random() - 0.5) * 0.2;
        const newLevel = Math.max(0, Math.min(10, prev + change));
        return Math.round(newLevel * 10) / 10;
      });

      // Update AI confidence
      setAiConfidence((prev) => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(80, Math.min(99, Math.round(prev + change)));
      });

      // Update predicted level
      setPredictedLevel((prev) => {
        const change = (Math.random() - 0.5) * 0.15;
        return Math.max(0, Math.min(10, Math.round((prev + change) * 10) / 10));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [realTimeUpdates]);

  // Risk gauge component
  const RiskGauge = ({
    currentLevel,
    aiConfidence,
    trajectory,
    predictedLevel,
  }) => {
    const getRiskColor = (level) => {
      if (level < 3) return "#10B981";
      if (level < 6) return "#F59E0B";
      if (level < 8) return "#EF4444";
      return "#DC2626";
    };

    const getRiskLabel = (level) => {
      if (level < 3) return "Low";
      if (level < 6) return "Medium";
      if (level < 8) return "High";
      return "Critical";
    };

    const gaugeData = [
      {
        name: "Current",
        value: currentLevel * 10,
        fill: getRiskColor(currentLevel),
      },
      { name: "Remaining", value: (10 - currentLevel) * 10, fill: "#E5E7EB" },
    ];

    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gauge className="w-5 h-5" />
              <span>Risk Score</span>
            </div>
            <Badge
              variant="secondary"
              className={`${
                currentLevel < 3
                  ? "bg-green-100 text-green-700"
                  : currentLevel < 6
                    ? "bg-yellow-100 text-yellow-700"
                    : currentLevel < 8
                      ? "bg-red-100 text-red-700"
                      : "bg-red-200 text-red-800"
              }`}
            >
              {getRiskLabel(currentLevel)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Gauge Chart */}
            <div className="relative">
              <ResponsiveContainer width="100%" height={200}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="90%"
                  data={[gaugeData[0]]}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    dataKey="value"
                    cornerRadius={10}
                    fill={getRiskColor(currentLevel)}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div
                    className="text-3xl font-bold"
                    style={{ color: getRiskColor(currentLevel) }}
                  >
                    {currentLevel}
                  </div>
                  <div className="text-sm text-gray-500">/ 10</div>
                </div>
              </div>
            </div>

            {/* Risk Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Brain className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">AI Confidence</span>
                </div>
                <div className="text-xl font-bold text-blue-600">
                  {aiConfidence}%
                </div>
              </div>

              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <div className="flex items-center">
                    {trajectory === "increasing" ? (
                      <TrendingUp className="w-4 h-4 text-red-500" />
                    ) : trajectory === "decreasing" ? (
                      <TrendingDown className="w-4 h-4 text-green-500" />
                    ) : (
                      <Activity className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                  <span className="text-sm font-medium">Trajectory</span>
                </div>
                <div
                  className={`text-xl font-bold ${
                    trajectory === "increasing"
                      ? "text-red-600"
                      : trajectory === "decreasing"
                        ? "text-green-600"
                        : "text-yellow-600"
                  }`}
                >
                  {trajectory}
                </div>
              </div>
            </div>

            {/* Prediction */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-700">
                  Predicted Level (24h)
                </span>
                <Target className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-2xl font-bold text-blue-600">
                  {predictedLevel}
                </div>
                <ArrowRight className="w-4 h-4 text-blue-500" />
                <div className="text-sm text-blue-600">
                  {predictedLevel > currentLevel ? "+" : ""}
                  {(predictedLevel - currentLevel).toFixed(1)} change
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Heat map component
  const RiskHeatMap = ({ areas, onAreaClick }) => {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Risk Heat Map</span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${realTimeUpdates ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
              />
              <span className="text-xs text-gray-500">
                {realTimeUpdates ? "Live" : "Static"}
              </span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {areas.map((area) => {
              const IconComponent = area.icon;
              return (
                <div
                  key={area.id}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedRiskArea?.id === area.id
                      ? "border-blue-300 bg-blue-50"
                      : "border-gray-200"
                  }`}
                  style={{ backgroundColor: area.bgColor }}
                  onClick={() => {
                    setSelectedRiskArea(area);
                    onAreaClick?.(area);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <IconComponent
                        className="w-4 h-4"
                        style={{ color: area.color }}
                      />
                      <span className="font-medium text-sm">{area.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {area.trend === "increasing" ? (
                        <ArrowUp className="w-3 h-3 text-red-500" />
                      ) : area.trend === "decreasing" ? (
                        <ArrowDown className="w-3 h-3 text-green-500" />
                      ) : (
                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-2xl font-bold"
                        style={{ color: area.color }}
                      >
                        {area.currentScore}
                      </span>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${
                          area.trend === "increasing"
                            ? "bg-red-100 text-red-700"
                            : area.trend === "decreasing"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {area.change}
                      </Badge>
                    </div>

                    <Progress
                      value={(area.currentScore / 10) * 100}
                      className="h-2"
                      style={{
                        "--progress-background": area.color,
                      }}
                    />

                    <div className="text-xs text-gray-600">
                      Updated: {area.details.lastUpdated}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Heat Map Legend */}
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between text-xs">
              <span>Risk Level:</span>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-green-500 rounded" />
                  <span>Low (0-3)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-yellow-500 rounded" />
                  <span>Medium (3-6)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-red-500 rounded" />
                  <span>High (6-10)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // AI Risk Analyzer component
  const AIRiskAnalyzer = ({ emergingRisks, autoResponse }) => {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-600" />
              <span>AI Risk Analyzer</span>
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-700"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Real-time AI
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={autoResponse ? "default" : "outline"}
                size="sm"
                onClick={() => setAutoResponseEnabled(!autoResponse)}
              >
                <Workflow className="w-4 h-4 mr-1" />
                Auto Response {autoResponse ? "ON" : "OFF"}
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-1" />
                Configure
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {emergingRisks.map((risk) => (
              <div
                key={risk.id}
                className={`p-4 border rounded-lg transition-all hover:shadow-sm ${
                  expandedRisk === risk.id
                    ? "border-purple-300 bg-purple-50"
                    : "border-gray-200"
                }`}
              >
                <div
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() =>
                    setExpandedRisk(expandedRisk === risk.id ? null : risk.id)
                  }
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          risk.severity === "high"
                            ? "bg-red-500"
                            : risk.severity === "medium"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                      />
                      <h4 className="font-semibold">{risk.title}</h4>
                      <Badge
                        variant="secondary"
                        className={`${
                          risk.status === "active"
                            ? "bg-red-100 text-red-700"
                            : risk.status === "monitoring"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {risk.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {risk.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Confidence: {risk.confidence}%</span>
                      <span>
                        Probability: {(risk.probability * 100).toFixed(0)}%
                      </span>
                      <span>Timeframe: {risk.timeframe}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        {risk.confidence}%
                      </div>
                      <div className="text-xs text-gray-500">Confidence</div>
                    </div>
                    {expandedRisk === risk.id ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedRisk === risk.id && (
                  <div className="mt-4 space-y-4 border-t pt-4">
                    {/* Risk Indicators */}
                    <div>
                      <h5 className="font-medium text-sm mb-2">
                        Risk Indicators
                      </h5>
                      <div className="space-y-1">
                        {risk.indicators.map((indicator, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <AlertTriangle className="w-3 h-3 text-orange-500 mt-0.5" />
                            <span className="text-xs text-gray-600">
                              {indicator}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* AI Recommendations */}
                    <div>
                      <h5 className="font-medium text-sm mb-2">
                        AI Recommendations
                      </h5>
                      <div className="space-y-2">
                        {risk.aiRecommendations.map((recommendation, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <Lightbulb className="w-3 h-3 text-yellow-500 mt-0.5" />
                            <span className="text-xs text-gray-600">
                              {recommendation}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="ml-auto"
                            >
                              <Play className="w-3 h-3 mr-1" />
                              Execute
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Triggered Actions */}
                    <div>
                      <h5 className="font-medium text-sm mb-2">
                        Triggered Actions
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {risk.triggeredActions.map((action, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="bg-green-100 text-green-700"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Affected Areas */}
                    <div>
                      <h5 className="font-medium text-sm mb-2">
                        Affected Risk Areas
                      </h5>
                      <div className="flex space-x-2">
                        {risk.affectedAreas.map((areaId, index) => {
                          const area = riskAreas.find((a) => a.id === areaId);
                          return area ? (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {area.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Risk Trajectory Timeline component
  const RiskTrajectory = ({
    data,
    scenarios,
    selectedScenario,
    confidenceInterval,
  }) => {
    const processedData = data.map((item) => {
      const multiplier = scenarios[selectedScenario].multiplier;
      if (item.predicted) {
        return {
          ...item,
          financial: item.financial * multiplier,
          operational: item.operational * multiplier,
          compliance: item.compliance * multiplier,
          cyber: item.cyber * multiplier,
          overall: item.overall * multiplier,
        };
      }
      return item;
    });

    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <LineChart className="w-5 h-5" />
              <span>Risk Trajectory Timeline</span>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedScenario}
                onChange={(e) => setSelectedScenario(e.target.value)}
                className="text-sm border rounded px-3 py-1 bg-white"
              >
                {Object.entries(scenarios).map(([key, scenario]) => (
                  <option key={key} value={key}>
                    {scenario.name} ({scenario.confidence}%)
                  </option>
                ))}
              </select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-1" />
                Export
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Scenario Confidence */}
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-700">
                  {scenarios[selectedScenario].name} Scenario
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-blue-600">
                    Confidence: {scenarios[selectedScenario].confidence}%
                  </span>
                  <Progress
                    value={scenarios[selectedScenario].confidence}
                    className="w-20 h-2"
                  />
                </div>
              </div>
            </div>

            {/* Timeline Chart */}
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={processedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#666" />
                <YAxis stroke="#666" domain={[0, 10]} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-3 border rounded-lg shadow-lg">
                          <p className="font-medium">{label}</p>
                          {payload.map((entry, index) => (
                            <p key={index} style={{ color: entry.color }}>
                              {entry.name}: {entry.value.toFixed(1)}
                              {data.predicted && (
                                <span className="text-xs ml-1">
                                  (Predicted)
                                </span>
                              )}
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />

                {/* Historical vs Predicted divider */}
                <ReferenceLine
                  x="2024-06"
                  stroke="#666"
                  strokeDasharray="5 5"
                  label="Current"
                />

                {/* Risk area lines */}
                <Line
                  type="monotone"
                  dataKey="financial"
                  stroke="#EF4444"
                  strokeWidth={3}
                  name="Financial"
                  connectNulls={false}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="operational"
                  stroke="#F59E0B"
                  strokeWidth={3}
                  name="Operational"
                  connectNulls={false}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="compliance"
                  stroke="#10B981"
                  strokeWidth={3}
                  name="Compliance"
                  connectNulls={false}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="cyber"
                  stroke="#DC2626"
                  strokeWidth={3}
                  name="Cyber Security"
                  connectNulls={false}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="overall"
                  stroke="#6366F1"
                  strokeWidth={4}
                  name="Overall Risk"
                  connectNulls={false}
                  dot={{ r: 6 }}
                />

                {/* Risk level zones */}
                <ReferenceArea y1={0} y2={3} fill="#D1FAE5" fillOpacity={0.2} />
                <ReferenceArea y1={3} y2={6} fill="#FEF3C7" fillOpacity={0.2} />
                <ReferenceArea
                  y1={6}
                  y2={10}
                  fill="#FEE2E2"
                  fillOpacity={0.2}
                />
              </ComposedChart>
            </ResponsiveContainer>

            {/* Key Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <h5 className="font-medium text-green-800 mb-1">
                  Positive Trends
                </h5>
                <p className="text-sm text-green-700">
                  Compliance risk decreased 7% this quarter
                </p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                <h5 className="font-medium text-red-800 mb-1">Concern Areas</h5>
                <p className="text-sm text-red-700">
                  Financial risk trending upward +2.5 points
                </p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <h5 className="font-medium text-blue-800 mb-1">
                  AI Prediction
                </h5>
                <p className="text-sm text-blue-700">
                  Peak risk expected in 6-8 weeks
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
            Risk Assessment Center
          </h1>
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-red-100 to-purple-100 text-red-700 border border-red-200"
          >
            <Shield className="w-3 h-3 mr-1" />
            AI-Powered
          </Badge>
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${realTimeUpdates ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
            />
            <span className="text-sm text-gray-600">
              {realTimeUpdates ? "Live Monitoring" : "Static Mode"}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant={realTimeUpdates ? "default" : "outline"}
            size="sm"
            onClick={() => setRealTimeUpdates(!realTimeUpdates)}
          >
            <Activity className="w-4 h-4 mr-1" />
            {realTimeUpdates ? "Live Mode" : "Enable Live"}
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-1" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-1" />
            Configure
          </Button>
        </div>
      </div>

      {/* Top Row - Risk Gauge and Heat Map */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskGauge
          currentLevel={currentRiskLevel}
          aiConfidence={aiConfidence}
          trajectory={trajectory}
          predictedLevel={predictedLevel}
        />
        <RiskHeatMap
          areas={riskAreas}
          onAreaClick={(area) => console.log("Area clicked:", area)}
        />
      </div>

      {/* Middle Row - AI Risk Analyzer */}
      <AIRiskAnalyzer
        emergingRisks={emergingRisks}
        autoResponse={autoResponseEnabled}
      />

      {/* Bottom Row - Risk Trajectory Timeline */}
      <RiskTrajectory
        data={riskTrajectoryData}
        scenarios={scenarioData}
        selectedScenario={selectedScenario}
        confidenceInterval={85}
      />

      {/* Automated Workflows Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Workflow className="w-5 h-5 text-blue-600" />
              <span>Automated Response Workflows</span>
            </div>
            <Button variant="outline" size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Add Workflow
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {automatedWorkflows.map((workflow) => (
              <div key={workflow.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{workflow.name}</h4>
                  <Badge
                    variant="secondary"
                    className={`${
                      workflow.status === "active"
                        ? "bg-green-100 text-green-700"
                        : workflow.status === "triggered"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {workflow.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Trigger:</strong> {workflow.trigger}
                </p>
                <p className="text-xs text-gray-500 mb-3">
                  Last triggered: {workflow.lastTriggered}
                </p>
                <div className="space-y-1">
                  {workflow.actions.slice(0, 2).map((action, index) => (
                    <div
                      key={index}
                      className="text-xs text-gray-600 flex items-center"
                    >
                      <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                      {action}
                    </div>
                  ))}
                  {workflow.actions.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{workflow.actions.length - 2} more actions
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Risk Area Detail Modal */}
      {selectedRiskArea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader style={{ backgroundColor: selectedRiskArea.bgColor }}>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <selectedRiskArea.icon
                    className="w-6 h-6"
                    style={{ color: selectedRiskArea.color }}
                  />
                  <span>{selectedRiskArea.name} Risk Analysis</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedRiskArea(null)}
                >
                  <XCircle className="w-5 h-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Risk Score */}
                <div className="text-center">
                  <div
                    className="text-4xl font-bold mb-2"
                    style={{ color: selectedRiskArea.color }}
                  >
                    {selectedRiskArea.currentScore}/10
                  </div>
                  <Badge
                    variant="secondary"
                    className={`${
                      selectedRiskArea.currentScore < 3
                        ? "bg-green-100 text-green-700"
                        : selectedRiskArea.currentScore < 6
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selectedRiskArea.currentScore < 3
                      ? "Low Risk"
                      : selectedRiskArea.currentScore < 6
                        ? "Medium Risk"
                        : "High Risk"}
                  </Badge>
                </div>

                {/* Sub-categories */}
                <div>
                  <h4 className="font-medium mb-3">Risk Sub-categories</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedRiskArea.details.subCategories.map(
                      (subCat, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="justify-center"
                        >
                          {subCat}
                        </Badge>
                      ),
                    )}
                  </div>
                </div>

                {/* Key Factors */}
                <div>
                  <h4 className="font-medium mb-3">Key Risk Factors</h4>
                  <div className="space-y-2">
                    {selectedRiskArea.details.keyFactors.map(
                      (factor, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                          <span className="text-sm">{factor}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                {/* Mitigation Status */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Mitigation Status</h4>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        selectedRiskArea.details.mitigationStatus ===
                        "Compliant"
                          ? "bg-green-500"
                          : selectedRiskArea.details.mitigationStatus ===
                              "In Progress"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
                      }`}
                    />
                    <span className="text-sm">
                      {selectedRiskArea.details.mitigationStatus}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Target className="w-4 h-4 mr-1" />
                    Create Action Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RiskAssessmentCenter;
