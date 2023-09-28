import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {HiOutlineLocationMarker} from 'react-icons/hi'
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: <HiOutlineLocationMarker/>,
});

export default function Map() {
  useEffect(() => {
    var container = L.DomUtil.get("map");

    if (container != null) {
      container._leaflet_id = null;
    }
    var map = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18 ,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoidGFyLWhlbCIsImEiOiJjbDJnYWRieGMwMTlrM2luenIzMzZwbGJ2In0.RQRMAJqClc4qoNwROT8Umg",
      }
    ).addTo(map);
    L.Marker.prototype.options.icon = DefaultIcon;
    var marker = L.marker([51.5, -0.09]).addTo(map);
    marker.bindPopup("<b>This is the location</b>").openPopup();

  }, []);
  return <div id="map" className="h-[50vh] rounded-2xl" ></div>;
}
