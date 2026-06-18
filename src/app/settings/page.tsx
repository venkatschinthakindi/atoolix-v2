"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main style={{ padding: 20 }}>
      <h1>Settings</h1>

      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode: {darkMode ? "ON" : "OFF"}
      </button>
    </main>
  );
}