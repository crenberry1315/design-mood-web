import React from "react";

export default function WatermarkToggle({ checked, onChange, label, hint }) {
  return (
    <label className="admin-watermark-toggle">
      <span>
        {label}
        {hint && <small>{hint}</small>}
      </span>
      <input
        type="checkbox"
        role="switch"
        aria-label={label}
        checked={checked === true}
        onChange={(event) => onChange(event.target.checked)}
      />
      <strong aria-hidden="true">{checked === true ? "ON" : "OFF"}</strong>
    </label>
  );
}
