// ============================================================
// pages/AdminPage.tsx
// ============================================================
import { useState } from "react";
import { G, TODAY_SCHEDULE } from "../constants/data";
import { Badge, Chevron } from "../components/ui/Primitives";

interface AdminPageProps {
  pendingPosts: any[];
  approveBlog: (id: number) => void;
  rejectBlog: (id: number) => void;
  notifications: any[];
  expandedNotifId: number | null;
  setExpandedNotifId: (id: number | null) => void;
  openNotifDetail: (n: any) => void;
  unreadCount: number;
}

export function AdminPage({
  pendingPosts,
  approveBlog,
  rejectBlog,
  notifications,
  expandedNotifId,
  setExpandedNotifId,
  openNotifDetail,
  unreadCount,
}: AdminPageProps) {
  const [adminTab, setAdminTab] = useState("dashboard");

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2.5rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <p className="tag" style={{ margin: "0 0 0.5rem" }}>
          Admin Panel
        </p>
        <h2
          className="display"
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: G.ink,
            margin: "0 0 0.5rem",
          }}
        >
          Church Dashboard
        </h2>
        <p style={{ fontSize: "0.88rem", color: G.muted }}>
          Manage everything about Garmadu Church from one place.
        </p>
      </div>
      <div style={{ display: "flex", gap: "0.6rem", marginBottom: "2rem", flexWrap: "wrap" }}>
        {[
          ["dashboard", "ti-layout-dashboard", "Overview"],
          ["blog", "ti-pencil", "Blog Approvals"],
          ["notifications", "ti-bell", "Notifications"],
          ["programs", "ti-calendar", "Programs"],
          ["members", "ti-users", "Members"],
        ].map(([tab, icon, label]) => (
          <button
            key={tab}
            className={`tab-btn${adminTab === tab ? " active" : ""}`}
            onClick={() => setAdminTab(tab)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <i className={`ti ${icon}`} style={{ fontSize: "14px" }} aria-hidden="true" />
            {label}
            {tab === "blog" && pendingPosts.length > 0 && (
              <span
                style={{
                  backgroundColor: G.red,
                  color: "#fff",
                  fontSize: "0.6rem",
                  fontWeight: 700,
                  padding: "1px 6px",
                  borderRadius: "100px",
                }}
              >
                {pendingPosts.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {adminTab === "dashboard" && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "2rem" }}>
            {[
              ["1,247", "Total Members", "ti-users", G.green],
              ["67", "Blog Posts", "ti-pencil", G.purple],
              [pendingPosts.length, "Pending Approvals", "ti-clock", G.gold],
              [unreadCount, "Unread Alerts", "ti-bell", G.red],
            ].map(([val, label, icon, color]) => (
              <div
                key={label}
                style={{
                  backgroundColor: G.white,
                  border: `1px solid ${G.border}`,
                  borderRadius: "14px",
                  padding: "1.5rem",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.75rem",
                  }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      backgroundColor: color + "18",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <i className={`ti ${icon}`} style={{ fontSize: "18px", color }} aria-hidden="true" />
                  </div>
                  <span
                    style={{
                      fontSize: "0.62rem",
                      color: G.green,
                      fontWeight: 700,
                      backgroundColor: G.greenLight,
                      padding: "2px 8px",
                      borderRadius: "100px",
                    }}
                  >
                    +3%
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "1.9rem",
                    fontWeight: 700,
                    color: G.ink,
                    margin: "0 0 3px",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {val}
                </p>
                <p style={{ fontSize: "0.75rem", color: G.muted, margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <div
              style={{
                backgroundColor: G.white,
                border: `1px solid ${G.border}`,
                borderRadius: "14px",
                padding: "1.5rem",
              }}
            >
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: G.ink, margin: "0 0 1rem" }}>
                Pending Blog Posts
              </h3>
              {pendingPosts.length === 0 ? (
                <p style={{ fontSize: "0.82rem", color: G.muted }}>No pending posts.</p>
              ) : (
                pendingPosts.map((p: any) => (
                  <div
                    key={p.id}
                    style={{
                      backgroundColor: G.surface,
                      borderRadius: "10px",
                      padding: "1rem",
                      marginBottom: "0.75rem",
                      border: `1px solid ${G.border}`,
                    }}
                  >
                    <p style={{ fontSize: "0.84rem", fontWeight: 700, color: G.ink, margin: "0 0 4px" }}>
                      {p.title}
                    </p>
                    <p style={{ fontSize: "0.74rem", color: G.muted, margin: "0 0 10px" }}>
                      by {p.author} · {p.category}
                    </p>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => approveBlog(p.id)}
                        style={{
                          flex: 1,
                          backgroundColor: G.green,
                          color: "#fff",
                          border: "none",
                          borderRadius: "7px",
                          padding: "0.5rem",
                          fontSize: "0.76rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                        }}
                      >
                        <i className="ti ti-check" style={{ fontSize: "13px" }} aria-hidden="true" /> Approve
                      </button>
                      <button
                        onClick={() => rejectBlog(p.id)}
                        style={{
                          flex: 1,
                          backgroundColor: G.redLight,
                          color: G.red,
                          border: "1px solid #FCA5A5",
                          borderRadius: "7px",
                          padding: "0.5rem",
                          fontSize: "0.76rem",
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "4px",
                        }}
                      >
                        <i className="ti ti-x" style={{ fontSize: "13px" }} aria-hidden="true" /> Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div
              style={{
                backgroundColor: G.white,
                border: `1px solid ${G.border}`,
                borderRadius: "14px",
                padding: "1.5rem",
              }}
            >
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: G.ink, margin: "0 0 1rem" }}>
                Today's Schedule
              </h3>
              {TODAY_SCHEDULE.slice(0, 4).map((s) => (
                <div
                  key={s.title}
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    marginBottom: "0.75rem",
                    padding: "0.65rem",
                    borderRadius: "8px",
                    backgroundColor: G.surface,
                    border: `1px solid ${G.border}`,
                  }}
                >
                  <div style={{ minWidth: "60px" }}>
                    <p style={{ fontSize: "0.7rem", fontWeight: 700, color: G.green, margin: 0 }}>
                      {s.time}
                    </p>
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.8rem", fontWeight: 600, color: G.ink, margin: "0 0 2px" }}>
                      {s.title}
                    </p>
                    <p style={{ fontSize: "0.7rem", color: G.muted, margin: 0 }}>{s.loc}</p>
                  </div>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      color: s.badgeColor,
                      backgroundColor: s.badgeColor + "18",
                      padding: "2px 8px",
                      borderRadius: "100px",
                      border: `1px solid ${s.badgeColor}33`,
                    }}
                  >
                    {s.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {adminTab === "blog" && (
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: G.ink, margin: "0 0 1.25rem" }}>
            Blog Post Approvals
          </h3>
          {pendingPosts.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem",
                backgroundColor: G.surface,
                borderRadius: "14px",
                border: `1px solid ${G.border}`,
              }}
            >
              <i
                className="ti ti-check-circle"
                style={{ fontSize: "40px", color: G.green, display: "block", marginBottom: "0.75rem" }}
                aria-hidden="true"
              />
              <p style={{ fontSize: "0.9rem", color: G.muted }}>No pending posts. All caught up!</p>
            </div>
          ) : (
            pendingPosts.map((p: any) => (
              <div
                key={p.id}
                style={{
                  backgroundColor: G.white,
                  border: `1px solid ${G.border}`,
                  borderRadius: "14px",
                  padding: "1.5rem",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    alignItems: "flex-start",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      backgroundColor: p.avatarColor + "20",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.82rem",
                      color: p.avatarColor,
                      flexShrink: 0,
                    }}
                  >
                    {p.avatar}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.88rem", fontWeight: 700, color: G.ink, margin: "0 0 2px" }}>
                      {p.title}
                    </p>
                    <p style={{ fontSize: "0.74rem", color: G.muted, margin: 0 }}>
                      by {p.author} ({p.authorRole}) · {p.category} · {p.date}
                    </p>
                  </div>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: G.gold,
                      backgroundColor: G.goldLight,
                      padding: "3px 10px",
                      borderRadius: "100px",
                    }}
                  >
                    Pending Review
                  </span>
                </div>
                <p style={{ fontSize: "0.86rem", lineHeight: "1.8", color: G.body, margin: "0 0 1rem" }}>
                  {p.excerpt}
                </p>
                <div style={{ display: "flex", gap: "0.65rem" }}>
                  <button
                    onClick={() => approveBlog(p.id)}
                    className="btn-green"
                    style={{
                      backgroundColor: G.green,
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      padding: "0.6rem 1.4rem",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <i className="ti ti-check" style={{ fontSize: "13px" }} aria-hidden="true" /> Approve & Publish
                  </button>
                  <button
                    onClick={() => rejectBlog(p.id)}
                    style={{
                      backgroundColor: G.redLight,
                      color: G.red,
                      border: "1px solid #FCA5A5",
                      borderRadius: "8px",
                      padding: "0.6rem 1.4rem",
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <i className="ti ti-trash" style={{ fontSize: "13px" }} aria-hidden="true" /> Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {adminTab === "notifications" && (
        <div>
          <h3 style={{ fontSize: "1rem", fontWeight: 700, color: G.ink, margin: "0 0 1.25rem" }}>
            All Notifications
          </h3>
          {notifications.map((n: any) => {
            const isExpanded = expandedNotifId === n.id;
            return (
              <div
                key={n.id}
                style={{
                  backgroundColor: G.white,
                  border: `1px solid ${n.unread ? G.greenBorder : G.border}`,
                  borderRadius: "12px",
                  padding: "1.1rem 1.25rem",
                  marginBottom: "0.75rem",
                }}
              >
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: n.color + "15",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i className={`ti ${n.icon}`} style={{ fontSize: "18px", color: n.color }} aria-hidden="true" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.86rem", color: G.body, margin: "0 0 2px" }}>
                      {n.text}
                    </p>
                    <p style={{ fontSize: "0.72rem", color: G.hint, margin: 0 }}>{n.time}</p>
                  </div>
                  {n.unread && (
                    <Badge color={G.green} bg={G.greenLight}>
                      New
                    </Badge>
                  )}
                  <button
                    onClick={() => setExpandedNotifId(isExpanded ? null : n.id)}
                    aria-label="Toggle preview"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Chevron open={isExpanded} />
                  </button>
                </div>
                {isExpanded && (
                  <div className="expand-in" style={{ paddingTop: "0.85rem", paddingLeft: "3.25rem" }}>
                    <p style={{ fontSize: "0.8rem", color: G.muted, lineHeight: "1.75", margin: "0 0 0.65rem" }}>
                      {n.detail.body.substring(0, 140)}…
                    </p>
                    <button
                      onClick={() => openNotifDetail(n)}
                      style={{
                        fontSize: "0.78rem",
                        color: G.green,
                        fontWeight: 700,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      Read details →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {adminTab === "members" && (
        <div
          style={{
            backgroundColor: G.white,
            border: `1px solid ${G.border}`,
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: G.surface }}>
                {["Member", "Role", "Status", "Joined"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "0.9rem 1.25rem",
                      textAlign: "left",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      color: G.muted,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      borderBottom: `1px solid ${G.border}`,
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Abena Asante", avatar: "AA", role: "Member", status: "Active", joined: "2018", color: G.purple },
                { name: "Michael Darko", avatar: "MD", role: "Youth Leader", status: "Active", joined: "2015", color: G.blue },
                { name: "Priscilla Ofori", avatar: "PO", role: "Women of Faith", status: "Active", joined: "2020", color: G.gold },
                { name: "Kwame Boateng", avatar: "KB", role: "Deacon", status: "Active", joined: "2010", color: G.green },
                { name: "Grace Mensah", avatar: "GM", role: "Associate Pastor", status: "Staff", joined: "2013", color: G.purple },
              ].map((m) => (
                <tr
                  key={m.name}
                  style={{
                    borderBottom: `1px solid ${G.borderLight}`,
                    transition: "background 0.12s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = G.surface)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td style={{ padding: "0.9rem 1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          backgroundColor: m.color + "20",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "0.76rem",
                          color: m.color,
                        }}
                      >
                        {m.avatar}
                      </div>
                      <span style={{ fontSize: "0.86rem", fontWeight: 600, color: G.ink }}>{m.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: "0.9rem 1.25rem", fontSize: "0.83rem", color: G.body }}>
                    {m.role}
                  </td>
                  <td style={{ padding: "0.9rem 1.25rem" }}>
                    <span
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        color: m.status === "Staff" ? G.purple : G.green,
                        backgroundColor: m.status === "Staff" ? G.purpleLight : G.greenLight,
                        padding: "3px 10px",
                        borderRadius: "100px",
                      }}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td style={{ padding: "0.9rem 1.25rem", fontSize: "0.83rem", color: G.muted }}>
                    {m.joined}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}