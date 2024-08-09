import { useState, useEffect } from "react";
import Error from "./Error.jsx";
import Places from "./Places.jsx";
import { sortPlacesByDistance } from "../loc.js";
// import { fetchAvailablePlaces } from "../http.js"

// const places = localStorage.getItem("places");

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const response = await fetch("http://localhost:3000/places");
        const resData = await response.json();

        if (!response.ok) {
          throw new Error("Failed to fetch places");
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            resData.places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setisLoading(false);
        });
      } catch (error) {
        setError({
          message:
            error.message || "Couldn't fetch places, please try again later!",
        });
        setisLoading(false);
      }

    
    }
    fetchPlaces();
    // fetch('http://localhost:3000/places').then((response)=>{
    //   return response.json();
    // }).then((resData)=>{
    //   setAvailablePlaces(resData.places);
    // });
  }, []);

  if (error) {
    return <Error title="An error occurred!" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText={"Fetching data..."}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
