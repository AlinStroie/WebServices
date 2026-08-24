import { useMemo, useState } from "react";
import { MiniSiteRenderer } from "./minisites";
import SkeletonImage from "./SkeletonImage";

const PREVIEW_IMAGE_BASE_PATH = "/images/portfolio-previews";

function normalizeText(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ø/g, "o")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function getProjectFingerprint(project = {}) {
  return normalizeText(
    [
      project.id,
      project.slug,
      project.layout,
      project.title,
      project.category,
      project.brand,
      project.subtitle,
      project.eyebrow,
    ]
      .filter(Boolean)
      .join(" ")
  );
}

function getProjectPreviewImage(project = {}) {
  if (project.previewImage) return project.previewImage;

  const fingerprint = getProjectFingerprint(project);

  if (
    fingerprint.includes("movea") ||
    fingerprint.includes("kineto") ||
    fingerprint.includes("kinetoterapie") ||
    fingerprint.includes("recuperare") ||
    fingerprint.includes("medical") ||
    fingerprint.includes("cabinet")
  ) {
    return `${PREVIEW_IMAGE_BASE_PATH}/movea-preview.webp`;
  }

  if (
    fingerprint.includes("luna") ||
    fingerprint.includes("beauty") ||
    fingerprint.includes("salon") ||
    fingerprint.includes("frumusete")
  ) {
    return `${PREVIEW_IMAGE_BASE_PATH}/luna-beauty-studio-preview.webp`;
  }

  if (
    fingerprint.includes("atlas") ||
    fingerprint.includes("freight") ||
    fingerprint.includes("transport") ||
    fingerprint.includes("logistica") ||
    fingerprint.includes("flota")
  ) {
    return `${PREVIEW_IMAGE_BASE_PATH}/atlas-freight-preview.webp`;
  }

  if (
    fingerprint.includes("hieu") ||
    fingerprint.includes("bowl") ||
    fingerprint.includes("horeca") ||
    fingerprint.includes("restaurant") ||
    fingerprint.includes("asian")
  ) {
    return `${PREVIEW_IMAGE_BASE_PATH}/hieu-bowl-preview.webp`;
  }

  if (
    fingerprint.includes("andrei") ||
    fingerprint.includes("crisan") ||
    fingerprint.includes("personal") ||
    fingerprint.includes("portfolio") ||
    fingerprint.includes("portofoliu") ||
    fingerprint.includes("designer")
  ) {
    return `${PREVIEW_IMAGE_BASE_PATH}/andrei-crisan-design-preview.webp`;
  }

  if (
    fingerprint.includes("vlom") ||
    fingerprint.includes("cust") ||
    fingerprint.includes("shop") ||
    fingerprint.includes("e commerce") ||
    fingerprint.includes("ecommerce") ||
    fingerprint.includes("streetwear")
  ) {
    return `${PREVIEW_IMAGE_BASE_PATH}/vlom-cust-preview.webp`;
  }

  return null;
}

export function StaticCardPreview({ project }) {
  const [imageFailed, setImageFailed] = useState(false);
  const previewImage = useMemo(() => getProjectPreviewImage(project), [project]);

  if (!previewImage || imageFailed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#0d0d0d] px-6 text-center text-sm font-semibold text-white/45">
        Preview image missing
      </div>
    );
  }

  return (
    <SkeletonImage
      src={previewImage}
      alt={`Preview ${project?.title || "project"}`}
      imgClassName="object-cover object-top"
      draggable={false}
      onError={() => setImageFailed(true)}
    />
  );
}

function PortfolioBrowserFrame({
  project,
  size = "card",
  device = "desktop",
  interactive = false,
  chrome = true,
}) {
  const isCard = size === "card";

  if (!chrome) {
    return (
      <div
        className="relative h-full w-full overflow-hidden"
        onContextMenu={(event) => event.preventDefault()}
        onDragStart={(event) => event.preventDefault()}
      >
        {isCard ? (
          <StaticCardPreview project={project} />
        ) : (
          <MiniSiteRenderer project={project} size={size} device={device} />
        )}
      </div>
    );
  }

  return (
    <div
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
        className={`relative overflow-hidden ${
          isCard ? "h-[calc(100%-2.25rem)]" : "h-[calc(100%-3rem)]"
        } ${interactive ? "" : "pointer-events-none select-none"}`}
        onContextMenu={(event) => event.preventDefault()}
        onDragStart={(event) => event.preventDefault()}
      >
        {isCard ? (
          <StaticCardPreview project={project} />
        ) : (
          <MiniSiteRenderer project={project} size={size} device={device} />
        )}
      </div>
    </div>
  );
}

export default PortfolioBrowserFrame;