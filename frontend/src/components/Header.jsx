import React from "react";
import { Bell, User, Sparkles, Activity } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import {
  mockSearchSuggestions,
  mockUserProfile,
  mockAIStatus,
} from "../data/mockData";
import AISearchBar from "./AISearchBar";

const Header = () => {
  const handleSearch = (query) => {
    if (!query.trim()) return;

    console.log("Searching for:", query);

    // Simple search implementation - could be enhanced with backend integration
    const searchResults = {
      documents: mockSearchSuggestions.filter(
        (item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()),
      ),
      timestamp: new Date().toISOString(),
      query: query,
    };

    // Store search results in sessionStorage for other components to access
    sessionStorage.setItem("lastSearchResults", JSON.stringify(searchResults));

    // Dispatch custom event to notify other components
    window.dispatchEvent(
      new CustomEvent("searchPerformed", {
        detail: searchResults,
      }),
    );

    // Show search feedback
    if (searchResults.documents.length === 0) {
      console.log("No results found for:", query);
    } else {
      console.log(
        `Found ${searchResults.documents.length} results for:`,
        query,
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "processing":
        return "bg-yellow-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-gray-900">
              AI Audit Dashboard
            </h1>
          </div>
        </div>

        {/* Search Bar */}
        <AISearchBar
          placeholder="Search documents, insights, or ask AI..."
          onSearch={handleSearch}
          suggestions={mockSearchSuggestions}
        />

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* AI Status Indicator */}
          <div className="flex items-center space-x-2 px-3 py-1 bg-gray-50 rounded-full">
            <div
              className={`w-2 h-2 rounded-full ${getStatusColor(mockAIStatus.status)}`}
            />
            <span className="text-sm text-gray-600">
              AI {mockAIStatus.status}
            </span>
            <Activity className="w-4 h-4 text-gray-400" />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            {mockUserProfile.notifications > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {mockUserProfile.notifications}
              </Badge>
            )}
          </Button>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt={mockUserProfile.name} />
                  <AvatarFallback className="bg-indigo-100 text-indigo-600">
                    {mockUserProfile.avatar}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex flex-col space-y-1 p-2">
                <p className="text-sm font-medium text-gray-900">
                  {mockUserProfile.name}
                </p>
                <p className="text-xs text-gray-500">{mockUserProfile.email}</p>
                <Badge variant="secondary" className="w-fit text-xs">
                  {mockUserProfile.role}
                </Badge>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Activity className="mr-2 h-4 w-4" />
                <span>AI Assistant</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
