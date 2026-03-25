import { ArrowLeft, Star, Zap, Shield, Calendar, Users } from "lucide-react";

const STATS = [
  { icon: <Star size={14} color="#f5c842" />,    label: "Reputation Points",     value: "340 XP"          },
  { icon: <Zap size={14} color="#c4855a" />,     label: "Brownie Points",        value: "1,200 pts"       },
  { icon: <Zap size={14} color="#7c9a7e" />,     label: "Sidequests Remaining",  value: "2 / 3 this month"},
  { icon: <Shield size={14} color="#7c9a7e" />,  label: "Bets Won",              value: "8 / 10"          },
  { icon: <Calendar size={14} color="#a8a6a2" />,label: "Member Since",          value: "Jan 2025"        },
];

const FRIENDS = [
  { name: "Arjun",   initial: "A" },
  { name: "Priya",   initial: "P" },
  { name: "Karthik", initial: "K" },
];

export default function ProfileScreen({ onBack }: { onBack: () => void }) {
  return (
    <div style={page}>
      <div style={inner}>

        {/* Top bar */}
        <div style={topBar}>
          <button onClick={onBack} style={iconBtn}><ArrowLeft size={16} /></button>
          <h1 style={heading}>Profile</h1>
          <div style={{ width: 36 }} />
        </div>

        {/* Two-column layout */}
        <div style={layout}>

          {/* Left: avatar + friends */}
          <div>
            <div style={avatar}>A</div>
            <p style={username}>Aditya</p>
            <p style={tagline}>showing up, one habit at a time</p>

            <div style={card}>
              <div style={sectionLabel}><Users size={11} /> Friends ({FRIENDS.length})</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {FRIENDS.map((f, i) => (
                  <div key={i} style={friendRow}>
                    <div style={friendAvatar}>{f.initial}</div>
                    <span style={{ fontSize: 14, color: "#f1efe9" }}>{f.name}</span>
                  </div>
                ))}
                <div style={{ ...friendRow, color: "#a8a6a2", cursor: "pointer", background: "transparent", border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 10, padding: "10px 14px" }}>
                  + Add Friend
                </div>
              </div>
            </div>
          </div>

          {/* Right: stats */}
          <div style={card}>
            <div style={sectionLabel}>Stats</div>
            {STATS.map((s, i) => (
              <div key={i} style={{ ...statRow, borderBottom: i === STATS.length - 1 ? "none" : "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#a8a6a2", fontSize: 14 }}>
                  {s.icon} {s.label}
                </div>
                <span style={{ color: "#f1efe9", fontWeight: 600, fontSize: 14 }}>{s.value}</span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

const page: React.CSSProperties      = { minHeight: "100vh", background: "#1f2321", display: "flex", justifyContent: "center", padding: "0 24px 120px" };
const inner: React.CSSProperties     = { width: "100%", maxWidth: 820, paddingTop: 40 };
const topBar: React.CSSProperties    = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 };
const iconBtn: React.CSSProperties   = { width: 36, height: 36, borderRadius: "50%", border: "none", background: "#2a2f2c", color: "#a8a6a2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" };
const heading: React.CSSProperties   = { fontFamily: "Georgia, serif", fontSize: 22, color: "#f1efe9", margin: 0, fontWeight: 400 };
const layout: React.CSSProperties    = { display: "grid", gridTemplateColumns: "260px 1fr", gap: 24, alignItems: "start" };
const avatar: React.CSSProperties    = { width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#7c9a7e,#4a6b4c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: "#1f2321", marginBottom: 14, boxShadow: "0 0 0 4px rgba(124,154,126,0.2)" };
const username: React.CSSProperties  = { fontFamily: "Georgia, serif", fontSize: 20, color: "#f1efe9", margin: "0 0 4px", fontWeight: 400 };
const tagline: React.CSSProperties   = { color: "#a8a6a2", fontSize: 13, margin: "0 0 20px" };
const card: React.CSSProperties      = { background: "#2a2f2c", borderRadius: 16, padding: "18px 20px" };
const sectionLabel: React.CSSProperties = { display: "flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b6967", marginBottom: 14 };
const statRow: React.CSSProperties   = { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "11px 0" };
const friendRow: React.CSSProperties = { display: "flex", alignItems: "center", gap: 10, padding: "8px 0" };
const friendAvatar: React.CSSProperties = { width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#7c9a7e,#4a6b4c)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#1f2321" };