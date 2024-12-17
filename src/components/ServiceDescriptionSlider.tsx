import React, { useState } from "react";
import useServiceDescription from "../hooks/useServiceDescription";
import Pagination from "./Pagination";
import { ServiceItem } from "../hooks/useServiceDescription";

const ServiceDescriptionSlider: React.FC = () => {
  const services: ServiceItem[] = useServiceDescription();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, services.length - 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  if (services.length === 0) return <p>Loading...</p>;

  const { imageUrl, content } = services[currentIndex];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h3>Service Description</h3>
      <div>
        <img
          src={imageUrl}
          alt={`Service ${currentIndex}`}
          style={{ maxWidth: "100%", height: "auto", marginBottom: "20px" }}
        />
        <p>{content}</p>
      </div>
      <Pagination
        currentIndex={currentIndex}
        total={services.length}
        onNext={nextSlide}
        onPrev={prevSlide}
      />
    </div>
  );
};

export default ServiceDescriptionSlider;
