import React, { useState, useRef, useEffect } from 'react';
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
  AlertTriangle
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

const AIConversationPanel = ({ 
  initialMessages = [],
  onSendMessage,
  isTyping = false,
  aiStatus = 'online',
  showQuickActions = true,
  showConfidence = true
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessage, setTypingMessage] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const quickActions = [
    { icon: FileText, label: 'Analyze Documents', action: 'analyze_documents' },
    { icon: BarChart3, label: 'Generate Report', action: 'generate_report' },
    { icon: AlertTriangle, label: 'Check Compliance', action: 'check_compliance' },
    { icon: Sparkles, label: 'Get Insights', action: 'get_insights' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages, typingMessage]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  const simulateTyping = (text) => {
    setTypingMessage('');
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setTypingMessage(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30);
  };

  const generateAIResponse = async (userMessage) => {
    setIsLoading(true);
    
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock AI responses based on user input
    const responses = [
      {
        content: `I understand you're asking about "${userMessage}". Based on my analysis of your audit documents, I can provide relevant insights. Would you like me to elaborate on any specific aspect?`,
        confidence: 92
      },
      {
        content: `I've analyzed your query about "${userMessage}". Here are the key findings:\n\n• Document compliance score: 94.2%\n• Risk level: Low\n• Recommended actions: 3 items\n\nWould you like me to provide more details on any of these areas?`,
        confidence: 88
      },
      {
        content: `Based on "${userMessage}", I've identified several important patterns in your audit data:\n\n1. Operational efficiency has improved by 15%\n2. Compliance issues decreased by 23%\n3. Risk exposure reduced to acceptable levels\n\nShall I generate a detailed report on these findings?`,
        confidence: 95
      }
    ];
    
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    // Simulate typing
    simulateTyping(response.content);
    
    setTimeout(() => {
      const aiMessage = {
        id: Date.now(),
        type: 'ai',
        content: response.content,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidence: response.confidence,
        liked: null
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setTypingMessage('');
      setIsLoading(false);
    }, response.content.length * 30 + 1000);
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
      
      if (onSendMessage) {
        onSendMessage(inputMessage);
      }
      
      // Generate AI response
      await generateAIResponse(inputMessage);
    }
  };

  const handleQuickAction = (action) => {
    const actionMessages = {
      analyze_documents: "Please analyze my uploaded documents for compliance and risk factors.",
      generate_report: "Can you generate a comprehensive audit report based on my data?",
      check_compliance: "Check all documents for compliance issues and regulatory requirements.",
      get_insights: "What insights can you provide about my audit data trends?"
    };
    
    setInputMessage(actionMessages[action]);
    inputRef.current?.focus();
  };

  const handleMessageAction = (messageId, action) => {
    if (action === 'like' || action === 'dislike') {
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, liked: action === 'like' }
          : msg
      ));
    } else if (action === 'copy') {
      const message = messages.find(msg => msg.id === messageId);
      if (message) {
        navigator.clipboard.writeText(message.content);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'processing': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>AI Assistant</span>
            <div className="flex items-center space-x-1">
              <div className={`w-2 h-2 rounded-full ${getStatusColor(aiStatus)}`} />
              <Badge variant="secondary" className={`text-xs ${
                aiStatus === 'online' ? 'bg-green-100 text-green-700' : 
                aiStatus === 'processing' ? 'bg-yellow-100 text-yellow-700' : 
                'bg-red-100 text-red-700'
              }`}>
                {aiStatus}
              </Badge>
            </div>
          </div>
          <Button variant="ghost" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col flex-1 p-0">
        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  message.type === 'user' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-100 text-gray-900 border'
                }`}>
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      {message.type === 'ai' ? (
                        <Bot className="w-4 h-4 text-indigo-600" />
                      ) : (
                        <User className="w-4 h-4 opacity-75" />
                      )}
                      <span className="text-xs opacity-75">{message.timestamp}</span>
                    </div>
                    
                    {message.type === 'ai' && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600">
                            <MoreVertical className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleMessageAction(message.id, 'like')}>
                            <ThumbsUp className="w-4 h-4 mr-2" />
                            Like
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleMessageAction(message.id, 'dislike')}>
                            <ThumbsDown className="w-4 h-4 mr-2" />
                            Dislike
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleMessageAction(message.id, 'copy')}>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                  
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  
                  {/* AI Confidence and Actions */}
                  {message.type === 'ai' && showConfidence && message.confidence && (
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-3 h-3 text-indigo-500" />
                        <span className={`text-xs font-medium ${getConfidenceColor(message.confidence)}`}>
                          {message.confidence}% confident
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMessageAction(message.id, 'like')}
                          className={`h-6 w-6 p-0 ${message.liked === true ? 'text-green-600' : 'text-gray-400'}`}
                        >
                          <ThumbsUp className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMessageAction(message.id, 'dislike')}
                          className={`h-6 w-6 p-0 ${message.liked === false ? 'text-red-600' : 'text-gray-400'}`}
                        >
                          <ThumbsDown className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {(isLoading || typingMessage) && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 border">
                  <div className="flex items-center space-x-2 mb-1">
                    <Bot className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs text-gray-500">AI is typing...</span>
                  </div>
                  {typingMessage ? (
                    <p className="text-sm text-gray-900">{typingMessage}</p>
                  ) : (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Quick Actions */}
        {showQuickActions && (
          <div className="px-4 py-2 border-t bg-gray-50">
            <div className="flex items-center space-x-2 overflow-x-auto">
              <span className="text-xs text-gray-500 whitespace-nowrap">Quick actions:</span>
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAction(action.action)}
                  className="flex items-center space-x-1 whitespace-nowrap text-xs h-7"
                >
                  <action.icon className="w-3 h-3" />
                  <span>{action.label}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              placeholder="Ask AI about your audit data..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
              className="flex-1 resize-none focus:ring-2 focus:ring-indigo-500"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputMessage.trim() || isLoading}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
              Press Enter to send, Shift+Enter for new line
            </span>
            <div className="flex items-center space-x-2">
              <Zap className="w-3 h-3 text-indigo-500" />
              <span className="text-xs text-indigo-600">Powered by AI</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIConversationPanel;