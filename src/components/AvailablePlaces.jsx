import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

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

        console.log(`**** Set AvailablePlaces.`);
        setAvailablePlaces(resData.places);
      } catch (error) {
        // Code if Error
        setError({
          message: error.message || 'Could not fetch places, try again latter.',
        });
        console.log(`**** Set Error Message.`);
      }

      console.log(`**** Available Places.`);

      setIsFetching(false); // Outside to ensure we still change fetching state even if there's an error.
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
