import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://dhnyhtncntudnuojwsea.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRobnlodG5jbnR1ZG51b2p3c2VhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0ODAzNzMsImV4cCI6MjA2NzA1NjM3M30.to6tdqSaUz9Uphlo6I6YBMa8QXErDyZwIUduehKaryQ"
);

export default function Pisteporssi() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const { data, error } = await supabase
        .from("players")
        .select("*");
      //.eq("kausi", "2024-2025")
      //.order("yhteensa", { ascending: false });
      console.log("DATA:", data);
      console.log("ERROR:", error);

      if (error) {
        console.error("Virhe haettaessa:", error.message);
      } else {
        setData(data);
      }
    };

    fetchPlayers();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1 style={{ fontWeight: "bold", fontSize: "1.5rem", marginBottom: "1rem" }}>
        Pistepörssi 2024–2025
      </h1>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Pelaaja</th>
            <th>Joukkue</th>
            <th>O</th>
            <th>M</th>
            <th>S</th>
            <th>Yht</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p, i) => (
            <tr key={p.id}>
              <td>{i + 1}</td>
              <td>{p.pelaaja}</td>
              <td>{p.joukkue}</td>
              <td>{p.ottelut}</td>
              <td>{p.maalit}</td>
              <td>{p.syotot}</td>
              <td>{p.yhteensa}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
