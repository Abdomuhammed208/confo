import { T, statusConfig, levelColors } from "./constants";


export default function ApplicationModal({ app, onClose, onStatusChange }) {
  if (!app) return null;

  const styles = {
    overlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.55)",
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    card: {
      background: "#fff",
      borderRadius: "18px",
      padding: "36px",
      width: "100%",
      maxWidth: "520px",
      fontFamily: "'Cairo', sans-serif",
      direction: "rtl",
      boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
      position: "relative",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "24px",
    },
    name: { fontSize: "20px", fontWeight: 800, color: T.ink },
    date: { fontSize: "13px", color: T.muted },
    closeBtn: {
      background: "none",
      border: "none",
      fontSize: "22px",
      cursor: "pointer",
      color: T.muted,
    },
    levelBadge: {
      display: "inline-block",
      padding: "5px 14px",
      borderRadius: "8px",
      background: levelColors[app.level] || T.red,
      color: "#fff",
      fontWeight: 700,
      fontSize: "13px",
      marginBottom: "20px",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 0",
      borderBottom: `1px solid ${T.border}`,
      fontSize: "14px",
      color: T.inkSoft,
    },
    rowLabel: { fontWeight: 600 },
    statusTitle: {
      marginTop: "24px",
      marginBottom: "12px",
      fontSize: "13px",
      fontWeight: 700,
      color: T.inkSoft,
    },
    statusBtns: { display: "flex", gap: "10px", flexWrap: "wrap" },
    statusBtn: (key) => ({
      padding: "8px 18px",
      borderRadius: "8px",
      border: `2px solid ${
        app.status === key ? statusConfig[key].color : T.border
      }`,
      background: app.status === key ? statusConfig[key].bg : "#fff",
      color: statusConfig[key].color,
      fontWeight: 700,
      fontSize: "13px",
      fontFamily: "'Cairo', sans-serif",
      cursor: "pointer",
      transition: "all .15s",
    }),
  };

  const fields = [
    ["📞 الهاتف",          app.phone],
    ["📧 الإيميل",         app.email],
    ["🪪 الرقم القومي",    app.nid],
    ["🏫 الفرع",           app.branch === "cairo" ? "جامعة القاهرة" : "جامعة عين شمس"],
    ["📚 طريقة الدراسة",   app.mode],
  ];

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.card} onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <div style={styles.name}>{app.name}</div>
            <div style={styles.date}>{app.date}</div>
          </div>
          <button style={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Level badge */}
        <div style={styles.levelBadge}>{app.level}</div>

        {/* Detail rows */}
        {fields.map(([label, value]) => (
          <div key={label} style={styles.row}>
            <span style={styles.rowLabel}>{label}</span>
            <span style={label === "📧 الإيميل" ? { direction: "ltr" } : {}}>{value}</span>
          </div>
        ))}

        {/* Status changer */}
        <div style={styles.statusTitle}>تغيير الحالة:</div>
        <div style={styles.statusBtns}>
          {Object.entries(statusConfig).map(([key, cfg]) => (
            <button
              key={key}
              style={styles.statusBtn(key)}
              onClick={() => onStatusChange(app.id, key)}
            >
              {cfg.label}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}
