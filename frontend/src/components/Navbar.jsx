import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (path, scrollId) => {
    setMenuOpen(false);
    navigate(path);
    if (scrollId) {
      setTimeout(() => {
        const el = document.getElementById(scrollId);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <nav className={scrolled ? "nav-scrolled" : ""}>
      <div className="nav-logo" onClick={() => go("/")}>
        <span className="zh">孔子学院</span>
        <div className="ar">
          معهد كونفوشيوس<br />
          <span style={{ fontSize: "10px", opacity: 0.6 }}>جامعة القاهرة</span>
        </div>
      </div>

      <div className={`nav-links${menuOpen ? " open" : ""}`}>
        <a className={isActive("/")} onClick={() => go("/")}>الرئيسية</a>
        <a className={isActive("/#courses")} onClick={() => go("/", "courses")}>الكورسات</a>
        {/* booking link removed (was empty/invisible) */}
        <a className={isActive("/faq")} onClick={() => go("/faq")}>FAQ</a>
        <a className={isActive("/contact")} onClick={() => go("/contact")}>تواصل معنا</a>
        <a className="nav-cta" onClick={() => go("/booking")}>سجّل الآن ←</a>
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="القائمة">
        <span /><span /><span />
      </button>
    </nav>
  );
}
