import { useParams } from "react-router-dom";
import cars from "../../data/cars.json";
import "./CarDetails.css";

function CarDetails() {
  const { id } = useParams();

  const car = cars.find((c) => c.id === Number(id));

  if (!car) {
    return <h2 style={{ color: "white" }}>Car not found</h2>;
  }

  return (
    <div className="car-details">

      {/* HERO */}
      <div className="hero">
        <img src={car.heroImage} alt={car.model} />
        <div className="overlay">
          <h1>{car.make} {car.model}</h1>
          <p>{car.year} • {car.country}</p>
        </div>
      </div>

      {/* SPECS */}
      <div className="section">
        <h2>Specifications</h2>

        <div className="specs">
          <p><span>Horsepower:</span> {car.horsepower} HP</p>
          <p><span>0–60:</span> {car.zeroToSixty}s</p>
          <p><span>Mileage:</span> {car.mileage} km</p>
          <p><span>Drivetrain:</span> {car.drivetrain || "RWD"}</p>
        </div>
      </div>

      {/* STORY (placeholder for now) */}
      <div className="section">
        <h2>Story</h2>
        <p className="story">
          This machine is more than metal and horsepower.
          It represents an era where driving was emotional,
          mechanical, and unapologetically raw.
        </p>
      </div>

      {/* TIMELINE (basic version) */}
      <div className="section">
        <h2>Timeline</h2>

        <ul className="timeline">
          <li>Purchase — First entry into the collection</li>
          <li>Restoration — Engine + interior refurbishment</li>
          <li>Showcase — Featured at collector event</li>
        </ul>
      </div>
      <div className="section">
  <h2>Gallery</h2>

  <div className="gallery">
    {car.gallery.map((img, index) => (
      <img key={index} src={img} alt="car view" />
    ))}
  </div>
</div>

    </div>
  );
}

export default CarDetails;