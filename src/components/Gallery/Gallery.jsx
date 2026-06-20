import React from 'react';
import './Gallery.css';

const Gallery = () => {
  return (
    <section className="gallery">
      <h3>Gallery</h3>
      <div className="gallery__grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="gallery__item" />
        ))}
      </div>
    </section>
  );
};

export default Gallery;

