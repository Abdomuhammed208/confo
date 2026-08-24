import { useState } from "react";
import axios from "axios";
import "../styles/Booking.css";
import { ImageIcon, ChartBar, Money, Phone, Clock, Star } from "../components/Icons";

export default function Booking() {
  const [form, setForm] = useState({
    name: "", nid: "", phone: "", email: "",
    course: "", level: "", location: "", mode: "",
  });
  const [imgPreview, setImgPreview] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImgPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    const { name, nid, phone, email, course, level, location, mode } = form;

    if (!name || !nid || !phone || !email || !course || !level || !location || !mode) {
      setError("من فضلك اكمل جميع البيانات المطلوبة (*)");
      return;
    }
    if (nid.length !== 14 || isNaN(nid)) {
      setError("الرقم القومي لازم يكون 14 رقم");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
        fullName: name,
        nationalNumber: nid,
        phone,
        email,
        course,
        level,
        location,
        mode,
      });

      console.log("Server response:", response.data);
      setSuccess(true);
      setTimeout(() => {
        document.getElementById("successMsg")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);

    } catch (err) {
      console.error("Registration error:", err);
      const serverMsg = err.response?.data?.message;
      setError(serverMsg || "حصل خطأ أثناء الإرسال. حاول تاني.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-wrap" style={{ paddingTop: "100px" }}>
      <div className="section-label">
        <div className="dash" /><span>الحجز والتسجيل</span>
      </div>
      <div className="section-title">سجّل في <em>الكورس الآن</em></div>
      <div className="booking-layout">

        {/* ─── FORM ─── */}
        <div className="booking-form-card">
          {error && (
            <div style={{ background: "var(--red-light)", border: "1px solid var(--red)", borderRadius: "8px", padding: "12px 16px", color: "var(--red)", marginBottom: "18px", fontSize: "14px" }}>
              {error}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label><span className="req">*</span> الاسم الكامل</label>
              <input type="text" placeholder="الاسم الرباعي كما في البطاقة" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>
            <div className="form-group">
              <label><span className="req">*</span> الرقم القومي</label>
              <input type="text" placeholder="14 رقم" maxLength="14" value={form.nid} onChange={(e) => handleChange("nid", e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><span className="req">*</span> رقم الموبايل</label>
              <input type="tel" placeholder="01XXXXXXXXX" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} />
            </div>
            <div className="form-group">
              <label><span className="req">*</span> البريد الإلكتروني</label>
              <input type="email" placeholder="example@email.com" value={form.email} onChange={(e) => handleChange("email", e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label><span className="req">*</span> صورة شخصية</label>
            <div className="upload-box">
              <input type="file" accept="image/*" onChange={handleImgChange} />
              {imgPreview
                ? <img src={imgPreview} alt="معاينة" className="upload-preview" />
                : <div className="upload-icon"><ImageIcon /></div>
              }
              <div className="upload-text">
                {imgPreview
                  ? "✓ تم رفع الصورة"
                  : <> اضغط لرفع صورة شخصية واضحة<br /><span style={{ fontSize: "11px", opacity: 0.6 }}>JPG أو PNG — حد أقصى 5 MB</span></>
                }
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label><span className="req">*</span> الكورس المطلوب</label>
              <select value={form.course} onChange={(e) => handleChange("course", e.target.value)}>
                <option value="">اختار الكورس</option>
                <option>HSK 1</option>
                <option>HSK 2</option>
                <option>HSK 3</option>
                <option>HSK 4</option>
                <option>HSK 5</option>
                <option>HSK 6</option>
              </select>
            </div>
            <div className="form-group">
              <label><span className="req">*</span> مستواك الحالي</label>
              <select value={form.level} onChange={(e) => handleChange("level", e.target.value)}>
                <option value="">اختار مستواك</option>
                <option>مبتدئ تماماً — لا أعرف شيئاً</option>
                <option>تعلمت قليلاً من قبل</option>
                <option>متوسط — أتكلم قليلاً</option>
                <option>متقدم — أريد التحسين</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label><span className="req">*</span> الفرع</label>
            <div className="radio-group">
              {[["cairo", "جامعة القاهرة — الجيزة"], ["ainshams", "جامعة عين شمس"]].map(([val, label]) => (
                <label key={val} className={`radio-opt${form.location === val ? " selected" : ""}`}>
                  <input type="radio" name="location" value={val} checked={form.location === val} onChange={() => handleChange("location", val)} />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label><span className="req">*</span> طريقة الحضور</label>
            <div className="radio-group">
              {[["offline", "حضوري (داخل القاعة)"], ["online", "أونلاين (Zoom)"]].map(([val, label]) => (
                <label key={val} className={`radio-opt${form.mode === val ? " selected" : ""}`}>
                  <input type="radio" name="mode" value={val} checked={form.mode === val} onChange={() => handleChange("mode", val)} />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={loading}
            style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
          >
            {loading ? (<><Clock className="inline-icon" /> جاري الإرسال...</>) : ("إرسال طلب التسجيل ←")}
          </button>

          {success && (
            <div className="success-box" id="successMsg">
              تم استلام طلبك بنجاح! سنتواصل معك خلال 24-48 ساعة لتأكيد الحجز وتفاصيل الدفع.
            </div>
          )}
        </div>

        {/* ─── SIDEBAR ─── */}
        <div className="booking-info">
          <div className="info-block">
            <h4><ChartBar className="inline-icon" /> مستندات مطلوبة</h4>
            {["صورة من بطاقة الرقم القومي", "صورة شخصية حديثة واضحة", "إيصال الدفع (بعد تأكيد الحجز)"].map((item) => (
              <div className="info-item" key={item}><div className="info-dot" />{item}</div>
            ))}
          </div>
          <div className="info-block">
            <h4><Money className="inline-icon" /> رسوم التسجيل</h4>
            {["850 جنيه / فصل", "الدفع نقداً في مكتب المعهد"].map((item) => (
              <div className="info-item" key={item}><div className="info-dot" />{item}</div>
            ))}
          </div>
          <div className="info-block">
            <h4><ChartBar className="inline-icon" /> إيه اللي بيحصل بعدين؟</h4>
            {[
              "هتوصلك رسالة تأكيد على إيميلك",
              "فريقنا هيتواصل معاك خلال 48 ساعة",
              <span key="start">تبدأ أول محاضرة مع مجموعتك <Star /></span>
            ].map((item, idx) => (
              <div className="info-item" key={idx}><div className="info-dot" />{item}</div>
            ))}
          </div>
          <div style={{ background: "var(--red)", borderRadius: "14px", padding: "22px 20px", color: "rgba(255,255,255,.85)", fontSize: "13px", lineHeight: "1.85" }}>
            <div style={{ color: "#fff", fontWeight: "700", marginBottom: "8px" }}><Phone className="inline-icon" /> محتاج مساعدة؟</div>
            اتصل بينا: <strong style={{ color: "var(--gold)" }}>02-35676780</strong><br />
            أو ابعتلنا على إيميل:<br />
            <strong style={{ color: "var(--gold)" }}>confucius@cu.edu.eg</strong>
          </div>
        </div>

      </div>
    </div>
  );
}