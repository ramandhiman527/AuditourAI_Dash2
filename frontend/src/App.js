import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import EnhancedDashboard from "./components/EnhancedDashboard";
import DocumentManagement from "./components/DocumentManagement";
import IntelligentAnalytics from "./components/IntelligentAnalytics";
import AdvancedAnalytics from "./components/AdvancedAnalytics";
import RiskAssessmentCenter from "./components/RiskAssessmentCenter";

// Phase 2 Enhanced Pages
import PredictiveAnalyticsPage from "./components/PredictiveAnalyticsPage";
import AutomationCenter from "./components/AutomationCenter";
import AIInsightsPage from "./components/AIInsightsPage";
import ReportsPage from "./components/ReportsPage";
import SettingsPage from "./components/SettingsPage";
import ThemeShowcase from "./components/ThemeShowcase";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

    return (
    <ErrorBoundary>
      <ThemeProvider>
        <BrowserRouter>
          <div
            className="App min-h-screen transition-colors duration-300"
            style={{ backgroundColor: 'var(--background-secondary)' }}
          >
          <Header />
          <div className="flex h-[calc(100vh-73px)] relative">
            {/* Mobile overlay */}
            {!sidebarCollapsed && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                onClick={toggleSidebar}
              />
            )}

            <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
            <main className="flex-1 overflow-auto">
              <Routes>
                <Route path="/" element={<EnhancedDashboard />} />
                <Route path="/dashboard" element={<EnhancedDashboard />} />
                <Route path="/documents" element={<DocumentManagement />} />
                <Route path="/analytics" element={<IntelligentAnalytics />} />
                <Route
                  path="/advanced-analytics"
                  element={<AdvancedAnalytics />}
                />
                <Route
                  path="/predictive"
                  element={<PredictiveAnalyticsPage />}
                />
                <Route path="/automation" element={<AutomationCenter />} />
                <Route path="/ai-insights" element={<AIInsightsPage />} />
                                <Route path="/risk" element={<RiskAssessmentCenter />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/theme-showcase" element={<ThemeShowcase />} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;