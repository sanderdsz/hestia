import React from "react";
import { Link } from "react-router-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

import { FiArrowRight, FiPlus } from "react-icons/fi";
import mapMarkerImg from "../images/map-marker.svg";

import "../styles/pages/orphanages-map.css";

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,
  iconAnchor: [29, 68],
  iconSize: [58, 68],
  popupAnchor: [170, 2],
});

function OrphanagesMap() {
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

        <Marker icon={mapIcon} position={[-28.5207603, -49.3225804]}>
          <Popup
            closeButton={false}
            minWidth={240}
            maxWidth={240}
            className="map-popup"
          >
            Paraiso da criança
            <a href="">
              <FiArrowRight size={20} color="#fff" />
            </a>
          </Popup>
        </Marker>
      </Map>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}
export default OrphanagesMap;
