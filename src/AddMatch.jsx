import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Supabase-asiakas
const supabase = createClient(
  "https://dhnyhtncntudnuojwsea.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobnlodG5jbnR1ZG51b2p3c2VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0ODAzNzMsImV4cCI6MjA2NzA1NjM3M30.to6tdqSaUz9Uphlo6I6YBMa8QXErDyZwIUduehKaryQ"
);

export default function AddMatch() {
  const [formVisible, setFormVisible] = useState(false);

  // Ottelutiedot
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [homeGoals, setHomeGoals] = useState("");
  const [awayGoals, setAwayGoals] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [players, setPlayers] = useState(
    Array.from({ length: 20 }, () => ({ name: "", goals: "", assists: "" }))
  );

  const handlePlayerChange = (index, field, value) => {
    const updated = [...players];
    updated[index][field] = value;
    setPlayers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("matches")
      .insert([
        {
          home_team: homeTeam,
          away_team: awayTeam,
          home_goals: homeGoals,
          away_goals: awayGoals,
          date,
          location,
          players,
        },
      ]);

    if (error) {
      console.error("Virhe lisäyksessä:", error);
    } else {
      console.log("Ottelu lisätty:", data);
      setFormVisible(false); // Piilota lomake lisäyksen jälkeen
    }
  };

  return (
    <div>
      <button onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? "Piilota lomake" : "Lisää uusi ottelu"}
      </button>

      {formVisible && (
        <form onSubmit={handleSubmit}>
          <h2>Ottelutiedot</h2>
          <input value={homeTeam} onChange={(e) => setHomeTeam(e.target.value)} placeholder="Kotijoukkue" required />
          <input value={awayTeam} onChange={(e) => setAwayTeam(e.target.value)} placeholder="Vierasjoukkue" required />
          <input type="number" value={homeGoals} onChange={(e) => setHomeGoals(e.target.value)} placeholder="Koti maalit" required />
          <input type="number" value={awayGoals} onChange={(e) => setAwayGoals(e.target.value)} placeholder="Vieras maalit" required />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Pelipaikka" required />

          <h2>Pelaajien tehot</h2>
          {players.map((player, index) => (
            <div key={index}>
              <input
                value={player.name}
                onChange={(e) => handlePlayerChange(index, "name", e.target.value)}
                placeholder={`Pelaaja ${index + 1}`}
              />
              <input
                type="number"
                value={player.goals}
                onChange={(e) => handlePlayerChange(index, "goals", e.target.value)}
                placeholder="Maalit"
              />
              <input
                type="number"
                value={player.assists}
                onChange={(e) => handlePlayerChange(index, "assists", e.target.value)}
                placeholder="Syötöt"
              />
            </div>
          ))}

          <button type="submit">Lisää ottelu</button>
        </form>
      )}
    </div>
  );
}
