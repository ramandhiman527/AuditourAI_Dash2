import React, { useState } from "react";
import {
  Settings,
  Brain,
  Shield,
  Bell,
  User,
  Database,
  Palette,
  Globe,
  Lock,
  Zap,
  AlertCircle,
  CheckCircle,
  Save,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import { Progress } from "./ui/progress";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    ai: {
      autoAnalysis: true,
      confidenceThreshold: 85,
      realTimeUpdates: true,
      aiSuggestions: true,
      voiceNarration: false,
    },
    notifications: {
      email: true,
      push: true,
      highRiskAlerts: true,
      dailySummary: false,
      weeklyReports: true,
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      dataEncryption: true,
      auditLogging: true,
    },
    appearance: {
      theme: "light",
      density: "comfortable",
      animations: true,
      sidebarCollapsed: false,
    },
  });

  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  const handleSettingChange = (category, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  const handleSaveSettings = async () => {
    setSaving(true);

    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setLastSaved(new Date());
      console.log("Settings saved:", settings);
    }, 1500);
  };

  const resetToDefaults = () => {
    setSettings({
      ai: {
        autoAnalysis: true,
        confidenceThreshold: 85,
        realTimeUpdates: true,
        aiSuggestions: true,
        voiceNarration: false,
      },
      notifications: {
        email: true,
        push: true,
        highRiskAlerts: true,
        dailySummary: false,
        weeklyReports: true,
      },
      security: {
        twoFactorAuth: true,
        sessionTimeout: 30,
        dataEncryption: true,
        auditLogging: true,
      },
      appearance: {
        theme: "light",
        density: "comfortable",
        animations: true,
        sidebarCollapsed: false,
      },
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            <Settings className="w-3 h-3 mr-1" />
            Configuration
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          {lastSaved && (
            <div className="flex items-center space-x-1 text-sm text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span>Saved {lastSaved.toLocaleTimeString()}</span>
            </div>
          )}
          <Button variant="outline" onClick={resetToDefaults}>
            <RefreshCw className="w-4 h-4 mr-1" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSaveSettings} disabled={saving}>
            {saving ? (
              <>
                <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-1" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="ai" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ai" className="flex items-center space-x-2">
            <Brain className="w-4 h-4" />
            <span>AI Preferences</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center space-x-2"
          >
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="w-4 h-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="flex items-center space-x-2"
          >
            <Palette className="w-4 h-4" />
            <span>Appearance</span>
          </TabsTrigger>
        </TabsList>

        {/* AI Preferences */}
        <TabsContent value="ai" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span>AI Analysis Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Automatic Analysis</h4>
                  <p className="text-sm text-gray-600">
                    Enable AI to automatically analyze uploaded documents
                  </p>
                </div>
                <Switch
                  checked={settings.ai.autoAnalysis}
                  onCheckedChange={(checked) =>
                    handleSettingChange("ai", "autoAnalysis", checked)
                  }
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Confidence Threshold</h4>
                  <span className="text-sm text-gray-600">
                    {settings.ai.confidenceThreshold}%
                  </span>
                </div>
                <Progress
                  value={settings.ai.confidenceThreshold}
                  className="h-2"
                />
                <p className="text-xs text-gray-500">
                  AI suggestions below this confidence level will be flagged for
                  human review
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Real-time Updates</h4>
                  <p className="text-sm text-gray-600">
                    Enable live updates and monitoring
                  </p>
                </div>
                <Switch
                  checked={settings.ai.realTimeUpdates}
                  onCheckedChange={(checked) =>
                    handleSettingChange("ai", "realTimeUpdates", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">AI Suggestions</h4>
                  <p className="text-sm text-gray-600">
                    Show contextual AI recommendations
                  </p>
                </div>
                <Switch
                  checked={settings.ai.aiSuggestions}
                  onCheckedChange={(checked) =>
                    handleSettingChange("ai", "aiSuggestions", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Voice Narration</h4>
                  <p className="text-sm text-gray-600">
                    Enable AI voice narration for insights
                  </p>
                </div>
                <Switch
                  checked={settings.ai.voiceNarration}
                  onCheckedChange={(checked) =>
                    handleSettingChange("ai", "voiceNarration", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-blue-600" />
                <span>Notification Preferences</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-600">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.email}
                  onCheckedChange={(checked) =>
                    handleSettingChange("notifications", "email", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-gray-600">
                    Browser and mobile push notifications
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.push}
                  onCheckedChange={(checked) =>
                    handleSettingChange("notifications", "push", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">High Risk Alerts</h4>
                  <p className="text-sm text-gray-600">
                    Immediate alerts for high-risk findings
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.highRiskAlerts}
                  onCheckedChange={(checked) =>
                    handleSettingChange(
                      "notifications",
                      "highRiskAlerts",
                      checked,
                    )
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Daily Summary</h4>
                  <p className="text-sm text-gray-600">
                    Daily digest of activities and insights
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.dailySummary}
                  onCheckedChange={(checked) =>
                    handleSettingChange(
                      "notifications",
                      "dailySummary",
                      checked,
                    )
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Weekly Reports</h4>
                  <p className="text-sm text-gray-600">
                    Weekly summary reports
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.weeklyReports}
                  onCheckedChange={(checked) =>
                    handleSettingChange(
                      "notifications",
                      "weeklyReports",
                      checked,
                    )
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span>Security Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-600">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={settings.security.twoFactorAuth}
                  onCheckedChange={(checked) =>
                    handleSettingChange("security", "twoFactorAuth", checked)
                  }
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Session Timeout</h4>
                  <span className="text-sm text-gray-600">
                    {settings.security.sessionTimeout} minutes
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Automatically sign out after period of inactivity
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Data Encryption</h4>
                  <p className="text-sm text-gray-600">
                    Encrypt sensitive data at rest
                  </p>
                </div>
                <Switch
                  checked={settings.security.dataEncryption}
                  onCheckedChange={(checked) =>
                    handleSettingChange("security", "dataEncryption", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Audit Logging</h4>
                  <p className="text-sm text-gray-600">
                    Log all user actions for security auditing
                  </p>
                </div>
                <Switch
                  checked={settings.security.auditLogging}
                  onCheckedChange={(checked) =>
                    handleSettingChange("security", "auditLogging", checked)
                  }
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h5 className="font-medium text-yellow-800">
                      Security Recommendation
                    </h5>
                    <p className="text-sm text-yellow-700 mt-1">
                      We recommend keeping all security features enabled for
                      maximum protection.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Palette className="w-5 h-5 text-purple-600" />
                <span>Appearance Settings</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-medium">Theme</h4>
                <div className="grid grid-cols-3 gap-3">
                  {["light", "dark", "auto"].map((theme) => (
                    <button
                      key={theme}
                      onClick={() =>
                        handleSettingChange("appearance", "theme", theme)
                      }
                      className={`p-3 border rounded-lg text-center capitalize ${
                        settings.appearance.theme === theme
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Display Density</h4>
                <div className="grid grid-cols-3 gap-3">
                  {["compact", "comfortable", "spacious"].map((density) => (
                    <button
                      key={density}
                      onClick={() =>
                        handleSettingChange("appearance", "density", density)
                      }
                      className={`p-3 border rounded-lg text-center capitalize ${
                        settings.appearance.density === density
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {density}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Animations</h4>
                  <p className="text-sm text-gray-600">
                    Enable smooth animations and transitions
                  </p>
                </div>
                <Switch
                  checked={settings.appearance.animations}
                  onCheckedChange={(checked) =>
                    handleSettingChange("appearance", "animations", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Collapsed Sidebar</h4>
                  <p className="text-sm text-gray-600">
                    Start with sidebar collapsed by default
                  </p>
                </div>
                <Switch
                  checked={settings.appearance.sidebarCollapsed}
                  onCheckedChange={(checked) =>
                    handleSettingChange(
                      "appearance",
                      "sidebarCollapsed",
                      checked,
                    )
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
