import React from "react";
import { cn } from "../../lib/utils";

const ThemedCard = React.forwardRef(
  ({ className, children, hover = true, animated = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "custom-card",
        hover && "hover:custom-card",
        animated && "transition-all duration-300 ease-out",
        className,
      )}
      style={{
        backgroundColor: "var(--card-background)",
        border: "1px solid var(--border-light)",
        borderRadius: "12px",
      }}
      {...props}
    >
      {children}
    </div>
  ),
);
ThemedCard.displayName = "ThemedCard";

const ThemedCardHeader = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pb-4", className)} {...props}>
      {children}
    </div>
  ),
);
ThemedCardHeader.displayName = "ThemedCardHeader";

const ThemedCardTitle = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "custom-card-title text-lg font-semibold leading-6",
        className,
      )}
      style={{ color: "var(--text-primary)" }}
      {...props}
    >
      {children}
    </h3>
  ),
);
ThemedCardTitle.displayName = "ThemedCardTitle";

const ThemedCardSubtitle = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("custom-card-subtitle mt-1", className)}
      style={{ color: "var(--text-secondary)" }}
      {...props}
    >
      {children}
    </p>
  ),
);
ThemedCardSubtitle.displayName = "ThemedCardSubtitle";

const ThemedCardContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("px-6 pb-6", className)} {...props}>
      {children}
    </div>
  ),
);
ThemedCardContent.displayName = "ThemedCardContent";

// Custom Progress component with animations
const ThemedProgress = React.forwardRef(
  ({ className, value = 0, animated = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("custom-progress h-2 w-full", className)}
      {...props}
    >
      <div
        className={cn(
          "custom-progress-fill h-full transition-all duration-500 ease-out",
          animated && "animate-pulse",
        )}
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background:
            "linear-gradient(90deg, var(--primary-green), var(--primary-green-light))",
        }}
      />
    </div>
  ),
);
ThemedProgress.displayName = "ThemedProgress";

// Custom Button component
const ThemedButton = React.forwardRef(
  (
    {
      className,
      variant = "primary",
      size = "default",
      animated = true,
      children,
      ...props
    },
    ref,
  ) => {
    const getVariantStyles = () => {
      switch (variant) {
        case "primary":
          return {
            backgroundColor: "var(--primary-green)",
            color: "var(--text-light)",
            border: "none",
          };
        case "secondary":
          return {
            backgroundColor: "transparent",
            color: "var(--primary-green)",
            border: "1px solid var(--primary-green)",
          };
        case "danger":
          return {
            backgroundColor: "var(--status-error)",
            color: "var(--text-light)",
            border: "none",
          };
        default:
          return {
            backgroundColor: "var(--primary-green)",
            color: "var(--text-light)",
            border: "none",
          };
      }
    };

    const getSizeStyles = () => {
      switch (size) {
        case "sm":
          return "px-3 py-1.5 text-sm";
        case "lg":
          return "px-6 py-3 text-lg";
        default:
          return "px-4 py-2";
      }
    };

    return (
      <button
        ref={ref}
        className={cn(
          "custom-button-primary font-medium rounded-lg transition-all duration-150 ease-out",
          "hover:transform hover:-translate-y-0.5 hover:shadow-lg",
          "active:transform active:scale-98",
          animated && "hover:shadow-lg",
          getSizeStyles(),
          className,
        )}
        style={getVariantStyles()}
        {...props}
      >
        {children}
      </button>
    );
  },
);
ThemedButton.displayName = "ThemedButton";

// Status Badge component
const StatusBadge = React.forwardRef(
  ({ className, status = "success", children, ...props }, ref) => {
    const getStatusStyles = () => {
      switch (status) {
        case "error":
        case "pending":
          return {
            backgroundColor: "var(--status-error-light)",
            color: "var(--status-error)",
            border: "1px solid var(--status-error)",
          };
        case "warning":
        case "in-progress":
          return {
            backgroundColor: "var(--status-warning-light)",
            color: "var(--status-warning)",
            border: "1px solid var(--status-warning)",
          };
        case "success":
        case "completed":
          return {
            backgroundColor: "var(--status-success-light)",
            color: "var(--status-success)",
            border: "1px solid var(--status-success)",
          };
        default:
          return {
            backgroundColor: "var(--status-success-light)",
            color: "var(--status-success)",
            border: "1px solid var(--status-success)",
          };
      }
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
          "transition-all duration-200 ease-out",
          className,
        )}
        style={getStatusStyles()}
        {...props}
      >
        {children}
      </span>
    );
  },
);
StatusBadge.displayName = "StatusBadge";

// Metric Card component with custom animations
const MetricCard = React.forwardRef(
  (
    {
      className,
      title,
      value,
      subtitle,
      trend,
      trendValue,
      children,
      ...props
    },
    ref,
  ) => (
    <div ref={ref} className={cn("metric-card p-6", className)} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <p
            className="custom-card-subtitle text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            {title}
          </p>
          <p
            className="custom-card-title text-2xl font-bold mt-1"
            style={{ color: "var(--text-primary)" }}
          >
            {value}
          </p>
          {subtitle && (
            <p
              className="custom-card-subtitle text-xs mt-1"
              style={{ color: "var(--text-secondary)" }}
            >
              {subtitle}
            </p>
          )}
        </div>
        {trend && trendValue && (
          <div
            className={cn(
              "flex items-center text-sm font-medium",
              trend === "up"
                ? "text-green-600"
                : trend === "down"
                  ? "text-red-600"
                  : "text-gray-600",
            )}
          >
            {trendValue}
          </div>
        )}
      </div>
      {children}
    </div>
  ),
);
MetricCard.displayName = "MetricCard";

export {
  ThemedCard,
  ThemedCardHeader,
  ThemedCardTitle,
  ThemedCardSubtitle,
  ThemedCardContent,
  ThemedProgress,
  ThemedButton,
  StatusBadge,
  MetricCard,
};
