import React from "react";
import { Brain, Loader2, Sparkles } from "lucide-react";

const Loading = ({
  type = "default",
  message = "Loading...",
  aiMessage = null,
  size = "medium",
  className = "",
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-4 h-4";
      case "large":
        return "w-12 h-12";
      default:
        return "w-8 h-8";
    }
  };

  const getContainerClasses = () => {
    switch (type) {
      case "fullscreen":
        return "fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50";
      case "overlay":
        return "absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10";
      case "inline":
        return "flex items-center space-x-2";
      default:
        return "flex flex-col items-center justify-center p-8";
    }
  };

  const LoadingSpinner = () => (
    <Loader2 className={`${getSizeClasses()} animate-spin text-blue-600`} />
  );

  const AILoadingSpinner = () => (
    <div className="relative">
      <Brain className={`${getSizeClasses()} text-purple-600 animate-pulse`} />
      <div className="absolute -top-1 -right-1">
        <Sparkles className="w-3 h-3 text-yellow-500 animate-ping" />
      </div>
    </div>
  );

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      <div className="text-center">
        {aiMessage ? <AILoadingSpinner /> : <LoadingSpinner />}

        {type !== "inline" && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-gray-900">
              {aiMessage || message}
            </p>

            {aiMessage && (
              <p className="text-xs text-purple-600">
                AI is processing your request...
              </p>
            )}
          </div>
        )}

        {type === "inline" && (
          <span className="text-sm text-gray-600 ml-2">
            {aiMessage || message}
          </span>
        )}
      </div>
    </div>
  );
};

// Skeleton loading components for specific content types
export const SkeletonCard = ({ className = "" }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-gray-200 rounded-lg p-4 space-y-3">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-300 rounded"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  </div>
);

export const SkeletonChart = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`}>
    <div className="h-64 flex items-end justify-around p-4">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-gray-300 rounded-t w-8"
          style={{ height: `${Math.random() * 100 + 50}px` }}
        />
      ))}
    </div>
  </div>
);

export const SkeletonTable = ({ rows = 5, className = "" }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 px-4 py-3 border-b">
        <div className="flex space-x-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-4 bg-gray-300 rounded flex-1"></div>
          ))}
        </div>
      </div>

      {/* Rows */}
      {[...Array(rows)].map((_, rowIndex) => (
        <div key={rowIndex} className="px-4 py-3 border-b border-gray-100">
          <div className="flex space-x-4">
            {[...Array(4)].map((_, colIndex) => (
              <div
                key={colIndex}
                className="h-3 bg-gray-200 rounded flex-1"
                style={{ width: colIndex === 0 ? "60%" : "100%" }}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Loading;
