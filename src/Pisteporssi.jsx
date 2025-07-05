import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://dhnyhtncntudnuojwsea.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobnlodG5jbnR1ZG51b2p3c2VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0ODAzNzMsImV4cCI6MjA2NzA1NjM3M30.to6tdqSaUz9Uphlo6I6YBMa8QXErDyZwIUduehKaryQ"
);


export default function Pisteporssi({ laji }) {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      const { data, error } = await supabase
        .from("player_stats")
        .select("player_id, goals, assists, penalties, players(name, number)")
        .eq("sport", laji);

      if (error) {
        console.error("Virhe haettaessa dataa:", error);
        return;
      }

      const tilastot = {};

      for (const p of data) {
        const id = p.player_id;
        const nimi = p.players?.name || "-";
        const numero = p.players?.number || "-";

        if (!tilastot[id]) {
          tilastot[id] = {
            id,
            nimi,
            numero,
            ottelut: 0,
            maalit: 0,
            syotot: 0,
            jaahyt: 0,
          };
        }

        tilastot[id].ottelut += 1;
        tilastot[id].maalit += Number(p.goals) || 0;
        tilastot[id].syotot += Number(p.assists) || 0;
        tilastot[id].jaahyt += Number(p.penalties) || 0;
      }

      const tulos = Object.values(tilastot).map((pelaaja) => ({
        ...pelaaja,
        pisteet: pelaaja.maalit + pelaaja.syotot,
      })).sort((a, b) => b.pisteet - a.pisteet);

      setStats(tulos);
    }

    fetchStats();
  }, [laji]);

  return (
    <div>
      <h2>Pistepörssi: {laji}</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nimi</th>
            <th>Ottelut</th>
            <th>Maalit</th>
            <th>Syötöt</th>
            <th>Pisteet</th>
            <th>Jäähyt</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((p) => (
            <tr key={p.id}>
              <td>{p.numero}</td>
              <td>{p.nimi}</td>
              <td>{p.ottelut}</td>
              <td>{p.maalit}</td>
              <td>{p.syotot}</td>
              <td>{p.pisteet}</td>
              <td>{p.jaahyt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
