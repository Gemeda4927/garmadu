"use client";

import { useState } from "react";

// ── Design tokens ────────────────────────────────────────────────────────────
const G = {
  green:       "#16A34A",
  greenDark:   "#15803D",
  greenMid:    "#22C55E",
  greenLight:  "#F0FDF4",
  greenBorder: "#BBF7D0",
  greenText:   "#166534",
  gold:        "#D97706",
  goldLight:   "#FFFBEB",
  blue:        "#2563EB",
  blueLight:   "#EFF6FF",
  red:         "#DC2626",
  redLight:    "#FEF2F2",
  amber:       "#F59E0B",
  amberLight:  "#FFFBEB",
  ink:         "#1E293B",
  body:        "#475569",
  muted:       "#94A3B8",
  hint:        "#CBD5E1",
  border:      "#E2E8F0",
  borderLight: "#F1F5F9",
  surface:     "#F8FAFC",
  white:       "#FFFFFF",
  sidebar:     "#FAFBFC",
};

// ── Types ────────────────────────────────────────────────────────────────────
type Section = "dashboard" | "blog" | "events" | "programs" | "prayers" | "team" | "users";

interface BlogPost {
  id: number; title: string; author: string; category: string;
  status: "published" | "draft"; date: string; reads: number;
}
interface Event {
  id: number; title: string; date: string; location: string;
  type: string; registered: number; capacity: number;
}
interface Program {
  id: number; title: string; leader: string; schedule: string;
  members: number; status: "active" | "inactive";
}
interface Prayer {
  id: number; name: string; category: string; text: string;
  time: string; likes: number; flagged: boolean;
}
interface TeamMember {
  id: number; name: string; role: string; years: number;
  email: string; status: "active" | "inactive";
}
interface User {
  id: number; name: string; email: string; role: "member" | "admin" | "leader";
  joined: string; active: boolean;
}

// ── Seed data ────────────────────────────────────────────────────────────────
const BLOG_DATA: BlogPost[] = [
  { id: 1, title: "Walking in Faith When the Path is Unclear", author: "Pastor James", category: "Faith", status: "published", date: "Jun 15, 2025", reads: 1240 },
  { id: 2, title: "The Power of Community Prayer", author: "Rev. Sarah", category: "Prayer", status: "published", date: "Jun 10, 2025", reads: 870 },
  { id: 3, title: "Youth Retreat 2025 Recap", author: "David Mensah", category: "Youth", status: "published", date: "Jun 4, 2025", reads: 530 },
  { id: 4, title: "Stewardship and Generosity", author: "Pastor James", category: "Giving", status: "draft", date: "Jun 20, 2025", reads: 0 },
  { id: 5, title: "Women of Faith Summer Series", author: "Sister Grace", category: "Women", status: "draft", date: "Jun 18, 2025", reads: 0 },
];

const EVENT_DATA: Event[] = [
  { id: 1, title: "Summer Revival Night", date: "Jul 4, 2025", location: "Main Sanctuary", type: "Worship", registered: 312, capacity: 500 },
  { id: 2, title: "Youth Camp 2025", date: "Jul 14–18, 2025", location: "Camp Grace", type: "Youth", registered: 88, capacity: 100 },
  { id: 3, title: "Men's Breakfast Fellowship", date: "Jul 6, 2025", location: "Fellowship Hall", type: "Fellowship", registered: 45, capacity: 80 },
  { id: 4, title: "Community Outreach Day", date: "Jul 19, 2025", location: "City Park", type: "Outreach", registered: 120, capacity: 200 },
  { id: 5, title: "Women of Faith Conference", date: "Aug 2, 2025", location: "Main Sanctuary", type: "Conference", registered: 210, capacity: 300 },
];

const PROGRAM_DATA: Program[] = [
  { id: 1, title: "Sunday Worship", leader: "Pastor James Owusu", schedule: "Sun 9 AM & 11 AM", members: 1200, status: "active" },
  { id: 2, title: "Youth Ministry", leader: "David Mensah", schedule: "Sat 10 AM", members: 145, status: "active" },
  { id: 3, title: "Women of Faith", leader: "Sister Grace Ama", schedule: "Fri 6 PM", members: 89, status: "active" },
  { id: 4, title: "Bible Study", leader: "Rev. Sarah Boateng", schedule: "Wed 7 PM", members: 203, status: "active" },
  { id: 5, title: "Men's Fellowship", leader: "Elder Kofi Asante", schedule: "1st Sat 8 AM", members: 67, status: "inactive" },
  { id: 6, title: "Community Outreach", leader: "Deacon Philip", schedule: "Monthly", members: 54, status: "active" },
];

const PRAYER_DATA: Prayer[] = [
  { id: 1, name: "Abena A.", category: "Healing", text: "Please pray for my mother who is undergoing surgery this Friday. Believing for a full recovery.", time: "2h ago", likes: 24, flagged: false },
  { id: 2, name: "Michael D.", category: "Gratitude", text: "Praising God for a new job after 8 months of searching. He is faithful!", time: "4h ago", likes: 41, flagged: false },
  { id: 3, name: "Anonymous", category: "Prayer", text: "Struggling with anxiety and need the peace that passes all understanding.", time: "6h ago", likes: 18, flagged: false },
  { id: 4, name: "Priscilla O.", category: "Marriage", text: "Pray for restoration in my marriage. We are going through a difficult season.", time: "1d ago", likes: 33, flagged: false },
  { id: 5, name: "Samuel K.", category: "Finances", text: "Need prayer for financial breakthrough — believing God for provision.", time: "1d ago", likes: 15, flagged: true },
  { id: 6, name: "Grace T.", category: "Community", text: "Praying for the youth of our community. Lord protect them and draw them close.", time: "2d ago", likes: 27, flagged: false },
];

const TEAM_DATA: TeamMember[] = [
  { id: 1, name: "Pastor James Owusu", role: "Senior Pastor", years: 18, email: "james@garmadu.org", status: "active" },
  { id: 2, name: "Rev. Sarah Boateng", role: "Associate Pastor", years: 11, email: "sarah@garmadu.org", status: "active" },
  { id: 3, name: "Elder Kofi Asante", role: "Head of Elders", years: 22, email: "kofi@garmadu.org", status: "active" },
  { id: 4, name: "David Mensah", role: "Youth Director", years: 7, email: "david@garmadu.org", status: "active" },
  { id: 5, name: "Sister Grace Ama", role: "Women's Ministry Lead", years: 14, email: "grace@garmadu.org", status: "active" },
  { id: 6, name: "Deacon Philip Osei", role: "Outreach Coordinator", years: 9, email: "philip@garmadu.org", status: "inactive" },
];

const USER_DATA: User[] = [
  { id: 1, name: "Abena Asante", email: "abena@mail.com", role: "member", joined: "Mar 2023", active: true },
  { id: 2, name: "Michael Darko", email: "michael@mail.com", role: "leader", joined: "Jan 2020", active: true },
  { id: 3, name: "Priscilla Ofori", email: "priscilla@mail.com", role: "member", joined: "Jul 2022", active: true },
  { id: 4, name: "Samuel Kusi", email: "samuel@mail.com", role: "member", joined: "Nov 2023", active: false },
  { id: 5, name: "Grace Tetteh", email: "grace@mail.com", role: "admin", joined: "Feb 2019", active: true },
  { id: 6, name: "Kofi Mensah", email: "kofi.m@mail.com", role: "member", joined: "Sep 2024", active: true },
  { id: 7, name: "Ama Boateng", email: "ama@mail.com", role: "leader", joined: "Jun 2021", active: true },
  { id: 8, name: "Philip Asare", email: "philip@mail.com", role: "member", joined: "Dec 2023", active: false },
];

// ── Tiny UI primitives ───────────────────────────────────────────────────────
function Badge({ children, color = G.green, bg = G.greenLight, border = G.greenBorder }: {
  children: React.ReactNode; color?: string; bg?: string; border?: string;
}) {
  return (
    <span style={{
      fontSize: "0.62rem", fontWeight: 700, color, backgroundColor: bg,
      border: `1px solid ${border}`, borderRadius: "100px", padding: "2px 9px",
      letterSpacing: "0.06em", textTransform: "uppercase" as const,
      fontFamily: "'Inter', sans-serif",
    }}>{children}</span>
  );
}

function IconBox({ icon, color = G.green, bg = G.greenLight, size = 36 }: {
  icon: string; color?: string; bg?: string; size?: number;
}) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "9px", backgroundColor: bg,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <i className={`ti ${icon}`} style={{ fontSize: size * 0.44, color }} aria-hidden="true" />
    </div>
  );
}

function ActionBtn({ label, icon, onClick, variant = "ghost" }: {
  label: string; icon: string; onClick?: () => void; variant?: "ghost" | "danger" | "primary";
}) {
  const styles: Record<string, React.CSSProperties> = {
    ghost:   { background: G.surface, color: G.body, border: `1px solid ${G.border}` },
    danger:  { background: G.redLight, color: G.red, border: `1px solid #FECACA` },
    primary: { background: G.green, color: G.white, border: "none" },
  };
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "5px 11px", borderRadius: "7px", fontSize: "0.74rem",
      fontWeight: 600, cursor: "pointer", fontFamily: "'Inter', sans-serif",
      transition: "opacity 0.15s", ...styles[variant],
    }}
      onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
    >
      <i className={`ti ${icon}`} style={{ fontSize: "13px" }} aria-hidden="true" />
      {label}
    </button>
  );
}

function SectionHeader({ title, subtitle, action }: {
  title: string; subtitle?: string; action?: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.75rem" }}>
      <div>
        <h2 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "1.55rem", fontWeight: 700, color: G.ink,
          margin: "0 0 4px", letterSpacing: "-0.02em",
        }}>{title}</h2>
        {subtitle && <p style={{ fontSize: "0.82rem", color: G.muted, margin: 0, fontFamily: "'Inter', sans-serif" }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

function Table({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: "12px", border: `1px solid ${G.border}` }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "'Inter', sans-serif" }}>
        <thead>
          <tr style={{ backgroundColor: G.surface, borderBottom: `1px solid ${G.border}` }}>
            {headers.map(h => (
              <th key={h} style={{
                padding: "10px 16px", textAlign: "left", fontSize: "0.65rem",
                fontWeight: 700, color: G.muted, textTransform: "uppercase",
                letterSpacing: "0.1em", whiteSpace: "nowrap",
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function TR({ children, last }: { children: React.ReactNode; last?: boolean }) {
  return (
    <tr style={{
      borderBottom: last ? "none" : `1px solid ${G.borderLight}`,
      transition: "background 0.1s",
    }}
      onMouseEnter={e => (e.currentTarget.style.background = G.surface)}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >
      {children}
    </tr>
  );
}

function TD({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <td style={{ padding: "11px 16px", fontSize: "0.83rem", color: G.body, verticalAlign: "middle", ...style }}>
      {children}
    </td>
  );
}

// ── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, color, bg, delta }: {
  label: string; value: string; icon: string;
  color: string; bg: string; delta?: string;
}) {
  return (
    <div style={{
      backgroundColor: G.white, border: `1px solid ${G.border}`,
      borderRadius: "14px", padding: "1.35rem 1.4rem",
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: "12px",
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "0.7rem", fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'Inter', sans-serif" }}>{label}</span>
        <IconBox icon={icon} color={color} bg={bg} size={34} />
      </div>
      <div>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.9rem", fontWeight: 700, color: G.ink, margin: "0 0 3px", letterSpacing: "-0.03em" }}>{value}</p>
        {delta && <p style={{ fontSize: "0.72rem", color: G.green, fontWeight: 600, margin: 0, fontFamily: "'Inter', sans-serif" }}>{delta}</p>}
      </div>
    </div>
  );
}

// ── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard() {
  const recentActivity = [
    { icon: "ti-user-plus", color: G.blue, bg: G.blueLight, msg: "New member Ama Boateng joined", time: "10 min ago" },
    { icon: "ti-message", color: G.green, bg: G.greenLight, msg: "Prayer posted by Samuel K.", time: "34 min ago" },
    { icon: "ti-calendar-event", color: G.gold, bg: G.goldLight, msg: "Summer Revival Night capacity at 62%", time: "1h ago" },
    { icon: "ti-file-text", color: G.body, bg: G.surface, msg: "Draft saved: Stewardship and Generosity", time: "2h ago" },
    { icon: "ti-heart", color: G.red, bg: G.redLight, msg: "Prayer by Priscilla O. received 33 hearts", time: "3h ago" },
    { icon: "ti-users", color: G.green, bg: G.greenLight, msg: "Youth Ministry hit 145 members", time: "5h ago" },
  ];

  const quickStats = [
    { label: "Total Members", value: "1,247", icon: "ti-users", color: G.blue, bg: G.blueLight, delta: "+14 this month" },
    { label: "Active Programs", value: "5", icon: "ti-layout-grid", color: G.green, bg: G.greenLight, delta: "1 inactive" },
    { label: "Upcoming Events", value: "5", icon: "ti-calendar", color: G.gold, bg: G.goldLight, delta: "Next: Jul 4" },
    { label: "Blog Posts", value: "3 live", icon: "ti-article", color: G.body, bg: G.surface, delta: "2 drafts pending" },
    { label: "Prayer Requests", value: "6", icon: "ti-heart-handshake", color: G.red, bg: G.redLight, delta: "1 flagged" },
    { label: "Total Given (YTD)", value: "$2.4M", icon: "ti-coin", color: G.green, bg: G.greenLight, delta: "+8% vs last year" },
  ];

  return (
    <div>
      <SectionHeader title="Dashboard" subtitle="Overview of Garmadu Church activity and metrics." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
        {quickStats.map(s => <StatCard key={s.label} {...s} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.25rem" }}>
        {/* Activity feed */}
        <div style={{ backgroundColor: G.white, border: `1px solid ${G.border}`, borderRadius: "14px", padding: "1.4rem" }}>
          <p style={{ fontSize: "0.78rem", fontWeight: 700, color: G.ink, margin: "0 0 1.2rem", fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>Recent Activity</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
            {recentActivity.map((a, i) => (
              <div key={i} style={{
                display: "flex", gap: "12px", alignItems: "flex-start",
                padding: "0.75rem 0",
                borderBottom: i < recentActivity.length - 1 ? `1px solid ${G.borderLight}` : "none",
              }}>
                <IconBox icon={a.icon} color={a.color} bg={a.bg} size={32} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.83rem", color: G.ink, margin: "0 0 2px", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>{a.msg}</p>
                  <p style={{ fontSize: "0.7rem", color: G.muted, margin: 0, fontFamily: "'Inter', sans-serif" }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sunday attendance mini chart */}
        <div style={{ backgroundColor: G.white, border: `1px solid ${G.border}`, borderRadius: "14px", padding: "1.4rem" }}>
          <p style={{ fontSize: "0.78rem", fontWeight: 700, color: G.ink, margin: "0 0 1.2rem", fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}>Sunday Attendance</p>
          {[
            { week: "Jun 1", count: 820, pct: 68 },
            { week: "Jun 8", count: 910, pct: 76 },
            { week: "Jun 15", count: 870, pct: 72 },
            { week: "Jun 22", count: 960, pct: 80 },
            { week: "Jun 29", count: 1020, pct: 85 },
          ].map(w => (
            <div key={w.week} style={{ marginBottom: "0.9rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                <span style={{ fontSize: "0.72rem", color: G.body, fontFamily: "'Inter', sans-serif" }}>{w.week}</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 700, color: G.ink, fontFamily: "'Inter', sans-serif" }}>{w.count.toLocaleString()}</span>
              </div>
              <div style={{ height: "6px", backgroundColor: G.borderLight, borderRadius: "10px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${w.pct}%`, backgroundColor: G.green, borderRadius: "10px", transition: "width 0.6s ease" }} />
              </div>
            </div>
          ))}
          <p style={{ fontSize: "0.7rem", color: G.muted, margin: "1rem 0 0", textAlign: "center", fontFamily: "'Inter', sans-serif" }}>Capacity: 1,200 seats</p>
        </div>
      </div>
    </div>
  );
}

// ── Blog Manager ─────────────────────────────────────────────────────────────
function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>(BLOG_DATA);

  const toggleStatus = (id: number) => setPosts(p => p.map(b =>
    b.id === id ? { ...b, status: b.status === "published" ? "draft" : "published" } : b
  ));
  const deletePost = (id: number) => setPosts(p => p.filter(b => b.id !== id));

  return (
    <div>
      <SectionHeader
        title="Blog Posts"
        subtitle={`${posts.filter(p => p.status === "published").length} published · ${posts.filter(p => p.status === "draft").length} drafts`}
        action={<ActionBtn label="New Post" icon="ti-plus" variant="primary" />}
      />
      <Table headers={["Title", "Author", "Category", "Status", "Date", "Reads", "Actions"]}>
        {posts.map((p, i) => (
          <TR key={p.id} last={i === posts.length - 1}>
            <TD style={{ fontWeight: 600, color: G.ink, maxWidth: 260 }}>
              <span style={{ fontFamily: "'Inter', sans-serif" }}>{p.title}</span>
            </TD>
            <TD>{p.author}</TD>
            <TD><Badge color={G.blue} bg={G.blueLight} border="#BFDBFE">{p.category}</Badge></TD>
            <TD>
              {p.status === "published"
                ? <Badge>{p.status}</Badge>
                : <Badge color={G.muted} bg={G.surface} border={G.border}>Draft</Badge>}
            </TD>
            <TD style={{ whiteSpace: "nowrap" }}>{p.date}</TD>
            <TD style={{ fontWeight: 600, color: G.ink }}>{p.reads > 0 ? p.reads.toLocaleString() : "—"}</TD>
            <TD>
              <div style={{ display: "flex", gap: "6px" }}>
                <ActionBtn label="Edit" icon="ti-pencil" />
                <ActionBtn label={p.status === "published" ? "Unpublish" : "Publish"} icon="ti-world" onClick={() => toggleStatus(p.id)} />
                <ActionBtn label="Delete" icon="ti-trash" variant="danger" onClick={() => deletePost(p.id)} />
              </div>
            </TD>
          </TR>
        ))}
      </Table>
    </div>
  );
}

// ── Events Manager ───────────────────────────────────────────────────────────
function EventsManager() {
  const [events, setEvents] = useState<Event[]>(EVENT_DATA);
  const deleteEvent = (id: number) => setEvents(e => e.filter(ev => ev.id !== id));

  const typeColor: Record<string, { c: string; bg: string; b: string }> = {
    Worship:    { c: G.green,  bg: G.greenLight, b: G.greenBorder },
    Youth:      { c: G.blue,   bg: G.blueLight,  b: "#BFDBFE" },
    Fellowship: { c: G.gold,   bg: G.goldLight,  b: "#FDE68A" },
    Outreach:   { c: "#7C3AED", bg: "#F5F3FF",   b: "#DDD6FE" },
    Conference: { c: G.red,    bg: G.redLight,   b: "#FECACA" },
  };

  return (
    <div>
      <SectionHeader
        title="Events"
        subtitle={`${events.length} upcoming events`}
        action={<ActionBtn label="Add Event" icon="ti-plus" variant="primary" />}
      />
      <Table headers={["Event", "Date", "Location", "Type", "Registered / Cap", "Fill", "Actions"]}>
        {events.map((ev, i) => {
          const pct = Math.round((ev.registered / ev.capacity) * 100);
          const tc = typeColor[ev.type] ?? { c: G.body, bg: G.surface, b: G.border };
          return (
            <TR key={ev.id} last={i === events.length - 1}>
              <TD style={{ fontWeight: 600, color: G.ink }}>{ev.title}</TD>
              <TD style={{ whiteSpace: "nowrap" }}>{ev.date}</TD>
              <TD>{ev.location}</TD>
              <TD><Badge color={tc.c} bg={tc.bg} border={tc.b}>{ev.type}</Badge></TD>
              <TD style={{ fontWeight: 600, color: G.ink }}>{ev.registered} / {ev.capacity}</TD>
              <TD style={{ minWidth: 100 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ flex: 1, height: 6, backgroundColor: G.borderLight, borderRadius: 10, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, backgroundColor: pct >= 90 ? G.red : G.green, borderRadius: 10 }} />
                  </div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: G.body, fontFamily: "'Inter', sans-serif", minWidth: 28 }}>{pct}%</span>
                </div>
              </TD>
              <TD>
                <div style={{ display: "flex", gap: 6 }}>
                  <ActionBtn label="Edit" icon="ti-pencil" />
                  <ActionBtn label="Delete" icon="ti-trash" variant="danger" onClick={() => deleteEvent(ev.id)} />
                </div>
              </TD>
            </TR>
          );
        })}
      </Table>
    </div>
  );
}

// ── Programs Manager ─────────────────────────────────────────────────────────
function ProgramsManager() {
  const [programs, setPrograms] = useState<Program[]>(PROGRAM_DATA);

  const toggleStatus = (id: number) => setPrograms(p => p.map(pg =>
    pg.id === id ? { ...pg, status: pg.status === "active" ? "inactive" : "active" } : pg
  ));
  const deleteProgram = (id: number) => setPrograms(p => p.filter(pg => pg.id !== id));

  return (
    <div>
      <SectionHeader
        title="Programs & Ministries"
        subtitle={`${programs.filter(p => p.status === "active").length} active · ${programs.filter(p => p.status === "inactive").length} inactive`}
        action={<ActionBtn label="Add Program" icon="ti-plus" variant="primary" />}
      />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" }}>
        {programs.map(pg => (
          <div key={pg.id} style={{
            backgroundColor: G.white, border: `1px solid ${G.border}`,
            borderRadius: "14px", padding: "1.3rem",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            opacity: pg.status === "inactive" ? 0.65 : 1,
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "0.85rem" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <IconBox icon="ti-layout-grid" color={pg.status === "active" ? G.green : G.muted} bg={pg.status === "active" ? G.greenLight : G.surface} />
                <div>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, color: G.ink, margin: "0 0 2px", fontFamily: "'Inter', sans-serif" }}>{pg.title}</p>
                  <p style={{ fontSize: "0.72rem", color: G.muted, margin: 0, fontFamily: "'Inter', sans-serif" }}>{pg.schedule}</p>
                </div>
              </div>
              {pg.status === "active"
                ? <Badge>Active</Badge>
                : <Badge color={G.muted} bg={G.surface} border={G.border}>Inactive</Badge>}
            </div>
            <div style={{ display: "flex", gap: "1.5rem", marginBottom: "1rem" }}>
              <div>
                <p style={{ fontSize: "0.62rem", color: G.muted, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'Inter', sans-serif" }}>Leader</p>
                <p style={{ fontSize: "0.8rem", fontWeight: 600, color: G.body, margin: 0, fontFamily: "'Inter', sans-serif" }}>{pg.leader}</p>
              </div>
              <div>
                <p style={{ fontSize: "0.62rem", color: G.muted, margin: "0 0 2px", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "'Inter', sans-serif" }}>Members</p>
                <p style={{ fontSize: "0.8rem", fontWeight: 700, color: G.ink, margin: 0, fontFamily: "'Inter', sans-serif" }}>{pg.members.toLocaleString()}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "6px", paddingTop: "0.85rem", borderTop: `1px solid ${G.borderLight}` }}>
              <ActionBtn label="Edit" icon="ti-pencil" />
              <ActionBtn label={pg.status === "active" ? "Deactivate" : "Activate"} icon={pg.status === "active" ? "ti-player-pause" : "ti-player-play"} onClick={() => toggleStatus(pg.id)} />
              <ActionBtn label="Delete" icon="ti-trash" variant="danger" onClick={() => deleteProgram(pg.id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Prayer Board Moderation ──────────────────────────────────────────────────
function PrayerModeration() {
  const [prayers, setPrayers] = useState<Prayer[]>(PRAYER_DATA);

  const toggleFlag = (id: number) => setPrayers(p => p.map(pr =>
    pr.id === id ? { ...pr, flagged: !pr.flagged } : pr
  ));
  const deletePrayer = (id: number) => setPrayers(p => p.filter(pr => pr.id !== id));

  const catColor: Record<string, { c: string; bg: string; b: string }> = {
    Healing:   { c: G.red,    bg: G.redLight,   b: "#FECACA" },
    Gratitude: { c: G.green,  bg: G.greenLight,  b: G.greenBorder },
    Prayer:    { c: G.blue,   bg: G.blueLight,   b: "#BFDBFE" },
    Marriage:  { c: G.gold,   bg: G.goldLight,   b: "#FDE68A" },
    Finances:  { c: "#7C3AED", bg: "#F5F3FF",    b: "#DDD6FE" },
    Community: { c: G.green,  bg: G.greenLight,  b: G.greenBorder },
  };

  const flagged = prayers.filter(p => p.flagged).length;

  return (
    <div>
      <SectionHeader
        title="Prayer Board"
        subtitle={`${prayers.length} requests · ${flagged} flagged for review`}
      />
      {flagged > 0 && (
        <div style={{
          backgroundColor: G.amberLight, border: `1px solid #FDE68A`,
          borderRadius: "10px", padding: "0.85rem 1.1rem",
          display: "flex", gap: "10px", alignItems: "center", marginBottom: "1.5rem",
        }}>
          <i className="ti ti-alert-triangle" style={{ fontSize: "16px", color: G.amber }} aria-hidden="true" />
          <p style={{ fontSize: "0.82rem", color: G.ink, margin: 0, fontFamily: "'Inter', sans-serif" }}>
            <strong>{flagged} prayer{flagged > 1 ? "s" : ""}</strong> flagged for review. Please review and take action.
          </p>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {prayers.map(pr => {
          const cc = catColor[pr.category] ?? { c: G.body, bg: G.surface, b: G.border };
          return (
            <div key={pr.id} style={{
              backgroundColor: G.white, border: `1px solid ${pr.flagged ? "#FECACA" : G.border}`,
              borderRadius: "12px", padding: "1.2rem",
              boxShadow: pr.flagged ? "0 0 0 3px #FEE2E2" : "0 1px 4px rgba(0,0,0,0.04)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.75rem" }}>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  backgroundColor: cc.bg, display: "flex", alignItems: "center",
                  justifyContent: "center", fontWeight: 700, fontSize: "0.75rem", color: cc.c, flexShrink: 0,
                  fontFamily: "'Inter', sans-serif",
                }}>{pr.name.slice(0, 2).toUpperCase()}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 700, color: G.ink, margin: "0 0 1px", fontFamily: "'Inter', sans-serif" }}>{pr.name}</p>
                  <p style={{ fontSize: "0.7rem", color: G.muted, margin: 0, fontFamily: "'Inter', sans-serif" }}>{pr.time}</p>
                </div>
                <Badge color={cc.c} bg={cc.bg} border={cc.b}>{pr.category}</Badge>
                {pr.flagged && <Badge color={G.red} bg={G.redLight} border="#FECACA">Flagged</Badge>}
              </div>
              <p style={{ fontSize: "0.85rem", lineHeight: 1.75, color: G.body, margin: "0 0 0.85rem", fontFamily: "'Inter', sans-serif" }}>{pr.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "0.75rem", borderTop: `1px solid ${G.borderLight}` }}>
                <span style={{ fontSize: "0.75rem", color: G.muted, display: "flex", alignItems: "center", gap: 4, fontFamily: "'Inter', sans-serif" }}>
                  <i className="ti ti-heart" style={{ fontSize: "13px" }} aria-hidden="true" />
                  {pr.likes} praying
                </span>
                <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
                  <ActionBtn label={pr.flagged ? "Unflag" : "Flag"} icon={pr.flagged ? "ti-flag-off" : "ti-flag"} onClick={() => toggleFlag(pr.id)} />
                  <ActionBtn label="Remove" icon="ti-trash" variant="danger" onClick={() => deletePrayer(pr.id)} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Team Manager ─────────────────────────────────────────────────────────────
function TeamManager() {
  const [team, setTeam] = useState<TeamMember[]>(TEAM_DATA);
  const toggleStatus = (id: number) => setTeam(t => t.map(m =>
    m.id === id ? { ...m, status: m.status === "active" ? "inactive" : "active" } : m
  ));
  const deleteMember = (id: number) => setTeam(t => t.filter(m => m.id !== id));

  return (
    <div>
      <SectionHeader
        title="Leadership Team"
        subtitle={`${team.filter(m => m.status === "active").length} active leaders`}
        action={<ActionBtn label="Add Member" icon="ti-user-plus" variant="primary" />}
      />
      <Table headers={["Name", "Role", "Years", "Email", "Status", "Actions"]}>
        {team.map((m, i) => (
          <TR key={m.id} last={i === team.length - 1}>
            <TD style={{ fontWeight: 600, color: G.ink }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: "50%",
                  backgroundColor: m.status === "active" ? G.greenLight : G.surface,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.7rem", fontWeight: 700,
                  color: m.status === "active" ? G.green : G.muted,
                  flexShrink: 0, fontFamily: "'Inter', sans-serif",
                }}>{m.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</div>
                {m.name}
              </div>
            </TD>
            <TD>{m.role}</TD>
            <TD><span style={{ fontWeight: 700, color: G.ink, fontFamily: "'Inter', sans-serif" }}>{m.years}</span> yrs</TD>
            <TD style={{ color: G.blue }}>{m.email}</TD>
            <TD>
              {m.status === "active"
                ? <Badge>Active</Badge>
                : <Badge color={G.muted} bg={G.surface} border={G.border}>Inactive</Badge>}
            </TD>
            <TD>
              <div style={{ display: "flex", gap: 6 }}>
                <ActionBtn label="Edit" icon="ti-pencil" />
                <ActionBtn label={m.status === "active" ? "Deactivate" : "Activate"} icon="ti-toggle-left" onClick={() => toggleStatus(m.id)} />
                <ActionBtn label="Remove" icon="ti-trash" variant="danger" onClick={() => deleteMember(m.id)} />
              </div>
            </TD>
          </TR>
        ))}
      </Table>
    </div>
  );
}

// ── User Manager ─────────────────────────────────────────────────────────────
function UserManager() {
  const [users, setUsers] = useState<User[]>(USER_DATA);
  const [search, setSearch] = useState("");

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id: number) => setUsers(u => u.map(usr =>
    usr.id === id ? { ...usr, active: !usr.active } : usr
  ));
  const deleteUser = (id: number) => setUsers(u => u.filter(usr => usr.id !== id));

  const roleColors: Record<string, { c: string; bg: string; b: string }> = {
    admin:  { c: G.red,   bg: G.redLight,   b: "#FECACA" },
    leader: { c: G.gold,  bg: G.goldLight,  b: "#FDE68A" },
    member: { c: G.blue,  bg: G.blueLight,  b: "#BFDBFE" },
  };

  return (
    <div>
      <SectionHeader
        title="User Management"
        subtitle={`${users.filter(u => u.active).length} active · ${users.filter(u => !u.active).length} inactive`}
        action={<ActionBtn label="Add User" icon="ti-user-plus" variant="primary" />}
      />
      <div style={{ marginBottom: "1.25rem" }}>
        <div style={{ position: "relative", maxWidth: 320 }}>
          <i className="ti ti-search" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: "15px", color: G.muted, pointerEvents: "none" }} aria-hidden="true" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%", padding: "0.6rem 0.9rem 0.6rem 2.2rem",
              border: `1px solid ${G.border}`, borderRadius: "9px",
              fontSize: "0.85rem", color: G.ink, fontFamily: "'Inter', sans-serif",
              backgroundColor: G.white, outline: "none", boxSizing: "border-box",
            }}
          />
        </div>
      </div>
      <Table headers={["User", "Email", "Role", "Joined", "Status", "Actions"]}>
        {filtered.map((u, i) => {
          const rc = roleColors[u.role] ?? { c: G.body, bg: G.surface, b: G.border };
          return (
            <TR key={u.id} last={i === filtered.length - 1}>
              <TD style={{ fontWeight: 600, color: G.ink }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    backgroundColor: u.active ? G.greenLight : G.surface,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "0.7rem", fontWeight: 700,
                    color: u.active ? G.green : G.muted, flexShrink: 0, fontFamily: "'Inter', sans-serif",
                  }}>{u.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</div>
                  {u.name}
                </div>
              </TD>
              <TD style={{ color: G.blue }}>{u.email}</TD>
              <TD><Badge color={rc.c} bg={rc.bg} border={rc.b}>{u.role}</Badge></TD>
              <TD>{u.joined}</TD>
              <TD>
                {u.active
                  ? <Badge>Active</Badge>
                  : <Badge color={G.muted} bg={G.surface} border={G.border}>Inactive</Badge>}
              </TD>
              <TD>
                <div style={{ display: "flex", gap: 6 }}>
                  <ActionBtn label="Edit" icon="ti-pencil" />
                  <ActionBtn label={u.active ? "Suspend" : "Restore"} icon={u.active ? "ti-lock" : "ti-lock-open"} onClick={() => toggleActive(u.id)} />
                  <ActionBtn label="Remove" icon="ti-trash" variant="danger" onClick={() => deleteUser(u.id)} />
                </div>
              </TD>
            </TR>
          );
        })}
      </Table>
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "3rem", color: G.muted, fontFamily: "'Inter', sans-serif", fontSize: "0.85rem" }}>
          No users match your search.
        </div>
      )}
    </div>
  );
}

// ── Sidebar nav items ────────────────────────────────────────────────────────
const NAV: { id: Section; label: string; icon: string }[] = [
  { id: "dashboard", label: "Dashboard",    icon: "ti-layout-dashboard" },
  { id: "blog",      label: "Blog Posts",   icon: "ti-article" },
  { id: "events",    label: "Events",       icon: "ti-calendar-event" },
  { id: "programs",  label: "Programs",     icon: "ti-layout-grid" },
  { id: "prayers",   label: "Prayer Board", icon: "ti-heart-handshake" },
  { id: "team",      label: "Leadership",   icon: "ti-users-group" },
  { id: "users",     label: "Users",        icon: "ti-user" },
];

// ── Root page ────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [active, setActive] = useState<Section>("dashboard");

  const content: Record<Section, React.ReactNode> = {
    dashboard: <Dashboard />,
    blog:      <BlogManager />,
    events:    <EventsManager />,
    programs:  <ProgramsManager />,
    prayers:   <PrayerModeration />,
    team:      <TeamManager />,
    users:     <UserManager />,
  };

  return (
    <>
      {/* Google Fonts + Tabler Icons */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap"
      />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
      />

      <div style={{
        display: "flex", minHeight: "100vh",
        backgroundColor: G.surface, fontFamily: "'Inter', sans-serif",
      }}>
        {/* ── Sidebar ── */}
        <aside style={{
          width: 230, flexShrink: 0,
          backgroundColor: G.white,
          borderRight: `1px solid ${G.border}`,
          display: "flex", flexDirection: "column",
          position: "sticky", top: 0, height: "100vh", overflowY: "auto",
        }}>
          {/* Logo */}
          <div style={{
            padding: "1.5rem 1.4rem 1.2rem",
            borderBottom: `1px solid ${G.borderLight}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "9px",
                backgroundColor: G.green,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="18" height="18" viewBox="0 0 100 100" fill="white">
                  <rect x="42" y="8" width="16" height="84" rx="3" />
                  <rect x="14" y="34" width="72" height="16" rx="3" />
                </svg>
              </div>
              <div>
                <p style={{ fontSize: "0.88rem", fontWeight: 700, color: G.ink, margin: 0, lineHeight: 1.2 }}>Garmadu</p>
                <p style={{ fontSize: "0.58rem", color: G.muted, margin: 0, letterSpacing: "0.1em", textTransform: "uppercase" }}>Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ padding: "1rem 0.75rem", flex: 1 }}>
            <p style={{ fontSize: "0.58rem", fontWeight: 700, color: G.hint, textTransform: "uppercase", letterSpacing: "0.14em", padding: "0 0.6rem", margin: "0 0 0.5rem" }}>Menu</p>
            {NAV.map(n => {
              const isActive = active === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setActive(n.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    width: "100%", padding: "0.6rem 0.75rem", marginBottom: "2px",
                    borderRadius: "9px", border: "none", cursor: "pointer",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.83rem", fontWeight: isActive ? 700 : 500,
                    color: isActive ? G.green : G.body,
                    backgroundColor: isActive ? G.greenLight : "transparent",
                    textAlign: "left", transition: "background 0.15s, color 0.15s",
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = G.surface; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <i className={`ti ${n.icon}`} style={{ fontSize: "16px", flexShrink: 0 }} aria-hidden="true" />
                  {n.label}
                  {n.id === "prayers" && PRAYER_DATA.filter(p => p.flagged).length > 0 && (
                    <span style={{
                      marginLeft: "auto", backgroundColor: G.red,
                      color: G.white, fontSize: "0.6rem", fontWeight: 700,
                      borderRadius: "100px", padding: "1px 6px", lineHeight: 1.6,
                    }}>{PRAYER_DATA.filter(p => p.flagged).length}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom admin info */}
          <div style={{
            padding: "1rem 1.2rem",
            borderTop: `1px solid ${G.borderLight}`,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                backgroundColor: G.greenLight,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.7rem", fontWeight: 700, color: G.green, flexShrink: 0,
              }}>GT</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: G.ink, margin: 0 }}>Grace Tetteh</p>
                <p style={{ fontSize: "0.67rem", color: G.muted, margin: 0 }}>Administrator</p>
              </div>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: G.muted, padding: 0 }}>
                <i className="ti ti-logout" style={{ fontSize: "16px" }} aria-hidden="true" />
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          {/* Top bar */}
          <header style={{
            backgroundColor: G.white,
            borderBottom: `1px solid ${G.border}`,
            padding: "0 2rem",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "0.72rem", color: G.muted, fontFamily: "'Inter', sans-serif" }}>Admin</span>
              <i className="ti ti-chevron-right" style={{ fontSize: "12px", color: G.hint }} aria-hidden="true" />
              <span style={{ fontSize: "0.82rem", fontWeight: 600, color: G.ink, fontFamily: "'Inter', sans-serif" }}>
                {NAV.find(n => n.id === active)?.label}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button style={{
                display: "flex", alignItems: "center", gap: 6,
                backgroundColor: G.surface, border: `1px solid ${G.border}`,
                borderRadius: "8px", padding: "6px 12px",
                fontSize: "0.78rem", color: G.body, cursor: "pointer", fontFamily: "'Inter', sans-serif",
              }}>
                <i className="ti ti-bell" style={{ fontSize: "14px" }} aria-hidden="true" />
                Notifications
              </button>
              <a href="/" style={{
                display: "flex", alignItems: "center", gap: 6,
                backgroundColor: G.greenLight, border: `1px solid ${G.greenBorder}`,
                borderRadius: "8px", padding: "6px 12px",
                fontSize: "0.78rem", color: G.greenText, cursor: "pointer", fontFamily: "'Inter', sans-serif",
                textDecoration: "none", fontWeight: 600,
              }}>
                <i className="ti ti-external-link" style={{ fontSize: "14px" }} aria-hidden="true" />
                View Site
              </a>
            </div>
          </header>

          {/* Page body */}
          <div style={{ padding: "2rem 2.25rem", flex: 1 }}>
            {content[active]}
          </div>
        </main>
      </div>
    </>
  );
}