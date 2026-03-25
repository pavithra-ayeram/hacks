import { ArrowLeft, Target } from "lucide-react";

const BETS = [
  { title: "Priya bets you won't run 5 days straight", stake: "200 pts", status: "active",  opponent: "Priya",   days: "5 of 5 remaining" },
  { title: "Arjun bets you'll skip yoga this week",    stake: "150 pts", status: "active",  opponent: "Arjun",   days: "3 of 7 remaining" },
  { title: "No-screen mornings — Karthik's challenge", stake: "300 pts", status: "won",     opponent: "Karthik", days: "Completed" },
];

export default function BetsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div style={page}>
      <div style={inner}>

        <div style={topBar}>
          <button onClick={onBack} style={iconBtn}><ArrowLeft size={16} /></button>
          <h1 style={heading}>Bets</h1>
          <button style={addBtn}><Target size={14} /> New Bet</button>
        </div>

        <p style={{ color: "#a8a6a2", fontSize: 14, marginBottom: 32 }}>Challenge friends. Put points on the line.</p>

        <div style={sectionLabel}>Active & Past ({BETS.length})</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {BETS.map((b, i) => (
            <div key={i} style={card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 15, color: "#f1efe9", margin: "0 0 6px" }}>{b.title}</p>
                  <span style={{ fontSize: 12, color: "#a8a6a2" }}>vs {b.opponent} · {b.days}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                  <div style={{
                    padding: "3px 10px", borderRadius: 100, fontSize: 11, fontWeight: 600,
                    background: b.status === "won" ? "rgba(124,154,126,0.15)" : "rgba(245,200,66,0.1)",
                    color: b.status === "won" ? "#7c9a7e" : "#f5c842",
                  }}>
                    {b.status === "won" ? "Won" : "Active"}
                  </div>
                  <span style={{ fontSize: 12, color: "#c4855a", fontWeight: 600 }}>{b.stake}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const page: React.CSSProperties    = { minHeight: "100vh", background: "#1f2321", display: "flex", justifyContent: "center", padding: "0 24px 120px" };
const inner: React.CSSProperties   = { width: "100%", maxWidth: 760, paddingTop: 40 };
const topBar: React.CSSProperties  = { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 };
const iconBtn: React.CSSProperties = { width: 36, height: 36, borderRadius: "50%", border: "none", background: "#2a2f2c", color: "#a8a6a2", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" };
const heading: React.CSSProperties = { fontFamily: "Georgia, serif", fontSize: 26, color: "#f1efe9", margin: 0, fontWeight: 400 };
const addBtn: React.CSSProperties  = { display: "flex", alignItems: "center", gap: 6, padding: "9px 18px", borderRadius: 10, border: "none", background: "#7c9a7e", color: "#1f2321", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" };
const sectionLabel: React.CSSProperties = { fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#6b6967", marginBottom: 12 };
const card: React.CSSProperties    = { background: "#2a2f2c", borderRadius: 16, padding: "18px 20px" };