import * as React from "react"

export function ToolTitleDescription({
  title = "",
  description = "",
}: {
  title?: string;
  description?: string;
})
{
  return (
<div className="text-center space-y-4 mb-10">
        {/* Page Title */}
        <h1 className="md:text-l font-extrabold text-white tracking-wide">
          {title}
        </h1>

        {/* Description */}
        <p className="text-white/70 text-xs  max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>

        {/* Horizontal Separator */}
        {/* <div className="w-24 mx-auto border-t border-white/20 mt-4"></div> */}
      </div>
  )
}