
import { useState, useEffect } from "react";
import axios from "axios";
import { T, statusConfig, levelColors } from "./constants";
import Sidebar from "./Sidebar";
import ApplicationModal from "./ApplicationModal";
  import { useNavigate } from "react-router-dom";


export default function AdminDashboard({ onLogout }) {
  const [apps, setApps] = useState([]);
  const [activeBranch, setActiveBranch] = useState("cairo");
  const [activeLevel, setActiveLevel] = useState("HSK 1");
  const [search, setSearch] = useState("");
  const [selectedApp, setSelectedApp] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();




  // ── Fetch students from backend ────────────────────────────────────────────
  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/students`, {
        withCredentials: true,
      });
      console.log("Raw backend data:", response.data);

      const formatted = response.data.map((s) => {
        const mapped = {
          id:     s.id,
          name:   s.name,
          nid:    s.national_id,
          phone:  s.phone,
          email:  s.email,
          level:  s.course,
          branch: s.location,
          mode:   s.mode || "—",
          date:   s.created_at
                    ? new Date(s.created_at).toLocaleDateString("ar-EG")
                    : "—",
          status: s.status || "pending",
        };

        // Diagnostic log per student — remove once confirmed working
        console.log(`Student ${s.id} mapping:`, {
          raw_level:     s.level,
          mapped_level:  mapped.level,
          raw_location:  s.location,
          mapped_branch: mapped.branch,
        });

        return mapped;
      });

      setApps(formatted);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("فشل تحميل البيانات من الخادم");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const levelApps = apps.filter(
    (a) => a.branch === activeBranch && a.level === activeLevel
  );

  const filtered = search
    ? levelApps.filter(
        (a) =>
          a.name.includes(search) ||
          a.phone.includes(search) ||
          a.email.toLowerCase().includes(search.toLowerCase()) ||
          a.nid.includes(search)
      )
    : levelApps;

  const stats = {
    total:    apps.length,
    pending:  apps.filter((a) => a.status === "pending").length,
    approved: apps.filter((a) => a.status === "approved").length,
    rejected: apps.filter((a) => a.status === "rejected").length,
  };

  const branchLabel =
    activeBranch === "cairo" ? "جامعة القاهرة" : "جامعة عين شمس";

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleBranch = (key) => {
    setActiveBranch(key);
    setActiveLevel("HSK 1");
    setSearch("");
  };

  const handleLevel = (lv) => {
    setActiveLevel(lv);
    setSearch("");
  };

  const changeStatus = (id, status) => {
    setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    setSelectedApp((prev) => (prev?.id === id ? { ...prev, status } : prev));
  };

  // ── Loading / Error states ─────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: "'Cairo', sans-serif",
        direction: "rtl", fontSize: "16px", color: T.muted, background: T.bg,
      }}>
        ⏳ جاري تحميل البيانات...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: "'Cairo', sans-serif",
        direction: "rtl", fontSize: "16px", color: T.red, background: T.bg,
      }}>
        ⚠️ {error}
      </div>
    );
  }

  // ── Styles ─────────────────────────────────────────────────────────────────
  const s = {
    root: {
      display: "flex", minHeight: "100vh",
      fontFamily: "'Cairo', sans-serif", direction: "rtl", background: T.bg,
    },
    main: { flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" },
    topbar: {
      background: "#fff", borderBottom: `1px solid ${T.border}`,
      padding: "0 28px", height: "60px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      boxShadow: T.shadowSm, flexShrink: 0,
    },
    topbarLeft: { display: "flex", alignItems: "center", gap: "14px" },
    menuBtn: {
      background: "none", border: "none", cursor: "pointer",
      fontSize: "20px", color: T.inkSoft, padding: "4px",
    },
    breadcrumb: {
      fontSize: "14px", color: T.inkSoft,
      display: "flex", alignItems: "center", gap: "6px",
    },
    breadActive: { fontWeight: 700, color: T.red },
    breadMuted:  { fontWeight: 400, color: T.muted },
    adminTag: { fontSize: "13px", color: T.muted },
    content: { flex: 1, padding: "28px", overflowY: "auto" },
    statsRow: {
      display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
      gap: "16px", marginBottom: "28px",
    },
    statCard: (color) => ({
      background: "#fff", border: `1px solid ${T.border}`,
      borderRadius: "14px", padding: "20px 22px",
      boxShadow: T.shadowSm, borderTop: `3px solid ${color}`,
    }),
    statNum: (color) => ({
      fontSize: "32px", fontWeight: 900, color, lineHeight: 1, marginBottom: "4px",
    }),
    statLabel: { fontSize: "12px", color: T.muted },
    tableCard: {
      background: "#fff", borderRadius: "16px",
      border: `1px solid ${T.border}`, boxShadow: T.shadowSm, overflow: "hidden",
    },
    tableHeader: {
      padding: "18px 22px", display: "flex", alignItems: "center",
      justifyContent: "space-between", borderBottom: `1px solid ${T.border}`,
      flexWrap: "wrap", gap: "12px",
    },
    tableTitle: {
      fontSize: "16px", fontWeight: 800, color: T.ink,
      display: "flex", alignItems: "center", gap: "8px",
    },
    levelDot: {
      width: "12px", height: "12px", borderRadius: "50%",
      background: levelColors[activeLevel] || T.red, flexShrink: 0,
    },
    countLabel: { fontSize: "13px", fontWeight: 400, color: T.muted },
    searchInput: {
      padding: "9px 14px", border: `1.5px solid ${T.border}`,
      borderRadius: "8px", fontSize: "13px",
      fontFamily: "'Cairo', sans-serif", color: T.ink,
      outline: "none", width: "220px", direction: "rtl", background: T.bg,
    },
    table: { width: "100%", borderCollapse: "collapse" },
    th: {
      background: "#FAFAF8", padding: "12px 18px",
      fontSize: "12px", fontWeight: 700, color: T.muted,
      textAlign: "right", borderBottom: `1px solid ${T.border}`,
      letterSpacing: "0.5px",
    },
    td: {
      padding: "14px 18px", fontSize: "13px",
      color: T.inkSoft, borderBottom: `1px solid ${T.border}`,
    },
    statusBadge: (status) => ({
      display: "inline-block", padding: "4px 12px", borderRadius: "6px",
      fontSize: "12px", fontWeight: 700,
      background: statusConfig[status]?.bg, color: statusConfig[status]?.color,
    }),
    empty: { padding: "60px", textAlign: "center", color: T.muted, fontSize: "14px" },
  };

  const TABLE_HEADERS = [
    "#", "الاسم", "الرقم القومي", "الهاتف",
    "البريد الإلكتروني", "طريقة الدراسة", "تاريخ التسجيل", "الحالة",
  ];

  const STAT_CARDS = [
    { num: stats.total,    label: "إجمالي الطلبات", color: T.red     },
    { num: stats.pending,  label: "قيد المراجعة",   color: "#F57F17" },
    { num: stats.approved, label: "مقبول",          color: "#2E7D32" },
    { num: stats.rejected, label: "مرفوض",         color: T.red     },
  ];

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div style={s.root}>
      <Sidebar
        apps={apps}
        activeBranch={activeBranch}
        activeLevel={activeLevel}
        onBranch={handleBranch}
        onLevel={handleLevel}
        onLogout={onLogout}
        open={sidebarOpen}
      />

      <div style={s.main}>
        {/* Top bar */}
        <div style={s.topbar}>
          <div style={s.topbarLeft}>
            <button style={s.menuBtn} onClick={() => setSidebarOpen((p) => !p)}>
              ☰
            </button>
            <div style={s.breadcrumb}>
              <span style={s.breadMuted}>لوحة التحكم</span>
              <span style={{ color: T.muted }}>›</span>
              <span style={s.breadMuted}>{branchLabel}</span>
              <span style={{ color: T.muted }}>›</span>
              <span style={s.breadActive}>{activeLevel}</span>
            </div>
          </div>
          <div style={s.adminTag}>👤 مسؤول النظام</div>
        </div>

        {/* Content */}
        <div style={s.content}>

          {/* Stats */}
          <div style={s.statsRow}>
            {STAT_CARDS.map((st, i) => (
              <div key={i} style={s.statCard(st.color)}>
                <div style={s.statNum(st.color)}>{st.num}</div>
                <div style={s.statLabel}>{st.label}</div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div style={s.tableCard}>
            <div style={s.tableHeader}>
              <div style={s.tableTitle}>
                <div style={s.levelDot} />
                طلبات {activeLevel} — {branchLabel}
                <span style={s.countLabel}>({filtered.length} طالب)</span>
              </div>
              <input
                style={s.searchInput}
                placeholder="🔍 بحث بالاسم أو الهاتف..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {filtered.length === 0 ? (
              <div style={s.empty}>لا توجد طلبات في هذا المستوى حتى الآن</div>
            ) : (
              <table style={s.table}>
                <thead>
                  <tr>
                    {TABLE_HEADERS.map((h) => (
                      <th key={h} style={s.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((app, idx) => (
                    <tr
                      key={app.id}
                      style={{ cursor: "pointer", transition: "background .15s" }}
                      onClick={() => setSelectedApp(app)}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = T.goldLight)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                    >
                      <td style={{ ...s.td, color: T.muted, fontWeight: 700 }}>{idx + 1}</td>
                      <td style={{ ...s.td, fontWeight: 700, color: T.ink }}>{app.name}</td>
                      <td style={s.td}>{app.nid}</td>
                      <td style={s.td}>{app.phone}</td>
                      <td style={{ ...s.td, direction: "ltr", textAlign: "right" }}>{app.email}</td>
                      <td style={s.td}>{app.mode}</td>
                      <td style={s.td}>{app.date}</td>
                      <td style={s.td}>
                        <span style={s.statusBadge(app.status)}>
                          {statusConfig[app.status]?.label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <ApplicationModal
        app={selectedApp}
        onClose={() => setSelectedApp(null)}
        onStatusChange={changeStatus}
      />
    </div>
  );
}