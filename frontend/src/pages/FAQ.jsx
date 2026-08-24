import { useState } from "react";
import "../styles/FAQ.css";

const ALL_FAQS = [
  { cat: "enroll", q: "هل محتاج خلفية عن اللغة الصينية قبل التسجيل؟", a: "لا على الإطلاق! كورس HSK 1 مصمم للمبتدئين من الصفر الكامل. بيبدأ من تعلم النطق الصحيح (البينيين) وأبسط الحروف. كل اللي محتاجه هو الرغبة في التعلم!" },
  { cat: "enroll", q: "إيه الأوراق اللي محتاجها للتسجيل؟", a: "محتاج: صورة من بطاقة الرقم القومي، صورة شخصية حديثة، وإيصال الدفع بعد تأكيد الحجز. كل ده بيتعمل في المعهد بعد ما بنتواصل معاك." },
  { cat: "courses", q: "هل في كورسات أونلاين؟", a: "آه! كل الكورسات متاحة أونلاين عبر Zoom وحضوري في نفس الوقت. تقدر تختار الطريقة اللي تناسبك وقت التسجيل. الأونلاين بنفس الجودة والمحتوى." },
  { cat: "courses", q: "إيه الفرق بين كورس جامعة القاهرة وعين شمس؟", a: "المنهج والمدرسون نفسهم في الفرعين. الفرق الوحيد هو الموقع الجغرافي. اختار الأقرب ليك. بعض المواعيد ممكن تختلف شوية — هتعرف التفاصيل وقت التسجيل." },
  { cat: "payment", q: "إيه طريقة الدفع؟", a: "الدفع بيتم نقداً في مكتب المعهد أو بالتحويل البنكي. في بعض الكورسات الطويلة ممكن يكون في نظام تقسيط — اسأل في المكتب عن التفاصيل." },
  { cat: "payment", q: "هل في خصومات لطلاب الجامعة؟", a: "آه! طلاب جامعة القاهرة وعين شمس بيستفيدوا من خصم خاص على الرسوم. محتاج تجيب معاك بطاقة الطالب وقت التسجيل لتفعيل الخصم." },
  { cat: "cert", q: "هل الكورس بيعطي شهادة معتمدة؟", a: "آه! كل الكورسات بتنتهي بشهادة من معهد كونفوشيوس معتمدة من هانبان (الجهة الصينية الرسمية). كمان المعهد بيساعد الطلاب في التسجيل لامتحانات HSK الدولية." },
  { cat: "cert", q: "امتحانات HSK بيتعملوا فين؟", a: "المعهد نفسه مركز اختبار رسمي معتمد لامتحانات HSK الدولية. يعني مش محتاج تسافر أو تدور على مركز تاني — كل حاجة هنا في نفس المكان." },
  { cat: "courses", q: "هل في كتب أو مواد مطلوبة أشتريها؟", a: "المعهد بيوفر الكتاب الرسمي (New HSK Standard Course) بسعر مدعوم. بعض المواد الإضافية بتكون مجانية أونلاين. هيتم إبلاغك بكل ده قبل بداية الكورس." },
  { cat: "enroll", q: "لو فاتتني محاضرة إيه بعمل؟", a: "كل المحاضرات بيتم تسجيلها وبتكون متاحة للطلاب المسجلين لمدة أسبوع بعد المحاضرة. كمان ممكن تحضر نفس المحاضرة في مجموعة تانية لو في مواعيد مناسبة." },
];

const CATS = [
  { key: "all", label: "الكل" },
  { key: "enroll", label: "التسجيل" },
  { key: "courses", label: "الكورسات" },
  { key: "payment", label: "الرسوم والدفع" },
  { key: "cert", label: "الشهادات" },
];

export default function FAQ() {
  const [activeCat, setActiveCat] = useState("all");
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = ALL_FAQS.filter((f) => activeCat === "all" || f.cat === activeCat);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div className="section-wrap" style={{ paddingTop: "100px" }}>
      <div className="section-label">
        <div className="dash" /><span>أسئلة شائعة</span>
      </div>
      <div className="section-title">إجابات على <em>أسئلتك</em></div>

      <div className="faq-cats">
        {CATS.map((c) => (
          <button
            key={c.key}
            className={`faq-cat-btn${activeCat === c.key ? " active" : ""}`}
            onClick={() => { setActiveCat(c.key); setOpenIndex(null); }}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="faq-list">
        {filtered.map((f, i) => (
          <div key={i} className={`faq-item${openIndex === i ? " open" : ""}`}>
            <div className="faq-q" onClick={() => toggle(i)}>
              {f.q}
              <span className="faq-arrow">+</span>
            </div>
            <div className="faq-a">{f.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
