"use client";

import { Link2 } from "lucide-react";
import { CardSkeleton } from "@/components/dashboard/Skeletons";

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------
interface LinkEntry {
  name: string;
  links: number;
}

interface SharedCultureProps {
  linksData: { data: LinkEntry[]; total_links?: number } | null | undefined;
}

// ---------------------------------------------------------------------------
export default function SharedCulture({ linksData }: SharedCultureProps) {
  if (!linksData?.data)
    return (
      <div className="lg:col-span-6">
        <CardSkeleton />
      </div>
    );

  return (
    <div className="lg:col-span-6">
      <div className="bg-card-bg rounded-2xl p-8 neon-border-dashboard relative group">
        <h3 className="text-xl font-black tracking-tighter uppercase mb-6 flex items-center gap-2">
          <Link2 className="text-neon-green" />
          Shared Culture
        </h3>
        <div className="space-y-4">
          {linksData.data.length > 0 ? (
            linksData.data.slice(0, 4).map((item, idx) => {
              const total = linksData.total_links || 1;
              const pct = Math.round((item.links / total) * 100);
              const color = idx === 0 ? "bg-neon-green" : "bg-teal-accent";

              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center font-bold text-white/40 text-[10px] uppercase overflow-hidden">
                      {item.name.substring(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase truncate max-w-37.5">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-white/40">
                        {item.links} links
                      </p>
                    </div>
                  </div>
                  <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-white/40 text-sm">No links found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
