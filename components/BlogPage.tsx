// ============================================================
// pages/BlogPage.tsx
// ============================================================
import { useState } from "react";
import { G, BLOG_POSTS, BLOG_PENDING } from "../constants/data";
import { Badge, ModalShell } from "../components/ui/Primitives";

interface BlogPageProps {
  blogModal: any;
  setBlogModal: (post: any) => void;
  user: any;
  showToast: (msg: string, type?: string) => void;
  blogPosts: any[];
  setBlogPosts: (posts: any[]) => void;
  pendingPosts: any[];
  setPendingPosts: (posts: any[]) => void;
  newBlogForm: any;
  setNewBlogForm: (form: any) => void;
  writingBlog: boolean;
  setWritingBlog: (writing: boolean) => void;
}

export function BlogPage({
  blogModal,
  setBlogModal,
  user,
  showToast,
  blogPosts,
  setBlogPosts,
  pendingPosts,
  setPendingPosts,
  newBlogForm,
  setNewBlogForm,
  writingBlog,
  setWritingBlog,
}: BlogPageProps) {
  const submitBlogDraft = () => {
    if (!newBlogForm.title || !newBlogForm.excerpt) return;
    const draft = {
      id: Date.now(),
      author: user?.name || "Member",
      authorRole: "Community Member",
      avatar: user?.avatar || "MB",
      avatarColor: G.green,
      date: "Just now",
      readTime: "3 min read",
      category: newBlogForm.category,
      title: newBlogForm.title,
      excerpt: newBlogForm.excerpt,
      img: "",
      tags: [newBlogForm.category],
      approved: false,
    };
    setPendingPosts((p: any[]) => [...p, draft]);
    setNewBlogForm({ title: "", category: "Faith", excerpt: "", content: "" });
    setWritingBlog(false);
    showToast("Draft submitted for admin review!");
  };

  return (
    <div style={{ backgroundColor: G.white, minHeight: "60vh" }}>
      {blogModal && (
        <ModalShell onClose={() => setBlogModal(null)} maxWidth="680px">
          {blogModal.img && (
            <div style={{ height: "260px", overflow: "hidden", margin: "0 1.5rem", borderRadius: "14px" }}>
              <img
                src={blogModal.img}
                alt={blogModal.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}
          <div style={{ padding: "1.75rem 2rem 2.5rem" }}>
            <Badge color={G.greenText} bg={G.greenLight} border={G.greenBorder} style={{ marginBottom: "0.85rem" }}>
              {blogModal.category}
            </Badge>
            <h2
              className="display"
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: G.ink,
                margin: "0.75rem 0 0.6rem",
                lineHeight: "1.3",
              }}
            >
              {blogModal.title}
            </h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "1.5rem",
                paddingBottom: "1.5rem",
                borderBottom: `1px solid ${G.border}`,
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: blogModal.avatarColor + "20",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  color: blogModal.avatarColor,
                }}
              >
                {blogModal.avatar}
              </div>
              <div>
                <p style={{ fontSize: "0.83rem", fontWeight: 700, color: G.ink, margin: 0 }}>
                  {blogModal.author}
                </p>
                <p style={{ fontSize: "0.72rem", color: G.muted, margin: 0 }}>
                  {blogModal.authorRole} · {blogModal.date} · {blogModal.readTime}
                </p>
              </div>
            </div>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.95", color: G.body, margin: "0 0 1.5rem" }}>
              {blogModal.excerpt}
            </p>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.95", color: G.body, margin: "0 0 1.5rem" }}>
              The Word of God speaks with clarity and authority to the question at hand. When we open
              our hearts to receive what scripture says — not just what we want it to say —
              transformation follows. This is the promise and the invitation extended to every
              believer who dares to sit with the text long enough to let it read them back.
            </p>
            <p style={{ fontSize: "0.95rem", lineHeight: "1.95", color: G.body }}>
              May you find in these words both a mirror and a window — a reflection of where you are,
              and a view toward where God is calling you.
            </p>
          </div>
        </ModalShell>
      )}

      <div className="grid-bg" style={{ padding: "5rem 2.5rem 4rem" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p className="tag" style={{ margin: "0 0 0.75rem" }}>
            Community Blog
          </p>
          <div
            style={{
              width: "28px",
              height: "2px",
              backgroundColor: G.green,
              marginBottom: "1.25rem",
              borderRadius: "2px",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <h2
              className="display"
              style={{
                fontSize: "2.5rem",
                fontWeight: 700,
                color: G.ink,
                letterSpacing: "-0.03em",
              }}
            >
              Stories & Teachings
            </h2>
            {(user?.role === "member" || user?.role === "admin") && !writingBlog && (
              <button
                onClick={() => setWritingBlog(true)}
                className="btn-green"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  backgroundColor: G.green,
                  color: "#fff",
                  padding: "0.72rem 1.5rem",
                  borderRadius: "10px",
                  fontSize: "0.84rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <i className="ti ti-pencil" style={{ fontSize: "14px" }} aria-hidden="true" /> Write a Post
              </button>
            )}
          </div>
        </div>
      </div>

      {writingBlog && (
        <div
          style={{
            borderTop: `1px solid ${G.border}`,
            borderBottom: `1px solid ${G.border}`,
            backgroundColor: G.surface,
            padding: "2.5rem",
          }}
        >
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 700, color: G.ink, margin: "0 0 1.25rem" }}>
              Write a new post
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              <input
                type="text"
                placeholder="Post title"
                className="input-field"
                value={newBlogForm.title}
                onChange={(e) => setNewBlogForm((f: any) => ({ ...f, title: e.target.value }))}
                style={{
                  padding: "0.78rem 1rem",
                  border: `1px solid ${G.border}`,
                  borderRadius: "10px",
                  fontSize: "0.9rem",
                  color: G.ink,
                  fontFamily: "inherit",
                  backgroundColor: G.white,
                }}
              />
              <select
                className="input-field"
                value={newBlogForm.category}
                onChange={(e) => setNewBlogForm((f: any) => ({ ...f, category: e.target.value }))}
                style={{
                  padding: "0.78rem 1rem",
                  border: `1px solid ${G.border}`,
                  borderRadius: "10px",
                  fontSize: "0.87rem",
                  color: G.body,
                  fontFamily: "inherit",
                  backgroundColor: G.white,
                }}
              >
                {["Faith", "Community", "Scripture", "Testimony", "Youth", "Prayer", "Ministry"].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <textarea
                placeholder="Write your post excerpt / summary (your full story will go here)..."
                rows={5}
                className="input-field"
                value={newBlogForm.excerpt}
                onChange={(e) => setNewBlogForm((f: any) => ({ ...f, excerpt: e.target.value }))}
                style={{
                  padding: "0.78rem 1rem",
                  border: `1px solid ${G.border}`,
                  borderRadius: "10px",
                  fontSize: "0.87rem",
                  color: G.ink,
                  fontFamily: "inherit",
                  backgroundColor: G.white,
                }}
              />
              <div style={{ display: "flex", gap: "0.65rem" }}>
                <button
                  onClick={submitBlogDraft}
                  className="btn-green"
                  style={{
                    backgroundColor: G.green,
                    color: "#fff",
                    border: "none",
                    borderRadius: "9px",
                    padding: "0.72rem 1.5rem",
                    fontSize: "0.84rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <i className="ti ti-send" style={{ fontSize: "13px" }} aria-hidden="true" /> Submit for Review
                </button>
                <button
                  onClick={() => setWritingBlog(false)}
                  className="btn-outline"
                  style={{
                    border: `1px solid ${G.border}`,
                    backgroundColor: "transparent",
                    color: G.muted,
                    borderRadius: "9px",
                    padding: "0.72rem 1.5rem",
                    fontSize: "0.84rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
              <p style={{ fontSize: "0.76rem", color: G.muted }}>
                Your post will be reviewed by an admin before being published to the community.
              </p>
            </div>
          </div>
        </div>
      )}

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "2rem" }}>
          {blogPosts.map((p: any, i: number) => (
            <div
              key={p.id}
              className="card-lift"
              onClick={() => setBlogModal(p)}
              style={{
                backgroundColor: G.white,
                borderRadius: "18px",
                border: `1px solid ${G.border}`,
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              }}
            >
              {p.img && (
                <div style={{ height: i === 0 ? "260px" : "190px", overflow: "hidden" }}>
                  <img
                    src={p.img}
                    alt={p.title}
                    className="img-zoom"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              )}
              <div style={{ padding: "1.5rem 1.6rem 1.8rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.85rem" }}>
                  <Badge color={p.avatarColor}>{p.category}</Badge>
                  <span style={{ fontSize: "0.7rem", color: G.hint }}>{p.readTime}</span>
                </div>
                <h3
                  className="display"
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: G.ink,
                    margin: "0 0 0.65rem",
                    lineHeight: "1.35",
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: "0.84rem", lineHeight: "1.8", color: G.body, margin: "0 0 1.25rem" }}>
                  {p.excerpt.substring(0, 160)}...
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    paddingTop: "1rem",
                    borderTop: `1px solid ${G.borderLight}`,
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: p.avatarColor + "20",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "0.7rem",
                      color: p.avatarColor,
                      flexShrink: 0,
                    }}
                  >
                    {p.avatar}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.8rem", fontWeight: 700, color: G.ink, margin: 0 }}>
                      {p.author}
                    </p>
                    <p style={{ fontSize: "0.7rem", color: G.muted, margin: 0 }}>{p.date}</p>
                  </div>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "0.76rem",
                      color: G.green,
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    Read <i className="ti ti-arrow-right" style={{ fontSize: "12px" }} aria-hidden="true" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}