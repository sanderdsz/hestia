import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

import { FiArrowRight, FiPlus } from "react-icons/fi";
import mapMarkerImg from "../images/map-marker.svg";

import "../styles/pages/orphanages-map.css";
import api from "../services/api";

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconAnchor: [29, 68],
  iconSize: [58, 68],
  popupAnchor: [170, 2],
});

interface Orphanage{
  id: number,
  latitude: number,
  longitude: number,
  name: string
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Choose a orphanage on the map</h2>
          <p>Many children are waiting your visit :)</p>
        </header>

        <footer>
          <strong>Urussanga</strong>
          <span>Santa Catarina</span>
        </footer>
      </aside>

      <Map
        center={[-28.5207603, -49.3225804]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2FuZGVyZHN6IiwiYSI6ImNrZzhlamVxazBnZHQycW9hMWlyYWV5cW0ifQ.mnOCv3ou22xdfuWTNEKO_A`}
        />
        {orphanages.map(orphanage => {
          return (
            <Marker icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} key={orphanage.id}>
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#fff" />
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}
export default OrphanagesMap;
