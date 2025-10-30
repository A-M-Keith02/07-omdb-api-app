import React from "react";
import "./Modal.css";

export default function Modal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent close on inner click
      >
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {item.media_type === "image" ? (
          <img src={item.hdurl || item.url} alt={item.title} />
        ) : (
          <iframe
            src={item.url}
            title={item.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        )}

        <div className="modal-text">
          <h2>{item.title}</h2>
          <p className="date">{new Date(item.date).toDateString()}</p>
          <p className="explanation">{item.explanation}</p>
        </div>
      </div>
    </div>
  );
}
