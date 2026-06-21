// ============================================================
// components/Navigation.tsx
// ============================================================
import { useEffect, useState } from "react";
import { NAV_LINKS, G } from "@/constants/data";
import { CrossLogo } from "./ui/Primitives";
import { User } from "../constants/types";

interface NavigationProps {
  page: string;
  setPage: (page: string) => void;
  user: User | null;
  setLoginOpen: (open: boolean) => void;
  handleLogout: () => void;
  notifOpen: boolean;
  setNotifOpen: (open: boolean) => void;
  unreadCount: number;
  notificationPanel: React.ReactNode;
}

export function Navigation({
  page,
  setPage,
  user,
  setLoginOpen,
  handleLogout,
  notifOpen,
  setNotifOpen,
  unreadCount,
  notificationPanel,
}: NavigationProps) {
  const [navScrolled, setNavScrolled] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "rgba(255,255,255,0.97)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${navScrolled ? G.border : "transparent"}`,
        boxShadow: navScrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "none",
        transition: "all 0.25s",
      }}
    >
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          padding: "0 1.25rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="header-inner"
      >
        {/* Logo */}
        <button
          onClick={() => {
            setPage("home");
            setMobileNavOpen(false);
          }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              backgroundColor: G.green,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CrossLogo size={20} color="#fff" />
          </div>
          <div>
            <p
              style={{
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: "0.95rem",
                fontWeight: 700,
                color: G.ink,
                margin: 0,
                lineHeight: 1.2,
              }}
            >
              Garmadu
            </p>
            <p
              style={{
                fontSize: "0.5rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: G.green,
                fontWeight: 700,
                margin: 0,
              }}
            >
              Church · Est. 1984
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              className="nav-link"
              onClick={() => {
                if (l === "Blog") setPage("blog");
                else if (l === "Admin" && user?.role === "admin") setPage("admin");
                else setPage("home");
              }}
              style={{
                fontSize: "0.8rem",
                color:
                  (l === "Blog" && page === "blog") ||
                  (l === "Home" && page === "home") ||
                  (l === "Admin" && page === "admin")
                    ? G.green
                    : G.muted,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight:
                  (l === "Blog" && page === "blog") ||
                  (l === "Home" && page === "home") ||
                  (l === "Admin" && page === "admin")
                    ? 700
                    : 500,
                padding: 0,
                transition: "color 0.15s",
              }}
            >
              {l}
            </button>
          ))}
        </nav>

        {/* Right Section: Notification + Auth */}
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          {/* Notification Bell */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setNotifOpen((o) => !o)}
              aria-label="Notifications"
              style={{
                position: "relative",
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                border: `1px solid ${G.border}`,
                backgroundColor: G.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: G.muted,
                transition: "all 0.15s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = G.green;
                e.currentTarget.style.color = G.green;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = G.border;
                e.currentTarget.style.color = G.muted;
              }}
            >
              <i className="ti ti-bell" style={{ fontSize: "18px" }} aria-hidden="true" />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-4px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: G.red,
                    color: "#fff",
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #fff",
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </button>
            {/* Render Notification Panel */}
            {notifOpen && notificationPanel}
          </div>

          {/* Auth Section - Desktop */}
          <div className="hide-on-mobile" style={{ display: "flex", gap: "0.65rem", alignItems: "center" }}>
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                {user.role === "admin" && (
                  <button
                    onClick={() => setPage("admin")}
                    className="btn-outline"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      border: `1px solid ${G.border}`,
                      color: G.ink,
                      padding: "0.46rem 1rem",
                      borderRadius: "8px",
                      fontSize: "0.76rem",
                      fontWeight: 600,
                      background: "transparent",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    <i className="ti ti-layout-dashboard" style={{ fontSize: "13px" }} aria-hidden="true" /> Admin
                  </button>
                )}
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
                  <div
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      backgroundColor: G.green,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      color: "#fff",
                    }}
                  >
                    {user.avatar}
                  </div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 600, color: G.greenText }}>
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  style={{
                    fontSize: "0.76rem",
                    color: G.muted,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontWeight: 500,
                  }}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => setLoginOpen(true)}
                  className="btn-outline"
                  style={{
                    border: `1px solid ${G.border}`,
                    color: G.ink,
                    padding: "0.5rem 1.1rem",
                    borderRadius: "8px",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    background: "transparent",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setLoginOpen(true)}
                  className="btn-green"
                  style={{
                    backgroundColor: G.green,
                    color: "#fff",
                    padding: "0.5rem 1.2rem",
                    borderRadius: "8px",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Plan a Visit
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setMobileNavOpen((o) => !o)}
            aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
            style={{
              display: "flex",
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              border: `1px solid ${G.border}`,
              backgroundColor: G.white,
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: G.ink,
              flexShrink: 0,
            }}
          >
            <i
              className={`ti ${mobileNavOpen ? "ti-x" : "ti-menu-2"}`}
              style={{ fontSize: "18px" }}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      {mobileNavOpen && (
        <div
          className="mobile-nav-panel open slide-down"
          style={{
            flexDirection: "column",
            backgroundColor: G.white,
            borderTop: `1px solid ${G.border}`,
            padding: "1rem 1.25rem 1.5rem",
            boxShadow: "0 12px 24px rgba(0,0,0,0.06)",
          }}
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l}
              onClick={() => {
                if (l === "Blog") {
                  setPage("blog");
                } else if (l === "Admin" && user?.role === "admin") {
                  setPage("admin");
                } else {
                  setPage("home");
                }
                setMobileNavOpen(false);
              }}
              style={{
                textAlign: "left",
                padding: "0.7rem 0.25rem",
                fontSize: "0.92rem",
                color:
                  (l === "Blog" && page === "blog") ||
                  (l === "Home" && page === "home") ||
                  (l === "Admin" && page === "admin")
                    ? G.green
                    : G.body,
                background: "none",
                border: "none",
                borderBottom: `1px solid ${G.borderLight}`,
                cursor: "pointer",
                fontFamily: "inherit",
                fontWeight:
                  (l === "Blog" && page === "blog") ||
                  (l === "Home" && page === "home") ||
                  (l === "Admin" && page === "admin")
                    ? 700
                    : 500,
              }}
            >
              {l}
            </button>
          ))}

          <div style={{ marginTop: "1rem" }}>
            {user ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: G.greenLight,
                    border: `1px solid ${G.greenBorder}`,
                    borderRadius: "12px",
                    padding: "0.65rem 0.85rem",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: G.green,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.75rem",
                      color: "#fff",
                    }}
                  >
                    {user.avatar}
                  </div>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600, color: G.greenText }}>
                    {user.name}
                  </span>
                </div>
                {user.role === "admin" && (
                  <button
                    onClick={() => {
                      setPage("admin");
                      setMobileNavOpen(false);
                    }}
                    className="btn-outline"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      border: `1px solid ${G.border}`,
                      color: G.ink,
                      padding: "0.7rem",
                      borderRadius: "9px",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      background: "transparent",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    <i className="ti ti-layout-dashboard" style={{ fontSize: "14px" }} aria-hidden="true" /> Admin Dashboard
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  style={{
                    fontSize: "0.85rem",
                    color: G.muted,
                    background: "none",
                    border: `1px solid ${G.border}`,
                    borderRadius: "9px",
                    padding: "0.7rem",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontWeight: 500,
                  }}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                <button
                  onClick={() => {
                    setLoginOpen(true);
                    setMobileNavOpen(false);
                  }}
                  className="btn-outline"
                  style={{
                    border: `1px solid ${G.border}`,
                    color: G.ink,
                    padding: "0.75rem",
                    borderRadius: "9px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    background: "transparent",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setLoginOpen(true);
                    setMobileNavOpen(false);
                  }}
                  className="btn-green"
                  style={{
                    backgroundColor: G.green,
                    color: "#fff",
                    padding: "0.75rem",
                    borderRadius: "9px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Plan a Visit
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}