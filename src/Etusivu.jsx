import { useState } from "react";
import { Link } from "react-router-dom";
import Pisteporssi from "./Pisteporssi";
import KaudenValitsin from "./KaudenValitsin";

export default function Etusivu() {
  const [laji, setLaji] = useState("jääkiekko");
  const [kausi, setKausi] = useState("2024-2025");

  return (
    <div>
      <h1>Tilastot</h1>

      {/* Lajin valinta */}
      <div>
        <button onClick={() => setLaji("jääkiekko")}>Jääkiekko</button>
        <button onClick={() => setLaji("salibandy")}>Salibandy</button>
      </div>

      {/* Ottelun lisäys */}
      <div style={{ marginTop: "1rem" }}>
        <Link to="/lisaa-ottelu">
          <button>Lisää ottelu</button>
        </Link>
      </div>

      {/* Kauden valitsin */}
      <div style={{ marginTop: "1rem" }}>
        <KaudenValitsin valittuKausi={kausi} setValittuKausi={setKausi} />
      </div>

      {/* Pistepörssi */}
      <div style={{ marginTop: "2rem" }}>
        <Pisteporssi laji={laji} kausi={kausi} />
      </div>
    </div>
  );
}
