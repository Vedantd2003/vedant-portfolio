"use client";

export default function SkipLink() {
  return (
    <a
      href="#main-content"
      style={{
        position: "absolute",
        left: "-9999px",
        top: "auto",
        width: 1,
        height: 1,
        overflow: "hidden",
        fontFamily: "var(--font-mono)",
        fontSize: "var(--text-label)",
        textDecoration: "none",
      }}
      onFocus={(e) => {
        const el = e.currentTarget;
        el.style.left = "var(--gutter, 1rem)";
        el.style.top = "var(--gutter, 1rem)";
        el.style.width = "auto";
        el.style.height = "auto";
        el.style.overflow = "visible";
        el.style.zIndex = "99999";
        el.style.backgroundColor = "var(--color-accent)";
        el.style.color = "var(--color-base)";
        el.style.padding = "8px 16px";
        el.style.borderRadius = "2px";
      }}
      onBlur={(e) => {
        const el = e.currentTarget;
        el.style.left = "-9999px";
        el.style.width = "1px";
        el.style.height = "1px";
        el.style.overflow = "hidden";
        el.style.backgroundColor = "";
        el.style.color = "";
        el.style.padding = "";
        el.style.zIndex = "";
      }}
    >
      Skip to main content
    </a>
  );
}
