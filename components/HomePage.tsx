
import { useState } from "react";
import {
  G,
  DAILY_VERSE,
  DAILY_REMINDER,
  TODAY_SCHEDULE,
  PROGRAMS,
  EVENTS,
  BLOG_POSTS,
  TEAM,
} from "@/constants/data";
import { CrossLogo, Badge, Chevron, Sparkle } from "@/components/ui/Primitives";
import { User, Program, Prayer, BlogPost, TeamMember } from "../constants/types";

interface SparkleType { id: number; x: number; y: number; color: string; }

interface HomePageProps {
  setModal: (modal: { type: "program" | "team"; data: Program | TeamMember }) => void;
  setPage: (page: string) => void;
  setBlogModal: (post: BlogPost) => void;
  user: User | null;
  setLoginOpen: (open: boolean) => void;
  showToast: (msg: string, type?: "success" | "info" | "error") => void;
  prayerBoard: Prayer[];
  setPrayerBoard: (board: Prayer[]) => void;
  newPrayer: string;
  setNewPrayer: (prayer: string) => void;
  newPrayerCat: string;
  setNewPrayerCat: (cat: string) => void;
  likedPrayers: number[];
  setLikedPrayers: (likes: number[]) => void;
  sparkles: SparkleType[];
  setSparkles: React.Dispatch<React.SetStateAction<SparkleType[]>>;
}

// ── Unsplash helper — adds referrerPolicy so localhost isn't blocked ──────────
function UnsplashImg({
  photoId, params = "w=1400&q=85", alt, style, className, onError,
}: {
  photoId: string; params?: string; alt: string;
  style?: React.CSSProperties; className?: string;
  onError?: React.ReactEventHandler<HTMLImageElement>;
}) {
  return (
    <img
      src={`https://images.unsplash.com/${photoId}?${params}&auto=format&fit=crop`}
      alt={alt}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      style={style}
      className={className}
      onError={onError}
    />
  );
}

export function HomePage({
  setModal, setPage, setBlogModal, user, setLoginOpen, showToast,
  prayerBoard, setPrayerBoard, newPrayer, setNewPrayer,
  newPrayerCat, setNewPrayerCat, likedPrayers, setLikedPrayers,
  sparkles, setSparkles,
}: HomePageProps) {
  const [verseRead, setVerseRead] = useState(false);
  const [reminderDismissed, setReminderDismissed] = useState(false);
  const [heroFailed, setHeroFailed] = useState(false);

  const addSparkle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    const items: SparkleType[] = Array.from({ length: 6 }, (_, i) => ({
      id: id + i,
      x: e.clientX - rect.left + (Math.random() - 0.5) * 60,
      y: e.clientY - rect.top + (Math.random() - 0.5) * 40,
      color: ["#16A34A","#86EFAC","#D97706","#7C3AED","#DC2626"][Math.floor(Math.random() * 5)],
    }));
    setSparkles(p => [...p, ...items]);
    setTimeout(() => setSparkles(p => p.filter(s => !items.some(i => i.id === s.id))), 1800);
  };

  const submitPrayer = () => {
    if (!newPrayer.trim()) return;
    setPrayerBoard([{
      id: Date.now(), name: user?.name ?? "Anonymous", avatar: user?.avatar ?? "AN",
      time: "Just now", category: newPrayerCat, text: newPrayer, likes: 0, color: G.green,
    }, ...prayerBoard]);
    setNewPrayer("");
    showToast("Prayer posted! The church is with you. 🙏");
  };

  const likePrayer = (id: number) => {
    if (likedPrayers.includes(id)) return;
    setLikedPrayers([...likedPrayers, id]);
    setPrayerBoard(prayerBoard.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <>
      {/* ── BANNER ── */}
      {!reminderDismissed && (
        <div style={{ backgroundColor: G.greenDark, padding: "0.65rem 2.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
          <i className="ti ti-bell-ringing" style={{ fontSize: "15px", color: G.greenMid, flexShrink: 0 }} aria-hidden="true" />
          <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff" }}>{DAILY_REMINDER.title}</span>
            <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.7)" }}>{DAILY_REMINDER.body}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "0.72rem", color: G.greenMid, fontWeight: 600 }}>
              <i className="ti ti-clock" style={{ fontSize: "12px" }} aria-hidden="true" />{DAILY_REMINDER.time}
            </span>
          </div>
          <button onClick={() => setReminderDismissed(true)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer" }}>
            <i className="ti ti-x" style={{ fontSize: "15px" }} aria-hidden="true" />
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="grid-bg hero-section">
        <div style={{ maxWidth: "1240px", margin: "0 auto", width: "100%", paddingTop: "3rem", paddingBottom: "3rem" }}>

          {/* Hero image with green fallback */}
          <div style={{
            width: "100%", maxWidth: "860px", height: "clamp(220px,38vw,460px)",
            borderRadius: "20px", overflow: "hidden",
            border: `1px solid ${G.border}`, boxShadow: "0 16px 48px rgba(15,23,42,0.12)",
            margin: "0 auto 3rem", position: "relative",
            background: "linear-gradient(135deg,#14532D 0%,#166534 45%,#15803d 100%)",
          }}>
            {/* Decorative cross — always visible as background */}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.06, pointerEvents: "none" }}>
              <svg width="260" height="260" viewBox="0 0 100 100" fill="white">
                <rect x="42" y="8" width="16" height="84" rx="3"/>
                <rect x="14" y="34" width="72" height="16" rx="3"/>
              </svg>
            </div>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(134,239,172,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
            {/* Unsplash photo on top — hidden if fails */}
            {!heroFailed && (
              <UnsplashImg
                photoId="photo-1438232992991-995b671e4268"
                params="w=1400&q=85"
                alt="Garmadu Church sanctuary"
                onError={() => setHeroFailed(true)}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block" }}
              />
            )}
            {/* Gradient overlay */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,23,42,0.45) 0%, transparent 50%)", pointerEvents: "none" }} />
            {/* Live pill */}
            <div style={{ position: "absolute", bottom: "1.25rem", left: "1.25rem", display: "flex", alignItems: "center", gap: "7px", backgroundColor: "rgba(255,255,255,0.14)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: "100px", padding: "5px 14px" }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: "#4ADE80" }} className="pulse" />
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#fff", letterSpacing: "0.07em" }}>LIVE SUNDAYS · 9 AM &amp; 11 AM</span>
            </div>
          </div>

          <div className="hero-grid">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: G.greenLight, border: `1px solid ${G.greenBorder}`, borderRadius: "100px", padding: "6px 14px", marginBottom: "1.75rem" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: G.green }} className="pulse" />
                <span className="tag" style={{ margin: 0 }}>Live Sunday Services</span>
              </div>
              <p style={{ fontSize: "0.88rem", color: G.muted, fontWeight: 500, margin: "0 0 0.4rem" }}>Hello, we're</p>
              <h1 className="display" style={{ fontSize: "clamp(2.2rem,8vw,4rem)", fontWeight: 700, lineHeight: 1.06, color: G.ink, marginBottom: "0.4rem", letterSpacing: "-0.03em" }}>
                Garmadu Church
              </h1>
              <h2 style={{ fontSize: "clamp(1rem,4vw,1.4rem)", fontWeight: 400, color: G.green, margin: "0 0 1.5rem", letterSpacing: "-0.01em" }}>
                A place of <span style={{ fontWeight: 700 }}>Faith, Grace</span> and Community
              </h2>
              <p style={{ fontSize: "0.93rem", lineHeight: 1.9, color: G.body, maxWidth: "420px", marginBottom: "2.25rem" }}>
                We craft <span style={{ color: G.green, fontWeight: 600 }}>spiritual experiences</span> rooted in scripture. A church family called to love God and serve one another — no matter where you come from.
              </p>
              <div style={{ display: "flex", gap: "0.85rem", marginBottom: "2.75rem", flexWrap: "wrap" }}>
                <button className="btn-green" onClick={(e) => { addSparkle(e); showToast("Welcome! We'd love to see you this Sunday ✨"); }}
                  style={{ position: "relative", overflow: "hidden", display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: G.green, color: "#fff", padding: "0.82rem 1.9rem", borderRadius: "10px", fontSize: "0.87rem", fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
                  {sparkles.map(s => <Sparkle key={s.id} style={{ left: s.x, top: s.y, color: s.color }} />)}
                  Plan Your Visit
                  <i className="ti ti-arrow-right" style={{ fontSize: "14px" }} aria-hidden="true" />
                </button>
                <button className="btn-outline" onClick={() => setPage("blog")}
                  style={{ display: "inline-flex", alignItems: "center", gap: "7px", border: `1.5px solid ${G.border}`, color: G.ink, padding: "0.82rem 1.9rem", borderRadius: "10px", fontSize: "0.87rem", fontWeight: 600, background: "transparent", cursor: "pointer", fontFamily: "inherit" }}>
                  <i className="ti ti-book" style={{ fontSize: "14px" }} aria-hidden="true" /> Read Blog
                </button>
              </div>
              <div className="hero-stats-row" style={{ paddingTop: "1.75rem", borderTop: `1px solid ${G.border}` }}>
                {[
                  { label: "Sunday Services", val: "9 AM & 11 AM" },
                  { label: "Bible Study", val: "Wed 7 PM" },
                  { label: "Location", val: "Grace Ave" },
                ].map(s => (
                  <div key={s.label}>
                    <p className="tag" style={{ margin: "0 0 4px" }}>{s.label}</p>
                    <p style={{ fontSize: "0.86rem", color: G.body, fontWeight: 600, margin: 0 }}>{s.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right widgets */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Verse of the day */}
              <div style={{ backgroundColor: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: "16px", padding: "1.5rem", boxShadow: "0 4px 20px rgba(22,163,74,0.08)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg,${G.green},${G.greenMid},${G.gold})`, borderRadius: "16px 16px 0 0" }} />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "30px", height: "30px", borderRadius: "8px", backgroundColor: G.greenLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <i className="ti ti-book-2" style={{ fontSize: "15px", color: G.green }} aria-hidden="true" />
                    </div>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: G.greenText, textTransform: "uppercase", letterSpacing: "0.12em" }}>Verse of the Day</span>
                  </div>
                  <span style={{ fontSize: "0.7rem", color: G.hint }}>June 21</span>
                </div>
                <p className="display" style={{ fontStyle: "italic", fontSize: "1.02rem", color: G.ink, margin: "0 0 0.5rem", lineHeight: 1.75 }}>"{DAILY_VERSE.text}"</p>
                <p style={{ fontSize: "0.72rem", fontWeight: 700, color: G.green, margin: "0 0 0.85rem" }}>— {DAILY_VERSE.ref}</p>
                {!verseRead ? (
                  <button onClick={() => setVerseRead(true)} style={{ fontSize: "0.76rem", color: G.green, fontWeight: 600, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", padding: 0 }}>
                    Read reflection <Chevron open={false} size={12} color={G.green} />
                  </button>
                ) : (
                  <p style={{ fontSize: "0.82rem", lineHeight: 1.75, color: G.body, margin: "0.75rem 0 0", padding: "0.85rem", backgroundColor: G.greenLight, borderRadius: "8px", border: `1px solid ${G.greenBorder}` }}>
                    {DAILY_VERSE.reflection}
                  </p>
                )}
              </div>

              {/* Today's schedule */}
              <div style={{ backgroundColor: G.white, border: `1px solid ${G.border}`, borderRadius: "16px", padding: "1.4rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "30px", height: "30px", borderRadius: "8px", backgroundColor: G.blueLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <i className="ti ti-calendar-today" style={{ fontSize: "15px", color: G.blue }} aria-hidden="true" />
                    </div>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: G.ink }}>Today's Schedule</span>
                  </div>
                  <span style={{ fontSize: "0.7rem", color: G.green, fontWeight: 600 }}>Sunday</span>
                </div>
                {TODAY_SCHEDULE.slice(0, 4).map(s => (
                  <div key={s.title} style={{ display: "flex", gap: "10px", alignItems: "center", padding: "0.5rem 0", borderBottom: `1px solid ${G.borderLight}` }}>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: G.green, minWidth: "60px" }}>{s.time}</span>
                    <span style={{ fontSize: "0.8rem", color: G.body, flex: 1, fontWeight: 500 }}>{s.title}</span>
                    <span style={{ fontSize: "0.6rem", fontWeight: 700, color: s.badgeColor, backgroundColor: s.badgeColor + "15", padding: "2px 7px", borderRadius: "100px", flexShrink: 0 }}>{s.badge}</span>
                  </div>
                ))}
                <p style={{ fontSize: "0.72rem", color: G.hint, marginTop: "0.65rem", textAlign: "center" }}>+{TODAY_SCHEDULE.length - 4} more events today</p>
              </div>

              {/* Quick stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "0.85rem" }}>
                {[
                  { val: "40+", label: "Years of Ministry", icon: "ti-building-church" },
                  { val: "1,200+", label: "Church Members", icon: "ti-users" },
                  { val: "500+", label: "Families Served", icon: "ti-heart-handshake" },
                  { val: "12", label: "Active Ministries", icon: "ti-star" },
                ].map(s => (
                  <div key={s.label} style={{ backgroundColor: G.white, border: `1px solid ${G.border}`, borderRadius: "12px", padding: "1.1rem 1rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <i className={`ti ${s.icon}`} style={{ fontSize: "18px", color: G.green, display: "block", marginBottom: "6px" }} aria-hidden="true" />
                    <p className="display" style={{ fontSize: "1.55rem", fontWeight: 700, color: G.green, margin: "0 0 2px", letterSpacing: "-0.03em" }}>{s.val}</p>
                    <p style={{ fontSize: "0.7rem", color: G.muted, margin: 0 }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section style={{ backgroundColor: G.surface, padding: "6rem 2.5rem", borderTop: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "3rem" }}>
            <div>
              <p className="tag" style={{ margin: "0 0 0.75rem" }}>Get Involved</p>
              <div style={{ width: "28px", height: "2px", backgroundColor: G.green, marginBottom: "1.25rem", borderRadius: "2px" }} />
              <h2 className="display" style={{ fontSize: "2.4rem", fontWeight: 700, color: G.ink, letterSpacing: "-0.03em", margin: 0 }}>Programs &amp; Ministries</h2>
            </div>
            <p style={{ fontSize: "0.84rem", color: G.muted, maxWidth: "200px", textAlign: "right", lineHeight: 1.7, margin: 0 }}>Click any card to explore and register.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
            {PROGRAMS.map(p => (
              <div key={p.title} className="card-lift" onClick={() => setModal({ type: "program", data: p })}
                style={{ backgroundColor: G.white, borderRadius: "16px", border: `1px solid ${G.border}`, overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", position: "relative", cursor: "pointer" }}>
                {p.sparkle && (
                  <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", zIndex: 10, display: "flex", gap: "4px", alignItems: "center", backgroundColor: "rgba(255,255,255,0.95)", borderRadius: "100px", padding: "3px 8px", border: `1px solid ${G.greenBorder}` }}>
                    <span style={{ fontSize: "11px" }}>✦</span>
                    <span style={{ fontSize: "0.6rem", fontWeight: 700, color: G.greenText }}>Featured</span>
                  </div>
                )}
                <div style={{ height: "195px", overflow: "hidden", position: "relative" }}>
                  <UnsplashImg photoId={p.img?.replace("https://images.unsplash.com/","")?.split("?")[0] ?? p.img} params="w=600&q=80" alt={p.title} className="img-zoom"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  <div style={{ position: "absolute", top: "0.85rem", left: "0.85rem", backgroundColor: "rgba(255,255,255,0.96)", borderRadius: "100px", padding: "4px 12px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <i className={`ti ${p.icon}`} style={{ fontSize: "12px", color: G.green }} aria-hidden="true" />
                    <span style={{ fontSize: "0.64rem", fontWeight: 700, color: G.greenText }}>{p.time}</span>
                  </div>
                </div>
                <div style={{ padding: "1.25rem 1.35rem 1.5rem" }}>
                  <p style={{ fontSize: "0.64rem", color: G.hint, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", margin: "0 0 4px" }}>{p.subtitle}</p>
                  <p style={{ fontSize: "0.9rem", fontWeight: 700, color: G.ink, margin: "0 0 8px" }}>{p.title}</p>
                  <p style={{ fontSize: "0.81rem", lineHeight: 1.75, color: G.body, margin: "0 0 1rem" }}>{p.desc}</p>
                  <span style={{ fontSize: "0.75rem", color: G.green, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    Learn more <i className="ti ti-arrow-right" style={{ fontSize: "12px" }} aria-hidden="true" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRAYER BOARD ── */}
      <section style={{ backgroundColor: G.white, padding: "6rem 2.5rem", borderTop: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="tag" style={{ margin: "0 0 0.75rem" }}>Community Prayer</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "28px", height: "2px", backgroundColor: G.green, marginBottom: "1.25rem", borderRadius: "2px" }} />
            </div>
            <h2 className="display" style={{ fontSize: "2.4rem", fontWeight: 700, color: G.ink, letterSpacing: "-0.03em", margin: "0 0 0.75rem" }}>Prayer Board</h2>
            <p style={{ fontSize: "0.9rem", color: G.muted, maxWidth: "420px", margin: "0 auto" }}>Post a prayer request or praise report. The church family is standing with you.</p>
          </div>
          <div style={{ backgroundColor: G.surface, border: `1px solid ${G.border}`, borderRadius: "16px", padding: "1.5rem", maxWidth: "680px", margin: "0 auto 2.5rem" }}>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "1rem" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: user ? G.greenLight : G.surface, border: `1px solid ${G.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.78rem", color: G.green, flexShrink: 0 }}>
                {user?.avatar || <i className="ti ti-user" style={{ fontSize: "18px", color: G.hint }} aria-hidden="true" />}
              </div>
              <textarea value={newPrayer} onChange={e => setNewPrayer(e.target.value)}
                placeholder={user ? "Share a prayer request or praise report..." : "Sign in to post a prayer request..."}
                rows={3} disabled={!user} className="input-field"
                style={{ flex: 1, padding: "0.78rem 1rem", border: `1px solid ${G.border}`, borderRadius: "10px", fontSize: "0.87rem", color: G.ink, fontFamily: "inherit", backgroundColor: G.white, resize: "none" }} />
            </div>
            <div style={{ display: "flex", gap: "0.65rem", alignItems: "center" }}>
              <select value={newPrayerCat} onChange={e => setNewPrayerCat(e.target.value)} disabled={!user} className="input-field"
                style={{ padding: "0.55rem 0.85rem", border: `1px solid ${G.border}`, borderRadius: "8px", fontSize: "0.78rem", color: G.body, fontFamily: "inherit", backgroundColor: G.white }}>
                {["Prayer","Healing","Gratitude","Community","Marriage","Finances","Guidance"].map(c => <option key={c}>{c}</option>)}
              </select>
              <button onClick={user ? submitPrayer : () => setLoginOpen(true)} className="btn-green"
                style={{ marginLeft: "auto", backgroundColor: G.green, color: "#fff", border: "none", borderRadius: "9px", padding: "0.6rem 1.4rem", fontSize: "0.82rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: "6px" }}>
                <i className="ti ti-send" style={{ fontSize: "13px" }} aria-hidden="true" />
                {user ? "Post Prayer" : "Sign In to Post"}
              </button>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.25rem" }}>
            {prayerBoard.map(p => (
              <div key={p.id} style={{ backgroundColor: G.white, border: `1px solid ${G.border}`, borderRadius: "14px", padding: "1.4rem", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "0.9rem" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: p.color + "20", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.78rem", color: p.color, flexShrink: 0 }}>{p.avatar}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: "0.83rem", fontWeight: 700, color: G.ink, margin: "0 0 2px" }}>{p.name}</p>
                    <p style={{ fontSize: "0.7rem", color: G.hint, margin: 0 }}>{p.time}</p>
                  </div>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, color: p.color, backgroundColor: p.color + "15", padding: "3px 10px", borderRadius: "100px", border: `1px solid ${p.color}33` }}>{p.category}</span>
                </div>
                <p style={{ fontSize: "0.87rem", lineHeight: 1.8, color: G.body, margin: "0 0 1rem" }}>{p.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "0.85rem", borderTop: `1px solid ${G.borderLight}` }}>
                  <button onClick={() => likePrayer(p.id)} style={{ display: "flex", alignItems: "center", gap: "5px", background: "none", border: "none", cursor: likedPrayers.includes(p.id) ? "default" : "pointer", color: likedPrayers.includes(p.id) ? G.red : G.muted, fontSize: "0.78rem", fontWeight: 600, padding: 0, fontFamily: "inherit", transition: "color 0.15s" }}>
                    <i className={likedPrayers.includes(p.id) ? "ti ti-heart-filled" : "ti ti-heart"} style={{ fontSize: "15px" }} aria-hidden="true" />
                    {p.likes} praying
                  </button>
                  <span style={{ fontSize: "0.74rem", color: G.hint, marginLeft: "auto" }}>🙏 Amen</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EVENTS + BLOG ── */}
      <section className="grid-bg" style={{ padding: "6rem 2.5rem", borderTop: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
          <div>
            <p className="tag" style={{ margin: "0 0 0.75rem" }}>Mark Your Calendar</p>
            <div style={{ width: "28px", height: "2px", backgroundColor: G.green, marginBottom: "1.25rem", borderRadius: "2px" }} />
            <h2 className="display" style={{ fontSize: "2.4rem", fontWeight: 700, color: G.ink, letterSpacing: "-0.03em", margin: "0 0 2.5rem" }}>Upcoming Events</h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {EVENTS.map(ev => (
                <div key={ev.title} className="event-row" style={{ display: "grid", gridTemplateColumns: "62px 1fr", gap: "1rem", borderBottom: `1px solid ${G.borderLight}`, alignItems: "start" }}>
                  <div style={{ backgroundColor: G.greenLight, borderRadius: "10px", padding: "0.6rem 0.5rem", textAlign: "center", border: `1px solid ${G.greenBorder}` }}>
                    <p style={{ fontSize: "0.52rem", letterSpacing: "0.14em", textTransform: "uppercase", color: G.green, fontWeight: 700, margin: "0 0 2px" }}>{ev.month}</p>
                    <p className="display" style={{ fontSize: "1.25rem", fontWeight: 700, color: G.green, lineHeight: 1, margin: 0 }}>{ev.day}</p>
                  </div>
                  <div style={{ paddingTop: "2px" }}>
                    <p style={{ fontSize: "0.86rem", fontWeight: 700, color: G.ink, margin: "0 0 3px" }}>{ev.title}</p>
                    <p style={{ fontSize: "0.73rem", color: G.muted, margin: "0 0 4px", display: "flex", alignItems: "center", gap: "4px" }}>
                      <i className="ti ti-map-pin" style={{ fontSize: "11px" }} aria-hidden="true" />{ev.detail}
                    </p>
                    <p style={{ fontSize: "0.78rem", color: G.body, margin: 0, lineHeight: 1.6 }}>{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn-green" onClick={() => showToast("Full calendar coming soon!")}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "1.75rem", backgroundColor: G.green, color: "#fff", padding: "0.7rem 1.5rem", borderRadius: "10px", fontSize: "0.82rem", fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              View Full Calendar <i className="ti ti-calendar" style={{ fontSize: "13px" }} aria-hidden="true" />
            </button>
          </div>
          <div>
            <p className="tag" style={{ margin: "0 0 0.75rem" }}>From Our Blog</p>
            <div style={{ width: "28px", height: "2px", backgroundColor: G.green, marginBottom: "1.25rem", borderRadius: "2px" }} />
            <h2 className="display" style={{ fontSize: "2.4rem", fontWeight: 700, color: G.ink, letterSpacing: "-0.03em", margin: "0 0 2rem" }}>Latest Writings</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {BLOG_POSTS.slice(0, 3).map(b => (
                <div key={b.id} className="card-lift" onClick={() => { setPage("blog"); setBlogModal(b); }}
                  style={{ backgroundColor: G.white, borderRadius: "14px", border: `1px solid ${G.border}`, padding: "1.25rem", boxShadow: "0 1px 4px rgba(0,0,0,0.04)", display: "flex", gap: "1rem", alignItems: "flex-start", cursor: "pointer" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", backgroundColor: b.avatarColor + "20", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.78rem", color: b.avatarColor, flexShrink: 0 }}>{b.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Badge color={b.avatarColor} style={{ marginBottom: "5px" }}>{b.category}</Badge>
                    <p style={{ fontSize: "0.87rem", fontWeight: 700, color: G.ink, margin: "0 0 4px", lineHeight: 1.35 }}>{b.title}</p>
                    <p style={{ fontSize: "0.76rem", color: G.muted, margin: 0 }}>{b.author} · {b.readTime}</p>
                  </div>
                  <i className="ti ti-arrow-right" style={{ fontSize: "16px", color: G.hint, flexShrink: 0, marginTop: "2px" }} aria-hidden="true" />
                </div>
              ))}
            </div>
            <button onClick={() => setPage("blog")} className="btn-green"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "1.5rem", backgroundColor: G.green, color: "#fff", padding: "0.7rem 1.5rem", borderRadius: "10px", fontSize: "0.82rem", fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              All Blog Posts <i className="ti ti-arrow-right" style={{ fontSize: "13px" }} aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section style={{ backgroundColor: G.white, padding: "6rem 2.5rem", borderTop: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="tag" style={{ margin: "0 0 0.75rem" }}>Our Team</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "28px", height: "2px", backgroundColor: G.green, marginBottom: "1.25rem", borderRadius: "2px" }} />
            </div>
            <h2 className="display" style={{ fontSize: "2.4rem", fontWeight: 700, color: G.ink, letterSpacing: "-0.03em", margin: 0 }}>Meet the Leadership</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.75rem" }}>
            {TEAM.map(t => (
              <div key={t.name} className="card-lift" onClick={() => setModal({ type: "team", data: t })}
                style={{ backgroundColor: G.white, borderRadius: "16px", border: `1px solid ${G.border}`, overflow: "hidden", boxShadow: "0 1px 6px rgba(0,0,0,0.04)", textAlign: "center", cursor: "pointer" }}>
                <div style={{ height: "250px", overflow: "hidden" }}>
                  <UnsplashImg photoId={t.img?.replace("https://images.unsplash.com/","")?.split("?")[0] ?? t.img} params="w=400&q=80" alt={t.name} className="img-zoom"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
                <div style={{ padding: "1.5rem 1.4rem 1.8rem" }}>
                  <div style={{ marginBottom: "10px" }}>
                    <Badge color={G.greenText} bg={G.greenLight} border={G.greenBorder}>{t.years} Years of Service</Badge>
                  </div>
                  <p className="display" style={{ fontSize: "0.98rem", fontWeight: 700, color: G.ink, margin: "0 0 4px" }}>{t.name}</p>
                  <p className="tag" style={{ margin: "0 0 12px" }}>{t.role}</p>
                  <p style={{ fontSize: "0.78rem", lineHeight: 1.65, color: G.muted, margin: "0 0 14px" }}>{t.bio.substring(0, 90)}...</p>
                  <span style={{ fontSize: "0.75rem", color: G.green, fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    Read bio <i className="ti ti-arrow-right" style={{ fontSize: "12px" }} aria-hidden="true" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="grid-bg" style={{ padding: "6rem 2.5rem", borderTop: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p className="tag" style={{ margin: "0 0 0.75rem" }}>Stories of Faith</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ width: "28px", height: "2px", backgroundColor: G.green, marginBottom: "1.25rem", borderRadius: "2px" }} />
            </div>
            <h2 className="display" style={{ fontSize: "2.4rem", fontWeight: 700, color: G.ink, letterSpacing: "-0.03em", margin: 0 }}>From Our Community</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.25rem" }}>
            {[
              { name: "Abena Asante", role: "Member since 2018", quote: "Garmadu changed my life. I came broken and found a family. The community here is the most genuine I have ever encountered.", photoId: "photo-1573496359142-b8d87734a5a2" },
              { name: "Michael Darko", role: "Youth Ministry Leader", quote: "I grew up in this church and now I lead others. Pastor James has poured into me for years. The vision here is contagious.", photoId: "photo-1500648767791-00dcc994a43e" },
              { name: "Priscilla Ofori", role: "Women of Faith Member", quote: "The Women of Faith group gave me sisters I did not know I needed. Through loss and celebration — they walked every step with me.", photoId: "photo-1522202176988-66273c2fd55f" },
            ].map(t => (
              <div key={t.name} style={{ backgroundColor: G.white, borderRadius: "16px", border: `1px solid ${G.border}`, padding: "1.75rem", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", gap: "2px", marginBottom: "1.25rem" }}>
                  {[1,2,3,4,5].map(n => <i key={n} className="ti ti-star-filled" style={{ fontSize: "14px", color: G.gold }} aria-hidden="true" />)}
                </div>
                <p className="display" style={{ fontSize: "0.9rem", lineHeight: 1.9, color: G.body, fontStyle: "italic", margin: "0 0 1.75rem" }}>{t.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingTop: "1.25rem", borderTop: `1px solid ${G.border}` }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "50%", overflow: "hidden", border: `2px solid ${G.greenMid}`, flexShrink: 0 }}>
                    <UnsplashImg photoId={t.photoId} params="w=100&h=100&q=80&fit=crop&crop=face" alt={t.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.86rem", fontWeight: 700, color: G.ink, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: "0.72rem", color: G.muted, margin: 0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GIVE CTA ── */}
      <section style={{ backgroundColor: G.green, padding: "6rem 2.5rem" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", fontWeight: 700, margin: "0 0 1rem" }}>Support the Mission</p>
            <h2 className="display" style={{ fontSize: "2.5rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", margin: "0 0 1.5rem", lineHeight: 1.12 }}>Give Generously,<br />Change Lives</h2>
            <p style={{ fontSize: "0.94rem", lineHeight: 2, color: "rgba(255,255,255,0.8)", margin: "0 0 2.5rem" }}>Your generosity fuels local outreach, youth programs, global missions, and the daily work of this church family. Every gift makes a real difference.</p>
            <button onClick={() => showToast("Redirecting to secure giving portal...")}
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", backgroundColor: "#fff", color: G.green, padding: "0.8rem 1.9rem", borderRadius: "10px", fontSize: "0.86rem", fontWeight: 700, border: "none", cursor: "pointer", fontFamily: "inherit" }}>
              <i className="ti ti-heart" style={{ fontSize: "14px" }} aria-hidden="true" /> Give Online
            </button>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", paddingTop: "2rem", marginTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.15)" }}>
              {[{ val: "$2.4M", label: "Given Last Year" },{ val: "65%", label: "Goes to Outreach" },{ val: "8", label: "Missions Partners" }].map(s => (
                <div key={s.label}>
                  <p className="display" style={{ fontSize: "1.55rem", fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>{s.val}</p>
                  <p style={{ fontSize: "0.67rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", fontWeight: 600, margin: 0 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "4/3" }}>
            <UnsplashImg photoId="photo-1469571486292-0ba58a3f068b" params="w=900&q=85" alt="Community outreach"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section style={{ backgroundColor: G.white, padding: "6rem 2.5rem", borderTop: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "7rem" }}>
          <div>
            <p className="tag" style={{ margin: "0 0 0.75rem" }}>Get In Touch</p>
            <div style={{ width: "28px", height: "2px", backgroundColor: G.green, marginBottom: "1.25rem", borderRadius: "2px" }} />
            <h2 className="display" style={{ fontSize: "2.4rem", fontWeight: 700, color: G.ink, letterSpacing: "-0.03em", margin: "0 0 1.25rem", lineHeight: 1.12 }}>We Would Love<br />to Hear From You</h2>
            <p style={{ fontSize: "0.93rem", lineHeight: 2, color: G.body, margin: "0 0 3rem" }}>Whether you have a question, want to plan your first visit, or simply need someone to talk to — our team is here for you.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
              {[
                { icon: "ti-map-pin", label: "Address", val: "123 Grace Avenue, City, State 00000" },
                { icon: "ti-phone", label: "Phone", val: "(555) 123-4567" },
                { icon: "ti-mail", label: "Email", val: "hello@garmadu.org" },
                { icon: "ti-clock", label: "Office Hours", val: "Mon–Fri, 9:00 AM – 5:00 PM" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <div style={{ width: "42px", height: "42px", minWidth: "42px", backgroundColor: G.greenLight, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${G.greenBorder}` }}>
                    <i className={`ti ${c.icon}`} style={{ fontSize: "17px", color: G.green }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="tag" style={{ margin: "0 0 3px" }}>{c.label}</p>
                    <p style={{ fontSize: "0.9rem", color: G.body, fontWeight: 500, margin: 0 }}>{c.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ backgroundColor: G.surface, borderRadius: "20px", padding: "2.5rem", border: `1px solid ${G.border}` }}>
            <h3 className="display" style={{ fontSize: "1.2rem", fontWeight: 700, color: G.ink, margin: "0 0 0.4rem" }}>Send Us a Message</h3>
            <p style={{ fontSize: "0.82rem", color: G.muted, margin: "0 0 1.75rem" }}>We typically respond within one business day.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                {["First Name","Last Name"].map(f => (
                  <input key={f} type="text" placeholder={f} className="input-field" style={{ padding: "0.75rem 1rem", border: `1px solid ${G.border}`, borderRadius: "9px", backgroundColor: G.white, fontSize: "0.86rem", color: G.ink, fontFamily: "inherit", width: "100%" }} />
                ))}
              </div>
              {["Email Address","Phone Number"].map(f => (
                <input key={f} type="text" placeholder={f} className="input-field" style={{ padding: "0.75rem 1rem", border: `1px solid ${G.border}`, borderRadius: "9px", backgroundColor: G.white, fontSize: "0.86rem", color: G.ink, fontFamily: "inherit", width: "100%" }} />
              ))}
              <select className="input-field" style={{ padding: "0.75rem 1rem", border: `1px solid ${G.border}`, borderRadius: "9px", backgroundColor: G.white, fontSize: "0.86rem", color: G.muted, fontFamily: "inherit", width: "100%" }}>
                <option value="">How can we help you?</option>
                <option>Plan a First Visit</option>
                <option>Prayer Request</option>
                <option>Ministry Information</option>
                <option>General Inquiry</option>
              </select>
              <textarea placeholder="Your message" rows={4} className="input-field" style={{ padding: "0.75rem 1rem", border: `1px solid ${G.border}`, borderRadius: "9px", backgroundColor: G.white, fontSize: "0.86rem", color: G.ink, fontFamily: "inherit", width: "100%", resize: "none" }} />
              <button className="btn-green" onClick={() => showToast("Message sent! We will be in touch soon.")}
                style={{ backgroundColor: G.green, color: "#fff", padding: "0.9rem", border: "none", borderRadius: "9px", fontSize: "0.88rem", cursor: "pointer", fontFamily: "inherit", fontWeight: 700, width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                Send Message <i className="ti ti-send" style={{ fontSize: "14px" }} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer-pad" style={{ backgroundColor: G.ink, color: "#fff" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div className="footer-grid" style={{ paddingBottom: "3.5rem", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1.25rem" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", backgroundColor: G.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <CrossLogo size={22} color="#fff" />
                </div>
                <div>
                  <p className="display" style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", margin: 0, lineHeight: 1.2 }}>Garmadu Church</p>
                  <p style={{ fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", margin: 0, fontWeight: 600 }}>Est. 1984</p>
                </div>
              </div>
              <p style={{ fontSize: "0.84rem", lineHeight: 1.9, color: "rgba(255,255,255,0.42)", maxWidth: "240px", margin: "0 0 1.75rem" }}>A community of faith, grace, and service — rooted in scripture and open to all.</p>
            </div>
            {[
              { heading: "Ministries", links: ["Sunday Worship","Youth Ministry","Bible Study","Women of Faith","Men's Fellowship","Community Outreach"] },
              { heading: "Church", links: ["About Us","Leadership","Blog","Give Online","Prayer Board","Contact"] },
              { heading: "Connect", links: ["Plan a Visit","Newsletter","Volunteer","Privacy Policy","Admin Login"] },
            ].map(col => (
              <div key={col.heading}>
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: G.green, fontWeight: 700, margin: "0 0 1.25rem" }}>{col.heading}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                  {col.links.map(l => (
                    <button key={l} onClick={() => l === "Admin Login" ? setLoginOpen(true) : undefined}
                      style={{ fontSize: "0.83rem", color: "rgba(255,255,255,0.38)", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "inherit", padding: 0 }}>{l}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="footer-bottom-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1.75rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.22)", margin: 0 }}>© 2025 Garmadu Church. All rights reserved.</p>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.22)", margin: 0 }}>123 Grace Avenue · (555) 123-4567 · hello@garmadu.org</p>
          </div>
        </div>
      </footer>
    </>
  );
}
