import { T, LEVELS } from "./constants";
  import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Sidebar({
  
  apps,
  activeBranch,
  activeLevel,
  onBranch,
  onLevel,
  onLogout,
  open,
}) {
  const styles = {
    sidebar: {
      width: open ? "260px" : "0px",
      minWidth: open ? "260px" : "0px",
      background: "#1a0000",
      overflow: "hidden",
      transition: "all .3s ease",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      zIndex: 10,
      flexShrink: 0,
    },
    inner: {
      width: "260px",
      padding: "0 0 24px 0",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      minHeight: "100vh",
    },
    logo: {
      padding: "22px 20px 16px",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    zh: {
      fontFamily: "'Noto Serif SC', serif",
      fontSize: "22px",
      color: T.gold,
      letterSpacing: "3px",
    },
    ar: {
      fontSize: "11px",
      color: "rgba(255,255,255,0.55)",
      lineHeight: 1.4,
    },
    sectionLabel: {
      padding: "18px 20px 8px",
      fontSize: "10px",
      color: "rgba(255,255,255,0.3)",
      letterSpacing: "2px",
      fontWeight: 700,
    },
    branchBtn: (active) => ({
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "11px 20px",
      cursor: "pointer",
      border: "none",
      background: active ? "rgba(201,168,76,0.15)" : "transparent",
      color: active ? T.gold : "rgba(255,255,255,0.65)",
      fontFamily: "'Cairo', sans-serif",
      fontSize: "14px",
      fontWeight: active ? 700 : 400,
      width: "100%",
      textAlign: "right",
      borderRight: active ? `3px solid ${T.gold}` : "3px solid transparent",
      transition: "all .2s",
    }),
    levelBtn: (active) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "9px 20px 9px 28px",
      cursor: "pointer",
      border: "none",
      background: active ? "rgba(183,28,28,0.25)" : "transparent",
      color: active ? "#fff" : "rgba(255,255,255,0.5)",
      fontFamily: "'Cairo', sans-serif",
      fontSize: "13px",
      fontWeight: active ? 700 : 400,
      width: "100%",
      textAlign: "right",
      borderRight: active ? `3px solid ${T.red}` : "3px solid transparent",
      transition: "all .2s",
    }),
    countBadge: (active) => ({
      background: active ? T.red : "rgba(255,255,255,0.1)",
      color: "#fff",
      fontSize: "11px",
      fontWeight: 700,
      padding: "2px 8px",
      borderRadius: "10px",
      minWidth: "24px",
      textAlign: "center",
    }),
    logoutArea: {
      marginTop: "auto",
      padding: "16px 20px",
      borderTop: "1px solid rgba(255,255,255,0.07)",
    },
    logoutBtn: {
      width: "100%",
      padding: "10px",
      background: "rgba(183,28,28,0.2)",
      color: "rgba(255,255,255,0.6)",
      border: "1px solid rgba(183,28,28,0.3)",
      borderRadius: "8px",
      fontFamily: "'Cairo', sans-serif",
      fontSize: "13px",
      cursor: "pointer",
      transition: "all .2s",
    },
  };
  useEffect(() => {
  axios.get("http://localhost:8000/me", {
    withCredentials: true,
  })
  .then((res) => {
    if (!res.data.admin) {
      navigate("/login", { replace: true });
    }
  })
  .catch(() => {
    navigate("/login", { replace: true });
  });
}, []);

  const branches = [
    { key: "cairo",    label: "جامعة القاهرة",   icon: "🏛️" },
    { key: "ainshams", label: "جامعة عين شمس", icon: "🎓" },
  ];
        const navigate = useNavigate();

  const handleLogout = async () => {

  try {
    await axios.post("http://localhost:8000/logout", {}, {
      withCredentials: true,
    });
  } catch (err) {
    console.error("Logout error:", err);
  } finally {
    navigate("/login"); 
  }
};

  return (
    <div style={styles.sidebar}>
      <div style={styles.inner}>

        {/* Logo */}
        <div style={styles.logo}>
          <div>
            <div style={styles.zh}>孔子学院</div>
            <div style={styles.ar}>معهد كونفوشيوس</div>
          </div>
        </div>

        {/* Branches */}
        <div style={styles.sectionLabel}>الفروع</div>
        {branches.map((b) => (
          <button
            key={b.key}
            style={styles.branchBtn(activeBranch === b.key)}
            onClick={() => onBranch(b.key)}
          >
            <span>{b.icon}</span> {b.label}
          </button>
        ))}

        {/* HSK Levels */}
        <div style={styles.sectionLabel}>مستويات HSK</div>
        {LEVELS.map((lv) => {
          const count = apps.filter(
            (a) => a.branch === activeBranch && a.level === lv
          ).length;
          const active = activeLevel === lv;
          return (
            <button
              key={lv}
              style={styles.levelBtn(active)}
              onClick={() => onLevel(lv)}
            >
              <span>{lv}</span>
              <span style={styles.countBadge(active)}>{count}</span>
            </button>
          );
        })}

        {/* Logout */}
        <div style={styles.logoutArea}>
          <button style={styles.logoutBtn} onClick={handleLogout}>
             تسجيل الخروج
          </button>
        </div>
      </div>
    </div>
  );
}
