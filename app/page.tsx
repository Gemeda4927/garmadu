"use client";

import { useState } from "react";
import { ClerkProvider, useUser, useClerk } from "@clerk/clerk-react";

// Components
import { ContentModal, LoginModal } from "@/components/Modals";
import { NotifDetailModal, NotifPanel } from "@/components/Notifications";
import { Navigation } from "@/components/Navigation";
import { HomePage } from "@/components/HomePage";
import { BlogPage } from "@/components/BlogPage";
import { AdminPage } from "@/components/AdminPage";

// Constants
import {
  NOTIFICATIONS,
  PRAYER_BOARD,
  BLOG_POSTS,
  BLOG_PENDING,
  G,
} from "@/constants/data";
import { GLOBAL_CSS } from "@/constants/styles";

// Types
import {
  Notification,
  BlogPost,
  Prayer,
  ModalData,
  Sparkle,
  Toast,
  BlogForm,
  User,
} from "../constants/types";

const clerkPubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

// Inner App Component (uses Clerk hooks)
function AppContent() {
  const { user, isSignedIn } = useUser();
  const { signOut } = useClerk();

  // Navigation state
  const [page, setPage] = useState<string>("home");
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<"sign-in" | "sign-up">("sign-in");

  // Modal state
  const [modal, setModal] = useState<ModalData | null>(null);
  const [blogModal, setBlogModal] = useState<BlogPost | null>(null);

  // Notification state
  const [notifications, setNotifications] = useState<Notification[]>(NOTIFICATIONS);
  const [notifOpen, setNotifOpen] = useState<boolean>(false);
  const [notifCollapsed, setNotifCollapsed] = useState<boolean>(false);
  const [expandedNotifId, setExpandedNotifId] = useState<number | null>(null);
  const [notifDetailModal, setNotifDetailModal] = useState<Notification | null>(null);

  // Prayer board state
  const [prayerBoard, setPrayerBoard] = useState<Prayer[]>(PRAYER_BOARD);
  const [newPrayer, setNewPrayer] = useState<string>("");
  const [newPrayerCat, setNewPrayerCat] = useState<string>("Prayer");
  const [likedPrayers, setLikedPrayers] = useState<number[]>([]);

  // Blog state
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [pendingPosts, setPendingPosts] = useState<BlogPost[]>(BLOG_PENDING);
  const [newBlogForm, setNewBlogForm] = useState<BlogForm>({
    title: "",
    category: "Faith",
    excerpt: "",
    content: "",
  });
  const [writingBlog, setWritingBlog] = useState<boolean>(false);

  // UI state
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [toast, setToast] = useState<Toast | null>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const showToast = (msg: string, type: "success" | "info" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  // Convert Clerk user to our User type
  const appUser: User | null = isSignedIn && user
    ? {
        name: user.fullName || user.username || user.emailAddresses[0]?.emailAddress || "User",
        role: user.publicMetadata?.role || "member",
        avatar: user.imageUrl || user.firstName?.[0] || "U",
      }
    : null;

  const handleLogout = async () => {
    await signOut();
    setPage("home");
    showToast("See you next time!", "info");
  };

  const openAuthModal = (mode: "sign-in" | "sign-up" = "sign-in") => {
    setAuthMode(mode);
    setLoginOpen(true);
  };

  const approveBlog = (id: number) => {
    const post = pendingPosts.find((p) => p.id === id);
    if (!post) return;
    setBlogPosts((b) => [{ ...post, approved: true, date: "Today" }, ...b]);
    setPendingPosts((p) => p.filter((x) => x.id !== id));
    showToast("Blog post approved and published!");
  };

  const rejectBlog = (id: number) => {
    setPendingPosts((p) => p.filter((x) => x.id !== id));
    showToast("Post removed.", "info");
  };

  const openNotifDetail = (n: Notification) => {
    setNotifDetailModal(n);
  };

  return (
    <div
      style={{
        fontFamily: "'Inter',sans-serif",
        backgroundColor: G.white,
        color: G.ink,
        minHeight: "100vh",
      }}
    >
      <style>{GLOBAL_CSS}</style>

      {/* Modals */}
      {modal && <ContentModal data={modal.data} type={modal.type} onClose={() => setModal(null)} />}
      
      {/* Clerk Auth Modal - No custom login form */}
      {loginOpen && (
        <LoginModal
          onClose={() => setLoginOpen(false)}
          defaultMode={authMode}
        />
      )}
      
      {notifDetailModal && (
        <NotifDetailModal
          notif={notifDetailModal}
          onClose={() => setNotifDetailModal(null)}
          showToast={showToast}
        />
      )}

      {/* Toast Notification */}
      {toast && (
        <div
          className="toast-in"
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            zIndex: 2000,
            backgroundColor: toast.type === "info" ? G.ink : G.green,
            color: "#fff",
            padding: "0.9rem 1.4rem",
            borderRadius: "12px",
            fontSize: "0.86rem",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            maxWidth: "340px",
          }}
        >
          <i
            className={`ti ${toast.type === "info" ? "ti-info-circle" : "ti-check-circle"}`}
            style={{ fontSize: "18px", flexShrink: 0 }}
            aria-hidden="true"
          />
          {toast.msg}
        </div>
      )}

      {/* Navigation */}
      <Navigation
        page={page}
        setPage={setPage}
        user={appUser}
        setLoginOpen={openAuthModal}
        handleLogout={handleLogout}
        notifOpen={notifOpen}
        setNotifOpen={setNotifOpen}
        unreadCount={unreadCount}
        notificationPanel={
          <NotifPanel
            notifications={notifications}
            setNotifications={setNotifications}
            setExpandedNotifId={setExpandedNotifId}
            expandedNotifId={expandedNotifId}
            openNotifDetail={openNotifDetail}
            unreadCount={unreadCount}
            notifCollapsed={notifCollapsed}
            setNotifCollapsed={setNotifCollapsed}
          />
        }
      />

      {/* Pages */}
      {page === "home" && (
        <HomePage
          setModal={setModal}
          setPage={setPage}
          setBlogModal={setBlogModal}
          user={appUser}
          setLoginOpen={openAuthModal}
          showToast={showToast}
          prayerBoard={prayerBoard}
          setPrayerBoard={setPrayerBoard}
          newPrayer={newPrayer}
          setNewPrayer={setNewPrayer}
          newPrayerCat={newPrayerCat}
          setNewPrayerCat={setNewPrayerCat}
          likedPrayers={likedPrayers}
          setLikedPrayers={setLikedPrayers}
          sparkles={sparkles}
          setSparkles={setSparkles}
        />
      )}

      {page === "blog" && (
        <BlogPage
          blogModal={blogModal}
          setBlogModal={setBlogModal}
          user={appUser}
          showToast={showToast}
          blogPosts={blogPosts}
          setBlogPosts={setBlogPosts}
          pendingPosts={pendingPosts}
          setPendingPosts={setPendingPosts}
          newBlogForm={newBlogForm}
          setNewBlogForm={setNewBlogForm}
          writingBlog={writingBlog}
          setWritingBlog={setWritingBlog}
        />
      )}

      {page === "admin" && appUser?.role === "admin" && (
        <AdminPage
          pendingPosts={pendingPosts}
          approveBlog={approveBlog}
          rejectBlog={rejectBlog}
          notifications={notifications}
          expandedNotifId={expandedNotifId}
          setExpandedNotifId={setExpandedNotifId}
          openNotifDetail={openNotifDetail}
          unreadCount={unreadCount}
        />
      )}

      {page === "admin" && appUser?.role !== "admin" && (
        <div style={{ textAlign: "center", padding: "6rem 2rem" }}>
          <p style={{ color: G.muted }}>Access denied.</p>
        </div>
      )}

      {/* Click outside notification panel to close */}
      {notifOpen && (
        <div onClick={() => setNotifOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 99 }} />
      )}
    </div>
  );
}

// Main App with Clerk Provider
export default function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <AppContent />
    </ClerkProvider>
  );
}