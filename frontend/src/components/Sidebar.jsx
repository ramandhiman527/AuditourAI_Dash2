import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Shield,
  FileBarChart,
  Settings,
  TrendingUp,
  Zap,
  Brain,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Plus,
  Upload,
  Search,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { mockNavigationItems } from "../data/mockData";

const Sidebar = ({ isCollapsed, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeItem = location.pathname;

  const iconMap = {
    LayoutDashboard,
    FileText,
    BarChart3,
    TrendingUp,
    Zap,
    Brain,
    Shield,
    FileBarChart,
    Settings,
    Sparkles,
  };

  const getIcon = (iconName) => {
    const Icon = iconMap[iconName];
    return Icon ? <Icon className="w-5 h-5" /> : null;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const quickActions = [
    { icon: Upload, label: "Upload Document", action: "upload" },
    { icon: Search, label: "AI Search", action: "search" },
    { icon: Plus, label: "New Report", action: "report" },
  ];

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } flex flex-col h-screen
      ${isCollapsed ? "" : "max-md:fixed max-md:inset-y-0 max-md:z-50 max-md:w-64"}
      ${isCollapsed ? "" : "max-md:shadow-xl"}`}
    >
      {/* Toggle Button */}
      <div className="p-4 border-b border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="w-full justify-center"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {mockNavigationItems.map((item) => (
          <div key={item.id} className="relative">
            <Button
              variant={activeItem === item.href ? "default" : "ghost"}
              className={`w-full justify-start group relative transition-all duration-200 ${
                activeItem === item.href
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "hover:bg-gray-50 text-gray-700"
              }`}
              onClick={() => navigate(item.href)}
            >
              <div className="flex items-center space-x-3 flex-1">
                {getIcon(item.icon)}
                {!isCollapsed && (
                  <>
                    <span className="font-medium">{item.title}</span>
                    {item.aiPriority && (
                      <Badge
                        variant="secondary"
                        className={`ml-auto text-xs ${getPriorityColor(item.aiPriority)}`}
                      >
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </>
                )}
              </div>
            </Button>

            {/* AI Note Tooltip */}
            {item.aiNote && !isCollapsed && (
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
                {item.aiNote}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Quick Actions
          </h3>
          <div className="space-y-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full justify-start group hover:bg-indigo-50 hover:border-indigo-200 transition-all duration-200"
                onClick={() => console.log(`Action: ${action.action}`)}
              >
                <action.icon className="w-4 h-4 mr-2 text-gray-500 group-hover:text-indigo-600" />
                <span className="text-sm text-gray-700 group-hover:text-indigo-600">
                  {action.label}
                </span>
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* AI Assistant Status */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <div className="bg-indigo-50 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-indigo-900">
                AI Assistant
              </span>
            </div>
            <p className="text-xs text-indigo-700 mt-1">
              Ready to help with document analysis
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
