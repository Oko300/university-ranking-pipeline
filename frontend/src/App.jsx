import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [rankings, setRankings] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [desc, setDesc] = useState(true);
  const [searching, setSearching] = useState(false);

  const fetchRankings = async () => {
    const res = await axios.get("http://localhost:5000/api/rankings");
    setRankings(res.data);
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
      setSearchResults([]);
      return;
    }

    if (search.trim().length < 2) return;

    const delay = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await axios.get(
          `http://universities.hipolabs.com/search?name=${search}`,
          { timeout: 5000 }
        );
        setSearchResults(res.data.slice(0, 20));
      } catch (err) {
        console.error("Search failed:", err);
      }
      setSearching(false);
    }, 600);

    return () => clearTimeout(delay);
  }, [search]);

  const filtered = rankings
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      desc
        ? b.compositeScore - a.compositeScore
        : a.compositeScore - b.compositeScore
    );

  const isSearching = search.trim() !== "";

  return (
    <div className={dark ? "app dark" : "app"}>
      <div className="container">
        <h1>University Rankings Dashboard</h1>

        <div className="controls">
          <input
            placeholder="Search any university in the world..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={() => setDesc(!desc)}>
            Sort {desc ? "↓" : "↑"}
          </button>
          <button onClick={() => setDark(!dark)}>
            {dark ? "Light" : "Dark"}
          </button>
          <button onClick={fetchRankings}>Refresh</button>
        </div>

        {searching && <p>Searching...</p>}

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>University</th>
              <th>{isSearching ? "Country" : "Score"}</th>
            </tr>
          </thead>
          <tbody>
            {isSearching
              ? searchResults.map((u, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.country}</td>
                  </tr>
                ))
              : filtered.map((u, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{u.name}</td>
                    <td>{u.compositeScore.toFixed(3)}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;