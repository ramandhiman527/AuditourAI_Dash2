import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import DocumentManagement from './components/DocumentManagement';
import Analytics from './components/Analytics';

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
          <Sidebar 
            isCollapsed={sidebarCollapsed} 
            onToggle={toggleSidebar} 
          />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/documents" element={<DocumentManagement />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/risk" element={<div className="p-6"><h1 className="text-2xl font-bold">Risk Assessment</h1><p className="text-gray-600 mt-2">Coming Soon - Advanced risk analysis and mitigation strategies</p></div>} />
              <Route path="/reports" element={<div className="p-6"><h1 className="text-2xl font-bold">Reports</h1><p className="text-gray-600 mt-2">Coming Soon - Comprehensive audit reports and summaries</p></div>} />
              <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p className="text-gray-600 mt-2">Coming Soon - Configure your AI audit preferences</p></div>} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;