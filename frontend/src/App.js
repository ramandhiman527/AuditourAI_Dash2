import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';

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
              <Route path="/documents" element={<div className="p-6">Documents Page - Coming Soon</div>} />
              <Route path="/analytics" element={<div className="p-6">Analytics Page - Coming Soon</div>} />
              <Route path="/risk" element={<div className="p-6">Risk Assessment Page - Coming Soon</div>} />
              <Route path="/reports" element={<div className="p-6">Reports Page - Coming Soon</div>} />
              <Route path="/settings" element={<div className="p-6">Settings Page - Coming Soon</div>} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;