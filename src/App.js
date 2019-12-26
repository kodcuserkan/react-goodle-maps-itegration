import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps'
import './App.css';
import * as parksData from './skateboards.json';
import haritaStili from './mapStili';
import skateImg from './skateBoard.svg'


function Harita() {

  const [secilen, setSecilen] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 40.982, lng: 28.6399 }}
        defaultOptions={{ styles: haritaStili }}
      />

      {parksData.features.map(park => (


        <Marker
          key={park.properties.PARK_ID}
          position={{
            lat: park.geometry.coordinates[1],
            lng: park.geometry.coordinates[0]
          }}
          onClick={() => {
            setSecilen(park);
          }}
          icon={{
            url: skateImg,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
        />
      ))}
      {
        secilen && (
          <InfoWindow
            position={{
              lat: secilen.geometry.coordinates[1],
              lng: secilen.geometry.coordinates[0]
            }}
            onCloseClick={() => {
              setSecilen(null)
            }}
          >
            <div>
              <h2>{secilen.properties.NAME}</h2>
              <p>{secilen.properties.DESCRIPTIO}</p>
            </div>
          </InfoWindow>
        )
      }
    </div>
  )
}

const WrapMap = withScriptjs(withGoogleMap(Harita))

function App() {
  return (
    <div className="haritaDiv" style={{ height: "100vh", width: "100vw" }}>
      <WrapMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}

export default App;
