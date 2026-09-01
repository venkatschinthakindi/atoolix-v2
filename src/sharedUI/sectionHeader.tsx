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
const iconClass = "rounded-xl bg-accent-image-soft p-2 text-accent-image";
const titleClass = "text-base font-semibold tracking-tight text-foreground sm:text-lg";
const subtitleClass = "mt-1 text-sm text-foreground-secondary";
const cardClass = "flex items-center justify-between gap-3 border-b border-border px-4 py-3 sm:px-5 sm:py-4";
const cardIconClass = "inline-flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-surface-raised text-foreground-secondary";
const cardTitleClass = "text-base font-semibold tracking-tight text-foreground sm:text-md";
const cardSubtitleClass = "mt-1 text-xs text-foreground-secondary sm:text-sm";

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
  const contentClass = isCard ? "min-w-0 flex-1" : "min-w-0 flex-1";

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
