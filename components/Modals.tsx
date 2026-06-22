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
// AuthModal (exported as LoginModal) - Sign in + Create account
// Sharper, more intentional visual identity:
//   - gradient top edge as a signature stripe
//   - sliding tab indicator between "Sign in" / "Create account"
//   - real icon mark with soft halo instead of a flat square
//   - per-field inline validation, not one generic error
// ============================================================
interface AuthModalProps {
  onClose: () => void;
  onLogin: (user: User) => void;
}

type AuthMode = "signin" | "signup";

const inputStyle = {
  width: "100%",
  padding: "0.62rem 0.85rem",
  borderRadius: "9px",
  border: `1.5px solid ${G.border}`,
  fontSize: "0.83rem",
  fontFamily: "inherit",
  color: G.ink,
  backgroundColor: G.white,
  outline: "none",
  boxSizing: "border-box" as const,
  transition: "border-color 0.15s, box-shadow 0.15s",
};

const labelStyle = {
  display: "block",
  fontSize: "0.74rem",
  fontWeight: 600,
  color: G.ink,
  marginBottom: "4px",
  letterSpacing: "0.02em",
};

const errorTextStyle = {
  fontSize: "0.68rem",
  color: "#DC2626",
  margin: "4px 0 0",
  display: "flex",
  alignItems: "center",
  gap: "4px",
};

function AuthField({
  label,
  field,
  type,
  placeholder,
  value,
  onChange,
  error,
  focusedField,
  setFocusedField,
  onKeyDown,
}: {
  label: string;
  field: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  focusedField: string | null;
  setFocusedField: (f: string | null) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}) {
  const focused = focusedField === field;
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocusedField(field)}
        onBlur={() => setFocusedField(null)}
        onKeyDown={onKeyDown}
        style={{
          ...inputStyle,
          borderColor: error ? "#DC2626" : focused ? G.green : G.border,
          boxShadow: focused ? `0 0 0 3px ${G.greenLight}` : "none",
        }}
      />
      {error && (
        <p style={errorTextStyle}>
          <i className="ti ti-alert-circle" style={{ fontSize: "11px" }} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export function AuthModal({ onClose, onLogin }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const switchMode = (next: AuthMode) => {
    if (next === mode) return;
    setMode(next);
    setFormError("");
    setFieldErrors({});
  };

  const validateSignIn = () => {
    const errs: Record<string, string> = {};
    if (!email) errs.email = "Enter your email.";
    if (!password) errs.password = "Enter your password.";
    return errs;
  };

  const validateSignUp = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Enter your full name.";
    if (!email) errs.email = "Enter your email.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "Enter a valid email.";
    if (!password) errs.password = "Choose a password.";
    else if (password.length < 6) errs.password = "Use at least 6 characters.";
    if (!confirmPassword) errs.confirmPassword = "Confirm your password.";
    else if (confirmPassword !== password) errs.confirmPassword = "Passwords don't match.";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = mode === "signin" ? validateSignIn() : validateSignUp();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setFormError("");
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    if (mode === "signin") {
      if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        onLogin({ name: "Admin", role: "admin", avatar: "AD" });
      } else if (email === MEMBER_CREDENTIALS.email && password === MEMBER_CREDENTIALS.password) {
        onLogin({ name: "Abena Asante", role: "member", avatar: "AA" });
      } else {
        setFormError("Invalid credentials. Try admin@garmadu.org / admin123");
        setLoading(false);
        return;
      }
    } else {
      // Demo create-account: build a member-style account from the form.
      const initials = name
        .trim()
        .split(/\s+/)
        .map(p => p[0]?.toUpperCase())
        .slice(0, 2)
        .join("") || "NW";
      onLogin({ name: name.trim(), role: "member", avatar: initials });
    }
    setLoading(false);
  };

  const update = (field: string, setter: (v: string) => void) => (v: string) => {
    setter(v);
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

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
          borderRadius: "18px",
          width: "100%",
          maxWidth: "380px",
          boxShadow: "0 28px 72px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Signature gradient stripe */}
        <div
          style={{
            height: "5px",
            width: "100%",
            background: `linear-gradient(90deg, ${G.green}, ${G.greenMid}, ${G.green})`,
          }}
        />

        <div style={{ padding: "1.5rem 1.6rem 1.4rem" }}>
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "1.1rem",
              right: "1.1rem",
              width: "26px",
              height: "26px",
              borderRadius: "7px",
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

          {/* Header with halo icon mark */}
          <div style={{ display: "flex", alignItems: "center", gap: "11px", marginBottom: "1.2rem" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: `linear-gradient(155deg, ${G.green}, ${G.greenText})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: `0 6px 16px -4px ${G.green}99`,
              }}
            >
              <CrossLogo size={20} color="#fff" />
            </div>
            <div>
              <h2 className="display" style={{ fontSize: "1.02rem", fontWeight: 700, color: G.ink, margin: 0, lineHeight: 1.2 }}>
                {mode === "signin" ? "Welcome back" : "Join Garmadu Church"}
              </h2>
              <p style={{ fontSize: "0.74rem", color: G.muted, margin: "2px 0 0" }}>
                {mode === "signin" ? "Sign in to your account" : "Create your member account"}
              </p>
            </div>
          </div>

          {/* Sliding tabs */}
          <div
            style={{
              position: "relative",
              display: "flex",
              backgroundColor: G.surface,
              borderRadius: "10px",
              padding: "3px",
              marginBottom: "1.2rem",
              border: `1px solid ${G.border}`,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "3px",
                left: mode === "signin" ? "3px" : "calc(50% + 0px)",
                width: "calc(50% - 3px)",
                height: "calc(100% - 6px)",
                backgroundColor: G.white,
                borderRadius: "8px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                transition: "left 0.22s cubic-bezier(0.4,0,0.2,1)",
              }}
            />
            {(["signin", "signup"] as AuthMode[]).map(m => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                style={{
                  position: "relative",
                  flex: 1,
                  zIndex: 1,
                  padding: "0.5rem 0",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  color: mode === m ? G.greenText : G.muted,
                  transition: "color 0.2s",
                }}
              >
                {m === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", marginBottom: "0.9rem" }}>
            {mode === "signup" && (
              <AuthField
                label="Full name"
                field="name"
                type="text"
                placeholder="Kwame Mensah"
                value={name}
                onChange={update("name", setName)}
                error={fieldErrors.name}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />
            )}
            <AuthField
              label="Email"
              field="email"
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={update("email", setEmail)}
              error={fieldErrors.email}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
            />
            <AuthField
              label="Password"
              field="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={update("password", setPassword)}
              error={fieldErrors.password}
              focusedField={focusedField}
              setFocusedField={setFocusedField}
              onKeyDown={e => mode === "signin" && e.key === "Enter" && handleSubmit()}
            />
            {mode === "signup" && (
              <AuthField
                label="Confirm password"
                field="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={update("confirmPassword", setConfirmPassword)}
                error={fieldErrors.confirmPassword}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                onKeyDown={e => e.key === "Enter" && handleSubmit()}
              />
            )}
          </div>

          {/* Form-level error */}
          {formError && (
            <div
              style={{
                backgroundColor: "#FEF2F2",
                border: "1px solid #FECACA",
                borderRadius: "8px",
                padding: "0.55rem 0.7rem",
                fontSize: "0.75rem",
                color: "#DC2626",
                marginBottom: "0.8rem",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <i className="ti ti-alert-circle" style={{ fontSize: "12px", flexShrink: 0 }} aria-hidden="true" />
              {formError}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.7rem",
              borderRadius: "10px",
              background: loading ? G.greenMid : `linear-gradient(155deg, ${G.green}, ${G.greenText})`,
              color: "#fff",
              border: "none",
              fontWeight: 700,
              fontSize: "0.85rem",
              fontFamily: "inherit",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "7px",
              opacity: loading ? 0.85 : 1,
              boxShadow: loading ? "none" : `0 8px 20px -6px ${G.green}aa`,
              transition: "transform 0.1s, box-shadow 0.15s",
            }}
            onMouseDown={e => { if (!loading) e.currentTarget.style.transform = "scale(0.98)"; }}
            onMouseUp={e => { e.currentTarget.style.transform = "scale(1)"; }}
          >
            {loading ? (
              <>
                <i className="ti ti-loader-2" style={{ fontSize: "14px", animation: "spin 0.8s linear infinite" }} aria-hidden="true" />
                {mode === "signin" ? "Signing in…" : "Creating account…"}
              </>
            ) : mode === "signin" ? (
              "Sign in"
            ) : (
              "Create account"
            )}
          </button>

          {/* Switch-mode hint */}
          <p style={{ fontSize: "0.74rem", color: G.muted, textAlign: "center", margin: "0.85rem 0 0" }}>
            {mode === "signin" ? (
              <>
                New here?{" "}
                <span
                  onClick={() => switchMode("signup")}
                  style={{ color: G.greenText, fontWeight: 700, cursor: "pointer" }}
                >
                  Create an account
                </span>
              </>
            ) : (
              <>
                Already a member?{" "}
                <span
                  onClick={() => switchMode("signin")}
                  style={{ color: G.greenText, fontWeight: 700, cursor: "pointer" }}
                >
                  Sign in
                </span>
              </>
            )}
          </p>

          {/* Demo Credentials (sign-in only) */}
          {mode === "signin" && (
            <div
              style={{
                marginTop: "1rem",
                padding: "0.75rem",
                backgroundColor: G.surface,
                borderRadius: "9px",
                border: `1px solid ${G.border}`,
              }}
            >
              <p style={{ fontSize: "0.65rem", color: G.muted, margin: "0 0 4px", textAlign: "center", fontWeight: 600 }}>
                Demo accounts
              </p>
              <p style={{ fontSize: "0.6rem", color: G.muted, margin: "0 0 2px", textAlign: "center" }}>
                Admin: admin@garmadu.org / admin123
              </p>
              <p style={{ fontSize: "0.6rem", color: G.muted, margin: 0, textAlign: "center" }}>
                Member: member@garmadu.org / member123
              </p>
            </div>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

// `page.tsx` imports `LoginModal` — keep that name working as an alias
// for the new AuthModal so no other files need to change.
export const LoginModal = AuthModal;