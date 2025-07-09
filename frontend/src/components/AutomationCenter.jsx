import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Brain, 
  Settings, 
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  Play,
  Pause,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import WorkflowAutomation from './WorkflowAutomation';
import ProcessingPipeline from './ProcessingPipeline';
import useAuditStore from '../store/useAuditStore';

const AutomationCenter = () => {
  const { automationRules, realTimeData } = useAuditStore();
  
  const automationStats = {
    totalRules: automationRules.length,
    activeRules: automationRules.filter(rule => rule.enabled).length,
    averageSuccess: Math.round(
      automationRules.reduce((acc, rule) => acc + rule.successRate, 0) / automationRules.length
    ),
    totalExecutions: Math.floor(Math.random() * 500 + 200)
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Automation Center</h1>
          <p className="text-gray-600 mt-1">Intelligent workflow automation and process optimization</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="bg-green-100 text-green-700">
            <Activity className="w-3 h-3 mr-1" />
            {automationStats.activeRules} Active Rules
          </Badge>
          <Button>
            <Plus className="w-4 h-4 mr-1" />
            New Automation
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Rules',
            value: automationStats.totalRules,
            icon: Zap,
            color: 'indigo',
            change: '+2 this week'
          },
          {
            title: 'Active Rules',
            value: automationStats.activeRules,
            icon: Play,
            color: 'green',
            change: '100% uptime'
          },
          {
            title: 'Success Rate',
            value: `${automationStats.averageSuccess}%`,
            icon: TrendingUp,
            color: 'blue',
            change: '+5.2% this month'
          },
          {
            title: 'Executions',
            value: automationStats.totalExecutions,
            icon: Activity,
            color: 'purple',
            change: '+127 today'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                  <Badge variant="outline" className="text-xs">
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Workflow Automation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <WorkflowAutomation />
        </motion.div>

        {/* Processing Pipeline */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <ProcessingPipeline />
        </motion.div>
      </div>

      {/* Automation Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Automation Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Recent Executions</h4>
                <div className="space-y-2">
                  {[
                    { rule: 'Auto-categorize Documents', time: '2 min ago', status: 'success' },
                    { rule: 'Risk Alert Notification', time: '5 min ago', status: 'success' },
                    { rule: 'Compliance Check', time: '12 min ago', status: 'failed' },
                    { rule: 'Document Routing', time: '18 min ago', status: 'success' }
                  ].map((execution, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <div className="text-sm font-medium">{execution.rule}</div>
                        <div className="text-xs text-gray-500">{execution.time}</div>
                      </div>
                      {execution.status === 'success' ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Clock className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Performance Metrics</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Average Execution Time</span>
                      <span className="font-medium">1.2s</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Success Rate</span>
                      <span className="font-medium">96.2%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '96%' }} />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Resource Usage</span>
                      <span className="font-medium">34%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '34%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">AI Optimization</h4>
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="w-4 h-4 text-indigo-600" />
                    <span className="font-medium text-gray-900">Smart Recommendations</span>
                  </div>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Optimize Rule #3 for 15% faster execution</li>
                    <li>• Add error handling to Rule #7</li>
                    <li>• Create new rule for pattern XYZ</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AutomationCenter;