const G = {
  primary:     "#86EFAC",
  primaryDark: "#22C55E",
  primaryDeep: "#16A34A",
  tint:        "#F0FDF4",
  tintStrong:  "#BBF7D0",
  ink:         "#0F172A",
  body:        "#475569",
  muted:       "#64748B",
  hint:        "#94A3B8",
  surface:     "#FFFFFF",
  surfaceAlt:  "#F8FAFC",
  border:      "#E2E8F0",
};

const NAV_LINKS = ["Home", "About", "Programs", "Events", "Sermons", "Give", "Contact"];

const PROGRAMS = [
  { title: "Sunday Worship",     time: "Sun · 9 AM & 11 AM",  desc: "Uplifting worship and scripture for everyday life." },
  { title: "Youth Ministry",     time: "Fri · 6:30 PM",       desc: "A faith-filled space for teens to grow and find purpose." },
  { title: "Bible Study",        time: "Wed · 7:00 PM",       desc: "Guided study and open discussion of scripture." },
  { title: "Community Outreach", time: "Every 2nd Saturday",  desc: "Food drives, mentorship and care for our neighbors." },
  { title: "Women of Faith",     time: "1st Thu · 6:00 PM",  desc: "Sisterhood of encouragement, prayer and spiritual growth." },
  { title: "Men's Fellowship",   time: "3rd Sat · 8:00 AM",  desc: "Faith, accountability and brotherly leadership." },
];

const EVENTS = [
  { date: "JUN 8",  title: "Summer Revival",           detail: "All weekend — Main Sanctuary" },
  { date: "JUN 15", title: "Father's Day Celebration",  detail: "11:00 AM Service" },
  { date: "JUN 22", title: "Community Food Drive",      detail: "9:00 AM — Church Parking Lot" },
  { date: "JUL 4",  title: "Family Picnic & Prayer",    detail: "Noon — Heritage Park" },
];

/* ── Inline SVG illustration: preacher + congregation ── */
function ChurchIllustration() {
  return (
    <svg viewBox="0 0 520 260" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: "520px" }}>
      {/* podium */}
      <rect x="220" y="140" width="80" height="10" rx="3" fill="#16A34A" opacity="0.8"/>
      <rect x="230" y="150" width="60" height="70" rx="2" fill="#22C55E" opacity="0.6"/>
      {/* preacher body */}
      <circle cx="260" cy="100" r="18" fill="#16A34A"/>
      <rect x="244" y="118" width="32" height="42" rx="6" fill="#16A34A"/>
      {/* preacher arms raised */}
      <line x1="244" y1="128" x2="222" y2="110" stroke="#16A34A" strokeWidth="7" strokeLinecap="round"/>
      <line x1="276" y1="128" x2="298" y2="110" stroke="#16A34A" strokeWidth="7" strokeLinecap="round"/>
      {/* preacher legs */}
      <line x1="252" y1="158" x2="248" y2="190" stroke="#16A34A" strokeWidth="7" strokeLinecap="round"/>
      <line x1="268" y1="158" x2="272" y2="190" stroke="#16A34A" strokeWidth="7" strokeLinecap="round"/>
      {/* bible in hand */}
      <rect x="210" y="104" width="14" height="10" rx="2" fill="#BBF7D0"/>

      {/* congregation left side */}
      {[60, 100, 140, 180].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={150 + (i % 2 === 0 ? 0 : 5)} r="12" fill="#86EFAC" opacity="0.85"/>
          <rect x={x - 10} y={162 + (i % 2 === 0 ? 0 : 5)} width="20" height="30" rx="4" fill="#86EFAC" opacity="0.65"/>
        </g>
      ))}
      {/* congregation right side */}
      {[340, 380, 420, 460].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={150 + (i % 2 === 0 ? 0 : 5)} r="12" fill="#86EFAC" opacity="0.85"/>
          <rect x={x - 10} y={162 + (i % 2 === 0 ? 0 : 5)} width="20" height="30" rx="4" fill="#86EFAC" opacity="0.65"/>
        </g>
      ))}
      {/* pews */}
      <rect x="40"  y="196" width="160" height="6" rx="2" fill="#BBF7D0"/>
      <rect x="320" y="196" width="160" height="6" rx="2" fill="#BBF7D0"/>
      {/* aisle line */}
      <line x1="260" y1="210" x2="260" y2="260" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4"/>
      {/* floor */}
      <rect x="0" y="220" width="520" height="4" rx="0" fill="#E2E8F0"/>
      {/* cross on wall */}
      <rect x="252" y="30" width="16" height="50" rx="2" fill="#16A34A" opacity="0.25"/>
      <rect x="238" y="44" width="44" height="14" rx="2" fill="#16A34A" opacity="0.25"/>
    </svg>
  );
}

export default function Home() {
  return (
    <div style={{ fontFamily: "'Georgia', serif", backgroundColor: G.surface, color: G.ink, minHeight: "100vh" }}>

      {/* ── Header ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 50,
        backgroundColor: G.surface,
        borderBottom: `1px solid ${G.border}`,
      }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto", padding: "0 2rem",
          height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <span style={{ fontSize: "1rem", fontWeight: "700", letterSpacing: "0.08em", color: G.primaryDeep }}>
            GARMADU
          </span>
          <nav style={{ display: "flex", gap: "1.5rem" }}>
            {NAV_LINKS.map(l => (
              <a key={l} href="#" style={{
                fontSize: "0.75rem", letterSpacing: "0.05em", textTransform: "uppercase",
                color: G.muted, textDecoration: "none",
              }}>{l}</a>
            ))}
          </nav>
          <a href="#" style={{
            backgroundColor: G.primaryDeep, color: "#fff",
            padding: "0.4rem 1.1rem", borderRadius: "4px",
            fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase",
            textDecoration: "none", fontWeight: "600",
          }}>Visit Us</a>
        </div>
      </header>

      {/* ── Hero — centered ── */}
      <section style={{
        backgroundColor: G.tint,
        borderBottom: `1px solid ${G.border}`,
        padding: "4.5rem 2rem 3.5rem",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <p style={{
            fontSize: "0.68rem", letterSpacing: "0.2em", textTransform: "uppercase",
            color: G.primaryDeep, marginBottom: "0.85rem",
          }}>Welcome Home</p>
          <h1 style={{
            fontSize: "clamp(1.9rem, 4.5vw, 3.2rem)", fontWeight: "400",
            lineHeight: "1.2", marginBottom: "1rem", color: G.ink,
          }}>
            A Place of Faith,{" "}
            <em style={{ fontStyle: "italic", color: G.primaryDeep }}>Grace &amp; Community</em>
          </h1>
          <p style={{
            fontSize: "0.95rem", lineHeight: "1.8", color: G.body,
            maxWidth: "480px", margin: "0 auto 2rem",
          }}>
            We are a church family rooted in scripture, called to love God and serve one another.
            No matter where you come from, you belong here.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3rem" }}>
            <a href="#" style={{
              backgroundColor: G.primaryDeep, color: "#fff",
              padding: "0.65rem 1.6rem", borderRadius: "4px",
              fontSize: "0.78rem", letterSpacing: "0.06em", textTransform: "uppercase",
              textDecoration: "none", fontWeight: "600",
            }}>Plan Your Visit</a>
            <a href="#" style={{
              border: `1.5px solid ${G.primaryDeep}`, color: G.primaryDeep,
              padding: "0.65rem 1.6rem", borderRadius: "4px",
              fontSize: "0.78rem", letterSpacing: "0.06em", textTransform: "uppercase",
              textDecoration: "none", fontWeight: "600", backgroundColor: G.surface,
            }}>Watch Online</a>
          </div>

          {/* Illustration */}
          <div style={{ margin: "0 auto", maxWidth: "480px" }}>
            <ChurchIllustration />
          </div>
        </div>

        {/* Service times strip */}
        <div style={{
          marginTop: "2.5rem", paddingTop: "2rem",
          borderTop: `1px solid ${G.border}`,
          display: "flex", gap: "2rem", flexWrap: "wrap", justifyContent: "center",
        }}>
          {[
            { label: "Sunday Service", val: "9:00 AM & 11:00 AM" },
            { label: "Bible Study",    val: "Wednesday 7:00 PM"  },
            { label: "Location",       val: "123 Grace Avenue"   },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "0.63rem", letterSpacing: "0.15em", textTransform: "uppercase", color: G.primaryDeep, marginBottom: "0.2rem" }}>{s.label}</div>
              <div style={{ fontSize: "0.85rem", color: G.body }}>{s.val}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Scripture strip ── */}
      <section style={{
        backgroundColor: G.surface, padding: "2.25rem 2rem",
        borderBottom: `1px solid ${G.border}`, textAlign: "center",
      }}>
        <p style={{ fontStyle: "italic", fontSize: "1rem", color: G.body, marginBottom: "0.35rem", maxWidth: "560px", margin: "0 auto 0.35rem", lineHeight: "1.75" }}>
          &ldquo;For where two or three gather in my name, there am I with them.&rdquo;
        </p>
        <span style={{ fontSize: "0.67rem", letterSpacing: "0.14em", textTransform: "uppercase", color: G.primaryDeep }}>Matthew 18:20</span>
      </section>

      {/* ── About ── */}
      <section style={{ padding: "4.5rem 2rem", backgroundColor: G.surface }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center",
        }}>
          <div>
            <p style={{ fontSize: "0.67rem", letterSpacing: "0.18em", textTransform: "uppercase", color: G.primaryDeep, marginBottom: "0.65rem" }}>Who We Are</p>
            <h2 style={{ fontSize: "1.85rem", fontWeight: "400", lineHeight: "1.3", marginBottom: "1.1rem", color: G.ink }}>
              Rooted in Faith,<br />Open to All
            </h2>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.85", color: G.body, marginBottom: "0.8rem" }}>
              Garmadu Church has been a beacon of hope in this community for over 40 years. We believe the church is not a building — it is a people, bound together by love.
            </p>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.85", color: G.body, marginBottom: "1.5rem" }}>
              Our leaders are committed to authentic, scripture-centered teaching that meets you where you are.
            </p>
            <a href="#" style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: G.primaryDeep, textDecoration: "none", borderBottom: `1px solid ${G.primaryDeep}`, paddingBottom: "2px" }}>
              Learn More
            </a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { num: "40+",    label: "Years of Ministry" },
              { num: "1,200+", label: "Church Family"     },
              { num: "12",     label: "Ministries"        },
              { num: "500+",   label: "Families Served"   },
            ].map(s => (
              <div key={s.label} style={{
                backgroundColor: G.tint, padding: "1.5rem 1.25rem",
                borderRadius: "6px", border: `1px solid ${G.border}`,
              }}>
                <div style={{ fontSize: "1.85rem", fontWeight: "400", color: G.primaryDeep, marginBottom: "0.25rem" }}>{s.num}</div>
                <div style={{ fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: G.muted }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programs ── */}
      <section style={{ backgroundColor: G.surfaceAlt, padding: "4.5rem 2rem", borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.67rem", letterSpacing: "0.18em", textTransform: "uppercase", color: G.primaryDeep, marginBottom: "0.5rem" }}>Get Involved</p>
          <h2 style={{ fontSize: "1.85rem", fontWeight: "400", color: G.ink, marginBottom: "2.25rem" }}>Programs &amp; Ministries</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.1rem" }}>
            {PROGRAMS.map(p => (
              <div key={p.title} style={{
                backgroundColor: G.surface, padding: "1.5rem",
                borderRadius: "6px", border: `1px solid ${G.border}`,
                borderTop: `3px solid ${G.primaryDark}`,
              }}>
                <div style={{ fontSize: "0.9rem", fontWeight: "700", color: G.ink, marginBottom: "0.25rem" }}>{p.title}</div>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: G.primaryDeep, marginBottom: "0.75rem" }}>{p.time}</div>
                <p style={{ fontSize: "0.84rem", lineHeight: "1.7", color: G.body, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events ── */}
      <section style={{ padding: "4.5rem 2rem", backgroundColor: G.surface }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
            <div>
              <p style={{ fontSize: "0.67rem", letterSpacing: "0.18em", textTransform: "uppercase", color: G.primaryDeep, marginBottom: "0.4rem" }}>Mark Your Calendar</p>
              <h2 style={{ fontSize: "1.85rem", fontWeight: "400", color: G.ink }}>Upcoming Events</h2>
            </div>
            <a href="#" style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: G.primaryDeep, textDecoration: "none", borderBottom: `1px solid ${G.primaryDeep}`, paddingBottom: "2px" }}>View All</a>
          </div>
          {EVENTS.map(ev => (
            <div key={ev.title} style={{
              display: "grid", gridTemplateColumns: "80px 1fr auto",
              alignItems: "center", gap: "1.5rem",
              padding: "1.1rem 0", borderBottom: `1px solid ${G.border}`,
            }}>
              <div style={{ fontSize: "0.67rem", fontWeight: "700", letterSpacing: "0.12em", textTransform: "uppercase", color: G.primaryDeep }}>{ev.date}</div>
              <div>
                <div style={{ fontSize: "0.9rem", fontWeight: "600", color: G.ink, marginBottom: "0.1rem" }}>{ev.title}</div>
                <div style={{ fontSize: "0.78rem", color: G.muted }}>{ev.detail}</div>
              </div>
              <a href="#" style={{ fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", color: G.primaryDeep, textDecoration: "none", borderBottom: `1px solid ${G.primaryDeep}`, paddingBottom: "1px", whiteSpace: "nowrap" }}>Details</a>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sermons ── */}
      <section style={{ backgroundColor: G.tint, padding: "4.5rem 2rem", borderTop: `1px solid ${G.border}`, borderBottom: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <div>
            <p style={{ fontSize: "0.67rem", letterSpacing: "0.18em", textTransform: "uppercase", color: G.primaryDeep, marginBottom: "0.65rem" }}>Latest Message</p>
            <h2 style={{ fontSize: "1.55rem", fontWeight: "400", lineHeight: "1.35", color: G.ink, marginBottom: "0.75rem" }}>
              "Walking in Purpose: Finding God's Plan for Your Life"
            </h2>
            <p style={{ fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", color: G.primaryDeep, marginBottom: "0.85rem" }}>
              Pastor James Osei — June 1, 2025
            </p>
            <p style={{ fontSize: "0.88rem", lineHeight: "1.8", color: G.body, marginBottom: "1.5rem" }}>
              Pastor James walks through the life of Joseph and how God weaves our trials into a greater story of purpose and redemption.
            </p>
            <a href="#" style={{
              backgroundColor: G.primaryDeep, color: "#fff",
              padding: "0.65rem 1.6rem", borderRadius: "4px",
              fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase",
              textDecoration: "none", fontWeight: "600", display: "inline-block",
            }}>Watch Now</a>
          </div>
          <div>
            <p style={{ fontSize: "0.67rem", letterSpacing: "0.18em", textTransform: "uppercase", color: G.primaryDeep, marginBottom: "1.1rem" }}>Recent Series</p>
            {[
              "Unshakeable Faith — 6-week Series",
              "The Beatitudes: Kingdom Living",
              "Prayer That Moves Mountains",
              "Letters to the Church: Philippians",
            ].map(t => (
              <div key={t} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "0.9rem 0", borderBottom: `1px solid ${G.border}`,
                fontSize: "0.87rem", color: G.body, cursor: "pointer",
              }}>
                <span>{t}</span>
                <span style={{ color: G.primaryDeep, fontSize: "0.82rem" }}>→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Give ── */}
      <section style={{ padding: "4.5rem 2rem", backgroundColor: G.surface, textAlign: "center" }}>
        <div style={{ maxWidth: "480px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.67rem", letterSpacing: "0.18em", textTransform: "uppercase", color: G.primaryDeep, marginBottom: "0.65rem" }}>Support the Mission</p>
          <h2 style={{ fontSize: "1.85rem", fontWeight: "400", color: G.ink, marginBottom: "0.9rem" }}>Give Generously</h2>
          <p style={{ fontSize: "0.88rem", lineHeight: "1.8", color: G.body, marginBottom: "1.5rem" }}>
            Your generosity fuels local outreach, youth programs, and global missions. Every gift makes a difference.
          </p>
          <a href="#" style={{
            backgroundColor: G.primaryDeep, color: "#fff",
            padding: "0.65rem 1.75rem", borderRadius: "4px",
            fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase",
            textDecoration: "none", fontWeight: "600", display: "inline-block",
          }}>Give Online</a>
        </div>
      </section>

      {/* ── Contact ── */}
      <section style={{ backgroundColor: G.surfaceAlt, padding: "4.5rem 2rem", borderTop: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem" }}>
          <div>
            <p style={{ fontSize: "0.67rem", letterSpacing: "0.18em", textTransform: "uppercase", color: G.primaryDeep, marginBottom: "0.65rem" }}>Get In Touch</p>
            <h2 style={{ fontSize: "1.85rem", fontWeight: "400", color: G.ink, marginBottom: "1.25rem" }}>We'd love to<br />hear from you</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                { label: "Address",      val: "123 Grace Avenue, City, State 00000" },
                { label: "Phone",        val: "(555) 123-4567" },
                { label: "Email",        val: "hello@garmadu.org" },
                { label: "Office Hours", val: "Mon–Fri, 9:00 AM – 5:00 PM" },
              ].map(c => (
                <div key={c.label}>
                  <div style={{ fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: G.primaryDeep, marginBottom: "0.15rem" }}>{c.label}</div>
                  <div style={{ fontSize: "0.87rem", color: G.body }}>{c.val}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {["Full Name", "Email Address", "Phone Number"].map(f => (
              <input key={f} type="text" placeholder={f} style={{
                padding: "0.7rem 0.9rem", border: `1px solid ${G.border}`,
                borderRadius: "4px", backgroundColor: G.surface,
                fontSize: "0.85rem", color: G.ink, outline: "none",
                fontFamily: "'Georgia', serif",
              }} />
            ))}
            <textarea placeholder="Your Message" rows={4} style={{
              padding: "0.7rem 0.9rem", border: `1px solid ${G.border}`,
              borderRadius: "4px", backgroundColor: G.surface,
              fontSize: "0.85rem", color: G.ink, outline: "none",
              resize: "vertical", fontFamily: "'Georgia', serif",
            }} />
            <button style={{
              backgroundColor: G.primaryDeep, color: "#fff",
              padding: "0.7rem 1.25rem", border: "none", borderRadius: "4px",
              fontSize: "0.75rem", letterSpacing: "0.06em", textTransform: "uppercase",
              cursor: "pointer", fontFamily: "'Georgia', serif", fontWeight: "600",
            }}>Send Message</button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ backgroundColor: G.surface, borderTop: `1px solid ${G.border}`, padding: "1.75rem 2rem" }}>
        <div style={{
          maxWidth: "1100px", margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem",
        }}>
          <span style={{ fontSize: "0.9rem", fontWeight: "700", color: G.primaryDeep, letterSpacing: "0.08em" }}>GARMADU</span>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy Policy", "Statement of Faith", "Staff Directory"].map(l => (
              <a key={l} href="#" style={{ fontSize: "0.7rem", letterSpacing: "0.06em", textTransform: "uppercase", color: G.muted, textDecoration: "none" }}>{l}</a>
            ))}
          </div>
          <span style={{ fontSize: "0.75rem", color: G.hint }}>2025 Garmadu Church. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}