import { useState } from "react";

const sections = [
  {
    id: "governance",
    icon: "🛡️",
    title: "Διακυβέρνηση & Πολιτικές Ασφαλείας",
    items: [
      { id: "g1", label: "Υπάρχει επίσημη Πολιτική Ασφάλειας Πληροφοριών εγκεκριμένη από τη διοίκηση", level: "ΚΡΙΣΙΜΟ" },
      { id: "g2", label: "Έχει οριστεί υπεύθυνος κυβερνοασφάλειας (CISO ή ισοδύναμος ρόλος)", level: "ΚΡΙΣΙΜΟ" },
      { id: "g3", label: "Υπάρχει καταγεγραμμένη διαδικασία διαχείρισης κινδύνων (Risk Management)", level: "ΚΡΙΣΙΜΟ" },
      { id: "g4", label: "Οι πολιτικές ασφαλείας αναθεωρούνται τουλάχιστον ετησίως", level: "ΣΗΜΑΝΤΙΚΟ" },
      { id: "g5", label: "Υπάρχει μητρώο assets (υλικό, λογισμικό, δεδομένα)", level: "ΣΗΜΑΝΤΙΚΟ" },
    ],
  },
  {
    id: "soc",
    icon: "🔍",
    title: "Παρακολούθηση & Ανίχνευση (SOC)",
    items: [
      { id: "s1", label: "Υπάρχει 24/7 παρακολούθηση της υποδομής (SOC ή managed service)", level: "ΚΡΙΣΙΜΟ" },
      { id: "s2", label: "Χρησιμοποιείται SIEM (Security Information and Event Management) σύστημα", level: "ΚΡΙΣΙΜΟ" },
      { id: "s3", label: "Καταγράφονται και αναλύονται logs από όλα τα κρίσιμα συστήματα", level: "ΣΗΜΑΝΤΙΚΟ" },
      { id: "s4", label: "Υπάρχει διαδικασία ανίχνευσης και αντιμετώπισης ανωμαλιών (anomaly detection)", level: "ΣΗΜΑΝΤΙΚΟ" },
      { id: "s5", label: "Τα ιατρικά συστήματα (HIS, PACS, LIS) εντάσσονται στη συνολική παρακολούθηση", level: "ΤΥΠΙΚΟ" },
    ],
  },
  {
    id: "incident",
    icon: "⚡",
    title: "Αντιμετώπιση Περιστατικών",
    items: [
      { id: "i1", label: "Υπάρχει επίσημο Incident Response Plan (IRP) γραπτώς", level: "ΚΡΙΣΙΜΟ" },
      { id: "i2", label: "Τα σοβαρά περιστατικά αναφέρονται στην ΕΕΤΤ/αρμόδια αρχή εντός 24 ωρών (NIS2)", level: "ΚΡΙΣΙΜΟ" },
      { id: "i3", label: "Διενεργούνται ασκήσεις προσομοίωσης κυβερνοεπίθεσης τουλάχιστον ετησίως", level: "ΣΗΜΑΝΤΙΚΟ" },
      { id: "i4", label: "Υπάρχει Business Continuity Plan για κυβερνοπεριστατικά που αφορά κλινικές λειτουργίες", level: "ΚΡΙΣΙΜΟ" },
      { id: "i5", label: "Τα περιστατικά καταγράφονται και αναλύονται μετά την επίλυση (post-incident review)", level: "ΤΥΠΙΚΟ" },
    ],
  },
  {
    id: "gdpr",
    icon: "🔒",
    title: "Προστασία Δεδομένων & GDPR",
    items: [
      { id: "d1", label: "Έχει οριστεί Υπεύθυνος Προστασίας Δεδομένων (DPO)", level: "ΚΡΙΣΙΜΟ" },
      { id: "d2", label: "Τα ιατρικά δεδομένα ασθενών κρυπτογραφούνται κατά την αποθήκευση και μεταφορά", level: "ΚΡΙΣΙΜΟ" },
      { id: "d3", label: "Υπάρχει μητρώο επεξεργασίας δεδομένων (Records of Processing Activities)", level: "ΣΗΜΑΝΤΙΚΟ" },
      { id: "d4", label: "Υπάρχει διαδικασία για παραβίαση δεδομένων και γνωστοποίηση εντός 72 ωρών (GDPR)", level: "ΚΡΙΣΙΜΟ" },
      { id: "d5", label: "Ελέγχεται η πρόσβαση τρίτων (προμηθευτές, συνεργάτες) στα δεδομένα υγείας", level: "ΣΗΜΑΝΤΙΚΟ" },
      { id: "d6", label: "Διενεργείται αξιολόγηση αντικτύπου (DPIA) για νέα συστήματα επεξεργασίας δεδομένων", level: "ΤΥΠΙΚΟ" },
    ],
  },
  {
    id: "infra",
    icon: "🏗️",
    title: "Τεχνική Ασφάλεια Υποδομής",
    items: [
      { id: "t1", label: "Εφαρμόζεται πολιτική ελέγχου πρόσβασης βάσει ρόλων (Role-Based Access Control)", level: "ΚΡΙΣΙΜΟ" },
      { id: "t2", label: "Χρησιμοποιείται Multi-Factor Authentication (MFA) για κρίσιμα συστήματα", level: "ΚΡΙΣΙΜΟ" },
      { id: "t3", label: "Διενεργείται τακτικό vulnerability scanning και patch management", level: "ΣΗΜΑΝΤΙΚΟ" },
      { id: "t4", label: "Υπάρχει τμηματοποίηση δικτύου (network segmentation) για κλινικά vs διοικητικά συστήματα", level: "ΣΗΜΑΝΤΙΚΟ" },
      { id: "t5", label: "Τα backups δεδομένων δοκιμάζονται τακτικά και αποθηκεύονται offline/offsite", level: "ΤΥΠΙΚΟ" },
    ],
  },
  {
    id: "people",
    icon: "👥",
    title: "Εκπαίδευση & Ανθρώπινος Παράγοντας",
    items: [
      { id: "p1", label: "Όλο το προσωπικό εκπαιδεύεται σε θέματα κυβερνοασφάλειας τουλάχιστον ετησίως", level: "ΚΡΙΣΙΜΟ" },
      { id: "p2", label: "Διενεργούνται προσομοιώσεις phishing για ευαισθητοποίηση του προσωπικού", level: "ΣΗΜΑΝΤΙΚΟ" },
      { id: "p3", label: "Υπάρχει σαφής διαδικασία αναφοράς ύποπτων περιστατικών από το προσωπικό", level: "ΣΗΜΑΝΤΙΚΟ" },
      { id: "p4", label: "Νέοι εργαζόμενοι λαμβάνουν εκπαίδευση ασφαλείας κατά την πρόσληψη", level: "ΤΥΠΙΚΟ" },
    ],
  },
];

const levelColors = {
  ΚΡΙΣΙΜΟ: { bg: "#fff0f0", border: "#ff4d4d", text: "#cc0000", dot: "#ff4d4d" },
  ΣΗΜΑΝΤΙΚΟ: { bg: "#fff8e6", border: "#ffaa00", text: "#996600", dot: "#ffaa00" },
  ΤΥΠΙΚΟ: { bg: "#f0f7ff", border: "#4da6ff", text: "#0055bb", dot: "#4da6ff" },
};

export default function NIS2Assessment() {
  const totalItems = sections.reduce((acc, s) => acc + s.items.length, 0);
  const [checked, setChecked] = useState({});
  const [expanded, setExpanded] = useState({ governance: true });

  const toggle = (id) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleSection = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  const reset = () => setChecked({});

  const totalChecked = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((totalChecked / totalItems) * 100);

  const getScore = () => {
    if (pct >= 80) return { label: "Υψηλή Ετοιμότητα", color: "#00c87a", bg: "#e6fff5" };
    if (pct >= 50) return { label: "Μέτρια Ετοιμότητα", color: "#ffaa00", bg: "#fff8e6" };
    return { label: "Χαμηλή Ετοιμότητα", color: "#ff4d4d", bg: "#fff0f0" };
  };

  const score = getScore();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0f1e",
      fontFamily: "'Georgia', serif",
      color: "#e8eaf0",
      padding: "0 0 60px 0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0d1b3e 0%, #0a0f1e 60%)",
        borderBottom: "1px solid #1e2d5a",
        padding: "40px 24px 32px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(30,80,180,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,120,255,0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        }} />
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
          {["NIS2", "GDPR", "ISO 27001"].map((tag) => (
            <span key={tag} style={{
              fontSize: "11px", fontFamily: "'Courier New', monospace",
              letterSpacing: "2px", fontWeight: "bold",
              color: "#4da6ff", border: "1px solid #1e4080",
              background: "rgba(30,64,128,0.3)", padding: "4px 12px", borderRadius: "2px",
            }}>{tag}</span>
          ))}
        </div>
        <h1 style={{
          fontSize: "clamp(22px, 5vw, 36px)", fontWeight: "normal",
          color: "#ffffff", margin: "0 0 8px", letterSpacing: "-0.5px",
          lineHeight: 1.2,
        }}>
          NIS2 Readiness Assessment
        </h1>
        <p style={{ color: "#7a8ab0", fontSize: "15px", margin: "0 0 4px" }}>
          για Οργανισμούς Υγείας
        </p>
        <p style={{ color: "#4a5a80", fontSize: "13px", margin: 0, fontFamily: "'Courier New', monospace" }}>
          Αξιολογήστε την ετοιμότητα του οργανισμού σας απέναντι στις απαιτήσεις κυβερνοασφάλειας
        </p>
      </div>

      {/* Progress Bar */}
      <div style={{ background: "#0d1422", borderBottom: "1px solid #1a2540", padding: "20px 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: "13px", color: "#4da6ff" }}>
              {totalChecked}/{totalItems} ολοκληρώθηκαν
            </span>
            <span style={{
              fontFamily: "'Courier New', monospace", fontSize: "18px", fontWeight: "bold",
              color: score.color,
            }}>{pct}%</span>
          </div>
          <div style={{ height: "6px", background: "#1a2540", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{
              height: "100%", width: `${pct}%`,
              background: `linear-gradient(90deg, ${score.color}88, ${score.color})`,
              borderRadius: "3px",
              transition: "width 0.4s ease",
            }} />
          </div>
          {pct > 0 && (
            <div style={{
              marginTop: "10px", display: "inline-block",
              background: score.bg, border: `1px solid ${score.color}44`,
              color: score.color, padding: "4px 12px", borderRadius: "2px",
              fontSize: "12px", fontFamily: "'Courier New', monospace", letterSpacing: "1px",
            }}>
              ● {score.label}
            </div>
          )}
        </div>
      </div>

      {/* Sections */}
      <div style={{ maxWidth: "760px", margin: "32px auto 0", padding: "0 16px" }}>
        {sections.map((section) => {
          const sectionChecked = section.items.filter((item) => checked[item.id]).length;
          const isOpen = expanded[section.id];

          return (
            <div key={section.id} style={{
              marginBottom: "16px",
              border: "1px solid #1e2d5a",
              borderRadius: "4px",
              overflow: "hidden",
              background: "#0d1422",
            }}>
              {/* Section Header */}
              <div
                onClick={() => toggleSection(section.id)}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "16px 20px", cursor: "pointer",
                  background: isOpen ? "#111827" : "#0d1422",
                  borderBottom: isOpen ? "1px solid #1e2d5a" : "none",
                  transition: "background 0.2s",
                  userSelect: "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "20px" }}>{section.icon}</span>
                  <span style={{ fontSize: "15px", color: "#c8d4f0", fontWeight: "normal" }}>
                    {section.title}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{
                    fontFamily: "'Courier New', monospace", fontSize: "12px",
                    color: sectionChecked === section.items.length ? "#00c87a" : "#4a5a80",
                  }}>
                    {sectionChecked}/{section.items.length}
                  </span>
                  <span style={{
                    color: "#4a5a80", fontSize: "12px",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                    transition: "transform 0.2s",
                    display: "inline-block",
                  }}>▼</span>
                </div>
              </div>

              {/* Items */}
              {isOpen && (
                <div style={{ padding: "8px 0" }}>
                  {section.items.map((item, idx) => {
                    const lc = levelColors[item.level];
                    const isChecked = !!checked[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggle(item.id)}
                        style={{
                          display: "flex", alignItems: "flex-start", gap: "14px",
                          padding: "12px 20px", cursor: "pointer",
                          borderBottom: idx < section.items.length - 1 ? "1px solid #131d33" : "none",
                          background: isChecked ? "rgba(0,200,122,0.04)" : "transparent",
                          transition: "background 0.15s",
                        }}
                      >
                        {/* Checkbox */}
                        <div style={{
                          width: "20px", height: "20px", minWidth: "20px",
                          border: isChecked ? "2px solid #00c87a" : "2px solid #2a3a60",
                          borderRadius: "3px",
                          background: isChecked ? "#00c87a" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          marginTop: "1px",
                          transition: "all 0.15s",
                        }}>
                          {isChecked && (
                            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                              <path d="M1 4L4 7L10 1" stroke="#0a0f1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </div>

                        {/* Label */}
                        <span style={{
                          fontSize: "14px", lineHeight: "1.5",
                          color: isChecked ? "#5a6a80" : "#b0bcd8",
                          textDecoration: isChecked ? "line-through" : "none",
                          flex: 1,
                          transition: "color 0.15s",
                        }}>
                          {item.label}
                        </span>

                        {/* Level Badge */}
                        <span style={{
                          fontSize: "10px", fontFamily: "'Courier New', monospace",
                          letterSpacing: "0.5px", whiteSpace: "nowrap",
                          color: lc.dot, border: `1px solid ${lc.dot}44`,
                          background: `${lc.dot}11`,
                          padding: "2px 8px", borderRadius: "2px", marginTop: "2px",
                        }}>
                          {item.level}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Reset */}
        <div style={{ textAlign: "center", marginTop: "24px" }}>
          <button
            onClick={reset}
            style={{
              background: "transparent", border: "1px solid #2a3a60",
              color: "#4a5a80", padding: "10px 28px", borderRadius: "3px",
              cursor: "pointer", fontFamily: "'Courier New', monospace",
              fontSize: "13px", letterSpacing: "1px",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = "#4da6ff"; e.target.style.color = "#4da6ff"; }}
            onMouseLeave={(e) => { e.target.style.borderColor = "#2a3a60"; e.target.style.color = "#4a5a80"; }}
          >
            ↺ Επαναφορά
          </button>
        </div>

        {/* Disclaimer */}
        <div style={{
          marginTop: "32px", padding: "16px 20px",
          border: "1px solid #1e2d5a", borderRadius: "4px",
          background: "#0d1422",
          display: "flex", gap: "12px", alignItems: "flex-start",
        }}>
          <span style={{ fontSize: "16px", marginTop: "1px" }}>⚠️</span>
          <p style={{
            fontSize: "12px", color: "#4a5a80", margin: 0, lineHeight: "1.6",
            fontFamily: "'Courier New', monospace",
          }}>
            Η παρούσα checklist αποτελεί εργαλείο προκαταρκτικής αξιολόγησης και δεν υποκαθιστά επίσημο audit.
            Βασίζεται στις απαιτήσεις της Οδηγίας NIS2 (EU 2022/2555), GDPR (EU 2016/679) και βέλτιστες πρακτικές ISO 27001.
          </p>
        </div>
      </div>
    </div>
  );
}
