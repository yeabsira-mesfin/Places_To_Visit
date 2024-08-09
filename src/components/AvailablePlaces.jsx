import { useState,useEffect } from 'react';
import Places from './Places.jsx';

const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces,setAvailablePlaces] = useState([]);
  const [isLoading,setisLoading] = useState(true);

  useEffect(()=>{

    async function fetchPlaces(){
      const response = await  fetch('http://localhost:3000/places');
      const resData = await response.json();
      setAvailablePlaces(resData.places)
      setisLoading(false)

    }
    fetchPlaces();
    
    // fetch('http://localhost:3000/places').then((response)=>{
    //   return response.json();
    // }).then((resData)=>{
    //   setAvailablePlaces(resData.places);
    // });

  },[])


  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isLoading}
      loadingText={'Fetching data...'}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
