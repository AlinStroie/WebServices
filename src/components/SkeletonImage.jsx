import { useState } from "react";

/**
 * <img> wrapper that shows a shimmer placeholder until the image has
 * actually loaded, instead of leaving blank space on a slow connection.
 */
function SkeletonImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  onError,
  ...imgProps
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative h-full w-full overflow-hidden ${className}`}>
      {!loaded && !failed && (
        <div className="skeleton-shimmer absolute inset-0" aria-hidden="true" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${imgClassName}`}
        onLoad={() => setLoaded(true)}
        onError={(event) => {
          setFailed(true);
          onError?.(event);
        }}
        {...imgProps}
      />
    </div>
  );
}

export default SkeletonImage;
