import React, { useState } from "react";
import Header from "./components/Header";
import ImageCard from "./components/ImageCard";
import Modal from "./components/Modal";
import "./App.css";

const API_KEY = "DEMO_KEY"; // Replace with your NASA API key

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchImages = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    setLoading(true);
    setImages([]);

    try {
      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`
      );
      const data = await res.json();
      const sorted = data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setImages(sorted);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch data from NASA API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="controls">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={fetchImages}>Get Space Images</button>
      </div>

      {loading ? (
        <p className="loading">🚀 Fetching data from NASA...</p>
      ) : (
        <div className="gallery">
          {images.map((img) => (
            <ImageCard key={img.date} data={img} onClick={setSelectedItem} />
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}

export default App;
import React from "react";