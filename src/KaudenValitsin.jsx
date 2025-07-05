// src/KaudenValitsin.jsx
export default function KaudenValitsin({ valittuKausi, setValittuKausi }) {
  const kaudet = ["2024-2025", "2023-2024", "2022-2023", "kaikki"];

  return (
    <div>
      <label htmlFor="kausivalitsin">Valitse kausi: </label>
      <select
        id="kausivalitsin"
        value={valittuKausi}
        onChange={(e) => setValittuKausi(e.target.value)}
      >
        {kaudet.map((kausi) => (
          <option key={kausi} value={kausi}>
            {kausi}
          </option>
        ))}
      </select>
    </div>
  );
}
