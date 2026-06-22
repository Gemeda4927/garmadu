// ============================================================
// components/Modals.tsx
// ============================================================
import { ModalShell, Badge, CrossLogo } from "./ui/Primitives";
import { G, ADMIN_CREDENTIALS, MEMBER_CREDENTIALS } from "@/constants/data";
import { useState } from "react";
import { User } from "@/types";

// ============================================================
// ContentModal - For Programs and Team Members
// ============================================================
interface ContentModalProps {
  data: any;
  type: string;
  onClose: () => void;
}

export function ContentModal({ data, type, onClose }: ContentModalProps) {
  if (!data) return null;

  if (type === "program") {
    return (
      <ModalShell onClose={onClose} maxWidth="660px">
        <div style={{ height: "240px", overflow: "hidden", margin: "1rem 1.5rem 0", borderRadius: "12px" }}>
          <img src={data.img} alt={data.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ padding: "1.75rem 2rem 2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: G.greenLight,
              borderRadius: "100px",
              padding: "4px 12px",
              marginBottom: "1rem",
            }}
          >
            <i className={`ti ${data.icon}`} style={{ fontSize: "13px", color: G.greenText }} aria-hidden="true" />
            <span style={{ fontSize: "0.7rem", fontWeight: 600, color: G.greenText }}>{data.time}</span>
          </div>
          <h3 className="display" style={{ fontSize: "1.3rem", fontWeight: 700, color: G.ink, margin: "0 0 0.5rem" }}>
            {data.title}
          </h3>
          <p style={{ fontSize: "0.72rem", color: G.hint, margin: "0 0 1rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {data.subtitle}
          </p>
          <p style={{ fontSize: "0.9rem", lineHeight: "1.9", color: G.body, margin: "0 0 1.5rem" }}>{data.detail}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.75rem" }}>
            {data.tags.map((t: string) => (
              <Badge key={t} color={G.greenText} bg={G.greenLight} border={G.greenBorder}>{t}</Badge>
            ))}
          </div>
          <a
            href="#"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: G.green,
              color: "#fff",
              padding: "0.7rem 1.6rem",
              borderRadius: "10px",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.84rem",
            }}
          >
            Register Interest <i className="ti ti-arrow-right" style={{ fontSize: "13px" }} aria-hidden="true" />
          </a>
        </div>
      </ModalShell>
    );
  }

  if (type === "team") {
    return (
      <ModalShell onClose={onClose} maxWidth="500px">
        <div style={{ padding: "0.75rem 2rem 2.5rem" }}>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center", marginBottom: "1.5rem" }}>
            <div style={{ width: "76px", height: "76px", borderRadius: "50%", overflow: "hidden", border: `3px solid ${G.greenMid}`, flexShrink: 0 }}>
              <img src={data.img} alt={data.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <div style={{ marginBottom: "6px" }}>
                <Badge color={G.greenText} bg={G.greenLight}>{data.years} Years of Service</Badge>
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: G.ink, margin: "0 0 3px" }}>{data.name}</h3>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: G.green, fontWeight: 700, margin: 0 }}>
                {data.role}
              </p>
            </div>
          </div>
          <p style={{ fontSize: "0.9rem", lineHeight: "1.9", color: G.body, margin: "0 0 1.5rem" }}>{data.bio}</p>
          <div style={{ backgroundColor: G.greenLight, borderLeft: `3px solid ${G.green}`, padding: "1rem 1.25rem", borderRadius: "0 10px 10px 0" }}>
            <p style={{ fontSize: "0.88rem", fontStyle: "italic", color: G.greenText, margin: 0, lineHeight: "1.75", fontFamily: "Georgia,serif" }}>
              {data.verse}
            </p>
          </div>
        </div>
      </ModalShell>
    );
  }

  return null;
}

// ============================================================
// LoginModal - Fully Custom Native Component
// ============================================================
interface LoginModalProps {
  onClose: () => void;
  onLogin: (user: User) => void;
}

const inputStyle = {
  width: "100%",
  padding: "0.58rem 0.85rem",
  borderRadius: "8px",
  border: `1.5px solid ${G.border}`,
  fontSize: "0.83rem",
  fontFamily: "inherit",
  color: G.ink,
  backgroundColor: G.white,
  outline: "none",
  boxSizing: "border-box" as const,
  transition: "border-color 0.15s",
};

const labelStyle = {
  display: "block",
  fontSize: "0.74rem",
  fontWeight: 600,
  color: G.ink,
  marginBottom: "4px",
  letterSpacing: "0.02em",
};

export function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError("");

    // Simulate async login
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      onLogin({ name: "Admin", role: "admin", avatar: "AD" });
    } else if (email === MEMBER_CREDENTIALS.email && password === MEMBER_CREDENTIALS.password) {
      onLogin({ name: "Abena Asante", role: "member", avatar: "AA" });
    } else {
      setError("Invalid credentials. Try admin@garmadu.org / admin123");
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const getInputStyle = (field: string) => ({
    ...inputStyle,
    borderColor: focusedField === field ? G.green : G.border,
  });

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        backgroundColor: "rgba(15,23,42,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          backgroundColor: G.white,
          borderRadius: "16px",
          width: "100%",
          maxWidth: "360px",
          padding: "1.4rem 1.5rem 1.3rem",
          boxShadow: "0 24px 64px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.06)",
          position: "relative",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "0.9rem",
            right: "0.9rem",
            width: "26px",
            height: "26px",
            borderRadius: "6px",
            backgroundColor: "transparent",
            border: `1px solid ${G.border}`,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: G.muted,
            padding: 0,
          }}
        >
          <i className="ti ti-x" style={{ fontSize: "12px" }} aria-hidden="true" />
        </button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "1rem" }}>
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "9px",
              backgroundColor: G.green,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <CrossLogo size={18} color="#fff" />
          </div>
          <div>
            <h2 className="display" style={{ fontSize: "0.97rem", fontWeight: 700, color: G.ink, margin: 0, lineHeight: 1.2 }}>
              Welcome back
            </h2>
            <p style={{ fontSize: "0.72rem", color: G.muted, margin: 0 }}>
              Sign in to your account
            </p>
          </div>
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "0.85rem" }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              style={getInputStyle("email")}
            />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              style={getInputStyle("password")}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              backgroundColor: "#FEF2F2",
              border: "1px solid #FECACA",
              borderRadius: "7px",
              padding: "0.5rem 0.7rem",
              fontSize: "0.75rem",
              color: "#DC2626",
              marginBottom: "0.75rem",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <i className="ti ti-alert-circle" style={{ fontSize: "12px", flexShrink: 0 }} />
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.68rem",
            borderRadius: "9px",
            backgroundColor: loading ? G.greenMid : G.green,
            color: "#fff",
            border: "none",
            fontWeight: 700,
            fontSize: "0.84rem",
            fontFamily: "inherit",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
            opacity: loading ? 0.8 : 1,
          }}
        >
          {loading ? (
            <>
              <i className="ti ti-loader-2" style={{ fontSize: "14px", animation: "spin 0.8s linear infinite" }} />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </button>

        {/* Demo Credentials */}
        <div
          style={{
            marginTop: "1rem",
            padding: "0.75rem",
            backgroundColor: G.surface,
            borderRadius: "8px",
            border: `1px solid ${G.border}`,
          }}
        >
          <p style={{ fontSize: "0.65rem", color: G.muted, margin: "0 0 4px", textAlign: "center", fontWeight: 600 }}>
            Demo accounts:
          </p>
          <p style={{ fontSize: "0.6rem", color: G.muted, margin: "0 0 2px", textAlign: "center" }}>
            Admin: admin@garmadu.org / admin123
          </p>
          <p style={{ fontSize: "0.6rem", color: G.muted, margin: 0, textAlign: "center" }}>
            Member: member@garmadu.org / member123
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}