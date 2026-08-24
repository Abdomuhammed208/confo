import { useState } from "react";
import "../styles/Contact.css";
import { MapPin, Clock, Phone, Mail, Facebook, Envelope } from "../components/Icons";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="section-wrap" style={{ paddingTop: "100px" }}>
      <div className="section-label">
        <div className="dash" /><span>تواصل معنا</span>
      </div>
      <div className="section-title">نحن هنا <em>للمساعدة</em></div>

      <div className="contact-layout">
        {/* MAP */}
        <div>
          <div className="map-box">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.2787706254586!2d31.20778231511907!3d30.026325981886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14584058e8c4b1e3%3A0xf200b3bdbb3fbc26!2sCairo%20University!5e0!3m2!1sen!2seg!4v1620000000000!5m2!1sen!2seg"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cairo University Map"
            />
          </div>
          <p style={{ fontSize: "12px", color: "var(--muted)", marginTop: "10px", textAlign: "center" }}>
            <MapPin style={{ verticalAlign: 'middle', marginRight: '6px' }} /> جامعة القاهرة، كلية الدراسات الإنسانية، الجيزة
          </p>
        </div>

        {/* CONTACT DETAILS */}
        <div className="contact-cards">
          {[
            { Icon: MapPin, label: "العنوان", val: <span>كلية الدراسات الإنسانية<br />جامعة القاهرة — الجيزة</span> },
            { Icon: Clock, label: "ساعات العمل", val: <span>الأحد – الخميس: 9 ص – 4 م<br />السبت: 9 ص – 2 م</span> },
            { Icon: Phone, label: "تليفون", val: <span>02-35676780<br /><span style={{ fontSize: "12px", color: "var(--muted)" }}>خط ثاني: 02-35676781</span></span> },
            { Icon: Mail, label: "البريد الإلكتروني", val: "confucius@cu.edu.eg" },
            { Icon: Facebook, label: "صفحة الفيسبوك", val: <span style={{ color: "var(--red)" }}>Confucius Institute Cairo University</span> },
          ].map((c, i) => (
            <div className="contact-card" key={i}>
              <div className="contact-icon-box"><c.Icon /></div>
              <div>
                <div className="contact-label">{c.label}</div>
                <div className="contact-val">{c.val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT FORM */}
      <div className="contact-form-card" style={{ marginTop: "40px" }}>
        <h4><Envelope className="inline-icon" /> ابعت لنا رسالة</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          <input type="text" className="cf-input" placeholder="اسمك الكامل" />
          <input type="email" className="cf-input" placeholder="إيميلك" />
        </div>
        <input type="text" className="cf-input" placeholder="موضوع الرسالة" />
        <textarea className="cf-input" placeholder="رسالتك هنا..." />
        <button className="cf-btn" onClick={() => setSent(true)}>
          {sent ? "✅ تم الإرسال!" : "إرسال الرسالة"}
        </button>
      </div>
    </div>
  );
}
