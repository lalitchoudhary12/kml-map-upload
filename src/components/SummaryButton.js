import React from 'react';

const SummaryButton = ({ kmlData }) => {
  const handleSummary = () => {
    const elementCount = kmlData.kml.Document[0].Placemark.reduce((acc, placemark) => {
      const type = placemark.hasOwnProperty('LineString') ? 'LineString' : 'Point'; // Simplified logic
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    console.log(elementCount);
  };

  return (
    <button onClick={handleSummary}>Summary</button>
  );
};

export default SummaryButton;
