import { Home, Zap, Target, User } from "lucide-react";

export default function Navigation({
  screen,
  setScreen,
}: {
  screen: string;
  setScreen: (s: string) => void;
}) {
  // Hide navbar on login / choose screens
  if (["login", "choose"].includes(screen)) return null;

  const items = [
    { id: "home",    label: "Home",    icon: <Home size={18} /> },
    { id: "quests",  label: "Quests",  icon: <Zap  size={18} /> },
    { id: "bets",    label: "Bets",    icon: <Target size={18} /> },
    { id: "profile", label: "Profile", icon: <User size={18} /> },
  ];

  return (
    <div style={{
      position: "fixed",
      bottom: "24px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      alignItems: "center",
      gap: "4px",
      padding: "10px 16px",
      background: "rgba(42,47,44,0.9)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      border: "1px solid rgba(255,255,255,0.07)",
      borderRadius: "100px",
      boxShadow: "0 12px 48px rgba(0,0,0,0.5)",
      zIndex: 1000,
      minWidth: "300px",
    }}>
      {items.map(item => (
        <NavItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          active={screen === item.id}
          onClick={() => setScreen(item.id)}
        />
      ))}
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        if (!active) el.style.color = "#f1efe9";
        el.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.color = active ? "#7c9a7e" : "#a8a6a2";
        el.style.transform = "translateY(0)";
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "3px",
        color: active ? "#7c9a7e" : "#a8a6a2",
        cursor: "pointer",
        transition: "all 0.2s ease",
        flex: 1,
        padding: "8px 14px",
        borderRadius: "100px",
        background: active ? "rgba(124,154,126,0.14)" : "transparent",
      }}
    >
      {icon}
      <span style={{ fontSize: "9px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </span>
    </div>
  );
}