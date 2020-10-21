import React, { FormEvent ,useEffect, useState, ChangeEvent} from "react";
import { useHistory } from 'react-router-dom'
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'
import Sidebar from '../components/Sidebar';
import { FiPlus } from "react-icons/fi";
import '../styles/pages/create-orphanage.css';
import mapIcon from "../utils/mapIcon";
import api from '../services/api';

export default function CreateOrphanage() {
  const [position, setPosition] = useState({latitude: 0, longitude: 0})
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const history = useHistory();

  
  function handleMapClick(event: LeafletMouseEvent) {
    
    const { lat, lng } = event.latlng;

    setPosition({ 
      latitude: lat,
      longitude: lng 
    })
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return ;
    }

    const selectedImages = Array.from(event.target.files)

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    })

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('opening_hours', opening_hours);
    images.forEach(image => {
      data.append('images', image);
    })

    await api.post('orphanages', data);

    alert('Registration success')

    history.push('/app');
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar/>

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Orphanage data</legend>

            <Map 
              center={[-28.5207603, -49.3225804]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2FuZGVyZHN6IiwiYSI6ImNrZzhlamVxazBnZHQycW9hMWlyYWV5cW0ifQ.mnOCv3ou22xdfuWTNEKO_A`}
              />

              { position.latitude !== 0 ? ( 
                <Marker 
                  interactive={false} 
                  icon={mapIcon} 
                  position={[position.latitude, position.longitude]} 
                /> 
                ) : null 
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Name</label>
              <input 
                id="name" 
                value={name} 
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">About <span>maximum of 300 characters</span></label>
              <textarea 
                id="name" 
                maxLength={300} 
                value={about} 
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Pictures</label>
              <div className="images-container">
                {previewImages.map(image => {
                  return (
                    <img key={image} src={image} alt={name} />
                  )
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
                <input multiple onChange={handleSelectImages} type="file" id="image[]" />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visit information</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instructions</label>
              <textarea 
                id="instructions" 
                value={instructions} 
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Visit time</label>
              <input 
                id="opening_hours" 
                value={opening_hours} 
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Work on weekends</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                > 
                  Yes 
                </button>
                <button 
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  No
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirm
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
