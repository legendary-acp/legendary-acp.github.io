import { type ReactNode } from "react";
import clsx from "classnames";

type BadgeProps = {
  variant?: "neutral" | "success" | "warning" | "error" | "info" | "brand";
  size?: "sm" | "md";
  dot?: boolean;
  children: ReactNode;
  className?: string;
};

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  neutral: "bg-surface-2 text-muted border-default",
  success: "bg-success-subtle text-success border-success",
  warning: "bg-warning-subtle text-warning border-warning",
  error:   "bg-error-subtle text-error border-error",
  info:    "bg-info-subtle text-info border-info",
  brand:   "bg-brand-subtle text-brand border-brand",
};

const sizeClasses: Record<NonNullable<BadgeProps["size"]>, string> = {
  sm: "px-2 py-0.5 text-[11px] rounded-full",
  md: "px-2.5 py-1 text-xs rounded-full",
};

export default function Badge({
  variant = "neutral",
  size = "md",
  dot = false,
  children,
  className,
}: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 font-medium border select-none",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
      )}
      {children}
    </span>
  );
}
