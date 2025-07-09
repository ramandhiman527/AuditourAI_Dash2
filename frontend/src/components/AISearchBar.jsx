import React, { useState, useRef, useEffect } from 'react';
import { Search, Mic, Sparkles, X, ArrowRight } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

const AISearchBar = ({ 
  placeholder = "Search documents, insights, or ask AI...", 
  onSearch, 
  suggestions = [],
  naturalLanguageMode = true,
  showVoiceInput = true
}) => {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  // Mock AI-powered suggestions based on input
  const generateAISuggestions = async (searchTerm) => {
    if (!searchTerm.trim()) return [];
    
    setIsLoading(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const mockAISuggestions = [
      {
        text: `Analyze ${searchTerm} for compliance issues`,
        type: 'analysis',
        confidence: 95
      },
      {
        text: `Show documents related to ${searchTerm}`,
        type: 'documents',
        confidence: 88
      },
      {
        text: `Generate report on ${searchTerm}`,
        type: 'report',
        confidence: 92
      },
      {
        text: `Risk assessment for ${searchTerm}`,
        type: 'risk',
        confidence: 85
      }
    ];
    
    setAiSuggestions(mockAISuggestions);
    setIsLoading(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
    
    if (value.length > 2) {
      generateAISuggestions(value);
    } else {
      setAiSuggestions([]);
    }
  };

  const handleSearch = (searchQuery) => {
    const finalQuery = searchQuery || query;
    if (finalQuery.trim()) {
      onSearch(finalQuery);
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
    setAiSuggestions([]);
    inputRef.current?.focus();
  };

  const getSuggestionIcon = (type) => {
    switch (type) {
      case 'analysis': return '🔍';
      case 'documents': return '📄';
      case 'report': return '📊';
      case 'risk': return '⚠️';
      default: return '💡';
    }
  };

  const filteredSuggestions = suggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative flex-1 max-w-2xl mx-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 z-10" />
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="pl-10 pr-20 py-3 w-full border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
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
          
          {showVoiceInput && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleVoiceInput}
              className={`p-1 h-6 w-6 ${isListening ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'}`}
            >
              <Mic className={`w-3 h-3 ${isListening ? 'animate-pulse' : ''}`} />
            </Button>
          )}
          
          <Badge 
            variant="secondary" 
            className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors text-xs px-2 py-1"
          >
            <Sparkles className="w-3 h-3 mr-1" />
            AI
          </Badge>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (query.length > 0 || filteredSuggestions.length > 0) && (
        <Card className="absolute top-full left-0 right-0 mt-2 shadow-xl z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {/* Natural Language Suggestions */}
            {naturalLanguageMode && query.length > 2 && (
              <div className="p-3 border-b">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-medium text-gray-700">AI Suggestions</span>
                  {isLoading && (
                    <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
                {aiSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-3 py-2 hover:bg-indigo-50 rounded-lg cursor-pointer transition-colors group"
                    onClick={() => handleSearch(suggestion.text)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getSuggestionIcon(suggestion.type)}</span>
                      <span className="text-sm text-gray-700 group-hover:text-indigo-700">{suggestion.text}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {suggestion.confidence}%
                      </Badge>
                      <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-indigo-500" />
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Regular Suggestions */}
            {filteredSuggestions.length > 0 && (
              <div className="p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <span className="text-sm font-medium text-gray-700">Recent Searches</span>
                </div>
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
                    onClick={() => handleSearch(suggestion)}
                  >
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">{suggestion}</span>
                    <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-gray-600" />
                  </div>
                ))}
              </div>
            )}
            
            {/* Voice Input Status */}
            {isListening && (
              <div className="p-3 bg-red-50 border-t">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm text-red-700">Listening...</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AISearchBar;