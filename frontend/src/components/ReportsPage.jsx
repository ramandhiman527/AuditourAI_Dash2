import React, { useState } from "react";
import {
  FileBarChart,
  Download,
  Calendar,
  Filter,
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  Share,
  Plus,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  ThemedCard,
  ThemedCardHeader,
  ThemedCardTitle,
  ThemedCardSubtitle,
  ThemedCardContent,
  ThemedProgress,
  ThemedButton,
  StatusBadge,
  MetricCard,
} from "./ui/themed-card";
import Loading from "./Loading";

const ReportsPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const mockReports = [
    {
      id: 1,
      title: "Quarterly Audit Summary Q3 2024",
      description:
        "Comprehensive audit analysis with AI-generated insights and risk assessments",
      type: "quarterly",
      status: "completed",
      generatedDate: "2024-01-15T10:30:00Z",
      aiConfidence: 96,
      pages: 42,
      findings: 23,
      risks: { high: 2, medium: 8, low: 13 },
      compliance: 94.2,
      downloadUrl: "#",
    },
    {
      id: 2,
      title: "Financial Controls Assessment",
      description:
        "AI-powered analysis of financial controls and compliance status",
      type: "financial",
      status: "generating",
      generatedDate: null,
      aiConfidence: null,
      pages: null,
      findings: null,
      risks: null,
      compliance: null,
      downloadUrl: null,
    },
    {
      id: 3,
      title: "Risk Management Dashboard Report",
      description:
        "Real-time risk analysis with predictive modeling and mitigation strategies",
      type: "risk",
      status: "scheduled",
      generatedDate: "2024-01-20T09:00:00Z",
      aiConfidence: null,
      pages: null,
      findings: null,
      risks: null,
      compliance: null,
      downloadUrl: null,
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "generating":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "scheduled":
        return <Calendar className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "generating":
        return "bg-yellow-100 text-yellow-700";
      case "scheduled":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleGenerateReport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log("New report generation started");
    }, 2000);
  };

  const handleDownloadReport = (report) => {
    console.log("Downloading report:", report.title);
    // Simulate download
    alert(`Downloading: ${report.title}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl font-bold text-gray-900">
            Intelligent Reports
          </h1>
          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
            <Brain className="w-3 h-3 mr-1" />
            AI-Generated
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
          <Button onClick={handleGenerateReport} disabled={loading}>
            {loading ? (
              <Loading type="inline" size="small" message="Generating..." />
            ) : (
              <>
                <Plus className="w-4 h-4 mr-1" />
                Generate Report
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Reports Overview */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {mockReports.map((report) => (
              <ThemedCard
                key={report.id}
                className="transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <ThemedCardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <ThemedCardTitle className="mb-2">
                        {report.title}
                      </ThemedCardTitle>
                      <ThemedCardSubtitle className="mb-3">
                        {report.description}
                      </ThemedCardSubtitle>
                    </div>
                  </div>
                </ThemedCardHeader>
                <ThemedCardContent>
                  <div className="space-y-4">
                    {/* Status */}
                    <div className="flex items-center justify-between">
                      <StatusBadge status={report.status}>
                        {getStatusIcon(report.status)}
                        <span className="ml-1 capitalize">{report.status}</span>
                      </StatusBadge>
                      {report.type && (
                        <Badge variant="outline" className="text-xs">
                          {report.type}
                        </Badge>
                      )}
                    </div>

                    {/* Metrics for completed reports */}
                    {report.status === "completed" && (
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div
                          className="p-2 rounded"
                          style={{ backgroundColor: "var(--card-background)" }}
                        >
                          <div
                            className="font-medium"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {report.pages}
                          </div>
                          <div style={{ color: "var(--text-secondary)" }}>
                            Pages
                          </div>
                        </div>
                        <div
                          className="p-2 rounded"
                          style={{ backgroundColor: "var(--card-background)" }}
                        >
                          <div
                            className="font-medium"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {report.findings}
                          </div>
                          <div style={{ color: "var(--text-secondary)" }}>
                            Findings
                          </div>
                        </div>
                        <div
                          className="p-2 rounded"
                          style={{ backgroundColor: "var(--card-background)" }}
                        >
                          <div
                            className="font-medium"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {report.compliance}%
                          </div>
                          <div style={{ color: "var(--text-secondary)" }}>
                            Compliance
                          </div>
                        </div>
                        <div
                          className="p-2 rounded"
                          style={{ backgroundColor: "var(--card-background)" }}
                        >
                          <div
                            className="font-medium"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {report.aiConfidence}%
                          </div>
                          <div style={{ color: "var(--text-secondary)" }}>
                            AI Confidence
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Risk breakdown for completed reports */}
                    {report.status === "completed" && report.risks && (
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-gray-900">
                          Risk Distribution
                        </h5>
                        <div className="flex space-x-2 text-xs">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-red-500 rounded-full mr-1" />
                            <span>High: {report.risks.high}</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-1" />
                            <span>Medium: {report.risks.medium}</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                            <span>Low: {report.risks.low}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Generated date */}
                    {report.generatedDate && (
                      <div className="text-xs text-gray-500">
                        Generated:{" "}
                        {new Date(report.generatedDate).toLocaleDateString()}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2 border-t">
                      {report.status === "completed" ? (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleDownloadReport(report)}
                            className="flex-1"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3 mr-1" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="w-3 h-3" />
                          </Button>
                        </>
                      ) : report.status === "generating" ? (
                        <div className="flex-1 text-center">
                          <Loading
                            type="inline"
                            size="small"
                            message="Generating report..."
                          />
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          disabled
                        >
                          <Calendar className="w-3 h-3 mr-1" />
                          Scheduled
                        </Button>
                      )}
                    </div>
                  </div>
                </ThemedCardContent>
              </ThemedCard>
            ))}
          </div>
        </TabsContent>

        {/* Other tab content would be filtered versions of the same data */}
        <TabsContent value="quarterly">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Quarterly Reports
            </h3>
            <p className="text-gray-600">
              Filtered view of quarterly audit reports
            </p>
          </div>
        </TabsContent>

        <TabsContent value="financial">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Financial Reports
            </h3>
            <p className="text-gray-600">
              Financial controls and compliance reports
            </p>
          </div>
        </TabsContent>

        <TabsContent value="risk">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Risk Reports
            </h3>
            <p className="text-gray-600">
              Risk assessment and management reports
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPage;
