import React from 'react';
import { Link } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

import { FiPlus } from 'react-icons/fi'
import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css'

function OrphanagesMap() {
    return (
       <div id="page-map">
           <aside>
               <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Choose a orphanage on the map</h2>
                    <p>Many children are waiting your visit :)</p>
               </header>

               <footer>
                   <strong>
                       Urussanga
                   </strong>
                   <span>
                       Santa Catarina
                   </span>
               </footer>
           </aside>

           <Map  
            center={[-28.5207603,-49.3225804]}
            zoom={15}
            style={{ width: '100%', height: '100%' }}
            >
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2FuZGVyZHN6IiwiYSI6ImNrZzhlamVxazBnZHQycW9hMWlyYWV5cW0ifQ.mnOCv3ou22xdfuWTNEKO_A`}/>
            </Map>

           <Link to="" className="create-orphanage">
               <FiPlus size={32} color="#FFF"/>
           </Link>
       </div>
    );
}
export default OrphanagesMap;