import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  Play, 
  Pause, 
  Settings, 
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Brain,
  Plus,
  Edit3,
  Trash2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import useAuditStore from '../store/useAuditStore';

const WorkflowAutomation = () => {
  const { automationRules, toggleAutomationRule } = useAuditStore();
  const [selectedRule, setSelectedRule] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const getTriggerIcon = (trigger) => {
    switch (trigger) {
      case 'document_upload':
        return '📄';
      case 'risk_level_change':
        return '⚠️';
      case 'compliance_check':
        return '✅';
      case 'anomaly_detected':
        return '🔍';
      default:
        return '⚡';
    }
  };

  const getSuccessRateColor = (rate) => {
    if (rate >= 95) return 'text-green-600';
    if (rate >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const AutomationRuleCard = ({ rule }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${
        rule.enabled ? 'bg-white' : 'bg-gray-50 opacity-75'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">{getTriggerIcon(rule.trigger)}</div>
          <div>
            <h3 className="font-medium text-gray-900">{rule.name}</h3>
            <p className="text-sm text-gray-600 capitalize">
              Trigger: {rule.trigger.replace('_', ' ')}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            checked={rule.enabled}
            onCheckedChange={() => toggleAutomationRule(rule.id)}
          />
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Success Rate</span>
          <span className={`text-sm font-medium ${getSuccessRateColor(rule.successRate)}`}>
            {rule.successRate}%
          </span>
        </div>
        
        <Progress value={rule.successRate} className="h-2" />
        
        <div className="flex items-center justify-between text-sm">
          <Badge variant={rule.enabled ? "default" : "secondary"}>
            {rule.enabled ? 'Active' : 'Disabled'}
          </Badge>
          <div className="flex items-center space-x-2 text-gray-500">
            <TrendingUp className="w-3 h-3" />
            <span>{Math.floor(Math.random() * 50 + 10)} executions</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const CreateRuleModal = () => {
    const [newRule, setNewRule] = useState({
      name: '',
      trigger: 'document_upload',
      condition: '',
      action: '',
      description: ''
    });

    const handleCreate = () => {
      // In real app, this would call an API
      console.log('Creating rule:', newRule);
      setIsCreateModalOpen(false);
      setNewRule({
        name: '',
        trigger: 'document_upload',
        condition: '',
        action: '',
        description: ''
      });
    };

    return (
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Automation Rule</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Rule Name</label>
              <Input
                placeholder="Enter rule name..."
                value={newRule.name}
                onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Trigger Event</label>
              <select 
                className="w-full p-2 border rounded-md"
                value={newRule.trigger}
                onChange={(e) => setNewRule({ ...newRule, trigger: e.target.value })}
              >
                <option value="document_upload">Document Upload</option>
                <option value="risk_level_change">Risk Level Change</option>
                <option value="compliance_check">Compliance Check</option>
                <option value="anomaly_detected">Anomaly Detected</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium">Condition</label>
              <Input
                placeholder="When should this trigger?"
                value={newRule.condition}
                onChange={(e) => setNewRule({ ...newRule, condition: e.target.value })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Action</label>
              <Input
                placeholder="What action to take?"
                value={newRule.action}
                onChange={(e) => setNewRule({ ...newRule, action: e.target.value })}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Describe what this rule does..."
                value={newRule.description}
                onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate}>
                Create Rule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const automationStats = {
    totalRules: automationRules.length,
    activeRules: automationRules.filter(rule => rule.enabled).length,
    averageSuccess: Math.round(
      automationRules.reduce((acc, rule) => acc + rule.successRate, 0) / automationRules.length
    ),
    totalExecutions: Math.floor(Math.random() * 500 + 200)
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5" />
            <span>Workflow Automation</span>
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
              <Brain className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </CardTitle>
          
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1" />
            New Rule
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <motion.div 
            className="text-center p-3 bg-indigo-50 rounded-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-lg font-bold text-indigo-700">{automationStats.totalRules}</div>
            <div className="text-xs text-indigo-600">Total Rules</div>
          </motion.div>
          
          <motion.div 
            className="text-center p-3 bg-green-50 rounded-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-lg font-bold text-green-700">{automationStats.activeRules}</div>
            <div className="text-xs text-green-600">Active</div>
          </motion.div>
          
          <motion.div 
            className="text-center p-3 bg-blue-50 rounded-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-lg font-bold text-blue-700">{automationStats.averageSuccess}%</div>
            <div className="text-xs text-blue-600">Avg Success</div>
          </motion.div>
          
          <motion.div 
            className="text-center p-3 bg-purple-50 rounded-lg"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-lg font-bold text-purple-700">{automationStats.totalExecutions}</div>
            <div className="text-xs text-purple-600">Executions</div>
          </motion.div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <AnimatePresence>
            {automationRules.map((rule) => (
              <AutomationRuleCard key={rule.id} rule={rule} />
            ))}
          </AnimatePresence>
          
          {automationRules.length === 0 && (
            <motion.div 
              className="text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Zap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Automation Rules</h3>
              <p className="text-gray-600 mb-4">Create your first automation rule to get started</p>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Plus className="w-4 h-4 mr-1" />
                Create Rule
              </Button>
            </motion.div>
          )}
        </div>

        {/* Recent Activity */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Automation Activity</h4>
          <div className="space-y-2">
            {[
              { time: '2 min ago', action: 'Auto-categorized Financial_Report.pdf', success: true },
              { time: '15 min ago', action: 'Risk alert notification sent', success: true },
              { time: '1 hour ago', action: 'Compliance check triggered', success: false },
              { time: '3 hours ago', action: 'Document routing completed', success: true }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded"
              >
                <div className="flex items-center space-x-2">
                  {activity.success ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-sm text-gray-700">{activity.action}</span>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </CardContent>

      <CreateRuleModal />
    </Card>
  );
};

export default WorkflowAutomation;