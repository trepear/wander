import React, { useContext, useState, useEffect } from "react";
import UserContext from "../utils/userContext";
import GoogleMapReact from "google-map-react";
import API from "../utils/api";

function Map() {
var mapUsers = [{}];
var photoURL = localStorage.getItem("photo");
console.log("PHOTO URL: ", photoURL)
const Marker = ({ text }) => <img src={photoURL} width="50" height="50"  />;
 
  useEffect(() => {
     // retrieve all users
     var city = null;
     API.getAllUsers().then(
      (result => {
        result.map( result => {
          city = result.destination;
          console.log("CITY: ",city);
          console.log("RESULT: ",result)
        });
      }
    ),
    API.getCoordinates(city).then((result) => {
      console.log("Lat&Lon:", result);
      // setLocation here
      setLocation({
        lat: result.lat, 
        lng: result.lng
      })
    }),
  )}, []);

  const [center, setCenter] = useState({
    lat: 39.0119,
    lng: 98.4842
  });
  const [zoom, setZoom] = useState({
    zoom: 0
  });

  const [location, setLocation] = useState({
    lat: "",
    lng: ""
  })

  const userState = useContext(UserContext);
  var uid = userState.id;
const getUser = () => {
  console.log("mapped:", uid);
  API.getUserProfile(uid).then((results) => {
    console.log("results", results);
    // retrieve destination city
    var city = results[0].destination;
    console.log(city);

   // call api to convert the city into lat/long
    API.getCoordinates(city).then((result) => {
      console.log("Lat&Lon:", result);
      // setLocation here
      setLocation({
        lat: result.lat, 
        lng: result.lng
      })
    });
  });
};
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDhIP2Tps4GjKacpqtpjJ-sI7rBrTcz15c" }}
        defaultCenter={center}
        defaultZoom={zoom.zoom}
      >
        {/* location.lat && location.long here */}

          <Marker lat={location.lat} lng={location.lng} text={location.text} img={location.image}/>
        
      </GoogleMapReact>
    </div>
  );

  // return (
  //   <ol>
  //     {reptiles.map((reptile) => (
  //       <li>{reptile}</li>
  //     ))}
  //   </ol>
  // );

}

export default Map;

