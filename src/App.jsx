import { useState, useEffect, useRef, useCallback } from "react";

// ===== DATA =====
const INITIAL_EMPLOYEES = [
  { id: 1, employeeNum: "E001", name: "משה כהן", department: "ייצור", phone: "050-1234567", type: "permanent", status: "active" },
  { id: 2, employeeNum: "E002", name: "דוד לוי", department: "אחסנה", phone: "052-7654321", type: "permanent", status: "active" },
  { id: 3, employeeNum: "E003", name: "רחל ישראלי", department: "ייצור", phone: "054-1111222", type: "permanent", status: "active" },
  { id: 4, employeeNum: "T001", name: "יוסף אברהם", department: "", phone: "", type: "temporary", status: "active" },
];

const INITIAL_CLOTHES = [
  { id: 1, barcode: "SH000001", type: "חולצה", size: "L", color: "כחול", purchaseDate: "2024-01-10", washCount: 12, status: "במלאי", assignedTo: null },
  { id: 2, barcode: "SH000002", type: "חולצה", size: "M", color: "כחול", purchaseDate: "2024-01-10", washCount: 8, status: "במלאי", assignedTo: null },
  { id: 3, barcode: "PA000001", type: "מכנס", size: "32", color: "כחול כהה", purchaseDate: "2024-01-15", washCount: 6, status: "במלאי", assignedTo: null },
  { id: 4, barcode: "PA000002", type: "מכנס", size: "34", color: "כחול כהה", purchaseDate: "2024-01-15", washCount: 10, status: "במלאי", assignedTo: null },
  { id: 5, barcode: "JA000001", type: "מעיל", size: "XL", color: "כתום", purchaseDate: "2024-02-01", washCount: 3, status: "נמסר לעובד", assignedTo: 1 },
  { id: 6, barcode: "SH000003", type: "חולצה", size: "L", color: "כחול", purchaseDate: "2024-01-10", washCount: 15, status: "נמסר לעובד", assignedTo: 2 },
  { id: 7, barcode: "PA000003", type: "מכנס", size: "32", color: "כחול כהה", purchaseDate: "2024-01-15", washCount: 20, status: "תקול", assignedTo: null },
  { id: 8, barcode: "SH000004", type: "חולצה", size: "S", color: "כחול", purchaseDate: "2024-01-10", washCount: 0, status: "במלאי", assignedTo: null },
];

const INITIAL_TRANSACTIONS = [
  { id: 1, datetime: "2025-06-24T08:00:00", employeeId: 1, clotheId: 5, action: "מסירה", userId: "editor", note: "" },
  { id: 2, datetime: "2025-06-24T08:05:00", employeeId: 2, clotheId: 6, action: "מסירה", userId: "editor", note: "" },
];

// מצבים ותנועות חוקיות
const VALID_STATUS = ["במלאי", "נמסר לעובד", "הוחזר", "בכביסה", "תקול", "אבוד", "הושמד"];
const STATUS_COLORS = {
  "במלאי":         { bg: "#E8F5E9", text: "#2E7D32", dot: "#4CAF50" },
  "נמסר לעובד":   { bg: "#E3F2FD", text: "#1565C0", dot: "#2196F3" },
  "הוחזר":        { bg: "#F3E5F5", text: "#6A1B9A", dot: "#9C27B0" },
  "בכביסה":        { bg: "#FFF8E1", text: "#E65100", dot: "#FF9800" },
  "תקול":         { bg: "#FBE9E7", text: "#BF360C", dot: "#FF5722" },
  "אבוד":         { bg: "#FFEBEE", text: "#B71C1C", dot: "#F44336" },
  "הושמד":        { bg: "#ECEFF1", text: "#37474F", dot: "#90A4AE" },
};
const CLOTHING_TYPES = ["חולצה", "מכנס", "מעיל", "כובע", "נעליים", "חגורה"];

const USERS = [
  { id: "editor", username: "admin", password: "1234", name: "אחראי המערכת", role: "editor" },
  { id: "viewer", username: "manager", password: "1234", name: "מנהל (צפייה)", role: "viewer" },
];

function useLS(key, init) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(val)); } catch {} }, [key, val]);
  return [val, setVal];
}

// ===== ICONS =====
const Icon = ({ name, size = 20, color = "currentColor" }) => {
  const icons = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    employees: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    shirt: <><path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/></>,
    handout: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></>,
    returns: <><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.93"/></>,
    reports: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>,
    scan: <><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    check: <polyline points="20 6 9 17 4 12"/>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    history: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    warning: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

// ===== SCAN VALIDATION ENGINE =====
// זהו הלב של המערכת – בדיקת 4 שלבים לכל סריקה
function validateScan(barcode, clothes, employees, transactions, mode) {
  // שלב 1: האם הברקוד קיים?
  const cloth = clothes.find(c => c.barcode === barcode);
  if (!cloth) return { ok: false, type: "error", msg: `ברקוד לא מוכר: "${barcode}"`, cloth: null, employee: null };

  const currentStatus = cloth.status;

  // שלב 2+3+4: בדיקת חוקיות לפי מסך
  if (mode === "handout") {
    if (currentStatus === "נמסר לעובד") {
      const assignedEmp = employees.find(e => e.id === cloth.assignedTo);
      return {
        ok: false, type: "blocked",
        msg: `⛔ לא ניתן למסור בגד זה. הבגד עדיין משויך ל${assignedEmp ? assignedEmp.name : "עובד אחר"} ולא נסרק כהחזרה.`,
        cloth, employee: assignedEmp
      };
    }
    if (currentStatus !== "במלאי") {
      return { ok: false, type: "warning", msg: `הבגד אינו פנוי. הסטטוס הנוכחי: "${currentStatus}"`, cloth, employee: null };
    }
    return { ok: true, type: "success", msg: `✓ ${cloth.type} (${cloth.barcode}) – ${cloth.size} ${cloth.color}`, cloth, employee: null };
  }

  if (mode === "returns") {
    if (currentStatus !== "נמסר לעובד") {
      return {
        ok: false, type: "warning",
        msg: `הבגד אינו מסומן כ"נמסר לעובד". הסטטוס הנוכחי: "${currentStatus}"`,
        cloth, employee: null
      };
    }
    const assignedEmp = employees.find(e => e.id === cloth.assignedTo);
    return {
      ok: true, type: "success",
      msg: `✓ ${cloth.type} (${cloth.barcode}) – הוחזר מ${assignedEmp ? assignedEmp.name : "עובד לא ידוע"}`,
      cloth, employee: assignedEmp
    };
  }

  return { ok: true, type: "success", msg: "בגד נמצא", cloth, employee: null };
}

// ===== MAIN APP =====
export default function App() {
  const [employees, setEmployees] = useLS("ww2_employees", INITIAL_EMPLOYEES);
  const [clothes, setClothes] = useLS("ww2_clothes", INITIAL_CLOTHES);
  const [transactions, setTransactions] = useLS("ww2_transactions", INITIAL_TRANSACTIONS);
  const [auditLog, setAuditLog] = useLS("ww2_audit", []);
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const nextId = useCallback((arr) => arr.length ? Math.max(...arr.map(x => x.id)) + 1 : 1, []);

  const addAudit = useCallback((action, detail, userId) => {
    setAuditLog(prev => [...prev, { id: Date.now(), datetime: new Date().toISOString(), action, detail, userId }]);
  }, [setAuditLog]);

  const isEditor = currentUser?.role === "editor";

  if (!currentUser) return <LoginScreen onLogin={setCurrentUser} />;

  const navItems = [
    { id: "dashboard", label: "דשבורד", icon: "dashboard" },
    { id: "employees", label: "עובדים", icon: "employees" },
    { id: "clothes", label: "בגדים", icon: "shirt" },
    ...(isEditor ? [
      { id: "handout", label: "מסירת בגדים", icon: "handout" },
      { id: "returns", label: "החזרת בגדים", icon: "returns" },
    ] : []),
    { id: "reports", label: "דוחות", icon: "reports" },
  ];

  const stats = {
    totalEmployees: employees.filter(e => e.status === "active").length,
    inStock: clothes.filter(c => c.status === "במלאי").length,
    withEmployees: clothes.filter(c => c.status === "נמסר לעובד").length,
    inLaundry: clothes.filter(c => c.status === "בכביסה").length,
    broken: clothes.filter(c => c.status === "תקול").length,
    lost: clothes.filter(c => c.status === "אבוד").length,
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#F0F2F5", fontFamily: "'Segoe UI', Arial, sans-serif", direction: "rtl" }}>
      {/* Sidebar */}
      <div style={{ width: sidebarOpen ? 240 : 64, background: "#1A2332", display: "flex", flexDirection: "column", transition: "width 0.25s ease", overflow: "hidden", flexShrink: 0, zIndex: 100 }}>
        <div style={{ padding: "20px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 12, minHeight: 64 }}>
          <div style={{ width: 32, height: 32, background: "#FF6B35", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <Icon name="shirt" size={18} color="white" />
          </div>
          {sidebarOpen && <span style={{ color: "white", fontWeight: 700, fontSize: 15, whiteSpace: "nowrap" }}>WorkWear Manager</span>}
        </div>
        <nav style={{ flex: 1, padding: "12px 8px" }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} style={{
              display: "flex", alignItems: "center", gap: 12, width: "100%",
              padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer",
              background: page === item.id ? "rgba(255,107,53,0.15)" : "transparent",
              color: page === item.id ? "#FF6B35" : "rgba(255,255,255,0.65)",
              marginBottom: 2, textAlign: "right", whiteSpace: "nowrap", transition: "all 0.15s",
            }}>
              <Icon name={item.icon} size={18} color={page === item.id ? "#FF6B35" : "rgba(255,255,255,0.65)"} />
              {sidebarOpen && <span style={{ fontSize: 14, fontWeight: page === item.id ? 600 : 400 }}>{item.label}</span>}
            </button>
          ))}
        </nav>
        <div style={{ padding: "12px 8px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {sidebarOpen && (
            <div style={{ padding: "8px 12px", marginBottom: 4 }}>
              <div style={{ color: "white", fontSize: 13, fontWeight: 600 }}>{currentUser.name}</div>
              <div style={{ color: isEditor ? "#FB923C" : "#60A5FA", fontSize: 11, display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
                <Icon name={isEditor ? "edit" : "lock"} size={11} color={isEditor ? "#FB923C" : "#60A5FA"} />
                {isEditor ? "עריכה מלאה" : "צפייה בלבד"}
              </div>
            </div>
          )}
          <button onClick={() => setCurrentUser(null)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer", background: "transparent", color: "rgba(255,255,255,0.45)", textAlign: "right" }}>
            <Icon name="logout" size={18} color="rgba(255,255,255,0.45)" />
            {sidebarOpen && <span style={{ fontSize: 14 }}>התנתק</span>}
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ background: "white", padding: "0 24px", height: 64, display: "flex", alignItems: "center", borderBottom: "1px solid #E5E7EB", gap: 16 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6B7280", padding: 4 }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#111827" }}>{navItems.find(n => n.id === page)?.label}</span>
          {!isEditor && (
            <span style={{ fontSize: 11, background: "#DBEAFE", color: "#1D4ED8", padding: "3px 10px", borderRadius: 6, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
              <Icon name="lock" size={11} color="#1D4ED8" /> צפייה בלבד
            </span>
          )}
          <div style={{ marginRight: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: isEditor ? "#FF6B35" : "#2196F3", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 14 }}>
              {currentUser.name[0]}
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: 24 }}>
          {page === "dashboard" && <Dashboard stats={stats} employees={employees} clothes={clothes} transactions={transactions} />}
          {page === "employees" && <EmployeesPage employees={employees} setEmployees={setEmployees} clothes={clothes} transactions={transactions} nextId={nextId} isEditor={isEditor} addAudit={addAudit} currentUser={currentUser} />}
          {page === "clothes" && <ClothesPage clothes={clothes} setClothes={setClothes} employees={employees} transactions={transactions} nextId={nextId} isEditor={isEditor} addAudit={addAudit} currentUser={currentUser} />}
          {page === "handout" && isEditor && <HandoutPage employees={employees} setEmployees={setEmployees} clothes={clothes} setClothes={setClothes} transactions={transactions} setTransactions={setTransactions} nextId={nextId} currentUser={currentUser} addAudit={addAudit} />}
          {page === "returns" && isEditor && <ReturnsPage clothes={clothes} setClothes={setClothes} transactions={transactions} setTransactions={setTransactions} employees={employees} nextId={nextId} currentUser={currentUser} addAudit={addAudit} />}
          {page === "reports" && <ReportsPage employees={employees} clothes={clothes} transactions={transactions} auditLog={auditLog} />}
        </div>
      </div>
    </div>
  );
}

// ===== LOGIN =====
function LoginScreen({ onLogin }) {
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState("");
  const handle = () => {
    const user = USERS.find(x => x.username === u && x.password === p);
    if (user) onLogin(user); else setErr("שם משתמש או סיסמה שגויים");
  };
  return (
    <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #1A2332 0%, #2D3E55 100%)", direction: "rtl" }}>
      <div style={{ background: "white", borderRadius: 16, padding: 40, width: 360, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, background: "#FF6B35", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <Icon name="shirt" size={28} color="white" />
          </div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "#111827" }}>WorkWear Manager</h1>
          <p style={{ margin: "4px 0 0", color: "#6B7280", fontSize: 13 }}>גרסה 2.0</p>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>שם משתמש</label>
          <input value={u} onChange={e => setU(e.target.value)} placeholder="admin / manager" style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={labelStyle}>סיסמה</label>
          <input value={p} onChange={e => setP(e.target.value)} type="password" placeholder="1234" onKeyDown={e => e.key === "Enter" && handle()} style={{ ...inputStyle, width: "100%", boxSizing: "border-box" }} />
        </div>
        {err && <p style={{ color: "#EF4444", fontSize: 13, marginBottom: 12, textAlign: "center" }}>{err}</p>}
        <button onClick={handle} style={{ width: "100%", padding: "12px", background: "#FF6B35", color: "white", border: "none", borderRadius: 8, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>כניסה</button>
        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          <div style={{ background: "#FFF7ED", borderRadius: 8, padding: "8px 10px", fontSize: 11, textAlign: "center", border: "1px solid #FED7AA" }}>
            <div style={{ fontWeight: 700, color: "#C2410C" }}>עריכה מלאה</div>
            <div style={{ color: "#9A3412" }}>admin / 1234</div>
          </div>
          <div style={{ background: "#EFF6FF", borderRadius: 8, padding: "8px 10px", fontSize: 11, textAlign: "center", border: "1px solid #BFDBFE" }}>
            <div style={{ fontWeight: 700, color: "#1D4ED8" }}>צפייה בלבד</div>
            <div style={{ color: "#1E40AF" }}>manager / 1234</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== SCAN FEEDBACK BANNER =====
function ScanFeedback({ result, onDismiss }) {
  if (!result) return null;
  const colors = {
    success: { bg: "#D1FAE5", border: "#6EE7B7", text: "#065F46" },
    warning: { bg: "#FEF3C7", border: "#FCD34D", text: "#92400E" },
    error:   { bg: "#FEE2E2", border: "#FCA5A5", text: "#991B1B" },
    blocked: { bg: "#FEE2E2", border: "#F87171", text: "#7F1D1D" },
  };
  const c = colors[result.type] || colors.error;
  return (
    <div style={{ padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${c.border}`, background: c.bg, color: c.text, fontSize: 13, fontWeight: 600, marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "flex-start", lineHeight: 1.5 }}>
      <span>{result.msg}</span>
      {onDismiss && <button onClick={onDismiss} style={{ background: "none", border: "none", cursor: "pointer", color: c.text, marginRight: 8, flexShrink: 0 }}><Icon name="x" size={14} /></button>}
    </div>
  );
}

// ===== SCAN INPUT BOX =====
// תומך גם בסורק חיצוני (HID/Enter) וגם בהקלדה ידנית
function ScanInput({ onScan, placeholder = "סרוק ברקוד או הקלד ולחץ Enter...", autoFocus = true }) {
  const [val, setVal] = useState("");
  const ref = useRef(null);
  useEffect(() => { if (autoFocus) ref.current?.fo
