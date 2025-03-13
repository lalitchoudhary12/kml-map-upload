import React from 'react';
import { parseString } from 'xml2js';

const KmlUpload = ({ setKmlData }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith('.kml')) {
      const reader = new FileReader();
      reader.onload = () => {
        const xml = reader.result;
        const options = {
          normalizeTags: true,
          explicitArray: false,
        };

        parseString(xml, options, (err, jsonData) => {
          if (err) {
            console.error('Error parsing KML file:', err);
          } else {
            console.log(jsonData); // Add this line to check parsed data
            if (jsonData && jsonData.kml && jsonData.kml.Document) {
              setKmlData(jsonData);
            } else {
              console.error('Invalid KML structure');
            }
          }
        });
      };
      reader.readAsText(file);
    }
  };

  return (
    <input type="file" accept=".kml" onChange={handleFileUpload} />
  );
};

export default KmlUpload;