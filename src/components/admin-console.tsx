"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type UserItem = {
  id: number;
  username: string;
  name: string;
  email: string;
  avatar_url: string | null;
  role: string;
  provider: string;
  app_count: number;
  published_count: number;
  created_at: string;
};

type AppItem = {
  id: number;
  name: string;
  slug: string;
  tagline: string;
  url: string;
  status: string;
  username: string;
  avatar_url: string | null;
  created_at: string;
};

type Stats = {
  totalUsers: number;
  totalApps: number;
  publishedApps: number;
  unlistedApps: number;
};

// ── User detail drawer ──────────────────────────────────────
function UserDrawer({
  user,
  onClose,
  onAction,
  loading,
}: {
  user: UserItem;
  onClose: () => void;
  onAction: (action: string, value?: string) => void;
  loading: boolean;
}) {
  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState(user.username);
  const [editBio, setEditBio] = useState(false);
  const [newBio, setNewBio] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-surface border-l border-border w-full max-w-md overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold">User Details</h2>
          <button onClick={onClose} className="text-foreground/40 hover:text-foreground transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Profile */}
          <div className="flex items-center gap-4">
            {user.avatar_url ? (
              <img src={user.avatar_url} alt="" className="w-16 h-16 rounded-full" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-surface-light flex items-center justify-center text-2xl font-bold text-foreground/20">
                {(user.name || user.username).charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <div className="font-bold text-lg">{user.name || user.username}</div>
              <div className="text-sm text-foreground/50">@{user.username}</div>
              <div className="text-xs text-foreground/30">{user.email}</div>
            </div>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-background rounded-xl border border-border p-3">
              <div className="text-xs text-foreground/40 mb-1">Role</div>
              <span className={`text-sm font-semibold ${user.role === "admin" ? "text-red-400" : "text-foreground/70"}`}>
                {user.role}
              </span>
            </div>
            <div className="bg-background rounded-xl border border-border p-3">
              <div className="text-xs text-foreground/40 mb-1">Provider</div>
              <span className="text-sm font-semibold capitalize">{user.provider}</span>
            </div>
            <div className="bg-background rounded-xl border border-border p-3">
              <div className="text-xs text-foreground/40 mb-1">Apps</div>
              <span className="text-sm font-semibold">
                <span className="text-green-400">{user.published_count}</span>
                <span className="text-foreground/30"> / {user.app_count}</span>
              </span>
            </div>
            <div className="bg-background rounded-xl border border-border p-3">
              <div className="text-xs text-foreground/40 mb-1">Joined</div>
              <span className="text-sm font-semibold">
                {new Date(user.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
          </div>

          {/* ── God Mode Actions ── */}
          <div>
            <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-wider mb-3">
              Actions
            </h3>
            <div className="space-y-2">
              {/* Toggle Role */}
              <button
                onClick={() => onAction("set_role", user.role === "admin" ? "member" : "admin")}
                disabled={loading}
                className="w-full flex items-center gap-3 px-4 py-3 bg-background border border-border rounded-xl hover:border-accent/50 transition-colors text-left disabled:opacity-50"
              >
                <svg className="w-4 h-4 text-accent-light shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <div>
                  <div className="text-sm font-medium">
                    {user.role === "admin" ? "Revoke Admin" : "Grant Admin"}
                  </div>
                  <div className="text-xs text-foreground/40">
                    {user.role === "admin" ? "Demote to member" : "Promote to admin with full access"}
                  </div>
                </div>
              </button>

              {/* Edit Username */}
              {editUsername ? (
                <div className="flex gap-2 px-4 py-3 bg-background border border-border rounded-xl">
                  <input
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="flex-1 bg-surface border border-border rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-accent-light"
                    placeholder="new-username"
                  />
                  <button
                    onClick={() => { onAction("update_username", newUsername); setEditUsername(false); }}
                    disabled={loading}
                    className="px-3 py-1.5 bg-accent text-white rounded-lg text-xs font-medium disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditUsername(false)}
                    className="px-3 py-1.5 border border-border rounded-lg text-xs"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditUsername(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-background border border-border rounded-xl hover:border-accent/50 transition-colors text-left"
                >
                  <svg className="w-4 h-4 text-foreground/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                  </svg>
                  <div>
                    <div className="text-sm font-medium">Change Username</div>
                    <div className="text-xs text-foreground/40">Currently: @{user.username}</div>
                  </div>
                </button>
              )}

              {/* Edit Bio */}
              {editBio ? (
                <div className="px-4 py-3 bg-background border border-border rounded-xl space-y-2">
                  <textarea
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                    rows={3}
                    className="w-full bg-surface border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-light resize-none"
                    placeholder="User bio..."
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => { onAction("update_bio", newBio); setEditBio(false); }}
                      disabled={loading}
                      className="px-3 py-1.5 bg-accent text-white rounded-lg text-xs font-medium disabled:opacity-50"
                    >
                      Save Bio
                    </button>
                    <button
                      onClick={() => setEditBio(false)}
                      className="px-3 py-1.5 border border-border rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setEditBio(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-background border border-border rounded-xl hover:border-accent/50 transition-colors text-left"
                >
                  <svg className="w-4 h-4 text-foreground/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                  <div>
                    <div className="text-sm font-medium">Edit Bio</div>
                    <div className="text-xs text-foreground/40">Set or update user bio</div>
                  </div>
                </button>
              )}

              {/* Bulk app actions */}
              <button
                onClick={() => onAction("unpublish_all_apps")}
                disabled={loading || user.published_count === 0}
                className="w-full flex items-center gap-3 px-4 py-3 bg-background border border-border rounded-xl hover:border-yellow-500/50 transition-colors text-left disabled:opacity-30"
              >
                <svg className="w-4 h-4 text-yellow-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
                <div>
                  <div className="text-sm font-medium">Unpublish All Apps</div>
                  <div className="text-xs text-foreground/40">Hide all {user.published_count} published apps from marketplace</div>
                </div>
              </button>

              <button
                onClick={() => onAction("publish_all_apps")}
                disabled={loading || user.app_count === user.published_count}
                className="w-full flex items-center gap-3 px-4 py-3 bg-background border border-border rounded-xl hover:border-green-500/50 transition-colors text-left disabled:opacity-30"
              >
                <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <div className="text-sm font-medium">Publish All Apps</div>
                  <div className="text-xs text-foreground/40">Restore all apps to marketplace</div>
                </div>
              </button>

              {/* View Profile */}
              <Link
                href={`/profile/${user.username}`}
                className="w-full flex items-center gap-3 px-4 py-3 bg-background border border-border rounded-xl hover:border-accent/50 transition-colors"
              >
                <svg className="w-4 h-4 text-foreground/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <div>
                  <div className="text-sm font-medium">View Public Profile</div>
                  <div className="text-xs text-foreground/40">See what others see</div>
                </div>
              </Link>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="border-t border-border pt-6">
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3">
              Danger Zone
            </h3>
            <DangerDeleteButton
              label={`Delete @${user.username}`}
              description="Permanently delete this user and all their apps. This cannot be undone."
              challengeWord={user.username}
              onConfirm={() => onAction("delete")}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Challenge-based delete (inspired by VisibleKit) ──────────
function DangerDeleteButton({
  label,
  description,
  challengeWord,
  onConfirm,
  loading,
}: {
  label: string;
  description: string;
  challengeWord: string;
  onConfirm: () => void;
  loading: boolean;
}) {
  const [stage, setStage] = useState<"idle" | "confirming">("idle");
  const [typed, setTyped] = useState("");

  if (stage === "idle") {
    return (
      <button
        onClick={() => setStage("confirming")}
        className="w-full flex items-center gap-3 px-4 py-3 border border-red-500/30 rounded-xl hover:bg-red-500/5 transition-colors text-left"
      >
        <svg className="w-4 h-4 text-red-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        <div>
          <div className="text-sm font-medium text-red-400">{label}</div>
          <div className="text-xs text-foreground/40">{description}</div>
        </div>
      </button>
    );
  }

  return (
    <div className="border border-red-500/30 rounded-xl p-4 bg-red-500/5 space-y-3">
      <p className="text-sm text-red-400">
        Type <span className="font-mono font-bold">{challengeWord}</span> to confirm deletion:
      </p>
      <input
        value={typed}
        onChange={(e) => setTyped(e.target.value)}
        className="w-full bg-background border border-red-500/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-red-500 font-mono"
        placeholder={challengeWord}
        autoFocus
      />
      <div className="flex gap-2">
        <button
          onClick={onConfirm}
          disabled={typed !== challengeWord || loading}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {loading ? "Deleting..." : "Delete Forever"}
        </button>
        <button
          onClick={() => { setStage("idle"); setTyped(""); }}
          className="px-4 py-2 border border-border rounded-lg text-sm transition-colors hover:border-foreground/30"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Main Admin Console ──────────────────────────────────────
export function AdminConsole({
  users: initialUsers,
  apps: initialApps,
  stats,
}: {
  users: UserItem[];
  apps: AppItem[];
  stats: Stats;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<"users" | "apps">("users");
  const [users, setUsers] = useState(initialUsers);
  const [apps, setApps] = useState(initialApps);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
  const [confirmDeleteApp, setConfirmDeleteApp] = useState<number | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  async function handleUserAction(userId: number, action: string, value?: string) {
    setLoading(`user-${userId}-${action}`);

    if (action === "delete") {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (res.ok) {
        const user = users.find((u) => u.id === userId);
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        setApps((prev) => prev.filter((a) => a.username !== user?.username));
        setSelectedUser(null);
        showToast(`Deleted user @${user?.username}`);
      } else {
        const body = await res.json();
        showToast(`Error: ${body.error}`);
      }
    } else {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action, value }),
      });
      if (res.ok) {
        // Refresh data
        router.refresh();
        showToast(`Action "${action}" completed`);
        if (action === "set_role") {
          setUsers((prev) =>
            prev.map((u) => (u.id === userId ? { ...u, role: value! } : u))
          );
          setSelectedUser((prev) => prev && prev.id === userId ? { ...prev, role: value! } : prev);
        }
        if (action === "unpublish_all_apps") {
          setApps((prev) =>
            prev.map((a) => {
              const user = users.find((u) => u.id === userId);
              return user && a.username === user.username ? { ...a, status: "unlisted" } : a;
            })
          );
          setUsers((prev) =>
            prev.map((u) => u.id === userId ? { ...u, published_count: 0 } : u)
          );
        }
        if (action === "publish_all_apps") {
          setApps((prev) =>
            prev.map((a) => {
              const user = users.find((u) => u.id === userId);
              return user && a.username === user.username ? { ...a, status: "published" } : a;
            })
          );
          setUsers((prev) =>
            prev.map((u) => u.id === userId ? { ...u, published_count: u.app_count } : u)
          );
        }
      } else {
        const body = await res.json();
        showToast(`Error: ${body.error}`);
      }
    }

    setLoading(null);
  }

  async function toggleAppStatus(app: AppItem) {
    setLoading(`app-${app.id}`);
    const newStatus = app.status === "published" ? "unlisted" : "published";

    const res = await fetch(`/api/apps/${app.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      setApps((prev) =>
        prev.map((a) => (a.id === app.id ? { ...a, status: newStatus } : a))
      );
      showToast(`App "${app.name}" ${newStatus}`);
    }
    setLoading(null);
  }

  async function deleteApp(id: number) {
    setLoading(`app-${id}`);
    const res = await fetch(`/api/apps/${id}`, { method: "DELETE" });
    if (res.ok) {
      const app = apps.find((a) => a.id === id);
      setApps((prev) => prev.filter((a) => a.id !== id));
      showToast(`Deleted app "${app?.name}"`);
    }
    setConfirmDeleteApp(null);
    setLoading(null);
  }

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredApps = apps.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.username.toLowerCase().includes(search.toLowerCase()) ||
      a.tagline.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Toast */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 bg-surface border border-border rounded-xl px-4 py-3 shadow-lg text-sm font-medium animate-[fadeIn_0.2s_ease-out]">
          {toast}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
          <div className="text-sm text-foreground/50">Users</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="text-2xl font-bold">{stats.totalApps}</div>
          <div className="text-sm text-foreground/50">Total Apps</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="text-2xl font-bold text-green-400">{stats.publishedApps}</div>
          <div className="text-sm text-foreground/50">Published</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-5">
          <div className="text-2xl font-bold text-yellow-400">{stats.unlistedApps}</div>
          <div className="text-sm text-foreground/50">Unlisted</div>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex bg-surface border border-border rounded-lg p-1">
          <button
            onClick={() => { setTab("users"); setSearch(""); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === "users" ? "bg-accent text-white" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Users ({users.length})
          </button>
          <button
            onClick={() => { setTab("apps"); setSearch(""); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === "apps" ? "bg-accent text-white" : "text-foreground/60 hover:text-foreground"
            }`}
          >
            Apps ({apps.length})
          </button>
        </div>
        <div className="flex-1 relative">
          <svg className="w-4 h-4 text-foreground/30 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder={`Search ${tab}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm bg-surface border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-accent-light transition-colors"
          />
        </div>
      </div>

      {/* Users tab */}
      {tab === "users" && (
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-foreground/40 uppercase tracking-wider">
            <div className="col-span-4">User</div>
            <div className="col-span-2">Provider</div>
            <div className="col-span-1">Role</div>
            <div className="col-span-1 text-center">Apps</div>
            <div className="col-span-2">Joined</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="grid grid-cols-12 gap-4 items-center bg-surface border border-border rounded-xl px-4 py-3 hover:border-accent/30 transition-colors cursor-pointer"
            >
              <div className="col-span-4 flex items-center gap-3 min-w-0">
                {user.avatar_url ? (
                  <img src={user.avatar_url} alt="" className="w-8 h-8 rounded-full shrink-0" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-surface-light shrink-0 flex items-center justify-center text-xs font-bold text-foreground/20">
                    {(user.name || user.username).charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{user.name || user.username}</div>
                  <div className="text-xs text-foreground/40 truncate">@{user.username}</div>
                </div>
              </div>
              <div className="col-span-2">
                <span className="text-xs bg-surface-light px-2 py-1 rounded capitalize">{user.provider}</span>
              </div>
              <div className="col-span-1">
                <span className={`text-xs px-2 py-1 rounded font-medium ${
                  user.role === "admin" ? "bg-red-500/10 text-red-400" : "bg-surface-light text-foreground/50"
                }`}>
                  {user.role}
                </span>
              </div>
              <div className="col-span-1 text-center text-sm">
                <span className="text-green-400">{user.published_count}</span>
                <span className="text-foreground/30">/{user.app_count}</span>
              </div>
              <div className="col-span-2 text-xs text-foreground/40">
                {new Date(user.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
              <div className="col-span-2 flex justify-end">
                <span className="text-xs text-foreground/30 flex items-center gap-1">
                  Details
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </span>
              </div>
            </div>
          ))}

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-foreground/40 text-sm">No users match your search.</div>
          )}
        </div>
      )}

      {/* Apps tab */}
      {tab === "apps" && (
        <div className="space-y-2">
          <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-foreground/40 uppercase tracking-wider">
            <div className="col-span-4">App</div>
            <div className="col-span-2">Developer</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Created</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {filteredApps.map((app) => (
            <div
              key={app.id}
              className="grid grid-cols-12 gap-4 items-center bg-surface border border-border rounded-xl px-4 py-3 hover:border-border/80 transition-colors"
            >
              <div className="col-span-4 min-w-0">
                <Link href={`/apps/${app.slug}`} className="font-medium text-sm hover:text-accent-light transition-colors truncate block">
                  {app.name}
                </Link>
                <div className="text-xs text-foreground/40 truncate">{app.tagline}</div>
              </div>
              <div className="col-span-2 flex items-center gap-2 min-w-0">
                {app.avatar_url && <img src={app.avatar_url} alt="" className="w-5 h-5 rounded-full shrink-0" />}
                <button
                  onClick={() => {
                    const user = users.find((u) => u.username === app.username);
                    if (user) { setTab("users"); setSelectedUser(user); }
                  }}
                  className="text-xs text-foreground/50 truncate hover:text-accent-light transition-colors"
                >
                  @{app.username}
                </button>
              </div>
              <div className="col-span-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  app.status === "published"
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                }`}>
                  {app.status}
                </span>
              </div>
              <div className="col-span-2 text-xs text-foreground/40">
                {new Date(app.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
              <div className="col-span-2 flex justify-end gap-2">
                <a href={app.url} target="_blank" rel="noopener noreferrer" className="p-1.5 border border-border rounded-lg hover:border-foreground/30 transition-colors" title="Visit app">
                  <svg className="w-3.5 h-3.5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
                <button
                  onClick={() => toggleAppStatus(app)}
                  disabled={loading === `app-${app.id}`}
                  className="p-1.5 border border-border rounded-lg hover:border-foreground/30 transition-colors disabled:opacity-50"
                  title={app.status === "published" ? "Unpublish" : "Publish"}
                >
                  {app.status === "published" ? (
                    <svg className="w-3.5 h-3.5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
                {confirmDeleteApp === app.id ? (
                  <div className="flex gap-1">
                    <button onClick={() => deleteApp(app.id)} disabled={loading === `app-${app.id}`} className="px-2 py-1 bg-red-500 text-white rounded text-xs font-medium disabled:opacity-50">
                      {loading === `app-${app.id}` ? "..." : "Yes"}
                    </button>
                    <button onClick={() => setConfirmDeleteApp(null)} className="px-2 py-1 border border-border rounded text-xs">No</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDeleteApp(app.id)} className="p-1.5 border border-border rounded-lg hover:border-red-500/50 hover:text-red-400 transition-colors" title="Delete app">
                    <svg className="w-3.5 h-3.5 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredApps.length === 0 && (
            <div className="text-center py-8 text-foreground/40 text-sm">No apps match your search.</div>
          )}
        </div>
      )}

      {/* User detail drawer */}
      {selectedUser && (
        <UserDrawer
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onAction={(action, value) => handleUserAction(selectedUser.id, action, value)}
          loading={loading !== null}
        />
      )}
    </>
  );
}
