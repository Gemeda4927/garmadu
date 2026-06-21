// ============================================================
// components/Modals.tsx
// ============================================================
import { ModalShell, Badge, CrossLogo } from "./ui/Primitives";
import { G } from "@/constants/data";
import { useState } from "react";
import { useSignIn, useSignUp } from "@clerk/clerk-react";

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
// LoginModal — Clean custom auth, no Clerk UI components
// ============================================================
interface LoginModalProps {
  onClose: () => void;
  defaultMode?: "sign-in" | "sign-up";
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

export function LoginModal({ onClose, defaultMode = "sign-in" }: LoginModalProps) {
  const [mode, setMode] = useState<"sign-in" | "sign-up">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  const reset = () => { setEmail(""); setPassword(""); setName(""); setError(""); };

  const switchMode = () => { setMode(m => m === "sign-in" ? "sign-up" : "sign-in"); reset(); };

  const handleSubmit = async () => {
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    setError("");
    try {
      if (mode === "sign-in") {
        await signIn?.create({ identifier: email, password });
        onClose();
      } else {
        const [firstName, ...rest] = name.trim().split(" ");
        await signUp?.create({ emailAddress: email, password, firstName, lastName: rest.join(" ") || undefined });
        onClose();
      }
    } catch (err: any) {
      setError(err?.errors?.[0]?.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
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
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute", top: "0.9rem", right: "0.9rem",
            width: "26px", height: "26px", borderRadius: "6px",
            backgroundColor: "transparent", border: `1px solid ${G.border}`,
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", color: G.muted, padding: 0,
          }}
        >
          <i className="ti ti-x" style={{ fontSize: "12px" }} aria-hidden="true" />
        </button>

        {/* Header — icon inline with title */}
        <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "1rem" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "9px", backgroundColor: G.green, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <CrossLogo size={18} color="#fff" />
          </div>
          <div>
            <h2 className="display" style={{ fontSize: "0.97rem", fontWeight: 700, color: G.ink, margin: 0, lineHeight: 1.2 }}>
              {mode === "sign-in" ? "Welcome back" : "Join Garmadu"}
            </h2>
            <p style={{ fontSize: "0.72rem", color: G.muted, margin: 0 }}>
              {mode === "sign-in" ? "Sign in to your account" : "Create your account"}
            </p>
          </div>
        </div>

        {/* Google */}
        <button
          onClick={async () => {
            try {
              await signIn?.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/",
              });
            } catch (err: any) {
              setError(err?.errors?.[0]?.message || "Google sign-in failed.");
            }
          }}
          style={{
            width: "100%", padding: "0.6rem", borderRadius: "9px",
            border: `1.5px solid ${G.border}`, backgroundColor: G.white,
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "8px", fontSize: "0.82rem", fontWeight: 600,
            color: G.ink, fontFamily: "inherit", cursor: "pointer",
            marginBottom: "0.85rem",
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.85rem" }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: G.border }} />
          <span style={{ fontSize: "0.68rem", color: G.muted, fontWeight: 500 }}>or</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: G.border }} />
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "0.85rem" }}>
          {mode === "sign-up" && (
            <div>
              <label style={labelStyle}>Full name</label>
              <input
                type="text" placeholder="Your name" value={name}
                onChange={e => setName(e.target.value)}
                onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
                style={getInputStyle("name")}
              />
            </div>
          )}
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email" placeholder="you@email.com" value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
              style={getInputStyle("email")}
            />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password" placeholder="••••••••" value={password}
              onChange={e => setPassword(e.target.value)}
              onFocus={() => setFocusedField("password")} onBlur={() => setFocusedField(null)}
              onKeyDown={e => e.key === "Enter" && handleSubmit()}
              style={getInputStyle("password")}
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "7px", padding: "0.5rem 0.7rem", fontSize: "0.75rem", color: "#DC2626", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "5px" }}>
            <i className="ti ti-alert-circle" style={{ fontSize: "12px", flexShrink: 0 }} />
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%", padding: "0.68rem", borderRadius: "9px",
            backgroundColor: loading ? G.greenMid : G.green, color: "#fff",
            border: "none", fontWeight: 700, fontSize: "0.84rem",
            fontFamily: "inherit", cursor: loading ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: "7px", opacity: loading ? 0.8 : 1,
          }}
        >
          {loading ? (
            <><i className="ti ti-loader-2" style={{ fontSize: "14px", animation: "spin 0.8s linear infinite" }} />{mode === "sign-in" ? "Signing in…" : "Creating account…"}</>
          ) : (
            mode === "sign-in" ? "Sign in" : "Create account"
          )}
        </button>

        {/* Toggle */}
        <p style={{ textAlign: "center", fontSize: "0.76rem", color: G.muted, margin: "0.85rem 0 0" }}>
          {mode === "sign-in" ? "New here? " : "Already have an account? "}
          <button onClick={switchMode} style={{ color: G.green, fontWeight: 600, background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: "0.76rem", padding: 0 }}>
            {mode === "sign-in" ? "Create account" : "Sign in"}
          </button>
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}