"use client";
import { useState, useEffect } from "react";

const G = {
  green:      "#16A34A",
  greenDark:  "#15803D",
  greenLight: "#DCFCE7",
  greenMid:   "#BBF7D0",
  greenBorder:"#86EFAC",
  greenText:  "#166534",
  white:      "#FFFFFF",
  surface:    "#F8FAFB",
  border:     "#E5E7EB",
  borderLight:"#F3F4F6",
  ink:        "#0F172A",
  body:       "#374151",
  muted:      "#6B7280",
  hint:       "#9CA3AF",
  grid:       "rgba(0,0,0,0.04)",
};

function CrossLogo({ size = 28, color = "#fff" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <rect x="11" y="2" width="6" height="24" rx="3" fill={color} />
      <rect x="2" y="10" width="24" height="6" rx="3" fill={color} />
    </svg>
  );
}

const NAV_LINKS = ["Home", "About", "Programs", "Events", "Sermons", "Give", "Contact"];

const PROGRAMS = [
  { title: "Sunday Worship", subtitle: "Guyyaa Hujii", time: "Sun · 9 AM & 11 AM", desc: "Uplifting praise, powerful scripture, and a community that welcomes every soul.", detail: "Our worship services blend contemporary and traditional elements — live band, choir harmonies, and sermons grounded in everyday life. Whether it is your first visit or your hundredth, you will feel the warmth of a family that truly cares.", img: "/Hujii1.jpg", tags: ["All Ages", "Live Stream", "Weekly"], icon: "ti-sun" },
  { title: "Youth Ministry", subtitle: "Guuyyaa Hujii Mana Sagadaa", time: "Fri · 6:30 PM", desc: "A faith-filled space for teens and young adults to grow and discover purpose.", detail: "Led by passionate youth leaders, our Friday gatherings combine worship, small groups, and real conversations about faith. We run annual camps, service projects, and mentorship programs.", img: "/Hujii2.jpg", tags: ["Ages 13–25", "Friday Nights", "Mentorship"], icon: "ti-flame" },
  { title: "Bible Study", subtitle: "Mid-Week Scripture", time: "Wed · 7:00 PM", desc: "Guided verse-by-verse exploration of scripture with open discussion and prayer.", detail: "Our mid-week Bible Study is an intimate gathering where questions are welcomed and scripture comes alive. Led by Elder Boateng, we move through books of the Bible systematically.", img: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=85", tags: ["Adults", "Wednesday", "Small Groups"], icon: "ti-book" },
  { title: "Community Outreach", subtitle: "Sagantaa Laama", time: "Every 2nd Saturday", desc: "Serving neighbors through food drives, care packages, and mentorship programs.", detail: "We believe faith without works is incomplete. Our outreach team mobilizes 100+ volunteers each month to serve local families through food pantry, tutoring, and senior care.", img: "/Kadhanna.jpg", tags: ["All Ages", "Bi-monthly", "Volunteers Welcome"], icon: "ti-heart-handshake" },
  { title: "Women of Faith", subtitle: "Sagantaa Laamaa", time: "1st Thu · 6 PM", desc: "A sisterhood of encouragement, prayer, and growth in faith and calling.", detail: "Women of Faith is a space for authentic connection. Monthly gatherings feature guest speakers, worship nights, prayer circles, and community service with an annual retreat.", img: "/Sagantaalaama.jpg", tags: ["Women", "Monthly", "Annual Retreat"], icon: "ti-users" },
  { title: "Men's Fellowship", subtitle: "Guyyaa Hujii", time: "3rd Sat · 8 AM", desc: "Faith, accountability, and brotherly leadership over early morning fellowship.", detail: "Our Men's Fellowship begins with breakfast and ends with prayer. In between: honest conversations about faith, family, and purpose. Annual Iron Sharpens Iron conference included.", img: "/Hojii3.jpg", tags: ["Men", "Monthly", "Iron Sharpens Iron"], icon: "ti-anchor" },
];

const EVENTS = [
  { month: "JUN", day: "8",  title: "Summer Revival Weekend",        detail: "All Weekend · Main Sanctuary",     desc: "Three nights of worship, guest preachers, and community prayer." },
  { month: "JUN", day: "15", title: "Father's Day Celebration",      detail: "11:00 AM Service",                 desc: "A special service honoring fathers, followed by a church-wide lunch." },
  { month: "JUN", day: "22", title: "Community Food Drive",          detail: "9:00 AM · Church Parking Lot",     desc: "Collecting and distributing meals to 500+ local families." },
  { month: "JUL", day: "4",  title: "Family Picnic and Prayer",      detail: "Noon · Heritage Park",             desc: "Games, food, live music, and a sunset prayer over the holiday weekend." },
  { month: "JUL", day: "19", title: "Youth Summer Camp",             detail: "Jul 19–23 · Blue Ridge Mountains", desc: "A five-day camp for teens 13–18 with adventure, worship, and friendships." },
  { month: "AUG", day: "3",  title: "Women of Faith Annual Retreat", detail: "Fri–Sun · Lakeside Center",        desc: "Three days of renewal, teaching, and sisterhood for women of all ages." },
];

const TEAM = [
  { name: "Pastor James Osei", role: "Senior Pastor", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85", bio: "Pastor James has led Garmadu Church for 18 years with vision, compassion, and a deep love for people. He holds a Master of Divinity from Gordon-Conwell Theological Seminary.", verse: "Preach the word; be ready in season and out of season. — 2 Timothy 4:2", years: "18" },
  { name: "Rev. Grace Mensah", role: "Associate Pastor", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85", bio: "Rev. Grace oversees pastoral care, women's ministry, and counseling. With a heart for the hurting, she has built a culture of compassion and healing within the church family.", verse: "She is clothed with strength and dignity. — Proverbs 31:25", years: "10" },
  { name: "Elder David Boateng", role: "Elder & Deacon Board Chair", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=85", bio: "Elder David leads our deacon board, Bible Study, and community outreach initiatives. A retired educator with 30+ years in service, he brings wisdom and a servant heart.", verse: "Whoever wants to become great among you must be your servant. — Mark 10:43", years: "12" },
];

const SERMONS = [
  { title: "Walking in Purpose", speaker: "Pastor James Osei", date: "June 1, 2025", series: "Joseph: The Dreamer", img: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=85", desc: "How God weaves our trials into a greater story of purpose and redemption, through the life of Joseph." },
  { title: "The Power of the Gathered", speaker: "Rev. Grace Mensah", date: "May 25, 2025", series: "Together", img: "https://images.unsplash.com/photo-1438232992991-995b671e4268?w=800&q=85", desc: "What it truly means to be the body of Christ — gathered, unified, and alive with holy purpose." },
  { title: "Unshakeable Roots", speaker: "Elder David Boateng", date: "May 18, 2025", series: "Planted", img: "https://images.unsplash.com/photo-1493804714600-6edb1cd93080?w=800&q=85", desc: "Grounding your faith in scripture so that no storm, no season, can uproot what God has planted in you." },
];

const STATS = [
  { val: "40+",    label: "Years of Ministry" },
  { val: "1,200+", label: "Church Members" },
  { val: "500+",   label: "Families Served" },
  { val: "12",     label: "Active Ministries" },
];

const VALUES = [
  { icon: "ti-book-2",     label: "Scripture First",        text: "Every decision and teaching anchored in the Word of God." },
  { icon: "ti-door-enter", label: "Radical Welcome",        text: "Whoever you are, wherever you have been — you belong here." },
  { icon: "ti-world",      label: "Local & Global Mission", text: "We serve our neighbors and partner with global ministries." },
  { icon: "ti-flame",      label: "Spirit-Led Worship",     text: "We create space for the Holy Spirit to move freely in us." },
];

function Modal({ data, type, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);
  if (!data) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:999, backgroundColor:"rgba(15,23,42,0.55)", display:"flex", alignItems:"center", justifyContent:"center", padding:"2rem", backdropFilter:"blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{ backgroundColor:G.white, borderRadius:"20px", maxWidth: type==="team"?"500px":"640px", width:"100%", overflow:"hidden", border:`1px solid ${G.border}`, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 32px 80px rgba(0,0,0,0.15)" }}>
        <div style={{ display:"flex", justifyContent:"flex-end", padding:"1.25rem 1.5rem 0" }}>
          <button onClick={onClose} style={{ width:"32px", height:"32px", borderRadius:"8px", backgroundColor:G.surface, border:`1px solid ${G.border}`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:G.muted }}>
            <i className="ti ti-x" style={{ fontSize:"15px" }} aria-hidden="true" />
          </button>
        </div>
        {type === "program" && (
          <>
            <div style={{ height:"240px", overflow:"hidden", margin:"1rem 1.5rem 0", borderRadius:"12px" }}>
              <img src={data.img} alt={data.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
            </div>
            <div style={{ padding:"1.75rem 2rem 2.5rem" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"6px", backgroundColor:G.greenLight, borderRadius:"100px", padding:"4px 12px", marginBottom:"1rem" }}>
                <i className={`ti ${data.icon}`} style={{ fontSize:"13px", color:G.greenText }} aria-hidden="true" />
                <span style={{ fontSize:"0.7rem", fontWeight:"600", color:G.greenText, letterSpacing:"0.04em" }}>{data.time}</span>
              </div>
              <p style={{ fontSize:"0.72rem", color:G.hint, margin:"0 0 4px", fontWeight:"500", textTransform:"uppercase", letterSpacing:"0.08em" }}>{data.subtitle}</p>
              <h3 style={{ fontSize:"1.3rem", fontWeight:"700", color:G.ink, margin:"0 0 1rem" }}>{data.title}</h3>
              <p style={{ fontSize:"0.9rem", lineHeight:"1.9", color:G.body, margin:"0 0 1.5rem" }}>{data.detail}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:"0.5rem", marginBottom:"1.75rem" }}>
                {data.tags.map(t => (
                  <span key={t} style={{ backgroundColor:G.greenLight, color:G.greenText, padding:"4px 12px", borderRadius:"100px", fontSize:"0.73rem", fontWeight:"600", border:`1px solid ${G.greenBorder}` }}>{t}</span>
                ))}
              </div>
              <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:"8px", backgroundColor:G.green, color:"#fff", padding:"0.7rem 1.6rem", borderRadius:"10px", textDecoration:"none", fontWeight:"700", fontSize:"0.84rem" }}>
                Register Interest <i className="ti ti-arrow-right" style={{ fontSize:"13px" }} aria-hidden="true" />
              </a>
            </div>
          </>
        )}
        {type === "team" && (
          <div style={{ padding:"0.75rem 2rem 2.5rem" }}>
            <div style={{ display:"flex", gap:"1.25rem", alignItems:"center", marginBottom:"1.5rem" }}>
              <div style={{ width:"76px", height:"76px", borderRadius:"50%", overflow:"hidden", border:`3px solid ${G.greenMid}`, flexShrink:0 }}>
                <img src={data.img} alt={data.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              </div>
              <div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:"5px", backgroundColor:G.greenLight, borderRadius:"100px", padding:"3px 10px", marginBottom:"6px" }}>
                  <span style={{ fontSize:"0.65rem", color:G.greenText, fontWeight:"700" }}>{data.years} Years of Service</span>
                </div>
                <h3 style={{ fontSize:"1.1rem", fontWeight:"700", color:G.ink, margin:"0 0 3px" }}>{data.name}</h3>
                <p style={{ fontSize:"0.7rem", letterSpacing:"0.1em", textTransform:"uppercase", color:G.green, fontWeight:"700", margin:0 }}>{data.role}</p>
              </div>
            </div>
            <p style={{ fontSize:"0.9rem", lineHeight:"1.9", color:G.body, margin:"0 0 1.5rem" }}>{data.bio}</p>
            <div style={{ backgroundColor:G.greenLight, borderLeft:`3px solid ${G.green}`, padding:"1rem 1.25rem", borderRadius:"0 10px 10px 0" }}>
              <p style={{ fontSize:"0.88rem", fontStyle:"italic", color:G.greenText, margin:0, lineHeight:"1.75", fontFamily:"Georgia, serif" }}>{data.verse}</p>
            </div>
          </div>
        )}
        {type === "sermon" && (
          <>
            <div style={{ height:"200px", overflow:"hidden", margin:"1rem 1.5rem 0", borderRadius:"12px", position:"relative" }}>
              <img src={data.img} alt={data.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              <div style={{ position:"absolute", bottom:"1rem", left:"1.1rem" }}>
                <span style={{ backgroundColor:G.green, color:"#fff", fontSize:"0.62rem", fontWeight:"700", letterSpacing:"0.1em", textTransform:"uppercase", padding:"4px 12px", borderRadius:"100px" }}>{data.series}</span>
              </div>
            </div>
            <div style={{ padding:"1.75rem 2rem 2.5rem" }}>
              <h3 style={{ fontSize:"1.2rem", fontWeight:"700", color:G.ink, margin:"0 0 6px" }}>{data.title}</h3>
              <p style={{ fontSize:"0.78rem", color:G.muted, margin:"0 0 1rem" }}>{data.speaker} · {data.date}</p>
              <p style={{ fontSize:"0.9rem", lineHeight:"1.85", color:G.body, margin:"0 0 1.75rem" }}>{data.desc}</p>
              <div style={{ display:"flex", gap:"0.75rem" }}>
                <a href="#" style={{ flex:1, textAlign:"center", backgroundColor:G.green, color:"#fff", padding:"0.72rem", borderRadius:"10px", textDecoration:"none", fontWeight:"700", fontSize:"0.82rem", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}>
                  <i className="ti ti-player-play" style={{ fontSize:"13px" }} aria-hidden="true" /> Watch Now
                </a>
                <a href="#" style={{ flex:1, textAlign:"center", border:`1px solid ${G.border}`, color:G.ink, padding:"0.72rem", borderRadius:"10px", textDecoration:"none", fontWeight:"600", fontSize:"0.82rem", display:"flex", alignItems:"center", justifyContent:"center", gap:"6px" }}>
                  <i className="ti ti-headphones" style={{ fontSize:"13px" }} aria-hidden="true" /> Listen
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [modal, setModal] = useState(null);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setNavScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ fontFamily:"'Helvetica Neue', Helvetica, Arial, sans-serif", backgroundColor:G.white, color:G.ink, minHeight:"100vh" }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.0.0/dist/tabler-icons.min.css');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .display { font-family: 'Playfair Display', Georgia, serif; }
        .grid-bg {
          background-image: linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .card-lift { transition: transform 0.22s ease, box-shadow 0.22s ease; cursor: pointer; }
        .card-lift:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(22,163,74,0.10) !important; }
        .nav-link { transition: color 0.15s; }
        .nav-link:hover { color: #16A34A !important; }
        .btn-green { transition: background 0.15s, transform 0.12s; }
        .btn-green:hover { background: #15803D !important; transform: translateY(-1px); }
        .btn-outline { transition: all 0.15s; }
        .btn-outline:hover { border-color: #16A34A !important; color: #16A34A !important; transform: translateY(-1px); }
        .input-field:focus { border-color: #16A34A !important; outline: none; box-shadow: 0 0 0 3px rgba(22,163,74,0.12); }
        .event-row { transition: background 0.15s; border-radius: 10px; padding: 1.1rem 0.75rem; margin: 0 -0.75rem; }
        .event-row:hover { background: #F8FAFB; }
        .img-zoom { transition: transform 0.4s ease; }
        .card-lift:hover .img-zoom { transform: scale(1.04); }
        .tag { font-size: 0.62rem; letter-spacing: 0.18em; text-transform: uppercase; font-weight: 700; color: #16A34A; }
        .green-pill { display: inline-flex; align-items: center; gap: 6px; background: #DCFCE7; border: 1px solid #86EFAC; border-radius: 100px; padding: 5px 13px; }
        .green-dot { width: 7px; height: 7px; border-radius: 50%; background: #16A34A; }
      `}</style>

      {modal && <Modal data={modal.data} type={modal.type} onClose={() => setModal(null)} />}

      {/* NAV */}
      <header style={{ position:"sticky", top:0, zIndex:100, backgroundColor:"rgba(255,255,255,0.97)", backdropFilter:"blur(16px)", borderBottom:`1px solid ${navScrolled ? G.border : "transparent"}`, boxShadow: navScrolled ? "0 1px 20px rgba(0,0,0,0.06)" : "none", transition:"all 0.25s" }}>
        <div style={{ maxWidth:"1240px", margin:"0 auto", padding:"0 2.5rem", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
            <div style={{ width:"38px", height:"38px", borderRadius:"10px", backgroundColor:G.green, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <CrossLogo size={20} color="#fff" />
            </div>
            <div>
              <p style={{ fontFamily:"'Playfair Display', Georgia, serif", fontSize:"0.95rem", fontWeight:"700", color:G.ink, margin:0, lineHeight:1.2 }}>Garmadu</p>
              <p style={{ fontSize:"0.5rem", letterSpacing:"0.22em", textTransform:"uppercase", color:G.green, fontWeight:"700", margin:0 }}>Church · Est. 1984</p>
            </div>
          </div>
          <nav style={{ display:"flex", gap:"2rem" }}>
            {NAV_LINKS.map(l => (
              <a key={l} href="#" className="nav-link" style={{ fontSize:"0.8rem", color:G.muted, textDecoration:"none", fontWeight:"500" }}>{l}</a>
            ))}
          </nav>
          <div style={{ display:"flex", gap:"0.65rem", alignItems:"center" }}>
            <a href="#" className="btn-outline" style={{ border:`1px solid ${G.border}`, color:G.ink, padding:"0.5rem 1.1rem", borderRadius:"8px", fontSize:"0.78rem", textDecoration:"none", fontWeight:"600" }}>Watch Live</a>
            <a href="#" className="btn-green" style={{ backgroundColor:G.green, color:"#fff", padding:"0.5rem 1.2rem", borderRadius:"8px", fontSize:"0.78rem", textDecoration:"none", fontWeight:"700" }}>Plan a Visit</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="grid-bg" style={{ padding:"0 2.5rem", minHeight:"94vh", display:"flex", alignItems:"center" }}>
        <div style={{ maxWidth:"1240px", margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr", alignItems:"center", gap:"5rem", paddingTop:"3rem", paddingBottom:"3rem" }}>
          <div>
            <div className="green-pill" style={{ marginBottom:"2rem" }}>
              <span className="green-dot" />
              <span className="tag" style={{ margin:0 }}>Welcome Home</span>
            </div>

            <p style={{ fontSize:"0.85rem", color:G.muted, fontWeight:"500", margin:"0 0 0.6rem", letterSpacing:"0.01em" }}>Hello, we're</p>
            <h1 className="display" style={{ fontSize:"clamp(2.6rem, 5vw, 4rem)", fontWeight:"700", lineHeight:"1.06", color:G.ink, marginBottom:"0.5rem", letterSpacing:"-0.03em" }}>
              Garmadu Church
            </h1>
            <h2 style={{ fontSize:"clamp(1.1rem, 2vw, 1.45rem)", fontWeight:"400", color:G.green, margin:"0 0 1.75rem", letterSpacing:"-0.01em" }}>
              A place of <span style={{ fontWeight:"700" }}>Faith, Grace</span> and Community
            </h2>

            <p style={{ fontSize:"0.95rem", lineHeight:"1.9", color:G.body, maxWidth:"420px", marginBottom:"2.75rem" }}>
              We craft <span style={{ color:G.green, fontWeight:"600" }}>spiritual experiences</span> rooted in scripture. A church family called to love God and serve one another — no matter where you come from.
            </p>

            <div style={{ display:"flex", gap:"0.85rem", marginBottom:"3.5rem" }}>
              <a href="#" className="btn-green" style={{ display:"inline-flex", alignItems:"center", gap:"8px", backgroundColor:G.green, color:"#fff", padding:"0.85rem 2rem", borderRadius:"10px", fontSize:"0.87rem", textDecoration:"none", fontWeight:"700" }}>
                <i className="ti ti-code" style={{ fontSize:"14px" }} aria-hidden="true" />
                Plan Your Visit
                <i className="ti ti-arrow-right" style={{ fontSize:"14px" }} aria-hidden="true" />
              </a>
              <a href="#" className="btn-outline" style={{ display:"inline-flex", alignItems:"center", gap:"7px", border:`1.5px solid ${G.border}`, color:G.ink, padding:"0.85rem 2rem", borderRadius:"10px", fontSize:"0.87rem", textDecoration:"none", fontWeight:"600" }}>
                <i className="ti ti-mail" style={{ fontSize:"14px" }} aria-hidden="true" />
                Contact Us
              </a>
            </div>

            <div style={{ marginBottom:"2rem" }}>
              <p className="tag" style={{ marginBottom:"0.85rem" }}>Connect With Us</p>
              <div style={{ display:"flex", gap:"0.65rem" }}>
                {[
                  { icon:"ti-brand-github",    label:"GitHub"    },
                  { icon:"ti-brand-linkedin",  label:"LinkedIn"  },
                  { icon:"ti-mail",            label:"Email"     },
                  { icon:"ti-brand-youtube",   label:"YouTube"   },
                ].map(s => (
                  <a key={s.label} href="#" aria-label={s.label} style={{ width:"40px", height:"40px", borderRadius:"10px", border:`1px solid ${G.border}`, display:"flex", alignItems:"center", justifyContent:"center", color:G.muted, textDecoration:"none", backgroundColor:G.white, transition:"all 0.15s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=G.green; e.currentTarget.style.color=G.green; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor=G.border; e.currentTarget.style.color=G.muted; }}
                  >
                    <i className={`ti ${s.icon}`} style={{ fontSize:"18px" }} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div style={{ display:"flex", gap:"2.5rem", paddingTop:"2rem", borderTop:`1px solid ${G.border}` }}>
              {[
                { label:"Sunday Services", val:"9 AM & 11 AM" },
                { label:"Bible Study",     val:"Wed 7 PM"     },
                { label:"Location",        val:"Grace Ave"    },
              ].map(s => (
                <div key={s.label}>
                  <p className="tag" style={{ margin:"0 0 4px" }}>{s.label}</p>
                  <p style={{ fontSize:"0.86rem", color:G.body, fontWeight:"600", margin:0 }}>{s.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: stats + quick info cards in a grid */}
          <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
              {STATS.map(s => (
                <div key={s.label} style={{ backgroundColor:G.white, border:`1px solid ${G.border}`, borderRadius:"14px", padding:"1.5rem 1.25rem", boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
                  <p className="display" style={{ fontSize:"2rem", fontWeight:"700", color:G.green, margin:"0 0 4px", letterSpacing:"-0.03em" }}>{s.val}</p>
                  <p style={{ fontSize:"0.74rem", color:G.muted, margin:0, fontWeight:"500" }}>{s.label}</p>
                </div>
              ))}
            </div>
            {/* Next service card */}
            <div style={{ backgroundColor:G.white, border:`1px solid ${G.border}`, borderRadius:"14px", padding:"1.5rem", boxShadow:"0 2px 8px rgba(0,0,0,0.04)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <div>
                <p className="tag" style={{ margin:"0 0 5px" }}>Next Service</p>
                <p className="display" style={{ fontSize:"1.2rem", fontWeight:"700", color:G.ink, margin:0 }}>Sunday · 9:00 AM</p>
                <p style={{ fontSize:"0.78rem", color:G.muted, margin:"4px 0 0" }}>Main Sanctuary · All are welcome</p>
              </div>
              <div style={{ width:"46px", height:"46px", borderRadius:"50%", backgroundColor:G.greenLight, border:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <i className="ti ti-bell" style={{ fontSize:"20px", color:G.green }} aria-hidden="true" />
              </div>
            </div>
            {/* Scripture card */}
            <div style={{ backgroundColor:G.greenLight, border:`1px solid ${G.greenBorder}`, borderRadius:"14px", padding:"1.5rem" }}>
              <i className="ti ti-quote" style={{ fontSize:"20px", color:G.greenBorder, display:"block", marginBottom:"0.75rem" }} aria-hidden="true" />
              <p className="display" style={{ fontStyle:"italic", fontSize:"0.9rem", color:G.greenText, margin:"0 0 0.65rem", lineHeight:"1.8" }}>
                "For where two or three gather in my name, there am I with them."
              </p>
              <p className="tag" style={{ margin:0, color:G.greenText }}>Matthew 18:20</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ backgroundColor:G.white, padding:"8rem 2.5rem", borderTop:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:"1240px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"7rem", alignItems:"center" }}>
          <div style={{ position:"relative" }}>
            <div style={{ borderRadius:"20px", overflow:"hidden", aspectRatio:"4/3" }}>
              <img src="/3.png" alt="Worship" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
            </div>
            <div style={{ position:"absolute", bottom:"-1.75rem", right:"-1.75rem", backgroundColor:G.white, borderRadius:"14px", padding:"1.25rem 1.5rem", boxShadow:"0 12px 40px rgba(0,0,0,0.08)", border:`1px solid ${G.border}`, maxWidth:"190px" }}>
              <p className="display" style={{ fontSize:"2rem", fontWeight:"700", color:G.green, margin:"0 0 4px" }}>40+</p>
              <p style={{ fontSize:"0.74rem", color:G.muted, margin:0, lineHeight:"1.5" }}>Years serving this community</p>
            </div>
          </div>
          <div>
            <p className="tag" style={{ margin:"0 0 0.75rem" }}>Who We Are</p>
            <div style={{ width:"28px", height:"2px", backgroundColor:G.green, marginBottom:"1.25rem", borderRadius:"2px" }} />
            <h2 className="display" style={{ fontSize:"2.4rem", fontWeight:"700", lineHeight:"1.12", color:G.ink, letterSpacing:"-0.03em", margin:"0 0 1.5rem" }}>
              Rooted in Faith,<br />Open to All
            </h2>
            <p style={{ fontSize:"0.93rem", lineHeight:"2", color:G.body, margin:"0 0 1rem" }}>
              Garmadu Church has been a beacon of hope in this community for over 40 years. We believe the church is not a building — it is a people, bound together by love and a shared calling to make God known.
            </p>
            <p style={{ fontSize:"0.93rem", lineHeight:"2", color:G.body, margin:"0 0 2.5rem" }}>
              Our leaders are committed to authentic, scripture-centered teaching that meets you where you are and guides you toward a deeper relationship with God.
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.85rem", marginBottom:"2.5rem" }}>
              {VALUES.map(v => (
                <div key={v.label} style={{ backgroundColor:G.surface, borderRadius:"12px", padding:"1.1rem", border:`1px solid ${G.border}` }}>
                  <div style={{ width:"34px", height:"34px", borderRadius:"9px", backgroundColor:G.greenLight, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"9px" }}>
                    <i className={`ti ${v.icon}`} style={{ fontSize:"16px", color:G.green }} aria-hidden="true" />
                  </div>
                  <p style={{ fontSize:"0.8rem", fontWeight:"700", color:G.ink, margin:"0 0 4px" }}>{v.label}</p>
                  <p style={{ fontSize:"0.75rem", lineHeight:"1.6", color:G.muted, margin:0 }}>{v.text}</p>
                </div>
              ))}
            </div>
            <a href="#" className="btn-green" style={{ display:"inline-flex", alignItems:"center", gap:"8px", backgroundColor:G.green, color:"#fff", padding:"0.78rem 1.8rem", borderRadius:"10px", fontSize:"0.84rem", textDecoration:"none", fontWeight:"700" }}>
              Our Full Story <i className="ti ti-arrow-right" style={{ fontSize:"13px" }} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="grid-bg" style={{ padding:"8rem 2.5rem", borderTop:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:"1240px", margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:"4rem" }}>
            <div>
              <p className="tag" style={{ margin:"0 0 0.75rem" }}>Get Involved</p>
              <div style={{ width:"28px", height:"2px", backgroundColor:G.green, marginBottom:"1.25rem", borderRadius:"2px" }} />
              <h2 className="display" style={{ fontSize:"2.4rem", fontWeight:"700", color:G.ink, letterSpacing:"-0.03em", margin:0 }}>Programs & Ministries</h2>
            </div>
            <p style={{ fontSize:"0.84rem", color:G.muted, maxWidth:"220px", textAlign:"right", lineHeight:"1.7", margin:0 }}>Click any card to learn more and register.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"1.25rem" }}>
            {PROGRAMS.map(p => (
              <div key={p.title+p.subtitle} className="card-lift" onClick={() => setModal({ type:"program", data:p })} style={{ backgroundColor:G.white, borderRadius:"16px", border:`1px solid ${G.border}`, overflow:"hidden", boxShadow:"0 1px 6px rgba(0,0,0,0.04)" }}>
                <div style={{ height:"200px", overflow:"hidden", position:"relative" }}>
                  <img src={p.img} alt={p.title} className="img-zoom" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                  <div style={{ position:"absolute", top:"0.9rem", left:"0.9rem", backgroundColor:"rgba(255,255,255,0.96)", borderRadius:"100px", padding:"4px 12px", display:"flex", alignItems:"center", gap:"6px" }}>
                    <i className={`ti ${p.icon}`} style={{ fontSize:"12px", color:G.green }} aria-hidden="true" />
                    <span style={{ fontSize:"0.64rem", fontWeight:"700", color:G.greenText }}>{p.time}</span>
                  </div>
                </div>
                <div style={{ padding:"1.3rem 1.4rem 1.6rem" }}>
                  <p style={{ fontSize:"0.65rem", color:G.hint, fontWeight:"600", textTransform:"uppercase", letterSpacing:"0.1em", margin:"0 0 4px" }}>{p.subtitle}</p>
                  <p style={{ fontSize:"0.9rem", fontWeight:"700", color:G.ink, margin:"0 0 8px" }}>{p.title}</p>
                  <p style={{ fontSize:"0.82rem", lineHeight:"1.75", color:G.body, margin:"0 0 1rem" }}>{p.desc}</p>
                  <span style={{ fontSize:"0.76rem", color:G.green, fontWeight:"700", display:"inline-flex", alignItems:"center", gap:"4px" }}>
                    Learn more <i className="ti ti-arrow-right" style={{ fontSize:"12px" }} aria-hidden="true" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS + SERMON */}
      <section style={{ padding:"8rem 2.5rem", backgroundColor:G.white, borderTop:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:"1240px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6rem", alignItems:"start" }}>
          <div>
            <p className="tag" style={{ margin:"0 0 0.75rem" }}>Mark Your Calendar</p>
            <div style={{ width:"28px", height:"2px", backgroundColor:G.green, marginBottom:"1.25rem", borderRadius:"2px" }} />
            <h2 className="display" style={{ fontSize:"2.4rem", fontWeight:"700", color:G.ink, letterSpacing:"-0.03em", margin:"0 0 2.5rem" }}>Upcoming Events</h2>
            <div style={{ display:"flex", flexDirection:"column" }}>
              {EVENTS.map(ev => (
                <div key={ev.title} className="event-row" style={{ display:"grid", gridTemplateColumns:"64px 1fr", gap:"1.1rem", borderBottom:`1px solid ${G.borderLight}`, alignItems:"start" }}>
                  <div style={{ backgroundColor:G.greenLight, borderRadius:"10px", padding:"0.6rem 0.5rem", textAlign:"center", border:`1px solid ${G.greenBorder}` }}>
                    <p style={{ fontSize:"0.52rem", letterSpacing:"0.14em", textTransform:"uppercase", color:G.green, fontWeight:"700", margin:"0 0 2px" }}>{ev.month}</p>
                    <p className="display" style={{ fontSize:"1.25rem", fontWeight:"700", color:G.green, lineHeight:1, margin:0 }}>{ev.day}</p>
                  </div>
                  <div style={{ paddingTop:"2px" }}>
                    <p style={{ fontSize:"0.86rem", fontWeight:"700", color:G.ink, margin:"0 0 3px" }}>{ev.title}</p>
                    <p style={{ fontSize:"0.74rem", color:G.muted, margin:"0 0 4px", display:"flex", alignItems:"center", gap:"4px" }}>
                      <i className="ti ti-map-pin" style={{ fontSize:"11px" }} aria-hidden="true" />{ev.detail}
                    </p>
                    <p style={{ fontSize:"0.78rem", color:G.body, margin:0, lineHeight:"1.6" }}>{ev.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="#" className="btn-green" style={{ display:"inline-flex", alignItems:"center", gap:"8px", marginTop:"1.75rem", backgroundColor:G.green, color:"#fff", padding:"0.7rem 1.5rem", borderRadius:"10px", fontSize:"0.82rem", textDecoration:"none", fontWeight:"700" }}>
              View Full Calendar <i className="ti ti-calendar" style={{ fontSize:"13px" }} aria-hidden="true" />
            </a>
          </div>
          <div>
            <p className="tag" style={{ margin:"0 0 0.75rem" }}>Latest Message</p>
            <div style={{ width:"28px", height:"2px", backgroundColor:G.green, marginBottom:"1.25rem", borderRadius:"2px" }} />
            <h2 className="display" style={{ fontSize:"2.4rem", fontWeight:"700", color:G.ink, letterSpacing:"-0.03em", margin:"0 0 2rem" }}>This Sunday</h2>
            <div className="card-lift" onClick={() => setModal({ type:"sermon", data:SERMONS[0] })} style={{ borderRadius:"16px", border:`1px solid ${G.border}`, overflow:"hidden", boxShadow:"0 1px 6px rgba(0,0,0,0.04)" }}>
              <div style={{ height:"240px", overflow:"hidden", position:"relative" }}>
                <img src={SERMONS[0].img} alt="Latest sermon" className="img-zoom" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(15,23,42,0.8), transparent 50%)" }} />
                <div style={{ position:"absolute", top:"1rem", left:"1rem", backgroundColor:G.green, color:"#fff", fontSize:"0.64rem", fontWeight:"700", letterSpacing:"0.1em", textTransform:"uppercase", padding:"4px 12px", borderRadius:"100px", display:"flex", alignItems:"center", gap:"5px" }}>
                  <i className="ti ti-player-play" style={{ fontSize:"10px" }} aria-hidden="true" /> Watch Live
                </div>
                <div style={{ position:"absolute", bottom:"1.25rem", left:"1.4rem", right:"1.4rem" }}>
                  <p style={{ fontSize:"0.6rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.65)", fontWeight:"700", margin:"0 0 5px" }}>{SERMONS[0].series}</p>
                  <p className="display" style={{ fontSize:"1.2rem", fontWeight:"700", color:"#fff", margin:0, lineHeight:"1.3" }}>{SERMONS[0].title}</p>
                </div>
              </div>
              <div style={{ padding:"1.4rem 1.5rem 1.7rem" }}>
                <p style={{ fontSize:"0.76rem", color:G.muted, margin:"0 0 0.75rem" }}>{SERMONS[0].speaker} · {SERMONS[0].date}</p>
                <p style={{ fontSize:"0.86rem", lineHeight:"1.8", color:G.body, margin:"0 0 1.25rem" }}>{SERMONS[0].desc}</p>
                <div style={{ display:"flex", gap:"0.65rem" }}>
                  <a href="#" className="btn-green" style={{ display:"inline-flex", alignItems:"center", gap:"6px", backgroundColor:G.green, color:"#fff", padding:"0.6rem 1.3rem", borderRadius:"8px", fontSize:"0.78rem", textDecoration:"none", fontWeight:"700" }}>
                    <i className="ti ti-player-play" style={{ fontSize:"12px" }} aria-hidden="true" /> Watch
                  </a>
                  <a href="#" className="btn-outline" style={{ display:"inline-flex", alignItems:"center", gap:"6px", border:`1px solid ${G.border}`, color:G.ink, padding:"0.6rem 1.3rem", borderRadius:"8px", fontSize:"0.78rem", textDecoration:"none", fontWeight:"600" }}>
                    All Sermons <i className="ti ti-arrow-right" style={{ fontSize:"12px" }} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERMONS */}
      <section className="grid-bg" style={{ padding:"8rem 2.5rem", borderTop:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:"1240px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"4rem" }}>
            <p className="tag" style={{ margin:"0 0 0.75rem" }}>Word & Worship</p>
            <div style={{ display:"flex", justifyContent:"center" }}><div style={{ width:"28px", height:"2px", backgroundColor:G.green, marginBottom:"1.25rem", borderRadius:"2px" }} /></div>
            <h2 className="display" style={{ fontSize:"2.4rem", fontWeight:"700", color:G.ink, letterSpacing:"-0.03em", margin:0 }}>Recent Sermons</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"1.25rem" }}>
            {SERMONS.map(s => (
              <div key={s.title} className="card-lift" onClick={() => setModal({ type:"sermon", data:s })} style={{ backgroundColor:G.white, borderRadius:"16px", border:`1px solid ${G.border}`, overflow:"hidden", boxShadow:"0 1px 6px rgba(0,0,0,0.04)" }}>
                <div style={{ height:"190px", overflow:"hidden", position:"relative" }}>
                  <img src={s.img} alt={s.title} className="img-zoom" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(15,23,42,0.55), transparent 55%)" }} />
                  <div style={{ position:"absolute", top:"0.85rem", right:"0.85rem", width:"30px", height:"30px", borderRadius:"50%", backgroundColor:"rgba(255,255,255,0.95)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <i className="ti ti-player-play" style={{ fontSize:"13px", color:G.green }} aria-hidden="true" />
                  </div>
                  <div style={{ position:"absolute", bottom:"0.8rem", left:"1rem" }}>
                    <span style={{ backgroundColor:G.green, color:"#fff", fontSize:"0.6rem", fontWeight:"700", letterSpacing:"0.08em", textTransform:"uppercase", padding:"3px 9px", borderRadius:"100px" }}>{s.series}</span>
                  </div>
                </div>
                <div style={{ padding:"1.25rem 1.35rem 1.5rem" }}>
                  <p className="display" style={{ fontSize:"0.93rem", fontWeight:"700", color:G.ink, margin:"0 0 5px" }}>{s.title}</p>
                  <p style={{ fontSize:"0.73rem", color:G.muted, margin:"0 0 0.8rem", display:"flex", alignItems:"center", gap:"4px" }}>
                    <i className="ti ti-user" style={{ fontSize:"11px" }} aria-hidden="true" />{s.speaker} · {s.date}
                  </p>
                  <p style={{ fontSize:"0.81rem", lineHeight:"1.7", color:G.body, margin:0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section style={{ backgroundColor:G.white, padding:"8rem 2.5rem", borderTop:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:"1240px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"4rem" }}>
            <p className="tag" style={{ margin:"0 0 0.75rem" }}>Our Team</p>
            <div style={{ display:"flex", justifyContent:"center" }}><div style={{ width:"28px", height:"2px", backgroundColor:G.green, marginBottom:"1.25rem", borderRadius:"2px" }} /></div>
            <h2 className="display" style={{ fontSize:"2.4rem", fontWeight:"700", color:G.ink, letterSpacing:"-0.03em", margin:0 }}>Meet the Leadership</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"1.75rem" }}>
            {TEAM.map(t => (
              <div key={t.name} className="card-lift" onClick={() => setModal({ type:"team", data:t })} style={{ backgroundColor:G.white, borderRadius:"16px", border:`1px solid ${G.border}`, overflow:"hidden", boxShadow:"0 1px 6px rgba(0,0,0,0.04)", textAlign:"center" }}>
                <div style={{ height:"250px", overflow:"hidden", position:"relative" }}>
                  <img src={t.img} alt={t.name} className="img-zoom" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                </div>
                <div style={{ padding:"1.5rem 1.4rem 1.8rem" }}>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:"5px", backgroundColor:G.greenLight, borderRadius:"100px", padding:"3px 10px", marginBottom:"10px", border:`1px solid ${G.greenBorder}` }}>
                    <span style={{ fontSize:"0.62rem", color:G.greenText, fontWeight:"700" }}>{t.years} Years of Service</span>
                  </div>
                  <p className="display" style={{ fontSize:"0.98rem", fontWeight:"700", color:G.ink, margin:"0 0 4px" }}>{t.name}</p>
                  <p className="tag" style={{ margin:"0 0 12px" }}>{t.role}</p>
                  <p style={{ fontSize:"0.78rem", lineHeight:"1.65", color:G.muted, margin:"0 0 14px" }}>{t.bio.substring(0,90)}...</p>
                  <span style={{ fontSize:"0.76rem", color:G.green, fontWeight:"700", display:"inline-flex", alignItems:"center", gap:"4px" }}>
                    Read bio <i className="ti ti-arrow-right" style={{ fontSize:"12px" }} aria-hidden="true" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="grid-bg" style={{ padding:"8rem 2.5rem", borderTop:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:"1240px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"4rem" }}>
            <p className="tag" style={{ margin:"0 0 0.75rem" }}>Stories of Faith</p>
            <div style={{ display:"flex", justifyContent:"center" }}><div style={{ width:"28px", height:"2px", backgroundColor:G.green, marginBottom:"1.25rem", borderRadius:"2px" }} /></div>
            <h2 className="display" style={{ fontSize:"2.4rem", fontWeight:"700", color:G.ink, letterSpacing:"-0.03em", margin:0 }}>From Our Community</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"1.25rem" }}>
            {[
              { name:"Abena Asante",    role:"Member since 2018",     quote:"Garmadu changed my life. I came broken and found a family. The community here is the most genuine I have ever encountered — they show up for you.", img:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80" },
              { name:"Michael Darko",   role:"Youth Ministry Leader", quote:"I grew up in this church and now I lead others. Pastor James has poured into me for years. The vision here is contagious — you cannot help but want to be part of it.", img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" },
              { name:"Priscilla Ofori", role:"Women of Faith Member", quote:"The Women of Faith group gave me sisters I did not know I needed. Through loss, through celebration — these women have walked with me every step.", img:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&q=80" },
            ].map(t => (
              <div key={t.name} style={{ backgroundColor:G.white, borderRadius:"16px", border:`1px solid ${G.border}`, padding:"1.75rem", boxShadow:"0 1px 6px rgba(0,0,0,0.04)" }}>
                <div style={{ display:"flex", gap:"2px", marginBottom:"1.25rem" }}>
                  {[1,2,3,4,5].map(n => <i key={n} className="ti ti-star-filled" style={{ fontSize:"14px", color:G.green }} aria-hidden="true" />)}
                </div>
                <p className="display" style={{ fontSize:"0.9rem", lineHeight:"1.9", color:G.body, fontStyle:"italic", margin:"0 0 1.75rem" }}>{t.quote}</p>
                <div style={{ display:"flex", alignItems:"center", gap:"12px", paddingTop:"1.25rem", borderTop:`1px solid ${G.border}` }}>
                  <div style={{ width:"42px", height:"42px", borderRadius:"50%", overflow:"hidden", border:`2px solid ${G.greenMid}`, flexShrink:0 }}>
                    <img src={t.img} alt={t.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  </div>
                  <div>
                    <p style={{ fontSize:"0.86rem", fontWeight:"700", color:G.ink, margin:0 }}>{t.name}</p>
                    <p style={{ fontSize:"0.72rem", color:G.muted, margin:0 }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GIVE CTA — green bg */}
      <section style={{ backgroundColor:G.green, padding:"8rem 2.5rem" }}>
        <div style={{ maxWidth:"1240px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6rem", alignItems:"center" }}>
          <div>
            <p style={{ fontSize:"0.62rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.7)", fontWeight:"700", margin:"0 0 1rem" }}>Support the Mission</p>
            <div style={{ width:"28px", height:"2px", backgroundColor:"rgba(255,255,255,0.4)", marginBottom:"1.5rem", borderRadius:"2px" }} />
            <h2 className="display" style={{ fontSize:"2.5rem", fontWeight:"700", color:"#fff", letterSpacing:"-0.03em", margin:"0 0 1.5rem", lineHeight:"1.12" }}>
              Give Generously,<br />Change Lives
            </h2>
            <p style={{ fontSize:"0.94rem", lineHeight:"2", color:"rgba(255,255,255,0.8)", margin:"0 0 1rem" }}>Your generosity fuels local outreach, youth programs, global missions, and the daily work of this church family.</p>
            <p style={{ fontSize:"0.94rem", lineHeight:"2", color:"rgba(255,255,255,0.8)", margin:"0 0 2.5rem" }}>We are committed to full financial transparency. Annual reports are available to all members.</p>
            <div style={{ display:"flex", gap:"0.85rem" }}>
              <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:"8px", backgroundColor:"#fff", color:G.green, padding:"0.8rem 1.9rem", borderRadius:"10px", fontSize:"0.86rem", textDecoration:"none", fontWeight:"700" }}>
                <i className="ti ti-heart" style={{ fontSize:"14px" }} aria-hidden="true" /> Give Online
              </a>
              <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:"8px", border:"1px solid rgba(255,255,255,0.4)", color:"#fff", padding:"0.8rem 1.9rem", borderRadius:"10px", fontSize:"0.86rem", textDecoration:"none", fontWeight:"600" }}>
                Annual Report <i className="ti ti-arrow-right" style={{ fontSize:"13px" }} aria-hidden="true" />
              </a>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"1rem", marginTop:"3rem", paddingTop:"2.5rem", borderTop:"1px solid rgba(255,255,255,0.15)" }}>
              {[
                { val:"$2.4M", label:"Given Last Year" },
                { val:"65%",   label:"Goes to Outreach" },
                { val:"8",     label:"Missions Partners" },
              ].map(s => (
                <div key={s.label}>
                  <p className="display" style={{ fontSize:"1.55rem", fontWeight:"700", color:"#fff", margin:"0 0 4px" }}>{s.val}</p>
                  <p style={{ fontSize:"0.67rem", letterSpacing:"0.1em", textTransform:"uppercase", color:"rgba(255,255,255,0.55)", fontWeight:"600", margin:0 }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius:"20px", overflow:"hidden", aspectRatio:"4/3" }}>
            <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=900&q=85" alt="Community outreach" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ backgroundColor:G.white, padding:"8rem 2.5rem", borderTop:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:"1240px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"7rem" }}>
          <div>
            <p className="tag" style={{ margin:"0 0 0.75rem" }}>Get In Touch</p>
            <div style={{ width:"28px", height:"2px", backgroundColor:G.green, marginBottom:"1.25rem", borderRadius:"2px" }} />
            <h2 className="display" style={{ fontSize:"2.4rem", fontWeight:"700", color:G.ink, letterSpacing:"-0.03em", margin:"0 0 1.25rem", lineHeight:"1.12" }}>
              We Would Love<br />to Hear From You
            </h2>
            <p style={{ fontSize:"0.93rem", lineHeight:"2", color:G.body, margin:"0 0 3rem" }}>Whether you have a question, want to plan your first visit, or simply need someone to talk to — our team is here for you.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"1.4rem", marginBottom:"3rem" }}>
              {[
                { icon:"ti-map-pin", label:"Address",      val:"123 Grace Avenue, City, State 00000" },
                { icon:"ti-phone",   label:"Phone",        val:"(555) 123-4567" },
                { icon:"ti-mail",    label:"Email",        val:"hello@garmadu.org" },
                { icon:"ti-clock",   label:"Office Hours", val:"Mon–Fri, 9:00 AM – 5:00 PM" },
              ].map(c => (
                <div key={c.label} style={{ display:"flex", gap:"1rem", alignItems:"flex-start" }}>
                  <div style={{ width:"42px", height:"42px", minWidth:"42px", backgroundColor:G.greenLight, borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", border:`1px solid ${G.greenBorder}` }}>
                    <i className={`ti ${c.icon}`} style={{ fontSize:"17px", color:G.green }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="tag" style={{ margin:"0 0 3px" }}>{c.label}</p>
                    <p style={{ fontSize:"0.9rem", color:G.body, fontWeight:"500", margin:0 }}>{c.val}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:"0.65rem" }}>
              {[
                { icon:"ti-brand-facebook", label:"Facebook"  },
                { icon:"ti-brand-instagram",label:"Instagram" },
                { icon:"ti-brand-youtube",  label:"YouTube"   },
              ].map(s => (
                <a key={s.label} href="#" aria-label={s.label} style={{ width:"42px", height:"42px", borderRadius:"10px", backgroundColor:G.greenLight, border:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", color:G.green, textDecoration:"none" }}>
                  <i className={`ti ${s.icon}`} style={{ fontSize:"18px" }} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div style={{ backgroundColor:G.surface, borderRadius:"20px", padding:"2.5rem", border:`1px solid ${G.border}` }}>
            <h3 className="display" style={{ fontSize:"1.2rem", fontWeight:"700", color:G.ink, margin:"0 0 0.4rem" }}>Send Us a Message</h3>
            <p style={{ fontSize:"0.82rem", color:G.muted, margin:"0 0 2rem", lineHeight:"1.6" }}>We typically respond within one business day.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.9rem" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.8rem" }}>
                {["First Name", "Last Name"].map(f => (
                  <input key={f} type="text" placeholder={f} className="input-field" style={{ padding:"0.75rem 1rem", border:`1px solid ${G.border}`, borderRadius:"9px", backgroundColor:G.white, fontSize:"0.86rem", color:G.ink, fontFamily:"inherit", width:"100%" }} />
                ))}
              </div>
              {["Email Address", "Phone Number"].map(f => (
                <input key={f} type="text" placeholder={f} className="input-field" style={{ padding:"0.75rem 1rem", border:`1px solid ${G.border}`, borderRadius:"9px", backgroundColor:G.white, fontSize:"0.86rem", color:G.ink, fontFamily:"inherit", width:"100%" }} />
              ))}
              <select className="input-field" style={{ padding:"0.75rem 1rem", border:`1px solid ${G.border}`, borderRadius:"9px", backgroundColor:G.white, fontSize:"0.86rem", color:G.muted, fontFamily:"inherit", width:"100%" }}>
                <option value="">How can we help you?</option>
                <option>Plan a First Visit</option>
                <option>Prayer Request</option>
                <option>Ministry Information</option>
                <option>General Inquiry</option>
              </select>
              <textarea placeholder="Your message" rows={4} className="input-field" style={{ padding:"0.75rem 1rem", border:`1px solid ${G.border}`, borderRadius:"9px", backgroundColor:G.white, fontSize:"0.86rem", color:G.ink, resize:"vertical", fontFamily:"inherit", width:"100%" }} />
              <button className="btn-green" style={{ backgroundColor:G.green, color:"#fff", padding:"0.9rem", border:"none", borderRadius:"9px", fontSize:"0.88rem", cursor:"pointer", fontFamily:"inherit", fontWeight:"700", width:"100%", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
                Send Message <i className="ti ti-send" style={{ fontSize:"14px" }} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor:G.ink, color:"#fff", padding:"5rem 2.5rem 2.5rem" }}>
        <div style={{ maxWidth:"1240px", margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:"4rem", paddingBottom:"3.5rem", borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"1.25rem" }}>
                <div style={{ width:"40px", height:"40px", borderRadius:"10px", backgroundColor:G.green, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <CrossLogo size={22} color="#fff" />
                </div>
                <div>
                  <p className="display" style={{ fontSize:"1rem", fontWeight:"700", color:"#fff", margin:0, lineHeight:1.2 }}>Garmadu Church</p>
                  <p style={{ fontSize:"0.52rem", letterSpacing:"0.2em", textTransform:"uppercase", color:"rgba(255,255,255,0.4)", margin:0, fontWeight:"600" }}>Est. 1984</p>
                </div>
              </div>
              <p style={{ fontSize:"0.84rem", lineHeight:"1.9", color:"rgba(255,255,255,0.42)", maxWidth:"240px", margin:"0 0 1.75rem" }}>A community of faith, grace, and service — rooted in scripture and open to all.</p>
              <div style={{ display:"flex", gap:"0.6rem" }}>
                {[
                  { icon:"ti-brand-facebook", label:"Facebook"  },
                  { icon:"ti-brand-instagram",label:"Instagram" },
                  { icon:"ti-brand-youtube",  label:"YouTube"   },
                  { icon:"ti-mail",           label:"Email"     },
                ].map(s => (
                  <a key={s.label} href="#" aria-label={s.label} style={{ width:"34px", height:"34px", borderRadius:"9px", backgroundColor:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", display:"flex", alignItems:"center", justifyContent:"center", color:"rgba(255,255,255,0.42)", textDecoration:"none" }}>
                    <i className={`ti ${s.icon}`} style={{ fontSize:"15px" }} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
            {[
              { heading:"Ministries", links:["Sunday Worship","Youth Ministry","Bible Study","Women of Faith","Men's Fellowship","Community Outreach"] },
              { heading:"Church",     links:["About Us","Leadership","Our History","Statement of Faith","Give Online","Prayer Request"] },
              { heading:"Connect",    links:["Plan a Visit","Contact Us","Staff Directory","Newsletter","Volunteer","Privacy Policy"] },
            ].map(col => (
              <div key={col.heading}>
                <p style={{ fontSize:"0.6rem", letterSpacing:"0.18em", textTransform:"uppercase", color:G.green, fontWeight:"700", margin:"0 0 1.25rem" }}>{col.heading}</p>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.7rem" }}>
                  {col.links.map(l => (
                    <a key={l} href="#" style={{ fontSize:"0.83rem", color:"rgba(255,255,255,0.38)", textDecoration:"none" }}>{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:"1.75rem", flexWrap:"wrap", gap:"0.75rem" }}>
            <p style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.22)", margin:0 }}>© 2025 Garmadu Church. All rights reserved.</p>
            <p style={{ fontSize:"0.75rem", color:"rgba(255,255,255,0.22)", margin:0 }}>123 Grace Avenue · (555) 123-4567 · hello@garmadu.org</p>
          </div>
        </div>
      </footer>
    </div>
  );
}