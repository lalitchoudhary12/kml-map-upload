import React from 'react';

const DetailedButton = ({ kmlData }) => {
  const handleDetailed = () => {
    const details = kmlData.kml.Document[0].Placemark.map(placemark => {
      const type = placemark.hasOwnProperty('LineString') ? 'LineString' : 'Unknown';
      const length = placemark.LineString
        ? placemark.LineString[0].coordinates[0].split(' ').length  // Rough length
        : 0;
      return { type, length };
    });

    console.log(details);
  };

  return (
    <button onClick={handleDetailed}>Detailed</button>
  );
};

export default DetailedButton;
