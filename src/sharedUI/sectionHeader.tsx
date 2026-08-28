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
const cardIconClass = "inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/85";
const cardTitleClass = "text-base font-semibold tracking-tight text-white sm:text-md";
const cardSubtitleClass = "mt-1 text-xs text-white/60 sm:text-sm";

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
  const isCard = variant === "card";
  const rootClass = isCard ? `${cardClass} ${className}`.trim() : `${containerClass} ${className}`.trim();
  const contentClass = isCard ? "flex items-center gap-2" : "min-w-0 flex-1";

  return (
    <div className={rootClass}>
      {Icon ? (
        <div className={isCard ? cardIconClass : iconClass} aria-hidden="true">
          {isValidElement(Icon)
            ? Icon
            : typeof Icon === "function" ||
                (typeof Icon === "object" && Icon !== null)
              ? createElement(Icon as ElementType, {
                  className: isCard ? "h-4 w-4" : "h-5 w-5",
                })
              : Icon}
        </div>
      ) : null}

      <div className={contentClass}>
        <Title className={isCard ? cardTitleClass : titleClass}>{title}</Title>
        {subtitle ? (
          <div className={isCard ? cardSubtitleClass : subtitleClass}>{subtitle}</div>
        ) : null}
        {children}
      </div>

      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}
