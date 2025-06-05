import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

interface Place {
  id: string;
  name: string;
  lat: number;
  lon: number;
  type: string;
}

export const CharityMap = () => {
  const [userLocation, setUserLocation] = useState<[number, number]>([12.9716, 77.5946]); // Default to Bengaluru
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          console.warn('Geolocation permission denied or unavailable. Using default location.');
        }
      );
    }

    const fetchNearbyPlaces = async () => {
      try {
        const query = `
          [out:json][timeout:25];
          (
            node["amenity"="food_bank"](around:10000,${userLocation[0]},${userLocation[1]});
            node["charity"="yes"](around:10000,${userLocation[0]},${userLocation[1]});
            node["social_facility"="old_age_home"](around:10000,${userLocation[0]},${userLocation[1]});
            node["amenity"="community_centre"](around:10000,${userLocation[0]},${userLocation[1]});
            node["amenity"="ngo"](around:10000,${userLocation[0]},${userLocation[1]});
          );
          out body;
        `;

        const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);
        const res = await fetch(url);
        const data = await res.json();

        const extracted = data.elements
          .filter((el: any) => el.lat && el.lon)
          .map((el: any) => ({
            id: el.id,
            name: el.tags?.name || 'Unnamed Place',
            lat: el.lat,
            lon: el.lon,
            type:
              el.tags?.amenity ||
              el.tags?.social_facility ||
              el.tags?.charity ||
              'NGO/Charity',
          }));

        setPlaces(extracted);
      } catch (error) {
        console.error('Error fetching nearby places:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyPlaces();
  }, [userLocation]);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md">
      <MapContainer
        center={userLocation}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <ChangeView center={userLocation} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={userLocation}>
          <Popup>Your Location</Popup>
        </Marker>

        {!loading &&
          places.map(place => (
            <Marker key={place.id} position={[place.lat, place.lon]}>
              <Popup>
                <strong>{place.name}</strong>
                <br />
                Type: {place.type}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};
