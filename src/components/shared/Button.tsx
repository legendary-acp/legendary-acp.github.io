import { type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import clsx from "classnames";

type BaseProps = {
  variant?: "primary" | "secondary" | "ghost" | "icon";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  children?: ReactNode;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: never;
    external?: never;
  };

type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href"> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantClasses: Record<NonNullable<BaseProps["variant"]>, string> = {
  primary:
    "bg-brand text-white shadow-sm " +
    "hover:bg-[color:var(--color-brand-hover)] hover:shadow-md active:opacity-90",
  secondary:
    "bg-surface border border-default-2 text-secondary " +
    "hover:border-brand hover:text-brand active:bg-brand-subtle",
  ghost:
    "bg-transparent border border-brand/50 text-brand " +
    "hover:bg-brand-subtle active:bg-brand-subtle",
  icon:
    "bg-surface border border-default-2 text-secondary " +
    "hover:border-default-2 active:scale-95",
};

const sizeClasses: Record<NonNullable<BaseProps["size"]>, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg min-h-[32px]",
  md: "px-4 py-2 text-[14px] rounded-xl min-h-[40px]",
  lg: "px-5 py-3 text-[14px] rounded-xl min-h-[48px]",
};

const Spinner = () => (
  <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
);

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    loading = false,
    leftIcon,
    rightIcon,
    className,
    children,
    ...rest
  } = props;

  const classes = clsx(
    "inline-flex items-center justify-center gap-2 font-medium",
    "transition active:scale-95 focus-ring",
    variantClasses[variant],
    sizeClasses[size],
    loading && "opacity-60 pointer-events-none cursor-not-allowed",
    className
  );

  const content = (
    <>
      {loading ? <Spinner /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    const { href, external, ...anchorRest } = rest as ButtonAsAnchor;
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  const { ...buttonRest } = rest as ButtonAsButton;
  return (
    <button className={classes} disabled={loading} {...buttonRest}>
      {content}
    </button>
  );
}
