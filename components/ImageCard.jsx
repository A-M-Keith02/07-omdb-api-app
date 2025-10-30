import React from "react";

/*
  Simple ImageCard component for beginners.
  - Accepts `data` (APOD item) and optional `onClick`.
  - Iframe includes title for accessibility and avoids deprecated frameBorder.
*/
export default function ImageCard({ data, onClick = () => {} }) {
  return (
    <div className="card" onClick={() => onClick(data)}>
      {data.media_type === "image" ? (
        <img src={data.url} alt={data.title} />
      ) : (
        <iframe
          src={data.url}
          title={data.title}
          allow="encrypted-media; autoplay; fullscreen"
        />
      )}
      <div className="card-content">
        <h3>{data.title}</h3>
        <p>{new Date(data.date).toDateString()}</p>
      </div>
    </div>
  );
}