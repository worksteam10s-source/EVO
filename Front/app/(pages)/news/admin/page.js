// app/admin/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useNewsStore } from "@/app/components/newsStore";
import CircularMenu from '@/app/components/CircularMenu';

const ADMIN_PASSWORD = "hitu2025";

export default function AdminPage() {
  const router = useRouter();
  const { addNews } = useNewsStore();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    title: "",
    date: "",
    image: "",
    description: "",
    category: "Technology",
    videoLink: "",
    sourceLink: "",
  });

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError("");
    } else {
      setLoginError("❌ Wrong password, try again.");
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    if (!form.title || !form.date || !form.description) {
      setSuccessMsg("⚠️ Please fill in Title, Date, and Description.");
      return;
    }
    addNews({
      id: Date.now(),
      title: form.title,
      date: form.date,
      image: form.image || "/images/news1.jpg",
      description: form.description,
      category: form.category,
      videoLink: form.videoLink,
      sourceLink: form.sourceLink,
    });
    setSuccessMsg("✅ News added successfully!");
    setForm({ title: "", date: "", image: "", description: "", category: "Technology", videoLink: "", sourceLink: "" });
  }

  // ── LOGIN SCREEN ──
  if (!isLoggedIn) {
    return (
      <div style={styles.page}>
        <div style={styles.loginBox}>
          <div style={styles.loginIcon}>🔐</div>
          <h2 style={styles.loginTitle}>Admin Login</h2>
          <p style={styles.loginSub}>Enter your password to access the admin panel</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            style={styles.input}
          />
          {loginError && <p style={styles.error}>{loginError}</p>}
          <button onClick={handleLogin} style={styles.btnGold}>Login</button>
        </div>
      </div>
    );
  }

  // ── ADMIN PANEL ──
  return (
    <div style={styles.page}>
      <div style={styles.panel}>

        <div style={styles.panelHeader}>
          <div>
            <p style={styles.panelSub}>HELWAN INTERNATIONAL TECHNOLOGICAL UNIVERSITY</p>
            <h1 style={styles.panelTitle}>📰 Add News</h1>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button onClick={() => router.push("/news")} style={styles.btnOutline}>← Back to News</button>
            <button onClick={() => setIsLoggedIn(false)} style={styles.btnRed}>Logout</button>
          </div>
        </div>

        {successMsg && (
          <div style={styles.successBanner}>{successMsg}</div>
        )}

        <div style={styles.form}>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Title *</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="News title..." style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Date *</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} placeholder="e.g. 20 April 2025" style={styles.input} />
            </div>
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>Category</label>
              <select name="category" value={form.category} onChange={handleChange} style={styles.input}>
                <option>Technology</option>
                <option>Education</option>
                <option>Events</option>
                <option>Sports</option>
                <option>Research</option>
              </select>
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Image URL</label>
              <input name="image" value={form.image} onChange={handleChange} placeholder="/images/news1.jpg or https://..." style={styles.input} />
            </div>
          </div>

          <div style={styles.fieldFull}>
            <label style={styles.label}>Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Write the news content here..." rows={5} style={{ ...styles.input, resize: "vertical" }} />
          </div>

          <div style={styles.row}>
            <div style={styles.field}>
              <label style={styles.label}>🎬 Video Link</label>
              <input name="videoLink" value={form.videoLink} onChange={handleChange} placeholder="https://youtube.com/..." style={styles.input} />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>🔗 Source Link</label>
              <input name="sourceLink" value={form.sourceLink} onChange={handleChange} placeholder="https://source.com/..." style={styles.input} />
            </div>
          </div>

          <button onClick={handleSubmit} style={styles.btnGoldLarge}>
            + Add News
          </button>

        </div>
      </div>
      <CircularMenu />
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px 20px",
  },
  loginBox: {
    backgroundColor: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(212,160,23,0.3)",
    borderRadius: "16px",
    padding: "50px 40px",
    width: "100%",
    maxWidth: "420px",
    marginTop: "80px",
    textAlign: "center",
  },
  loginIcon: { fontSize: "48px", marginBottom: "16px" },
  loginTitle: { color: "#fff", fontSize: "26px", fontWeight: "700", marginBottom: "8px" },
  loginSub: { color: "#8ba8c8", fontSize: "14px", marginBottom: "28px" },
  error: { color: "#ff6b6b", fontSize: "13px", marginBottom: "12px" },
  panel: { width: "100%", maxWidth: "860px" },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "30px",
    flexWrap: "wrap",
    gap: "16px",
  },
  panelSub: { color: "#D4A017", fontSize: "11px", letterSpacing: "2px", marginBottom: "6px", fontWeight: "600" },
  panelTitle: { color: "#ffffff", fontSize: "32px", fontWeight: "700", fontFamily: "Georgia, serif", margin: 0 },
  successBanner: {
    backgroundColor: "rgba(212,160,23,0.15)",
    border: "1px solid #D4A017",
    borderRadius: "10px",
    padding: "14px 20px",
    color: "#D4A017",
    fontSize: "14px",
    marginBottom: "24px",
  },
  form: {
    backgroundColor: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "35px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  row: { display: "flex", gap: "20px", flexWrap: "wrap" },
  field: { flex: 1, minWidth: "200px", display: "flex", flexDirection: "column", gap: "8px" },
  fieldFull: { display: "flex", flexDirection: "column", gap: "8px" },
  label: { color: "#8ba8c8", fontSize: "13px", fontWeight: "600", letterSpacing: "0.5px" },
  input: {
    padding: "12px 16px",
    fontSize: "14px",
    border: "2px solid rgba(139,168,200,0.25)",
    borderRadius: "10px",
    outline: "none",
    backgroundColor: "rgba(15,26,46,0.8)",
    color: "#ffffff",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  btnGold: {
    backgroundColor: "#D4A017",
    color: "#0f1a2e",
    border: "none",
    padding: "13px 35px",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
    width: "100%",
    marginTop: "8px",
  },
  btnGoldLarge: {
    backgroundColor: "#D4A017",
    color: "#0f1a2e",
    border: "none",
    padding: "14px 30px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "700",
    alignSelf: "flex-start",
    marginTop: "8px",
  },
  btnOutline: {
    backgroundColor: "transparent",
    color: "#8ba8c8",
    border: "2px solid rgba(139,168,200,0.35)",
    padding: "10px 20px",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },
  btnRed: {
    backgroundColor: "transparent",
    color: "#ff6b6b",
    border: "2px solid rgba(255,107,107,0.4)",
    padding: "10px 20px",
    borderRadius: "25px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
  },
};