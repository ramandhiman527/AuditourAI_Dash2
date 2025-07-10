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
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div
      className="p-6 space-y-6 transition-colors duration-300"
      style={{
        backgroundColor: "var(--background-secondary)",
        minHeight: "100vh",
      }}
    >
      <div className="text-center mb-8">
        <h1
          className="text-4xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          {isDark ? "Dark" : "Light"} Theme Showcase
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Demonstrating the {isDark ? "visually striking dark" : "clean light"}{" "}
          theme with excellent readability
        </p>

        {/* Theme Toggle Section */}
        <div className="mt-6 flex items-center justify-center space-x-4">
          <ThemedButton
            variant={isDark ? "secondary" : "primary"}
            onClick={toggleTheme}
            className="flex items-center space-x-2"
          >
            {isDark ? (
              <>
                <Sun className="w-4 h-4" />
                <span>Switch to Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                <span>Switch to Dark</span>
              </>
            )}
          </ThemedButton>

          <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Current: {theme} mode
          </span>
        </div>
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

      {/* Dark Theme Specific Features */}
      {isDark && (
        <ThemedCard>
          <ThemedCardHeader>
            <ThemedCardTitle className="flex items-center">
              <Contrast
                className="w-5 h-5 mr-2"
                style={{ color: "var(--primary-green)" }}
              />
              Dark Theme Excellence
            </ThemedCardTitle>
            <ThemedCardSubtitle>
              Visually striking dark design with maximum text readability
            </ThemedCardSubtitle>
          </ThemedCardHeader>
          <ThemedCardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4
                  className="font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  Enhanced Readability
                </h4>
                <div className="space-y-3">
                  <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: "var(--card-background)" }}
                  >
                    <h5
                      className="font-medium mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Primary Text (#FFFFFF)
                    </h5>
                    <p style={{ color: "var(--text-primary)" }}>
                      Bright white text provides maximum contrast against the
                      deep background, ensuring excellent readability for
                      prolonged usage.
                    </p>
                  </div>
                  <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: "var(--card-background)" }}
                  >
                    <h5
                      className="font-medium mb-2"
                      style={{ color: "var(--text-primary)" }}
                    >
                      Secondary Text (#B0B0B0)
                    </h5>
                    <p style={{ color: "var(--text-secondary)" }}>
                      Softer gray text maintains readability while creating
                      visual hierarchy and reducing eye strain during extended
                      use.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4
                  className="font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  Rich Background Colors
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center">
                    <div
                      className="w-full h-16 rounded-lg mb-2"
                      style={{ backgroundColor: "var(--background-primary)" }}
                    />
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Primary (#121212)
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-full h-16 rounded-lg mb-2"
                      style={{ backgroundColor: "var(--background-secondary)" }}
                    />
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Secondary (#1E1E1E)
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-full h-16 rounded-lg mb-2"
                      style={{ backgroundColor: "var(--card-background)" }}
                    />
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Cards (#1F1F1F)
                    </p>
                  </div>
                  <div className="text-center">
                    <div
                      className="w-full h-16 rounded-lg mb-2"
                      style={{
                        backgroundColor: "var(--card-background-hover)",
                      }}
                    />
                    <p
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      Hover (#2A2A2A)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ThemedCardContent>
        </ThemedCard>
      )}

      {/* Animation Showcase */}
      <ThemedCard>
        <ThemedCardHeader>
          <ThemedCardTitle className="flex items-center">
            <Palette
              className="w-5 h-5 mr-2"
              style={{ color: "var(--primary-green)" }}
            />
            Smooth Animations & Interactions
          </ThemedCardTitle>
          <ThemedCardSubtitle>
            Subtle animations that enhance user experience without distraction
          </ThemedCardSubtitle>
        </ThemedCardHeader>
        <ThemedCardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Hover Effects */}
            <div className="space-y-3">
              <h4
                className="font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Hover Animations
              </h4>
              <div className="space-y-3">
                <div
                  className="p-4 rounded-lg transition-all duration-300 cursor-pointer hover:transform hover:-translate-y-1"
                  style={{
                    backgroundColor: "var(--card-background)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Hover me for elevation effect
                  </p>
                </div>

                <ThemedButton className="w-full">
                  Hover for shimmer animation
                </ThemedButton>
              </div>
            </div>

            {/* Loading States */}
            <div className="space-y-3">
              <h4
                className="font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Loading Animations
              </h4>
              <div className="space-y-3">
                <ThemedProgress value={progress} animated />
                <div
                  className="loading-shimmer h-8 rounded"
                  style={{ backgroundColor: "var(--card-background)" }}
                />
                <div className="flex items-center space-x-2">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: "var(--primary-green)" }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    Live indicator
                  </span>
                </div>
              </div>
            </div>

            {/* Theme Transition */}
            <div className="space-y-3">
              <h4
                className="font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Theme Transitions
              </h4>
              <div className="space-y-3">
                <p
                  className="text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Smooth 300ms transitions when switching themes
                </p>
                <ThemedButton
                  onClick={toggleTheme}
                  variant="secondary"
                  className="w-full"
                >
                  {isDark ? (
                    <>
                      <Sun className="w-4 h-4 mr-2" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 mr-2" />
                      Dark Mode
                    </>
                  )}
                </ThemedButton>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Notice how all elements smoothly transition colors
                </div>
              </div>
            </div>
          </div>
        </ThemedCardContent>
      </ThemedCard>

      {/* Accessibility & Comfort */}
      <ThemedCard>
        <ThemedCardHeader>
          <ThemedCardTitle>Design Philosophy</ThemedCardTitle>
          <ThemedCardSubtitle>
            Balancing visual appeal with user comfort and accessibility
          </ThemedCardSubtitle>
        </ThemedCardHeader>
        <ThemedCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4
                className="font-medium mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                {isDark ? "Dark Theme Benefits" : "Light Theme Benefits"}
              </h4>
              <ul
                className="space-y-2 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                {isDark ? (
                  <>
                    <li>• Reduced eye strain in low-light environments</li>
                    <li>• Better battery life on OLED displays</li>
                    <li>• Modern, professional appearance</li>
                    <li>• Enhanced focus on content</li>
                    <li>• Comfortable for prolonged usage</li>
                  </>
                ) : (
                  <>
                    <li>• Excellent readability in bright environments</li>
                    <li>• Classic, clean professional look</li>
                    <li>• High contrast for all elements</li>
                    <li>• Familiar interface patterns</li>
                    <li>• Universal accessibility</li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <h4
                className="font-medium mb-3"
                style={{ color: "var(--text-primary)" }}
              >
                Technical Implementation
              </h4>
              <ul
                className="space-y-2 text-sm"
                style={{ color: "var(--text-secondary)" }}
              >
                <li>• CSS custom properties for consistent theming</li>
                <li>• Smooth 300ms transitions for theme switching</li>
                <li>• High contrast ratios for accessibility compliance</li>
                <li>• Preserved user preference in localStorage</li>
                <li>• Automatic system theme detection</li>
              </ul>
            </div>
          </div>
        </ThemedCardContent>
      </ThemedCard>
    </div>
  );
};

export default ThemeShowcase;
