import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  ThumbsUp, 
  ThumbsDown, 
  Copy, 
  MoreVertical,
  Sparkles,
  Zap,
  FileText,
  BarChart3,
  AlertTriangle,
  Brain,
  Lightbulb,
  TrendingUp,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from './ui/dropdown-menu';
import useAuditStore from '../store/useAuditStore';
import websocketService from '../services/websocketService';

const EnhancedAIConversation = () => {
  const { conversationContext, updateConversationContext } = useAuditStore();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Welcome! I'm your enhanced AI audit assistant. I have full context of your audit environment and can provide intelligent insights. How can I help you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      confidence: 98,
      suggestions: ['Analyze recent documents', 'Review risk assessment', 'Generate compliance report'],
      context: ['audit_overview', 'system_status']
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const contextualActions = [
    { 
      icon: FileText, 
      label: 'Analyze Documents', 
      action: 'analyze_documents',
      description: 'Get AI insights on uploaded documents'
    },
    { 
      icon: BarChart3, 
      label: 'Generate Report', 
      action: 'generate_report',
      description: 'Create comprehensive audit report'
    },
    { 
      icon: AlertTriangle, 
      label: 'Check Compliance', 
      action: 'check_compliance',
      description: 'Review compliance status and issues'
    },
    { 
      icon: TrendingUp, 
      label: 'Trend Analysis', 
      action: 'trend_analysis',
      description: 'Analyze patterns and predictions'
    },
    { 
      icon: Lightbulb, 
      label: 'Get Recommendations', 
      action: 'get_recommendations',
      description: 'AI-powered improvement suggestions'
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: inputMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsTyping(true);

      // Update conversation context
      updateConversationContext({
        activeTopics: [...conversationContext.activeTopics, inputMessage.toLowerCase()]
          .filter((topic, index, arr) => arr.indexOf(topic) === index)
          .slice(-5) // Keep last 5 topics
      });

      try {
        // Use WebSocket service for AI response
        const response = await websocketService.sendAIMessage(inputMessage);
        
        const aiMessage = {
          id: Date.now() + 1,
          type: 'ai',
          content: response.content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          confidence: response.confidence,
          suggestions: response.suggestions || [],
          context: ['user_query', 'audit_data']
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setSuggestions(response.suggestions || []);
      } catch (error) {
        console.error('AI response error:', error);
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          type: 'ai',
          content: "I apologize, but I'm experiencing technical difficulties. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          confidence: 0,
          isError: true
        }]);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      analyze_documents: "Please analyze my uploaded documents and provide detailed insights on compliance, risks, and recommendations.",
      generate_report: "Generate a comprehensive audit report based on all available data, including trends and AI analysis.",
      check_compliance: "Perform a thorough compliance check across all documents and highlight any issues or violations.",
      trend_analysis: "Analyze current trends in my audit data and provide predictions for the next quarter.",
      get_recommendations: "Based on my audit data, what are your top recommendations for improving our audit processes?"
    };
    
    setInputMessage(actionMessages[action] || action);
    inputRef.current?.focus();
  };

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion);
    inputRef.current?.focus();
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600 bg-green-100';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const MessageBubble = ({ message }) => (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-[80%] rounded-xl p-4 ${
        message.type === 'user' 
          ? 'bg-indigo-600 text-white' 
          : message.isError
          ? 'bg-red-50 text-red-900 border border-red-200'
          : 'bg-white text-gray-900 border shadow-sm'
      }`}>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            {message.type === 'ai' ? (
              <Bot className="w-4 h-4 text-indigo-600" />
            ) : (
              <User className="w-4 h-4 opacity-75" />
            )}
            <span className="text-xs opacity-75">{message.timestamp}</span>
          </div>
          
          {message.type === 'ai' && message.confidence && (
            <Badge variant="secondary" className={`text-xs ${getConfidenceColor(message.confidence)}`}>
              {message.confidence}%
            </Badge>
          )}
        </div>
        
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        
        {/* AI Suggestions */}
        {message.suggestions && message.suggestions.length > 0 && (
          <div className="mt-3 space-y-2">
            <div className="text-xs text-gray-500 flex items-center space-x-1">
              <Lightbulb className="w-3 h-3" />
              <span>Suggested actions:</span>
            </div>
            <div className="space-y-1">
              {message.suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="block w-full text-left text-xs p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  • {suggestion}
                </motion.button>
              ))}
            </div>
          </div>
        )}
        
        {/* Context Tags */}
        {message.context && (
          <div className="mt-2 flex flex-wrap gap-1">
            {message.context.map((ctx, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {ctx.replace('_', ' ')}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>Enhanced AI Assistant</span>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <Sparkles className="w-3 h-3 mr-1" />
              Context Aware
            </Badge>
          </CardTitle>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Brain className="w-4 h-4 mr-2" />
                AI Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat History
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Zap className="w-4 h-4 mr-2" />
                Quick Actions
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Context Status */}
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Active Context:</span>
          <div className="flex flex-wrap gap-1">
            {conversationContext.activeTopics.slice(0, 3).map((topic, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex flex-col flex-1 p-0">
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <AnimatePresence>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </AnimatePresence>
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start mb-4"
            >
              <div className="bg-gray-100 rounded-xl p-4 border">
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm text-gray-600">AI is thinking...</span>
                  <div className="flex space-x-1">
                    <motion.div 
                      className="w-2 h-2 bg-indigo-600 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-indigo-600 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-2 h-2 bg-indigo-600 rounded-full"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </ScrollArea>
        
        {/* Contextual Quick Actions */}
        <div className="px-4 py-2 border-t bg-gray-50">
          <div className="flex items-center space-x-2 mb-2">
            <Zap className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-600">Intelligent Actions:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {contextualActions.map((action, index) => (
              <motion.button
                key={action.action}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleQuickAction(action.action)}
                className="flex items-center space-x-1 px-3 py-1 bg-white hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 rounded-full text-xs transition-all group"
                title={action.description}
              >
                <action.icon className="w-3 h-3 text-gray-500 group-hover:text-indigo-600" />
                <span className="text-gray-700 group-hover:text-indigo-700">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              placeholder="Ask me anything about your audit data..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              className="flex-1 focus:ring-2 focus:ring-indigo-500"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputMessage.trim() || isTyping}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isTyping ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Brain className="w-4 h-4" />
                </motion.div>
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
              Enhanced with full audit context • Press Enter to send
            </span>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span className="text-xs text-indigo-600">AI Enhanced</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedAIConversation;