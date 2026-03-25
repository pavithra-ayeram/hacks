import { useState, useEffect } from "react";
import { HtmlBridge } from "./components/HtmlBridge";
import { useHtmlWithCss } from "./hooks/useHtmlWithCss";

export default function App() {
  const [screen, setScreen] = useState("login");
  const [user, setUser] = useState<any>(null);
  const [habits, setHabits] = useState<any[]>([]);

  const API_URL = "http://localhost:3001";

  const html = useHtmlWithCss(
    `/templates/${screen}.html`,
    `/templates/styles.css`
  );

  // --- Logic: Check for Point Loss (3-Day Rule) ---
  const checkPointLoss = async (loggedInUser: any) => {
    const lastLogin = new Date(loggedInUser.lastLogin);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - lastLogin.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 3) {
      const updatedPoints = Math.max(0, loggedInUser.points - 20);
      alert(`Ghost Alert! You haven't logged in for ${diffDays} days. -20 points! 👻`);

      await fetch(`${API_URL}/users/${loggedInUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          points: updatedPoints,
          lastLogin: today.toISOString() 
        }),
      });
      setUser({ ...loggedInUser, points: updatedPoints, lastLogin: today.toISOString() });
    } else {
      // Update lastLogin anyway to today
      await fetch(`${API_URL}/users/${loggedInUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lastLogin: today.toISOString() }),
      });
    }
  };

  const handleAction = async (id: string) => {
    // 1. LOGIN
    if (id === "login-btn") {
      const emailInput = (document.getElementById("email-input") as HTMLInputElement)?.value.trim();
      const passwordInput = (document.getElementById("password-input") as HTMLInputElement)?.value.trim();

      try {
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();
        const foundUser = users.find((u: any) => u.email === emailInput && u.password === passwordInput);

        if (foundUser) {
          setUser(foundUser);
          // Fetch this specific user's habits
          const habitRes = await fetch(`${API_URL}/habits?userId=${foundUser.id}`);
          const userHabits = await habitRes.json();
          setHabits(userHabits);

          await checkPointLoss(foundUser);
          setScreen("choose");
        } else {
          alert("Invalid email or password!");
        }
      } catch (error) {
        alert("Server Error: Ensure 'npx json-server --watch db.json --port 3001' is running.");
      }
    }

    // 2. NAVIGATION
    if (id === "go-minimal") setScreen("home");
    if (id === "go-gamified") alert("Gamified mode coming soon! 🚀");
    if (id === "add-habit") addHabit();
  };

  const addHabit = async () => {
    const name = prompt("What is your new habit?");
    if (name && user) {
      const newHabit = {
        userId: user.id,
        name: name,
        done: false,
      };

      const res = await fetch(`${API_URL}/habits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newHabit),
      });

      const savedHabit = await res.json();
      setHabits([...habits, savedHabit]);
    }
  };

  const toggleHabit = async (index: number) => {
    const habit = habits[index];
    const updatedStatus = !habit.done;

    // Update locally
    const updatedHabits = [...habits];
    updatedHabits[index].done = updatedStatus;
    setHabits(updatedHabits);

    // Update in db.json
    await fetch(`${API_URL}/habits/${habit.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: updatedStatus }),
    });
  };

  return (
    <HtmlBridge htmlContent={html} onAction={handleAction}>
      {screen === "home" && (
        <div className="habit-container" style={{ marginTop: "20px" }}>
          {habits.map((h, i) => (
            <HabitItem key={h.id || i} name={h.name} done={h.done} toggle={() => toggleHabit(i)} />
          ))}
        </div>
      )}
    </HtmlBridge>
  );
}

function HabitItem({ name, done, toggle }: any) {
  return (
    <div className={`habit-item ${done ? "completed" : ""}`} 
         style={{ display: "flex", alignItems: "center", padding: "10px", background: "#2a2a2a", borderRadius: "8px", marginBottom: "10px", cursor: "pointer" }}
         onClick={toggle}>
      <div className={`checkbox ${done ? "active" : ""}`} 
           style={{ width: "20px", height: "20px", border: "2px solid #6b8e23", marginRight: "15px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", background: done ? "#6b8e23" : "transparent" }}>
        {done ? "✓" : ""}
      </div>
      <div className="habit-text" style={{ color: "white", textDecoration: done ? "line-through" : "none" }}>{name}</div>
    </div>
  );
}