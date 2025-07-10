import React, { useState } from "react";
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Star,
  Brain,
  Moon,
  Sun,
  Palette,
  Contrast,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
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

const ThemeShowcase = () => {
  const [progress, setProgress] = useState(75);

  return (
    <div
      className="p-6 space-y-6"
      style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}
    >
      <div className="text-center mb-8">
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Custom Theme Showcase
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Demonstrating the custom color scheme and animations
        </p>
      </div>

      {/* Color Palette */}
      <ThemedCard className="mb-6">
        <ThemedCardHeader>
          <ThemedCardTitle>Color Palette</ThemedCardTitle>
          <ThemedCardSubtitle>
            Custom color scheme implementation
          </ThemedCardSubtitle>
        </ThemedCardHeader>
        <ThemedCardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-lg mx-auto mb-2 shadow-md"
                style={{ backgroundColor: "var(--primary-green)" }}
              />
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Primary Green
              </p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                #3AA85A
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-lg mx-auto mb-2 shadow-md"
                style={{ backgroundColor: "var(--text-primary)" }}
              />
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Dark Gray
              </p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                #3A3A3A
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-lg mx-auto mb-2 shadow-md"
                style={{ backgroundColor: "var(--text-secondary)" }}
              />
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Medium Gray
              </p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                #8C8C8C
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-lg mx-auto mb-2 shadow-md"
                style={{ backgroundColor: "var(--status-error)" }}
              />
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Error Red
              </p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                #E94B4B
              </p>
            </div>
            <div className="text-center">
              <div
                className="w-16 h-16 rounded-lg mx-auto mb-2 shadow-md"
                style={{ backgroundColor: "var(--status-warning)" }}
              />
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Warning Orange
              </p>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                #F5A623
              </p>
            </div>
          </div>
        </ThemedCardContent>
      </ThemedCard>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Revenue"
          value="$2.4M"
          subtitle="Monthly performance"
          trend="up"
          trendValue="+12.5%"
        >
          <div className="mt-4">
            <ThemedProgress value={85} animated />
            <p
              className="text-xs mt-2"
              style={{ color: "var(--text-secondary)" }}
            >
              85% of monthly target
            </p>
          </div>
        </MetricCard>

        <MetricCard
          title="AI Accuracy"
          value="94.2%"
          subtitle="Model performance"
          trend="up"
          trendValue="+2.1%"
        >
          <div className="mt-4">
            <ThemedProgress value={94} animated />
            <p
              className="text-xs mt-2"
              style={{ color: "var(--text-secondary)" }}
            >
              Above 95% target soon
            </p>
          </div>
        </MetricCard>

        <MetricCard
          title="Documents Processed"
          value="1,247"
          subtitle="This week"
          trend="down"
          trendValue="-3.2%"
        >
          <div className="mt-4">
            <ThemedProgress value={67} animated />
            <p
              className="text-xs mt-2"
              style={{ color: "var(--text-secondary)" }}
            >
              67% weekly capacity
            </p>
          </div>
        </MetricCard>
      </div>

      {/* Buttons and Status Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ThemedCard>
          <ThemedCardHeader>
            <ThemedCardTitle>Interactive Elements</ThemedCardTitle>
            <ThemedCardSubtitle>
              Buttons with hover animations
            </ThemedCardSubtitle>
          </ThemedCardHeader>
          <ThemedCardContent>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <ThemedButton variant="primary">
                  <Download className="w-4 h-4 mr-2" />
                  Primary Button
                </ThemedButton>
                <ThemedButton variant="secondary">
                  <Star className="w-4 h-4 mr-2" />
                  Secondary
                </ThemedButton>
              </div>

              <div className="flex space-x-3">
                <ThemedButton variant="primary" size="sm">
                  Small Button
                </ThemedButton>
                <ThemedButton variant="secondary" size="lg">
                  Large Button
                </ThemedButton>
              </div>
            </div>
          </ThemedCardContent>
        </ThemedCard>

        <ThemedCard>
          <ThemedCardHeader>
            <ThemedCardTitle>Status Indicators</ThemedCardTitle>
            <ThemedCardSubtitle>Color-coded status badges</ThemedCardSubtitle>
          </ThemedCardHeader>
          <ThemedCardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <StatusBadge status="success">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </StatusBadge>
                <StatusBadge status="in-progress">
                  <Clock className="w-3 h-3 mr-1" />
                  In Progress
                </StatusBadge>
                <StatusBadge status="error">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Error
                </StatusBadge>
              </div>

              <div className="flex flex-wrap gap-2">
                <StatusBadge status="pending">
                  <Clock className="w-3 h-3 mr-1" />
                  Pending
                </StatusBadge>
                <StatusBadge status="warning">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Warning
                </StatusBadge>
              </div>
            </div>
          </ThemedCardContent>
        </ThemedCard>
      </div>

      {/* Progress Bars */}
      <ThemedCard>
        <ThemedCardHeader>
          <ThemedCardTitle>Progress Indicators</ThemedCardTitle>
          <ThemedCardSubtitle>
            Animated progress bars with custom styling
          </ThemedCardSubtitle>
        </ThemedCardHeader>
        <ThemedCardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span style={{ color: "var(--text-primary)" }}>
                  Project Completion
                </span>
                <span style={{ color: "var(--text-secondary)" }}>78%</span>
              </div>
              <ThemedProgress value={78} animated />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span style={{ color: "var(--text-primary)" }}>
                  AI Training Progress
                </span>
                <span style={{ color: "var(--text-secondary)" }}>92%</span>
              </div>
              <ThemedProgress value={92} animated />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span style={{ color: "var(--text-primary)" }}>
                  Data Processing
                </span>
                <span style={{ color: "var(--text-secondary)" }}>45%</span>
              </div>
              <ThemedProgress value={45} animated />
            </div>

            <div className="flex items-center justify-between pt-4">
              <span style={{ color: "var(--text-secondary)" }}>
                Adjust Progress:
              </span>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-32"
              />
              <span style={{ color: "var(--text-primary)" }}>{progress}%</span>
            </div>
            <ThemedProgress value={progress} animated />
          </div>
        </ThemedCardContent>
      </ThemedCard>

      {/* AI Feature Showcase */}
      <ThemedCard>
        <ThemedCardHeader>
          <ThemedCardTitle className="flex items-center">
            <Brain
              className="w-5 h-5 mr-2"
              style={{ color: "var(--primary-green)" }}
            />
            AI-Powered Features
          </ThemedCardTitle>
          <ThemedCardSubtitle>
            Demonstrating AI integration with custom theme
          </ThemedCardSubtitle>
        </ThemedCardHeader>
        <ThemedCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4
                className="font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Analysis Results
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span style={{ color: "var(--text-secondary)" }}>
                    Accuracy Score
                  </span>
                  <div className="flex items-center space-x-2">
                    <ThemedProgress value={96} className="w-16 h-2" />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--primary-green)" }}
                    >
                      96%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: "var(--text-secondary)" }}>
                    Confidence Level
                  </span>
                  <div className="flex items-center space-x-2">
                    <ThemedProgress value={89} className="w-16 h-2" />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--primary-green)" }}
                    >
                      89%
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: "var(--text-secondary)" }}>
                    Processing Speed
                  </span>
                  <div className="flex items-center space-x-2">
                    <ThemedProgress value={73} className="w-16 h-2" />
                    <span
                      className="text-sm font-medium"
                      style={{ color: "var(--primary-green)" }}
                    >
                      73%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4
                className="font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                AI Recommendations
              </h4>
              <div className="space-y-2">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: "var(--status-success-light)" }}
                >
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Model performance exceeds expectations
                  </p>
                </div>
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: "var(--status-warning-light)" }}
                >
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Consider increasing training data
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ThemedCardContent>
      </ThemedCard>
    </div>
  );
};

export default ThemeShowcase;
