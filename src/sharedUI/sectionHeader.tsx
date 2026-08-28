import {
  createElement,
  isValidElement,
  type ElementType,
  type ReactNode,
} from "react";

export interface SectionHeaderProps {
  title: string;
  subtitle?: ReactNode;
  icon?: ElementType | ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
  titleAs?: "h2" | "h3" | "h4";
  variant?: "default" | "card";
}

const containerClass = "flex items-start gap-3";
const iconClass = "rounded-xl bg-white/5 p-2 text-blue-300";
const titleClass = "text-base font-semibold tracking-tight text-white sm:text-lg";
const subtitleClass = "mt-1 text-sm text-white/60";
const cardClass = "border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4";

export function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  actions,
  children,
  className = "",
  titleAs: Title = "h2",
  variant = "default",
}: SectionHeaderProps) {
  return (
    <div className={`${containerClass} ${variant === "card" ? cardClass : ""} ${className}`.trim()}>
      {Icon ? (
        <div className={iconClass} aria-hidden="true">
          {isValidElement(Icon)
            ? Icon
            : typeof Icon === "function" ||
                (typeof Icon === "object" && Icon !== null)
              ? createElement(Icon as ElementType, { className: "h-5 w-5" })
              : Icon}
        </div>
      ) : null}

      <div className="min-w-0 flex-1">
        <Title className={titleClass}>{title}</Title>
        {subtitle ? <div className={subtitleClass}>{subtitle}</div> : null}
        {children}
      </div>

      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
