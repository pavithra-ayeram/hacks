import { useState } from "react";

import LoginScreen from "./screens/LoginScreen";
import ChooseScreen from "./screens/Choose";
import MinimalHome from "./screens/Minimalhome";
import GamifiedHome from "./screens/GamifiedHome";
import AddHabitScreen from "./screens/AddHabit";
import SidequestsScreen from "./screens/SideQuests";
import BetsScreen from "./screens/Bets";
import ProfileScreen from "./screens/Profiles";

import MinimalNav from "./screens/MinimalNav";
import GamifiedNav from "./screens/GamifiedNav";

export type Habit = { id: number; name: string; done: boolean };

export type Screen =
  | "login"
  | "choose"
  | "minimal-home"
  | "minimal-quests"
  | "minimal-bets"
  | "minimal-profile"
  | "minimal-addHabit"
  | "gamified-home"
  | "gamified-addHabit"
  | "gamified-quests"
  | "gamified-bets"
  | "gamified-profile";

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");

  const [nextId, setNextId] = useState(4);

  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: "Drink water", done: false },
    { id: 2, name: "Move your body", done: false },
    { id: 3, name: "Read", done: false },
  ]);

  // 🔹 Debug (remove later)
  console.log("SCREEN:", screen);

  // ─────────────────────────────────────────────
  // Habit Logic
  // ─────────────────────────────────────────────

  const toggleHabit = (id: number) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, done: !h.done } : h
      )
    );
  };

  const deleteHabit = (id: number) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const addHabit = (name: string) => {
    setHabits((prev) => [
      ...prev,
      { id: nextId, name, done: false },
    ]);
    setNextId((n) => n + 1);
  };

  // ─────────────────────────────────────────────
  // Mode detection
  // ─────────────────────────────────────────────

  const isMinimal = screen.startsWith("minimal-");
  const isGamified = screen.startsWith("gamified-");

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#1f2321",
        fontFamily: "'Inter', sans-serif",
        color: "#f1efe9",
      }}
    >
      {/* ───────── LOGIN ───────── */}
      {screen === "login" && (
        <LoginScreen onLogin={() => setScreen("choose")} />
      )}

      {/* ───────── CHOOSE ───────── */}
      {screen === "choose" && (
        <ChooseScreen
          onBack={() => setScreen("login")}
          onChoose={(mode) =>
            setScreen(
              mode === "minimal"
                ? "minimal-home"
                : "gamified-home"
            )
          }
        />
      )}

      {/* ───────── MINIMAL ───────── */}
      {screen === "minimal-home" && (
        <MinimalHome
          habits={habits}
          onToggle={toggleHabit}
          onDelete={deleteHabit}
          onAdd={() => setScreen("minimal-addHabit")}
          onBack={() => setScreen("choose")}
        />
      )}

      {screen === "minimal-addHabit" && (
        <AddHabitScreen
          onAdd={(name) => {
            addHabit(name);
            setScreen("minimal-home");
          }}
          onBack={() => setScreen("minimal-home")}
        />
      )}

      {screen === "minimal-quests" && (
        <SidequestsScreen
          onBack={() => setScreen("minimal-home")}
        />
      )}

      {screen === "minimal-bets" && (
        <BetsScreen
          onBack={() => setScreen("minimal-home")}
        />
      )}

      {screen === "minimal-profile" && (
        <ProfileScreen
          onBack={() => setScreen("minimal-home")}
        />
      )}

      {/* ───────── GAMIFIED ───────── */}
      {screen === "gamified-home" && (
        <GamifiedHome
          onExit={() => setScreen("choose")}
        />
      )}

      {screen === "gamified-addHabit" && (
        <AddHabitScreen
          onAdd={(name) => {
            addHabit(name);
            setScreen("gamified-home");
          }}
          onBack={() => setScreen("gamified-home")}
        />
      )}

      {screen === "gamified-quests" && (
        <SidequestsScreen
          onBack={() => setScreen("gamified-home")}
        />
      )}

      {screen === "gamified-bets" && (
        <BetsScreen
          onBack={() => setScreen("gamified-home")}
        />
      )}

      {screen === "gamified-profile" && (
        <ProfileScreen
          onBack={() => setScreen("gamified-home")}
        />
      )}

      {/* ───────── NAVIGATION ───────── */}

      {isMinimal && (
        <MinimalNav screen={screen} setScreen={setScreen} />
      )}

      {isGamified && (
        <GamifiedNav screen={screen} setScreen={setScreen} />
      )}
    </div>
  );
}