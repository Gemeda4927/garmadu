"use client";

// ============================================================
// 4. UI PRIMITIVES (components/ui/Primitives.tsx)
// ============================================================
import { useState, useEffect } from "react";
import { G } from "../../constants/tokens";

export function CrossLogo({ size = 28, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="11" y="2" width="6" height="24" rx="3" fill={color} />
      <rect x="2" y="10" width="24" height="6" rx="3" fill={color} />
    </svg>
  );
}

export function Sparkle({ style }) {
  return (
    <span
      style={{
        position: "absolute",
        pointerEvents: "none",
        fontSize: "18px",
        animation: "sparkleFloat 1.8s ease-out forwards",
        ...style,
      }}
    >
      ✦
    </span>
  );
}

export function Chevron({ open, size = 14, color = G.muted }) {
  return (
    <i
      className="ti ti-chevron-down"
      aria-hidden="true"
      style={{
        fontSize: size,
        color,
        transition: "transform 0.2s ease",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        display: "inline-block",
      }}
    />
  );
}

export function Badge({ children, color = G.green, bg, border, style }) {
  return (
    <span
      style={{
        fontSize: "0.68rem",
        fontWeight: 700,
        color,
        backgroundColor: bg || color + "15",
        padding: "3px 10px",
        borderRadius: "100px",
        border: border ? `1px solid ${border}` : "none",
        display: "inline-block",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

interface ModalShellProps {
  onClose: () => void;
  maxWidth?: string;
  children: React.ReactNode;
}

export function ModalShell({ onClose, maxWidth = "660px", children }: ModalShellProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fade-in"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "rgba(15,23,42,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="slide-down"
        style={{
          backgroundColor: G.white,
          borderRadius: "20px",
          maxWidth,
          width: "100%",
          overflow: "hidden",
          border: `1px solid ${G.border}`,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 40px 100px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "1.25rem 1.5rem 0" }}>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: G.surface,
              border: `1px solid ${G.border}`,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: G.muted,
            }}
          >
            <i className="ti ti-x" style={{ fontSize: "15px" }} aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}