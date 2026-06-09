import { ReactNode } from "react";

interface Props {
  title: string | undefined;
  description: string | undefined;
  children: ReactNode;
}

export function ToolLayout({
  title,
  description,
  children,
}: Props) {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-white">
      <div className="text-center space-y-4 mb-10">
              {/* Page Title */}
              <h1 className="md:text-l font-extrabold text-white tracking-wide">
                {title}
              </h1>
      
              {/* Description */}
              <p className="text-white/70 text-xs max-w-3xl mx-auto leading-relaxed">
                {description}
              </p>
      
              {/* Horizontal Separator */}
              {/* <div className="w-24 mx-auto border-t border-white/20 mt-4"></div> */}
            </div>

      {children}
    </div>
  );
}