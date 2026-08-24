import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../styles/Home.css";
import { ChartBar, Graduation, Teacher, Calendar, Timer, Money, User, ImageIcon, Star } from "../components/Icons";

import building1 from "../images/building3.jpg";
import building2 from "../images/building2.jpg";
import inner from "../images/inner.jpg";
import class1 from "../images/class1.jpg";
import class2 from "../images/class2.jpg";
import class3 from "../images/class3.jpg";
import class4 from "../images/class4.jpg";


export default function Home() {
  const navigate = useNavigate();

  const goBooking = () => {
    navigate("/booking");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const animateCount = (el) => {
      const targetRaw = el.dataset.target;
      if (!targetRaw) return;
      const target = parseFloat(targetRaw);
      const decimals = targetRaw.includes('.') ? 1 : 0;
      const duration = 1200;
      const valueNode = el.querySelector('.num-val') || el;
      let start = null;
      const step = (ts) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        const current = decimals ? (target * progress).toFixed(decimals) : Math.floor(target * progress);
        valueNode.textContent = decimals ? parseFloat(current).toFixed(decimals) : current;
        if (progress < 1) requestAnimationFrame(step);
        else valueNode.textContent = decimals ? target.toFixed(decimals) : String(Math.round(target));
      };
      requestAnimationFrame(step);
    };

    const animateBar = (el) => {
      const target = parseFloat(el.dataset.target) || 0;
      el.style.transition = 'width 900ms ease-out';
      requestAnimationFrame(() => { el.style.width = target + '%'; });
    };

    const onIntersect = (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.classList.contains('stat-num') || el.classList.contains('rs-big') || el.classList.contains('rs-count')) {
          animateCount(el);
        }
        if (el.classList.contains('bar-fill')) animateBar(el);
        el.classList.add('in-view');
        obs.unobserve(el);
      });
    };

    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    document.querySelectorAll('.stat-num, .rs-big, .rs-count, .bar-fill, .course-card, .gallery-item').forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ─── HERO ─── */}
      <div className="hero">
        <div className="hero-img-bg" />
        <div className="hero-overlay" />
        <div className="hero-pattern" />
        <div className="hero-zh-watermark">汉</div>
        <div className="hero-inner">
          <div>
            <div className="hero-zh-sub">学习汉语 · 了解中国文化</div>
            <h1>
              تعلّم اللغة<br />
              <em>الصينية</em><br />
              مع المحترفين
            </h1>
            <p>
              معهد كونفوشيوس بجامعة القاهرة — المعهد الرسمي المعتمد من الحكومة الصينية لتعليم اللغة والثقافة
              الصينية في مصر. برامجنا تغطي كل المستويات من الصفر وحتى الإتقان الكامل.
            </p>
            <div className="hero-btns">
              <button className="btn-gold" onClick={goBooking}>سجّل في الكورس ←</button>
              <button className="btn-outline-white" onClick={() => scrollTo("courses")}>استعرض الكورسات</button>
            </div>
          </div>
          <div className="hero-stats">
            <h4><ChartBar className="inline-icon" /> معهدنا بالأرقام</h4>
            <div className="stat">
              <div className="stat-num" data-target="500"><span className="num-val">500</span><sup>+</sup></div>
              <div className="stat-label">اكتر من طالب اتعلم الصيني معانا</div>
            </div>
            <div className="stat">
              <div className="stat-num" data-target="6"><span className="num-val">6</span> <sup style={{ fontSize: "16px" }}>مستويات</sup></div>
              <div className="stat-label">من المبتدئ للمتقدم جداً</div>
            </div>
            <div className="stat">
              <div className="stat-num" data-target="20"><span className="num-val">20</span><sup>سنة</sup></div>
              <div className="stat-label">خبرة في التدريس</div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── ABOUT ─── */}
      <div className="section-wrap" id="about">
        <div className="section-label">
          <div className="dash" /><span>عن المعهد</span>
        </div>
        <div className="about-grid">
          <div className="about-text">
            <div className="section-title" style={{ marginBottom: "24px" }}>
              لماذا تتعلم الصينية <em>معنا؟</em>
            </div>
            <p>
              معهد كونفوشيوس بجامعة القاهرة هو المعهد الرسمي الوحيد في مصر المعتمد مباشرة من وزارة التعليم الصينية
              (هانبان). تأسس المعهد منذ أكثر من 12 عاماً وخرّج آلاف الطلاب الناجحين الذين يعملون الآن في شركات صينية،
              سفارات، ومؤسسات دولية.
            </p>
            <p>
              نقدم مناهج معتمدة دولياً تعتمد على نظام HSK (اختبار الكفاءة الصيني)، مع مدرسين متخصصين من الصين يجمعون
              بين الأكاديمية والتجربة العملية.
            </p>
            <div className="about-features">
              {[
                { Icon: Graduation, title: "شهادات معتمدة", desc: "شهادات من هانبان معترف بها دولياً" },
                { Icon: Teacher, title: "مدرسون صينيون", desc: "نطق سليم من أول يوم" },
                { Icon: Calendar, title: "مواعيد مرنة", desc: "صباحي ومسائي وأونلاين" },
                { Icon: Star, title: "امتحانات HSK", desc: "المعهد مركز اختبار رسمي" },
              ].map((f) => (
                <div className="feat-card" key={f.title}>
                  <div className="feat-icon"><f.Icon /></div>
                  <div className="feat-title">{f.title}</div>
                  <div className="feat-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="photo-grid">
              <div
                className="photo-cell"
                style={{ gridColumn: "span 7", height: "200px" }}
              >
                <img
                  src={building2}
                  alt="المبنى"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div
                className="photo-cell"
                style={{ gridColumn: "span 5", height: "200px" }}
              >
                <img
                  src={building1}
                  alt="المعهد"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div
                className="photo-cell"
                style={{ gridColumn: "span 4", height: "150px" }}
              >
                <img
                  src={class1}
                  alt="داخل"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div
                className="photo-cell"
                style={{ gridColumn: "span 4", height: "150px" }}
              >
                <img
                  src={class2}
                  alt="داخل"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div
                className="photo-cell"
                style={{ gridColumn: "span 4", height: "150px" }}
              >
                <img
                  src={inner}
                  alt="داخل"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ─── ZH BAND ─── */}
      <div className="zh-band">
        <div className="zh-band-inner">学 · 语 · 文 · 化 · 知 · 识 · 友 · 谊 · 合 · 作 · 学 · 语 · 文 · 化</div>
      </div>

      {/* ─── GALLERY ─── */}
      <div className="section-wrap">
        <div className="section-label">
          <div className="dash" /><span>داخل الكلاس</span>
        </div>
        <div className="section-title">لحظات من <em>داخل الفصل</em></div>
        <div className="gallery-grid">
          <div className="gallery-item" style={{ gridColumn: "span 2", aspectRatio: "16/7" }}>
            <img src={class1} alt="الفصل" />
            <div className="gallery-overlay">عرض الصورة</div>
          </div>
          <div className="gallery-item">
            <img src={class2} alt="الفصل" />
            <div className="gallery-overlay">عرض الصورة</div>
          </div>
          <div className="gallery-item">
            <img src={class3} alt="الفصل" />
            <div className="gallery-overlay">عرض الصورة</div>
          </div>
          <div className="gallery-item">
            <img src={class4} alt="الفصل" />
            <div className="gallery-overlay">عرض الصورة</div>
          </div>
          <div className="gallery-item">
            <img src={class3} alt="الفصل" />
            <div className="gallery-ph"><ImageIcon style={{ fontSize: "30px", opacity: 0.4 }} /></div>
            <div className="gallery-overlay">عرض الصورة</div>
          </div>
        </div>
      </div>

      {/* ─── COURSES ─── */}
      <div style={{ background: "var(--gold-light)", padding: "1px 0" }} id="courses">
        <div className="section-wrap">
          <div className="section-label">
            <div className="dash" /><span>الكورسات</span>
          </div>
          <div className="section-title">اختار مستواك <em>وابدأ رحلتك</em></div>
          <div className="courses-grid">
            {[
              { level: "المستوى الأول", name: "مبتدئ — HSK 1", zh: "一", color: "c1", days: "سبت + اثنين | 10 ص – 12 م", duration: "2 شهور — 24 محاضرة", price: "850 جنيه / الفصل", teacher: "أ. Wang Fang", status: "open", statusText: "✓ تسجيل مفتوح" },
              { level: "المستوى الثاني", name: "أساسي — HSK 2", zh: "二", color: "c2", days: "أحد + ثلاثاء | 2 م – 4 م", duration: "2 شهور — 24 محاضرة", price: "850 جنيه / الفصل", teacher: "د. Li Ming", status: "open", statusText: "✓ تسجيل مفتوح" },
              { level: "المستوى الثالث", name: "متوسط — HSK 3", zh: "三", color: "c3", days: "خميس | 10 ص – 1 م", duration: "2 شهور — 32 محاضرة", price: "850 جنيه / الفصل", teacher: "د. Chen Xiao", status: "soon", statusText: "⏳ قريباً" },
              { level: "المستوى الرابع", name: "متقدم — HSK 4", zh: "高", color: "c4", days: "أربعاء + جمعة | 5 م – 7 م", duration: "2 شهور — 40 محاضرة", price: "850 جنيه / الفصل", teacher: "أ. Zhang Wei", status: "open", statusText: "✓ تسجيل مفتوح" },
              { level: "المستوى الخامس", name: "متقدم — HSK 5", zh: "高", color: "c4", days: "أربعاء + جمعة | 5 م – 7 م", duration: "2 شهور — 40 محاضرة", price: "850 جنيه / الفصل", teacher: "أ. Zhang Wei", status: "open", statusText: "✓ تسجيل مفتوح" },
              { level: "المستوى السادس", name: "متقدم — HSK 6", zh: "高", color: "c4", days: "أربعاء + جمعة | 5 م – 7 م", duration: "2 شهور — 40 محاضرة", price: "850 جنيه / الفصل", teacher: "أ. Zhang Wei", status: "open", statusText: "✓ تسجيل مفتوح" },
            ].map((c) => (
              <div className="course-card" key={c.name}>
                <div className={`course-top ${c.color}`}>
                  <div>
                    <div className="c-level">{c.level}</div>
                    <div className="c-name">{c.name}</div>
                  </div>
                  <div className="c-zh">{c.zh}</div>
                </div>
                <div className="course-body">
                  <div className="c-rows">
                    <div className="c-row"><div className="c-ico"><Calendar /></div>{c.days}</div>
                    <div className="c-row"><div className="c-ico"><Timer /></div>{c.duration}</div>
                    <div className="c-row"><div className="c-ico"><Money /></div>{c.price}</div>
                    <div className="c-row"><div className="c-ico"><User /></div>{c.teacher}</div>
                  </div>
                  <span className={`badge-status badge-${c.status}`}>{c.statusText}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── SCHEDULE ─── */}
      <div className="section-wrap">
        <div className="section-label">
          <div className="dash" /><span>الجدول الدراسي</span>
        </div>
        <div className="section-title">مواعيد <em>الكورسات الحالية</em></div>
        <div className="tbl-wrap">
          <table className="sched">
            <thead>
              <tr>
                <th>الكورس</th><th>المستوى</th><th>الأيام</th>
                <th>الوقت</th><th>المدرس</th><th>الأماكن</th><th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["HSK 1 – مبتدئ", "أول", "سبت + اثنين", "10 ص – 12 م", "Wang Fang", "25", "open", "مفتوح"],
                ["HSK 2 – أساسي", "ثاني", "أحد + ثلاثاء", "2 م – 4 م", "Li Ming", "20", "open", "مفتوح"],
                ["HSK 3 – متوسط", "ثالث", "خميس", "10 ص – 1 م", "Chen Xiao", "20", "soon", "قريباً"],
                ["HSK 4/5 – متقدم", "رابع-خامس", "أربعاء + جمعة", "5 م – 7 م", "Zhang Wei", "15", "open", "مفتوح"],
                ["كاليجرافي صيني", "كل المستويات", "جمعة", "11 ص – 1 م", "Wang Fang", "15", "full", "ممتلئ"],
                ["الثقافة الصينية", "مفتوح", "سبت", "3 م – 5 م", "فريق المعهد", "40", "open", "مفتوح"],
              ].map(([name, level, days, time, teacher, seats, status, label]) => (
                <tr key={name}>
                  <td>{name}</td><td>{level}</td><td>{days}</td>
                  <td>{time}</td><td>{teacher}</td><td>{seats}</td>
                  <td><span className={`badge-status badge-${status}`}>{label}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── REVIEWS ─── */}
      <div style={{ background: "#fff", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="section-wrap">
          <div className="section-label">
            <div className="dash" /><span>آراء الطلاب</span>
          </div>
          <div className="section-title">ماذا يقول <em>طلابنا؟</em></div>
          <div className="reviews-summary">
            <div><div className="rs-big" data-target="4.9"><span className="num-val">4.9</span><sup>/5</sup></div></div>
            <div className="rs-info">
              <div className="rs-stars">★★★★★</div>
              <div className="rs-count" data-target="320">بناءً على <span className="num-val">320</span> تقييم من طلاب المعهد</div>
            </div>
            <div className="rs-bars">
              {[["5 ★", "90%"], ["4 ★", "7%"], ["3 ★", "2%"], ["2 ★", "1%"]].map(([label, pct]) => (
                <div className="bar-row" key={label}>
                  {label}
                  <div className="bar-track"><div className="bar-fill" data-target={pct.replace("%", "")} style={{ width: "0%" }} /></div>
                  {pct}
                </div>
              ))}
            </div>
          </div>
          <div className="reviews-grid">
            {[
              { text: '"So friendly staff new clean and tidy building. Professional instructors"', name: "Ali Elkholy", time: "Year ago", cls: "ra1", initial: "A" },
              { text: '"The teachers are Chinese and they are skilled, and the curriculum is good. They have activities to improve the language and scholarships to study in China, and the tuition fees at the institute are not expensive."', name: "Heba Bazara", time: "7 years ago", cls: "ra2", initial: "H" },
              { text: '"The best place where you can learn Chinese in Egypt and the Middle East."', name: "Passant El sawy", time: "7 Years ago", cls: "ra3", initial: "P" },
            ].map((r) => (
              <div className="review-card" key={r.name}>
                <div className="review-stars">{Array.from({ length: 5 }).map((_, i) => (<Star key={i} />))}</div>
                <div className="review-text">{r.text}</div>
                <div className="review-author">
                  <div className={`review-avatar ${r.cls}`}>{r.initial}</div>
                  <div>
                    <div className="review-name">{r.name}</div>
                    <div className="review-course">{r.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── CTA BANNER ─── */}
      <div style={{ background: "var(--red)", padding: "60px 48px", textAlign: "center" }}>
        <div style={{ fontFamily: "'Noto Serif SC',serif", fontSize: "28px", color: "rgba(255,255,255,.15)", letterSpacing: "12px", marginBottom: "20px" }}>
          开始你的汉语之旅
        </div>
        <h3 style={{ fontSize: "28px", color: "#fff", fontWeight: "800", marginBottom: "12px" }}>
          جاهز تبدأ رحلتك مع اللغة الصينية؟
        </h3>
        <p style={{ color: "rgba(255,255,255,.75)", fontSize: "15px", marginBottom: "28px" }}>
          سجّل الآن قبل اكتمال الأماكن — التسجيل سريع وسهل
        </p>
        <button className="btn-gold" onClick={goBooking} style={{ fontSize: "16px", padding: "16px 40px" }}>
          سجّل الآن في الكورس ←
        </button>
      </div>
    </>
  );
}
