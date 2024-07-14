const fetchAvailablePlaces = async () => {
  const response = await fetch('http://localhost:3001/places');
  console.log(`**** Response Fetched - Places.`);

  const resData = await response.json();
  console.log(`**** Response Data Parsed - Json.`);

  if (!response.ok) {
    console.log(`**** Throw Error if response is not OK.`);
    throw new Error('Failed to fetch places.');
  }

  return resData.places;
};

export default fetchAvailablePlaces;
