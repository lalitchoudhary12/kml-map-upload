import React, { useState } from 'react';
import KmlUpload from './components/KmlUpload';
import SummaryButton from './components/SummaryButton';
import DetailedButton from './components/DetailedButton';
import MapDisplay from './components/MapDisplay';

const App = () => {
  const [kmlData, setKmlData] = useState(null);

  console.log(kmlData); // Add this line to check kmlData

  return (
    <div className="container">
      <h1>Upload KML File</h1>
      <KmlUpload setKmlData={setKmlData} />
      {kmlData && (
        <>
          <SummaryButton kmlData={kmlData} />
          <DetailedButton kmlData={kmlData} />
          <MapDisplay kmlData={kmlData} />
        </>
      )}
    </div>
  );
};

export default App;