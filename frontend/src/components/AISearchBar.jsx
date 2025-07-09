import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Mic, 
  Sparkles, 
  X, 
  Filter,
  Calendar,
  DollarSign,
  AlertTriangle,
  FileText,
  Brain,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { mockSearchSuggestions } from '../data/documentMockData';

const AISearchBar = ({ 
  placeholder = "Find invoices over $10k with missing approvals",
  aiSuggestions = true,
  filters = ['type', 'risk', 'status', 'date'],
  onSearch,
  onFilterChange
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [recentSearches, setRecentSearches] = useState([
    'invoices over $10k missing approvals',
    'high risk documents last 30 days',
    'contracts expiring this quarter'
  ]);
  const inputRef = useRef(null);

  // Natural language processing suggestions
  const naturalLanguageTemplates = [
    {
      pattern: /find|show|get/i,
      suggestions: [
        'Find invoices over $10k with missing approvals',
        'Show high-risk documents from last 30 days',
        'Get contracts expiring this quarter'
      ]
    },
    {
      pattern: /invoice/i,
      suggestions: [
        'Find invoices over $10k',
        'Show unpaid invoices',
        'Get invoices missing approvals'
      ]
    },
    {
      pattern: /contract/i,
      suggestions: [
        'Find contracts expiring soon',
        'Show vendor contracts',
        'Get contracts needing renewal'
      ]
    },
    {
      pattern: /risk/i,
      suggestions: [
        'Show high-risk documents',
        'Find medium risk items',
        'Get risk assessment reports'
      ]
    }
  ];

  const smartSuggestions = [
    {
      query: 'Documents requiring immediate attention',
      type: 'priority',
      icon: AlertTriangle,
      color: 'text-red-600',
      description: 'High-risk items and missing approvals'
    },
    {
      query: 'Financial documents over $10,000',
      type: 'financial',
      icon: DollarSign,
      color: 'text-green-600',
      description: 'High-value financial transactions'
    },
    {
      query: 'Documents uploaded in the last 7 days',
      type: 'recent',
      icon: Calendar,
      color: 'text-blue-600',
      description: 'Recently added documents'
    },
    {
      query: 'Contracts expiring within 90 days',
      type: 'expiring',
      icon: Clock,
      color: 'text-orange-600',
      description: 'Contracts requiring renewal'
    }
  ];

  const filterOptions = {
    type: ['PDF', 'Word', 'Excel', 'CSV'],
    risk: ['High', 'Medium', 'Low'],
    status: ['Analyzed', 'Processing', 'Pending'],
    date: ['Today', 'This Week', 'This Month', 'This Quarter']
  };

  const handleSearch = (searchQuery) => {
    const finalQuery = searchQuery || query;
    if (finalQuery.trim()) {
      // Add to recent searches
      setRecentSearches(prev => {
        const updated = [finalQuery, ...prev.filter(s => s !== finalQuery)].slice(0, 5);
        return updated;
      });
      
      if (onSearch) {
        onSearch(finalQuery, activeFilters);
      }
      setQuery(finalQuery);
      setShowSuggestions(false);
    }
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    setIsListening(true);
    
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      setIsListening(false);
      handleSearch(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const clearSearch = () => {
    setQuery('');
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const toggleFilter = (filterType, value) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[filterType]) {
        newFilters[filterType] = [];
      }
      
      if (newFilters[filterType].includes(value)) {
        newFilters[filterType] = newFilters[filterType].filter(v => v !== value);
        if (newFilters[filterType].length === 0) {
          delete newFilters[filterType];
        }
      } else {
        newFilters[filterType].push(value);
      }
      
      if (onFilterChange) {
        onFilterChange(newFilters);
      }
      
      return newFilters;
    });
  };

  const generateContextualSuggestions = () => {
    const suggestions = [];
    
    // Add natural language suggestions based on current query
    naturalLanguageTemplates.forEach(template => {
      if (template.pattern.test(query)) {
        suggestions.push(...template.suggestions);
      }
    });
    
    // Add general suggestions if no specific matches
    if (suggestions.length === 0) {
      suggestions.push(...mockSearchSuggestions.slice(0, 5));
    }
    
    return suggestions.slice(0, 8);
  };

  const contextualSuggestions = generateContextualSuggestions();

  return (
    <div className="relative w-full max-w-4xl">
      {/* Main Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="pl-12 pr-24 py-3 w-full border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
        />
        
        {/* Right side controls */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          {query && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="p-1 h-6 w-6 hover:bg-gray-100"
            >
              <X className="w-3 h-3" />
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleVoiceInput}
            className={`p-1 h-6 w-6 ${isListening ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'}`}
          >
            <Mic className={`w-3 h-3 ${isListening ? 'animate-pulse' : ''}`} />
          </Button>
          
          <Badge 
            variant="secondary" 
            className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors text-xs px-2 py-1"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            AI
          </Badge>
        </div>
      </div>

      {/* Active Filters */}
      <AnimatePresence>
        {Object.keys(activeFilters).length > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 flex flex-wrap gap-2"
          >
            {Object.entries(activeFilters).map(([filterType, values]) =>
              values.map(value => (
                <Badge
                  key={`${filterType}-${value}`}
                  variant="secondary"
                  className="bg-indigo-100 text-indigo-700 cursor-pointer hover:bg-indigo-200"
                  onClick={() => toggleFilter(filterType, value)}
                >
                  {filterType}: {value}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {showSuggestions && (query.length > 0 || contextualSuggestions.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <Card className="shadow-xl max-h-96 overflow-y-auto">
              <CardContent className="p-0">
                {/* Smart Suggestions */}
                {aiSuggestions && (
                  <div className="p-3 border-b">
                    <div className="flex items-center space-x-2 mb-3">
                      <Brain className="w-4 h-4 text-indigo-500" />
                      <span className="text-sm font-medium text-gray-700">Smart Suggestions</span>
                    </div>
                    <div className="space-y-2">
                      {smartSuggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => handleSearch(suggestion.query)}
                          className="w-full text-left p-3 hover:bg-indigo-50 rounded-lg transition-colors group"
                        >
                          <div className="flex items-start space-x-3">
                            <suggestion.icon className={`w-4 h-4 mt-0.5 ${suggestion.color}`} />
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900 group-hover:text-indigo-700">
                                {suggestion.query}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {suggestion.description}
                              </div>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Contextual Suggestions */}
                {contextualSuggestions.length > 0 && (
                  <div className="p-3 border-b">
                    <div className="flex items-center space-x-2 mb-2">
                      <Search className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Suggestions</span>
                    </div>
                    {contextualSuggestions.map((suggestion, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSearch(suggestion)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors group text-sm"
                      >
                        <div className="flex items-center space-x-2">
                          <Sparkles className="w-3 h-3 text-indigo-500" />
                          <span className="text-gray-700 group-hover:text-indigo-700">{suggestion}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
                
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div className="p-3 border-b">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Recent Searches</span>
                    </div>
                    {recentSearches.map((search, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleSearch(search)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors group text-sm"
                      >
                        <span className="text-gray-600 group-hover:text-gray-900">{search}</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Quick Filters */}
                {filters.length > 0 && (
                  <div className="p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Filter className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700">Quick Filters</span>
                    </div>
                    <div className="space-y-2">
                      {filters.map(filterType => (
                        <div key={filterType} className="space-y-1">
                          <div className="text-xs text-gray-500 capitalize">{filterType}</div>
                          <div className="flex flex-wrap gap-1">
                            {filterOptions[filterType]?.map(option => (
                              <button
                                key={option}
                                onClick={() => toggleFilter(filterType, option)}
                                className={`px-2 py-1 text-xs rounded transition-colors ${
                                  activeFilters[filterType]?.includes(option)
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Voice Input Status */}
                {isListening && (
                  <div className="p-3 bg-red-50 border-t">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-sm text-red-700">Listening for voice input...</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AISearchBar;