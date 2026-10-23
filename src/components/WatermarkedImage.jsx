import React, { useLayoutEffect, useRef, useState } from "react";
import "./watermark.css";

// Keep the layer inside the visible photo, including letterboxed contain views.
export default function WatermarkedImage({
  watermark = false,
  fit = "cover",
  natural = false,
  className = "",
  style,
  ...imageProps
}) {
  const photo = useRef(null);
  const [bounds, setBounds] = useState(null);
  useLayoutEffect(() => {
    const image = photo.current;
    const measure = () => {
      if (!image.complete || !image.naturalWidth) {
        setBounds(null);
        return;
      }
      const { width, height } = image.getBoundingClientRect();
      const contained = fit === "contain" || fit === "scale-down";
      const scale = Math.min(
        width / image.naturalWidth,
        height / image.naturalHeight,
        fit === "scale-down" ? 1 : Infinity,
      );
      const photoWidth = contained ? image.naturalWidth * scale : width;
      const photoHeight = contained ? image.naturalHeight * scale : height;
      setBounds({
        left: (width - photoWidth) / 2,
        top: (height - photoHeight) / 2,
        width: photoWidth,
        height: photoHeight,
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(image);
    image.addEventListener("load", measure);
    image.addEventListener("error", measure);
    measure();
    return () => {
      observer.disconnect();
      image.removeEventListener("load", measure);
      image.removeEventListener("error", measure);
    };
  }, [imageProps.src, fit, natural]);
  return (
    <div
      className={`watermarked-image${natural ? " watermarked-image--natural" : ""} ${className}`}
      style={style}
    >
      <img {...imageProps} ref={photo} className="watermarked-image__photo" style={{ objectFit: fit }} />
      {watermark === true && bounds && (
        <div className="watermarked-image__bounds" style={bounds} aria-hidden="true" />
      )}
    </div>
  );
}
