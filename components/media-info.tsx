import { type InfoSchema } from "@/api";
import { Clock, User } from "lucide-react";
import Image from "next/image";

interface MediaInfoProps {
  info: InfoSchema;
}

export function MediaInfo({ info }: MediaInfoProps) {
  return (
    <div className="w-full bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col md:flex-row">
        {/* Thumbnail Section */}
        {info.thumbnail && (
          <div className="relative w-full md:w-[280px] aspect-video md:aspect-auto shrink-0 bg-muted">
            <Image
              src={info.thumbnail}
              alt={info.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 280px"
              priority
            />
          </div>
        )}

        {/* Content Section */}
        <div className="flex-1 p-5 flex flex-col justify-center gap-3">
          <h2 className="text-xl font-semibold leading-tight line-clamp-2 text-card-foreground">
            {info.title}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1 rounded-full text-secondary-foreground">
              <User className="w-3.5 h-3.5" />
              <span className="font-medium truncate max-w-[150px]">
                {info.channelTitle}
              </span>
            </div>

            {info.duration && (
              <div className="flex items-center gap-1.5 bg-secondary/50 px-2.5 py-1 rounded-full text-secondary-foreground">
                <Clock className="w-3.5 h-3.5" />
                <span className="font-medium">{info.duration}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
