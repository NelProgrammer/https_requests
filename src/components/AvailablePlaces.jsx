import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import sortPlacesByDistance from '../loc.js';
import fetchAvailablePlaces from '../http.js';

const AvailablePlaces = ({ onSelectPlace }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);

      try {
        const responsePlacesData = await fetchAvailablePlaces();

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            responsePlacesData,
            position.coords.latitude,
            position.coords.longitude
          );

          console.log(`**** Set AvailablePlaces.`);
          setAvailablePlaces(sortedPlaces);
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
