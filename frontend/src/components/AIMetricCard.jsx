import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Minus, Info, ExternalLink } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

const AIMetricCard = ({ 
  title, 
  value, 
  change, 
  aiInsight, 
  icon, 
  trend,
  onDetailsClick,
  confidence = 95,
  additionalData = {}
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      case 'neutral': return <Minus className="w-4 h-4 text-gray-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      case 'neutral': return 'text-gray-600';
      default: return 'text-gray-600';
    }
  };

  const handleCardClick = () => {
    if (onDetailsClick) {
      onDetailsClick({ title, value, change, aiInsight, trend, additionalData });
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 ${
        isHovered ? 'ring-2 ring-indigo-500 ring-opacity-50' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg transition-all duration-300 ${
              isHovered ? 'bg-indigo-200 scale-110' : 'bg-indigo-100'
            }`}>
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <div className="flex items-center space-x-1">
              {getTrendIcon()}
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {change}
              </span>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    {icon}
                    <span>{title} - Details</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Current Value</p>
                      <p className="text-xl font-bold">{value}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Change</p>
                      <p className={`text-xl font-bold ${getTrendColor()}`}>{change}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">AI Confidence</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{confidence}%</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">AI Analysis</p>
                    <p className="text-sm text-gray-900">{aiInsight}</p>
                  </div>
                  {additionalData.recommendations && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Recommendations</p>
                      <ul className="text-sm text-gray-900 space-y-1">
                        {additionalData.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <span className="text-indigo-600">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        
        {/* AI Insight Bubble */}
        <div className={`mt-4 p-3 rounded-lg transition-all duration-300 ${
          isHovered ? 'bg-indigo-50 border border-indigo-200' : 'bg-gray-50'
        }`}>
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0">
              <div className="w-5 h-5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <Info className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-1">{aiInsight}</p>
              <Badge variant="secondary" className="text-xs bg-indigo-100 text-indigo-700">
                AI Confidence: {confidence}%
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIMetricCard;