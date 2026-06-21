// ============================================================
// components/Notifications.tsx
// ============================================================
import { useState } from "react";
import { G } from "@/constants/data";
import { Chevron, Badge, ModalShell } from "./ui/Primitives";

// ============================================================
// NotifPanel Component
// ============================================================
interface NotifPanelProps {
  notifications: any[];
  setNotifications: (n: any[]) => void;
  setExpandedNotifId: (id: number | null) => void;
  expandedNotifId: number | null;
  openNotifDetail: (n: any) => void;
  unreadCount: number;
  notifCollapsed: boolean;
  setNotifCollapsed: (collapsed: boolean) => void;
}

export function NotifPanel({
  notifications,
  setNotifications,
  setExpandedNotifId,
  expandedNotifId,
  openNotifDetail,
  unreadCount,
  notifCollapsed,
  setNotifCollapsed,
}: NotifPanelProps) {
  const markAllRead = () => setNotifications((n) => n.map((x) => ({ ...x, unread: false })));

  return (
    <div
      className="slide-down"
      style={{
        position: "absolute",
        top: "calc(100% + 10px)",
        right: 0,
        width: "380px",
        backgroundColor: G.white,
        borderRadius: "16px",
        border: `1px solid ${G.border}`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
        zIndex: 200,
        overflow: "hidden",
      }}
    >
      {/* Panel header */}
      <div
        style={{
          padding: "1rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: notifCollapsed ? "none" : `1px solid ${G.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "0.9rem", fontWeight: 700, color: G.ink }}>Notifications</span>
          {unreadCount > 0 && (
            <Badge color={G.green} bg={G.greenLight}>
              {unreadCount} new
            </Badge>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {!notifCollapsed && (
            <button
              onClick={markAllRead}
              style={{
                fontSize: "0.72rem",
                color: G.green,
                fontWeight: 600,
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              Mark all read
            </button>
          )}
          <button
            onClick={() => setNotifCollapsed(!notifCollapsed)}
            className="icon-btn"
            aria-label={notifCollapsed ? "Expand notifications" : "Collapse notifications"}
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "7px",
              border: `1px solid ${G.border}`,
              background: G.white,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Chevron open={!notifCollapsed} size={12} />
          </button>
        </div>
      </div>

      {/* List of notifications */}
      {!notifCollapsed && (
        <div style={{ maxHeight: "440px", overflowY: "auto" }}>
          {notifications.map((n) => {
            const isExpanded = expandedNotifId === n.id;
            return (
              <div
                key={n.id}
                className="notif-row"
                style={{
                  borderBottom: `1px solid ${G.borderLight}`,
                  backgroundColor: n.unread ? "rgba(22,163,74,0.03)" : G.white,
                }}
              >
                <div
                  style={{
                    padding: "0.9rem 1.25rem",
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      backgroundColor: n.color + "15",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i className={`ti ${n.icon}`} style={{ fontSize: "16px", color: n.color }} aria-hidden="true" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.82rem", color: G.body, margin: "0 0 3px", lineHeight: "1.5" }}>
                      {n.text}
                    </p>
                    <p style={{ fontSize: "0.7rem", color: G.hint, margin: 0 }}>{n.time}</p>
                  </div>
                  {n.unread && (
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: G.green,
                        flexShrink: 0,
                        marginTop: "4px",
                      }}
                    />
                  )}
                  <button
                    onClick={() => {
                      setExpandedNotifId(isExpanded ? null : n.id);
                      if (n.unread) {
                        setNotifications((prev: any[]) =>
                          prev.map((x) => (x.id === n.id ? { ...x, unread: false } : x))
                        );
                      }
                    }}
                    aria-label={isExpanded ? "Collapse" : "Show preview"}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "2px",
                      flexShrink: 0,
                    }}
                  >
                    <Chevron open={isExpanded} />
                  </button>
                </div>

                {isExpanded && (
                  <div className="expand-in" style={{ padding: "0 1.25rem 1rem 4.6rem" }}>
                    <p style={{ fontSize: "0.78rem", color: G.muted, lineHeight: "1.7", margin: "0 0 0.65rem" }}>
                      {n.detail.body.substring(0, 120)}…
                    </p>
                    <button
                      onClick={() => openNotifDetail(n)}
                      style={{
                        fontSize: "0.76rem",
                        color: G.green,
                        fontWeight: 700,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      Read details <i className="ti ti-arrow-right" style={{ fontSize: "11px" }} aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================
// NotifDetailModal Component - EXPORTED FROM SAME FILE
// ============================================================
interface NotifDetailModalProps {
  notif: any;
  onClose: () => void;
  showToast: (msg: string, type?: "success" | "info" | "error") => void;
}

export function NotifDetailModal({ notif, onClose, showToast }: NotifDetailModalProps) {
  if (!notif) return null;
  const { detail } = notif;

  return (
    <ModalShell onClose={onClose} maxWidth="560px">
      <div style={{ padding: "0.5rem 2rem 2.25rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.25rem" }}>
          <div
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "12px",
              backgroundColor: notif.color + "15",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <i className={`ti ${notif.icon}`} style={{ fontSize: "20px", color: notif.color }} aria-hidden="true" />
          </div>
          <div>
            <h3
              className="display"
              style={{ fontSize: "1.2rem", fontWeight: 700, color: G.ink, margin: "0 0 3px" }}
            >
              {detail.title}
            </h3>
            <p style={{ fontSize: "0.76rem", color: G.muted, margin: 0 }}>{detail.when}</p>
          </div>
        </div>
        <p style={{ fontSize: "0.9rem", lineHeight: "1.9", color: G.body, margin: "0 0 1.75rem" }}>
          {detail.body}
        </p>
        <div style={{ display: "flex", gap: "0.65rem" }}>
          <button
            className="btn-green"
            onClick={() => {
              showToast(`${detail.action} — done!`);
              onClose();
            }}
            style={{
              backgroundColor: G.green,
              color: "#fff",
              border: "none",
              borderRadius: "9px",
              padding: "0.72rem 1.5rem",
              fontSize: "0.84rem",
              fontWeight: 700,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            {detail.action}
          </button>
          <button
            className="btn-outline"
            onClick={onClose}
            style={{
              border: `1px solid ${G.border}`,
              backgroundColor: "transparent",
              color: G.muted,
              borderRadius: "9px",
              padding: "0.72rem 1.5rem",
              fontSize: "0.84rem",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Dismiss
          </button>
        </div>
      </div>
    </ModalShell>
  );
}