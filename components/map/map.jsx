"use client";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import getMap from "./leaflet";

export default function Map({ location }) {
  const [Cord, setCord] = useState({ lat: 51.505, lng: 0.09 });

  useEffect(() => {
    const fetcher = async () => {
      await coordinates();
    };
    fetcher();
  }, []);

  useEffect(() => {
    getMap(Cord);
  }, [Cord]);

  const coordinates = async () => {
    const url = `https://geocode.maps.co/search?q=${location}`;
    const options = {
      method: "GET",
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setCord({
        lat: result[0].lat,
        lng: result[0].lon,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return <div id="map" className="h-[50vh] rounded-2xl"></div>;
}
