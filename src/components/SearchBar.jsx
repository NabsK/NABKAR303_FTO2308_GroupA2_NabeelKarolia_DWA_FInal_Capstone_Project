import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPreviewData } from "../data/podcastData.js";
import Fuse from "fuse.js";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPreviewData();
      setShows(data);
    };
    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Fuse.js options
    const options = {
      includeScore: true,
      keys: ["title"],
    };

    // Create a new instance of Fuse with the shows and options
    const fuse = new Fuse(shows, options);

    // Use Fuse to search for the searchTerm
    const matchingShows = fuse.search(searchTerm).map(({ item }) => item);

    if (matchingShows.length === 0) {
      alert("Show not found");
    } else {
      navigate("/search-results", { state: { shows: matchingShows } });
    }
  };

  return (
    <div id="search">
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search.." name="search" className="form" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
        <button type="submit" className="SButton">
          <img src="./images/search.png" alt="Descriptive Text" className="searchButton" />
        </button>
      </form>
    </div>
  );
}
