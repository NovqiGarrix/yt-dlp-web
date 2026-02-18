"use client";

import { cn } from "@/lib/utils";
import { Activity, Wifi } from "lucide-react";
import { HTMLAttributes } from "react";

export function StatusBar({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "h-6 bg-[#528bff] text-white flex items-center justify-between px-3 text-[10px] font-mono select-none",
        className,
      )}
      {...props}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 cursor-pointer transition-opacity">
          <Wifi className="w-3 h-3" />
          <span>
            <span className="font-bold">CONNECTED</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5 opacity-90 hover:opacity-100 cursor-pointer transition-opacity">
          <Activity className="w-3 h-3" />
          <span>
            TOTAL CONVERTED: <span className="font-bold">500 FILES</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="opacity-90">v1.0.2</div>
      </div>
    </div>
  );
}
