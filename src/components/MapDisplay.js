import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon } from 'react-leaflet';
import L from 'leaflet';

const MapDisplay = ({ kmlData }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (kmlData && !map) {
      const initializedMap = L.map('map').setView([37.42228990140251, -122.0822035425683], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(initializedMap);
      setMap(initializedMap);
    }

    if (kmlData && map) {
      console.log(kmlData); // Add this line to check kmlData in MapDisplay
      const placemarks = kmlData.kml.Document.Placemark;

      placemarks.forEach((placemark) => {
        if (placemark.Point) {
          const coordinates = placemark.Point.coordinates.split(',');
          const lat = parseFloat(coordinates[1]);
          const lon = parseFloat(coordinates[0]);
          L.marker([lat, lon]).addTo(map).bindPopup(placemark.name || 'Point');
        }

        if (placemark.LineString) {
          const coordinates = placemark.LineString.coordinates
            .trim()
            .split(' ')
            .map((coord) => {
              const [lon, lat] = coord.split(',');
              return [parseFloat(lat), parseFloat(lon)];
            });
          L.polyline(coordinates, { color: 'blue' }).addTo(map).bindPopup(placemark.name || 'Line');
        }

        if (placemark.Polygon) {
          const coordinates = placemark.Polygon.outerBoundaryIs.LinearRing.coordinates
            .trim()
            .split(' ')
            .map((coord) => {
              const [lon, lat] = coord.split(',');
              return [parseFloat(lat), parseFloat(lon)];
            });
          L.polygon(coordinates, { color: 'green' }).addTo(map).bindPopup(placemark.name || 'Polygon');
        }
      });
    }
  }, [kmlData, map]);

  return (
    <MapContainer id="map" style={{ height: '500px' }} center={[37.42228990140251, -122.0822035425683]} zoom={13}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {kmlData &&
        kmlData.kml &&
        kmlData.kml.Document &&
        kmlData.kml.Document.Placemark.map((placemark, index) => {
          if (placemark.Point) {
            const coordinates = placemark.Point.coordinates.split(',');
            const lat = parseFloat(coordinates[1]);
            const lon = parseFloat(coordinates[0]);
            return (
              <Marker key={index} position={[lat, lon]}>
                <Popup>{placemark.name || 'Point'}</Popup>
              </Marker>
            );
          }
          if (placemark.LineString) {
            const coordinates = placemark.LineString.coordinates
              .trim()
              .split(' ')
              .map((coord) => {
                const [lon, lat] = coord.split(',');
                return [parseFloat(lat), parseFloat(lon)];
              });
            return (
              <Polyline key={index} positions={coordinates} color="blue">
                <Popup>{placemark.name || 'Line'}</Popup>
              </Polyline>
            );
          }
          if (placemark.Polygon) {
            const coordinates = placemark.Polygon.outerBoundaryIs.LinearRing.coordinates
              .trim()
              .split(' ')
              .map((coord) => {
                const [lon, lat] = coord.split(',');
                return [parseFloat(lat), parseFloat(lon)];
              });
            return (
              <Polygon key={index} positions={coordinates} color="green">
                <Popup>{placemark.name || 'Polygon'}</Popup>
              </Polygon>
            );
          }
          return null;
        })}
    </MapContainer>
  );
};

export default MapDisplay;