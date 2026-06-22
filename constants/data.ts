// ============================================================
// constants/data.ts
// ============================================================

// Design Tokens
export const G = {
  green: "#16A34A",
  greenDark: "#15803D",
  greenLight: "#DCFCE7",
  greenMid: "#BBF7D0",
  greenBorder: "#86EFAC",
  greenText: "#166534",
  white: "#FFFFFF",
  surface: "#F8FAFB",
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  ink: "#0F172A",
  body: "#374151",
  muted: "#6B7280",
  hint: "#9CA3AF",
  gold: "#D97706",
  goldLight: "#FEF3C7",
  purple: "#7C3AED",
  purpleLight: "#EDE9FE",
  red: "#DC2626",
  redLight: "#FEE2E2",
  blue: "#2563EB",
  blueLight: "#DBEAFE",
};

// Daily Content
export const DAILY_VERSE = {
  text: "I can do all things through Christ who strengthens me.",
  ref: "Philippians 4:13",
  reflection:
    "Whatever you face today — a hard conversation, a big decision, a moment of doubt — you are not facing it alone. Lean into that strength.",
};

export const DAILY_REMINDER = {
  title: "Wednesday Bible Study Tonight",
  body: "Join us at 7:00 PM in the Main Hall. Elder Boateng continues our series through the book of Romans. Bring your Bible and a friend!",
  time: "7:00 PM · Main Hall",
};

// Today's Schedule
export const TODAY_SCHEDULE = [
  {
    time: "9:00 AM",
    title: "Morning Worship Service",
    loc: "Main Sanctuary",
    badge: "Live",
    badgeColor: G.red,
  },
  {
    time: "10:30 AM",
    title: "Children's Sunday School",
    loc: "Room 104",
    badge: "Kids",
    badgeColor: G.purple,
  },
  {
    time: "11:00 AM",
    title: "Second Worship Service",
    loc: "Main Sanctuary",
    badge: "Live",
    badgeColor: G.red,
  },
  {
    time: "1:00 PM",
    title: "Youth Fellowship Lunch",
    loc: "Fellowship Hall",
    badge: "Youth",
    badgeColor: G.blue,
  },
  {
    time: "3:00 PM",
    title: "Prayer & Intercession Circle",
    loc: "Chapel",
    badge: "Prayer",
    badgeColor: G.green,
  },
  {
    time: "7:00 PM",
    title: "Bible Study — Romans Series",
    loc: "Main Hall",
    badge: "Study",
    badgeColor: G.gold,
  },
];

// Notifications
export const NOTIFICATIONS = [
  {
    id: 1,
    icon: "ti-bell-ringing",
    color: G.red,
    unread: true,
    time: "2 min ago",
    text: "Summer Revival starts Friday! Register before seats fill.",
    detail: {
      title: "Summer Revival Weekend",
      when: "Fri, Jun 27 – Sun, Jun 29 · Main Sanctuary",
      body: "Three nights of worship, guest preachers, and community prayer. Doors open at 6:00 PM each evening with worship beginning at 6:30 PM. Childcare is provided for ages 0–8. Registration helps us plan seating and refreshments, so please reserve your spot as soon as you can — last year's revival reached capacity by Thursday.",
      action: "Reserve My Spot",
    },
  },
  {
    id: 2,
    icon: "ti-heart",
    color: G.purple,
    unread: true,
    time: "15 min ago",
    text: "Prayer request from Sister Abena: healing for her mother.",
    detail: {
      title: "Prayer Request — Healing",
      when: "Posted by Sister Abena A. · 15 min ago",
      body: "Sister Abena has asked the church family to stand with her in prayer as her mother recovers from a recent surgery. She shared that the procedure went well and the family is trusting God for a full and steady recovery. You can add your own prayer or encouragement on the Prayer Board.",
      action: "Open Prayer Board",
    },
  },
  {
    id: 3,
    icon: "ti-calendar-event",
    color: G.green,
    unread: true,
    time: "1 hr ago",
    text: "Community Food Drive this Saturday 9 AM — volunteers needed.",
    detail: {
      title: "Community Food Drive",
      when: "Sat, Jun 22 · 9:00 AM · Church Parking Lot",
      body: "We're collecting and distributing meals to more than 500 local families this Saturday. We still need volunteers for set-up (7:30 AM), sorting and packing (8:00 AM), and distribution (9:00 AM – 1:00 PM). No experience needed — just a willingness to serve. Bring a friend!",
      action: "Sign Up to Volunteer",
    },
  },
  {
    id: 4,
    icon: "ti-microphone",
    color: G.blue,
    unread: false,
    time: "3 hrs ago",
    text: "New sermon posted: 'Walking in Purpose' by Pastor James.",
    detail: {
      title: "New Sermon: Walking in Purpose",
      when: "Pastor James Osei · Posted 3 hrs ago",
      body: "In this message, Pastor James explores how purpose is discovered not in isolation but in faithful, daily obedience. Drawing from the life of Joseph, he unpacks what it looks like to trust God's timing even when the path forward isn't clear. Audio and full notes are now available on the Sermons page.",
      action: "Listen to Sermon",
    },
  },
  {
    id: 5,
    icon: "ti-star",
    color: G.gold,
    unread: false,
    time: "Yesterday",
    text: "Youth Camp registration closes in 48 hours. Spots nearly full!",
    detail: {
      title: "Youth Summer Camp — Registration Closing Soon",
      when: "Jul 19 – 23 · Blue Ridge Mountains",
      body: "Registration for this year's Youth Summer Camp closes in 48 hours. The five-day camp for teens 13–18 includes adventure activities, worship nights, and small-group mentorship. Only a handful of spots remain — register now to guarantee your teen's place.",
      action: "Register Now",
    },
  },
];

// Programs
export const PROGRAMS = [
  {
    title: "Sunday Worship",
    subtitle: "Guyyaa Hujii",
    time: "Sun · 9 AM & 11 AM",
    desc: "Uplifting praise, powerful scripture, and a community that welcomes every soul.",
    detail:
      "Our worship services blend contemporary and traditional elements — live band, choir harmonies, and sermons grounded in everyday life. You will feel the warmth of a family that truly cares.",
    img: "https://images.unsplash.com/photo-1438232992991-995b671e4268?w=800&q=85",
    tags: ["All Ages", "Live Stream", "Weekly"],
    icon: "ti-sun",
    sparkle: true,
  },
  {
    title: "Youth Ministry",
    subtitle: "Young Adults",
    time: "Fri · 6:30 PM",
    desc: "A faith-filled space for teens and young adults to grow and discover purpose.",
    detail:
      "Led by passionate youth leaders, our Friday gatherings combine worship, small groups, and real conversations about faith. Annual camps, service projects, and mentorship programs.",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85",
    tags: ["Ages 13–25", "Friday Nights", "Mentorship"],
    icon: "ti-flame",
    sparkle: false,
  },
  {
    title: "Bible Study",
    subtitle: "Mid-Week Scripture",
    time: "Wed · 7:00 PM",
    desc: "Guided verse-by-verse exploration of scripture with open discussion and prayer.",
    detail:
      "An intimate gathering where questions are welcomed and scripture comes alive. Led by Elder Boateng through books of the Bible systematically, drawing connections to modern life.",
    img: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=85",
    tags: ["Adults", "Wednesday", "Small Groups"],
    icon: "ti-book",
    sparkle: true,
  },
  {
    title: "Community Outreach",
    subtitle: "Sagantaa Laama",
    time: "Every 2nd Saturday",
    desc: "Serving neighbors through food drives, care packages, and mentorship programs.",
    detail:
      "Faith without works is incomplete. Our outreach team mobilizes 100+ volunteers each month. Programs include food pantry, after-school tutoring, senior care visits, and shelter partnerships.",
    img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=85",
    tags: ["All Ages", "Bi-monthly", "Volunteers"],
    icon: "ti-heart-handshake",
    sparkle: false,
  },
  {
    title: "Women of Faith",
    subtitle: "Sisters Circle",
    time: "1st Thu · 6 PM",
    desc: "A sisterhood of encouragement, prayer, and growth in faith and calling.",
    detail:
      "A space for authentic connection. Monthly gatherings feature guest speakers, worship nights, prayer circles, and community service. Annual retreat draws women from across the region.",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85",
    tags: ["Women", "Monthly", "Annual Retreat"],
    icon: "ti-users",
    sparkle: true,
  },
  {
    title: "Men's Fellowship",
    subtitle: "Iron Sharpens Iron",
    time: "3rd Sat · 8 AM",
    desc: "Faith, accountability, and brotherly leadership over early morning fellowship.",
    detail:
      "Begins with breakfast, ends with prayer. Honest conversations about faith, family, and purpose. Annual Iron Sharpens Iron conference and community build projects.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85",
    tags: ["Men", "Monthly", "Leadership"],
    icon: "ti-anchor",
    sparkle: false,
  },
];

// Prayer Board
export const PRAYER_BOARD = [
  {
    id: 1,
    name: "Sister Abena A.",
    avatar: "AA",
    time: "10 min ago",
    category: "Healing",
    text: "Please pray for my mother who is recovering from surgery. Believing for a full restoration. God is faithful!",
    likes: 24,
    color: G.purple,
  },
  {
    id: 2,
    name: "Brother Michael D.",
    avatar: "MD",
    time: "2 hrs ago",
    category: "Gratitude",
    text: "Praising God for a job offer after 6 months of searching. His timing is always perfect. Thank you church family for your prayers!",
    likes: 67,
    color: G.green,
  },
  {
    id: 3,
    name: "Pastor James O.",
    avatar: "PJ",
    time: "Yesterday",
    category: "Community",
    text: "Lifting up all families facing financial hardship this season. May God open doors and provide in supernatural ways. Let us agree together.",
    likes: 89,
    color: G.gold,
  },
  {
    id: 4,
    name: "Sister Priscilla O.",
    avatar: "PO",
    time: "2 days ago",
    category: "Marriage",
    text: "Pray for my husband and I as we navigate a difficult season together. We believe God restores and renews. Standing on His promises.",
    likes: 41,
    color: G.red,
  },
];

// Blog Posts
export const BLOG_POSTS = [
  {
    id: 1,
    author: "Pastor James Osei",
    authorRole: "Senior Pastor",
    avatar: "PJ",
    avatarColor: G.green,
    date: "June 12, 2025",
    readTime: "5 min read",
    category: "Faith",
    title: "When God Says Wait: Finding Peace in the Pause",
    excerpt:
      "Waiting is perhaps the hardest spiritual discipline. In a world of instant everything, the call to wait feels like a contradiction of faith. But the Bible is full of men and women who waited — and what they discovered in the waiting changed everything.",
    img: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=85",
    tags: ["Faith", "Prayer", "Patience"],
    approved: true,
  },
  {
    id: 2,
    author: "Rev. Grace Mensah",
    authorRole: "Associate Pastor",
    avatar: "RG",
    avatarColor: G.purple,
    date: "June 5, 2025",
    readTime: "4 min read",
    category: "Community",
    title: "The Forgotten Art of Sitting With Someone in Pain",
    excerpt:
      "We live in a culture that rushes to fix, to advise, to silver-line every cloud. But sometimes the most powerful thing we can do for someone who is hurting is simply to sit with them — no words, no solutions, just presence.",
    img: "https://images.unsplash.com/photo-1438232992991-995b671e4268?w=800&q=85",
    tags: ["Community", "Compassion", "Ministry"],
    approved: true,
  },
  {
    id: 3,
    author: "Elder David Boateng",
    authorRole: "Elder & Bible Teacher",
    avatar: "EB",
    avatarColor: G.blue,
    date: "May 29, 2025",
    readTime: "7 min read",
    category: "Scripture",
    title: "Romans 8:28 — What 'All Things' Actually Means",
    excerpt:
      "Perhaps no verse is quoted more in Christian circles than Romans 8:28. But familiarity can breed shallow understanding. A deep dive into the original Greek reveals something far richer and more demanding than the comfort poster version.",
    img: "https://images.unsplash.com/photo-1493804714600-6edb1cd93080?w=800&q=85",
    tags: ["Scripture", "Romans", "Deep Dive"],
    approved: true,
  },
  {
    id: 4,
    author: "Youth Leader Kofi A.",
    authorRole: "Youth Ministry Leader",
    avatar: "KA",
    avatarColor: G.gold,
    date: "May 20, 2025",
    readTime: "3 min read",
    category: "Youth",
    title: "Why Gen Z is Actually Hungry for the Ancient Gospel",
    excerpt:
      "Everyone says young people are leaving the church. But I see something different every Friday night. The teens I work with are desperately searching for something real — something that holds up under pressure. And the gospel holds.",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=85",
    tags: ["Youth", "Gospel", "Gen Z"],
    approved: true,
  },
];

// Pending Blog Posts
export const BLOG_PENDING = [
  {
    id: 5,
    author: "Sister Abena A.",
    authorRole: "Women of Faith Member",
    avatar: "AA",
    avatarColor: G.purple,
    date: "June 14, 2025",
    readTime: "4 min read",
    category: "Testimony",
    title: "How Prayer Carried Me Through My Mother's Illness",
    excerpt:
      "Six weeks ago I got a call no child wants to receive. My mother had collapsed. What followed was the hardest season of my life — and the most intimate encounter with God I have ever known.",
    img: "",
    tags: ["Testimony", "Healing", "Prayer"],
    approved: false,
  },
];

// Events
export const EVENTS = [
  {
    month: "JUN",
    day: "22",
    title: "Community Food Drive",
    detail: "9:00 AM · Church Parking Lot",
    desc: "Collecting and distributing meals to 500+ local families.",
  },
  {
    month: "JUN",
    day: "27",
    title: "Summer Revival Weekend",
    detail: "Fri–Sun · Main Sanctuary",
    desc: "Three nights of worship, guest preachers, and community prayer.",
  },
  {
    month: "JUL",
    day: "4",
    title: "Family Picnic and Prayer",
    detail: "Noon · Heritage Park",
    desc: "Games, food, live music, and a sunset prayer over the holiday weekend.",
  },
  {
    month: "JUL",
    day: "19",
    title: "Youth Summer Camp",
    detail: "Jul 19–23 · Blue Ridge Mountains",
    desc: "A five-day camp for teens 13–18 with adventure, worship, and friendships.",
  },
  {
    month: "AUG",
    day: "3",
    title: "Women of Faith Annual Retreat",
    detail: "Fri–Sun · Lakeside Center",
    desc: "Three days of renewal, teaching, and sisterhood for women of all ages.",
  },
  {
    month: "AUG",
    day: "17",
    title: "Back to School Prayer Sunday",
    detail: "10:00 AM · Main Sanctuary",
    desc: "Praying over students, teachers, and families as a new school year begins.",
  },
];

// Team Members
export const TEAM = [
  {
    name: "Pastor James Osei",
    role: "Senior Pastor",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85",
    bio: "Pastor James has led Garmadu Church for 18 years with vision, compassion, and a deep love for people. He holds a Master of Divinity from Gordon-Conwell Theological Seminary.",
    verse: "Preach the word; be ready in season and out of season. — 2 Timothy 4:2",
    years: "18",
  },
  {
    name: "Rev. Grace Mensah",
    role: "Associate Pastor",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=85",
    bio: "Rev. Grace oversees pastoral care, women's ministry, and counseling. With a heart for the hurting, she has built a culture of compassion and healing within the church family.",
    verse: "She is clothed with strength and dignity. — Proverbs 31:25",
    years: "10",
  },
  {
    name: "Elder David Boateng",
    role: "Elder & Deacon Chair",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=85",
    bio: "Elder David leads our deacon board, Bible Study, and community outreach. A retired educator with 30+ years in service, he brings wisdom and a servant heart to everything.",
    verse: "Whoever wants to become great among you must be your servant. — Mark 10:43",
    years: "12",
  },
];

export const NAV_LINKS = [
  "Home",
  "About",
  "Programs",
  "Blog",
  "Events",
  "Sermons",
  "Give",
  "Contact",
];

export const CLERK_CONFIG = {
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "",
  afterSignInUrl: "/",
  afterSignUpUrl: "/",
  signInUrl: "/sign-in",
  signUpUrl: "/sign-up",
};

export const ADMIN_CREDENTIALS = {
  email: "admin@garmadu.org",
  password: "admin123",
};

export const MEMBER_CREDENTIALS = {
  email: "member@garmadu.org",
  password: "member123",
};