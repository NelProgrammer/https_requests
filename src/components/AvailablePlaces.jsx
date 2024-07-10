import { useEffect, useState } from 'react';
import Places from './Places.jsx';
// import { response } from 'express';

const AvailablePlaces = ({ onSelectPlace }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);
      // const response = await fetch('/places');
      const response = await fetch('http://localhost:3001/places');
      console.log(`**** Response Fetched.`);

      const resData = await response.json();
      console.log(`**** ResponseData Fetched.`);

      setAvailablePlaces(resData.places);
      console.log(`**** Available Places.`);

      setIsFetching(false);
    };

    fetchPlaces();
  }, []);

  return (
    <Places
      title="Available Places"
      places={availablePlaces} // Replaced the blank Array with availablePlaces state Array.
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="ReactJs:No places available."
      onSelectPlace={onSelectPlace}
    />
  );
};

export default AvailablePlaces;
