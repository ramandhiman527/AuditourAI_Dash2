import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ErrorBoundary from "./components/ErrorBoundary";
import EnhancedDashboard from "./components/EnhancedDashboard";
import DocumentManagement from "./components/DocumentManagement";
import IntelligentAnalytics from "./components/IntelligentAnalytics";
import AdvancedAnalytics from "./components/AdvancedAnalytics";
import RiskAssessmentCenter from "./components/RiskAssessmentCenter";

// Phase 2 Enhanced Pages
import PredictiveAnalyticsPage from "./components/PredictiveAnalyticsPage";
import AutomationCenter from "./components/AutomationCenter";
import AIInsightsPage from "./components/AIInsightsPage";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <BrowserRouter>
      <div className="App min-h-screen bg-gray-50">
        <Header />
        <div className="flex h-[calc(100vh-73px)]">
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
              <Route path="/predictive" element={<PredictiveAnalyticsPage />} />
              <Route path="/automation" element={<AutomationCenter />} />
              <Route path="/ai-insights" element={<AIInsightsPage />} />
              <Route path="/risk" element={<RiskAssessmentCenter />} />
              <Route
                path="/reports"
                element={
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">Intelligent Reports</h1>
                    <p className="text-gray-600 mt-2">
                      AI-generated comprehensive audit reports with predictive
                      insights
                    </p>
                  </div>
                }
              />
              <Route
                path="/settings"
                element={
                  <div className="p-6">
                    <h1 className="text-2xl font-bold">System Settings</h1>
                    <p className="text-gray-600 mt-2">
                      Configure AI preferences, automation rules, and system
                      parameters
                    </p>
                  </div>
                }
              />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
