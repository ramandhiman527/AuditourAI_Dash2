import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error("Error Boundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  handleRefresh = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleGoHome = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = "/dashboard";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <AlertTriangle className="w-16 h-16 text-red-500" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Oops! Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 text-center">
                  We encountered an unexpected error. Our AI system is working
                  to resolve this issue.
                </p>

                {process.env.NODE_ENV === "development" && this.state.error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <h4 className="font-medium text-red-800 mb-2">
                      Error Details:
                    </h4>
                    <pre className="text-xs text-red-700 overflow-auto max-h-32">
                      {this.state.error.toString()}
                    </pre>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button
                    onClick={this.handleRefresh}
                    className="flex-1"
                    variant="default"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                  <Button
                    onClick={this.handleGoHome}
                    className="flex-1"
                    variant="outline"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Go Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
