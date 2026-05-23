import { useRef } from "react";
import { MiniSiteCardPreview, MiniSiteRenderer } from "./minisites";

function PortfolioBrowserFrame({
  project,
  size = "card",
  device = "desktop",
  interactive = false,
}) {
  const isCard = size === "card";
  const frameRef = useRef(null);

  return (
    <div
      ref={frameRef}
      className={`h-full w-full overflow-hidden border border-white/10 bg-white shadow-2xl ${
        isCard ? "rounded-[1.5rem]" : "rounded-[1.7rem]"
      }`}
    >
      <div
        className={`flex items-center gap-2 border-b px-4 ${
          isCard ? "h-9" : "h-12"
        } ${project.theme?.browserBar || "bg-slate-50"} ${
          project.theme?.browserBorder || "border-slate-200"
        }`}
      >
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />

        <div
          className={`ml-3 flex-1 rounded-full ${
            isCard ? "h-4" : "h-5"
          } ${project.theme?.browserLine || "bg-slate-200"}`}
        />
      </div>

      <div
        className={`relative ${
          isCard ? "h-[calc(100%-2.25rem)]" : "h-[calc(100%-3rem)]"
        } ${interactive ? "" : "pointer-events-none select-none"}`}
        onContextMenu={(event) => event.preventDefault()}
        onDragStart={(event) => event.preventDefault()}
      >
        {isCard ? (
          <MiniSiteCardPreview project={project} />
        ) : (
          <MiniSiteRenderer project={project} size={size} device={device} />
        )}
      </div>
    </div>
  );
}

export default PortfolioBrowserFrame;
