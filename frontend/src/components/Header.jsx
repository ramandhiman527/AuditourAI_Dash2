import React, { useState } from 'react';
import { Search, Bell, User, Sparkles, Activity } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from './ui/dropdown-menu';
import { mockSearchSuggestions, mockUserProfile, mockAIStatus } from '../data/mockData';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = mockSearchSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    setShowSuggestions(false);
    // Mock search action
    console.log('Searching for:', query);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'processing': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
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
            <h1 className="text-xl font-semibold text-gray-900">AI Audit Dashboard</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search documents, insights, or ask AI..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="pl-10 pr-4 py-2 w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <Badge 
              variant="secondary" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors"
            >
              AI
            </Badge>
          </div>

          {/* Search Suggestions */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-64 overflow-y-auto z-50">
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center space-x-2"
                  onClick={() => handleSearch(suggestion)}
                >
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-700">{suggestion}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* AI Status Indicator */}
          <div className="flex items-center space-x-2 px-3 py-1 bg-gray-50 rounded-full">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(mockAIStatus.status)}`} />
            <span className="text-sm text-gray-600">AI {mockAIStatus.status}</span>
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
                <p className="text-sm font-medium text-gray-900">{mockUserProfile.name}</p>
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