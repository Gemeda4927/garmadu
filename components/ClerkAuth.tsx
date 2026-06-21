// ============================================================
// components/ClerkAuth.tsx
// ============================================================
import { SignIn, SignUp, UserButton, useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { G } from "@/constants/data";

interface ClerkAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "sign-in" | "sign-up";
}

export function ClerkAuthModal({ isOpen, onClose, mode = "sign-in" }: ClerkAuthModalProps) {
  if (!isOpen) return null;

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
          width: "100%",
          maxWidth: "480px",
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.2)",
          border: `1px solid ${G.border}`,
          padding: "2rem",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
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

        <h2
          className="display"
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: G.ink,
            margin: "0 0 0.5rem",
            textAlign: "center",
          }}
        >
          {mode === "sign-in" ? "Welcome Back" : "Create Account"}
        </h2>
        <p
          style={{
            fontSize: "0.9rem",
            color: G.muted,
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          {mode === "sign-in"
            ? "Sign in to your Garmadu Church account"
            : "Join the Garmadu Church community"}
        </p>

        {mode === "sign-in" ? (
          <SignIn
            routing="hash"
            afterSignInUrl="/"
            signUpUrl="/sign-up"
            appearance={{
              elements: {
                rootBox: {
                  width: "100%",
                },
                card: {
                  boxShadow: "none",
                  padding: 0,
                  width: "100%",
                },
                header: {
                  display: "none",
                },
                footer: {
                  display: "none",
                },
                formButtonPrimary: {
                  backgroundColor: G.green,
                  "&:hover": {
                    backgroundColor: G.greenDark,
                  },
                },
              },
            }}
          />
        ) : (
          <SignUp
            routing="hash"
            afterSignUpUrl="/"
            signInUrl="/sign-in"
            appearance={{
              elements: {
                rootBox: {
                  width: "100%",
                },
                card: {
                  boxShadow: "none",
                  padding: 0,
                  width: "100%",
                },
                header: {
                  display: "none",
                },
                footer: {
                  display: "none",
                },
                formButtonPrimary: {
                  backgroundColor: G.green,
                  "&:hover": {
                    backgroundColor: G.greenDark,
                  },
                },
              },
            }}
          />
        )}

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <button
            onClick={() => {
              // Toggle between sign-in and sign-up
              if (mode === "sign-in") {
                // You can add logic to switch to sign-up
              }
              onClose();
            }}
            style={{
              fontSize: "0.85rem",
              color: G.muted,
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {mode === "sign-in" ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}

// User profile button component
export function ClerkUserButton() {
  const { user, isSignedIn } = useUser();

  if (!isSignedIn) return null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor: G.greenLight,
        border: `1px solid ${G.greenBorder}`,
        borderRadius: "100px",
        padding: "5px 12px 5px 5px",
      }}
    >
      <UserButton
        afterSignOutUrl="/"
        appearance={{
          elements: {
            userButtonAvatarBox: {
              width: "28px",
              height: "28px",
            },
          },
        }}
      />
      <span style={{ fontSize: "0.78rem", fontWeight: 600, color: G.greenText }}>
        {user?.fullName || user?.username || "User"}
      </span>
    </div>
  );
}