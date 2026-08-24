

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ─── Theme constants (inline so file is self-contained) ────────────────────
const T = {
  red: "#B71C1C",
  redDeep: "#7B0000",
  redLight: "#FFEBEE",
  gold: "#C9A84C",
  ink: "#1A1A1A",
  inkSoft: "#444",
  muted: "#888",
  border: "#E0E0E0",
  bg: "#FAFAFA",
};

// ─── Keyframe injection ────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800&family=Noto+Serif+SC:wght@700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -400px 0; }
    100% { background-position:  400px 0; }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(0.8); opacity: 0.8; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(-8deg); }
    50%       { transform: translateY(-12px) rotate(-8deg); }
  }
  @keyframes gradShift {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .login-root {
    min-height: 100vh;
    background: linear-gradient(135deg, #0d0000 0%, #6B0000 40%, #B71C1C 70%, #7B0000 100%);
    background-size: 300% 300%;
    animation: gradShift 10s ease infinite;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Cairo', sans-serif;
    direction: rtl;
    padding: 24px;
    position: relative;
    overflow: hidden;
  }

  .login-root::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 28px 28px;
    pointer-events: none;
  }

  .login-root::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      105deg,
      transparent 40%,
      rgba(255,255,255,0.03) 50%,
      transparent 60%
    );
    animation: shimmer 6s linear infinite;
    background-size: 800px 100%;
    pointer-events: none;
  }

  .watermark-zh {
    position: absolute;
    left: -30px;
    bottom: -80px;
    font-family: 'Noto Serif SC', serif;
    font-size: 320px;
    color: rgba(255,255,255,0.035);
    font-weight: 700;
    line-height: 1;
    pointer-events: none;
    user-select: none;
    animation: float 8s ease-in-out infinite;
  }

  .login-card {
    background: #fff;
    border-radius: 24px;
    padding: 52px 48px;
    width: 100%;
    max-width: 430px;
    box-shadow: 0 32px 100px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.1);
    position: relative;
    z-index: 2;
    animation: fadeUp 0.6s cubic-bezier(0.22,1,0.36,1) both;
  }

  .login-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #C9A84C, #F5D98A, #C9A84C);
    border-radius: 24px 24px 0 0;
  }

  .logo-row {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-bottom: 36px;
  }

  .logo-emblem {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: linear-gradient(135deg, #7B0000, #B71C1C);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 24px rgba(183,28,28,0.4);
    position: relative;
    margin-bottom: 4px;
  }

  .logo-emblem::after {
    content: '';
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: 1.5px solid rgba(201,168,76,0.5);
    animation: pulse-ring 2.5s ease-out infinite;
  }

  .logo-zh-inner {
    font-family: 'Noto Serif SC', serif;
    font-size: 26px;
    color: #C9A84C;
    line-height: 1;
  }

  .logo-title {
    font-size: 20px;
    font-weight: 800;
    color: #1A1A1A;
    letter-spacing: 0.3px;
  }

  .logo-sub {
    font-size: 12px;
    color: #999;
    letter-spacing: 0.5px;
  }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, #E0E0E0 30%, #E0E0E0 70%, transparent);
    margin: 0 -8px 28px;
  }

  .field-label {
    font-size: 13px;
    font-weight: 700;
    color: #555;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .field-label svg {
    opacity: 0.5;
  }

  .input-wrap {
    position: relative;
    margin-bottom: 20px;
  }

  .login-input {
    width: 100%;
    padding: 13px 16px;
    border: 1.5px solid #E5E5E5;
    border-radius: 12px;
    font-size: 14px;
    font-family: 'Cairo', sans-serif;
    color: #1A1A1A;
    background: #FAFAFA;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    direction: rtl;
  }

  .login-input:focus {
    border-color: #B71C1C;
    box-shadow: 0 0 0 3px rgba(183,28,28,0.1);
    background: #fff;
  }

  .login-input::placeholder { color: #bbb; }

  .login-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #B71C1C, #7B0000);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 700;
    font-family: 'Cairo', sans-serif;
    cursor: pointer;
    margin-top: 4px;
    transition: all 0.25s;
    position: relative;
    overflow: hidden;
    letter-spacing: 0.5px;
  }

  .login-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.12), transparent);
    border-radius: inherit;
  }

  .login-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(183,28,28,0.45);
  }

  .login-btn:active:not(:disabled) {
    transform: translateY(0);
  }

  .login-btn:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }

  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.35);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    vertical-align: middle;
    margin-left: 8px;
  }

  .err-box {
    background: #FFF5F5;
    color: #B71C1C;
    border: 1px solid rgba(183,28,28,0.2);
    border-radius: 10px;
    padding: 11px 16px;
    font-size: 13px;
    margin-top: 16px;
    text-align: center;
    animation: fadeUp 0.3s ease both;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .success-box {
    background: #F0FFF4;
    color: #276749;
    border: 1px solid rgba(39,103,73,0.2);
    border-radius: 10px;
    padding: 11px 16px;
    font-size: 13px;
    margin-top: 16px;
    text-align: center;
    animation: fadeUp 0.3s ease both;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  @media (max-width: 480px) {
    .login-card { padding: 40px 28px; }
    .watermark-zh { font-size: 200px; }
  }
`;

// ─── Component ─────────────────────────────────────────────────────────────
export default function LoginPage() {                           // ← removed onLogin prop
  const navigate = useNavigate();                               // ← added
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const id = "login-page-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = css;
      document.head.appendChild(tag);
    }
    return () => {
      const tag = document.getElementById(id);
      if (tag) tag.remove();
    };
  }, []);

  const submit = async () => {
    if (!user || !pass) {
      setErr("يرجى إدخال اسم المستخدم وكلمة المرور");
      return;
    }
    setLoading(true);
    setErr("");
    setSuccess("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: user, password: pass }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("تم تسجيل الدخول بنجاح، جاري التحويل...");
        setTimeout(() => navigate("/admin"), 800);             // ← replaced onLogin() with navigate
      } else {
        setErr(data.error || "بيانات الدخول غير صحيحة");
      }
    } catch {
      setErr("تعذر الاتصال بالخادم، حاول مرة أخرى");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">
      <div className="watermark-zh">孔</div>

      <div className="login-card">
        <div className="logo-row">
          <div className="logo-emblem">
            <span className="logo-zh-inner">孔</span>
          </div>
          <div className="logo-title">لوحة تحكم الإدارة</div>
          <div className="logo-sub">معهد كونفوشيوس — جامعة القاهرة</div>
        </div>

        <div className="divider" />

        <div className="field-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          اسم المستخدم
        </div>
        <div className="input-wrap">
          <input
            className="login-input"
            value={user}
            onChange={(e) => { setUser(e.target.value); setErr(""); }}
            placeholder="أدخل اسم المستخدم"
            autoComplete="username"
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
        </div>

        <div className="field-label">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          كلمة المرور
        </div>
        <div className="input-wrap">
          <input
            type="password"
            className="login-input"
            value={pass}
            onChange={(e) => { setPass(e.target.value); setErr(""); }}
            placeholder="أدخل كلمة المرور"
            autoComplete="current-password"
            onKeyDown={(e) => e.key === "Enter" && submit()}
          />
        </div>

        <button className="login-btn" onClick={submit} disabled={loading}>
          {loading ? (
            <>جاري التحقق... <span className="spinner" /></>
          ) : (
            "تسجيل الدخول"
          )}
        </button>

        {err && (
          <div className="err-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {err}
          </div>
        )}

        {success && (
          <div className="success-box">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            {success}
          </div>
        )}
      </div>
    </div>
  );
}