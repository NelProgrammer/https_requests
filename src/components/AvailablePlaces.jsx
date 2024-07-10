import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';

const AvailablePlaces = ({ onSelectPlace }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);

      try {
        const response = await fetch('http://localhost:3001/places');
        console.log(`**** Response Fetched.`);

        const resData = await response.json();
        console.log(`**** ResponseData Fetched.`);

        if (!response.ok) {
          console.log(`**** Throw Error if response is not OK.`);
          throw new Error('Failed to fetch places.');
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            resData.places,
            position.coords.latitude,
            position.coords.longitude
          );

          console.log(`**** Set AvailablePlaces.`);
          setAvailablePlaces(resData.places);
          setIsFetching(false);
        });
      } catch (error) {
        // Code if Error
        setError({
          message: error.message || 'Could not fetch places, try again latter.',
        });
        setIsFetching(false);
      }
    };

    fetchPlaces();
  }, []);

  if (error) {
    console.log(`**** Error returned.`);
    return <Error title="An error occured!" message={error.message} />;
  }

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
