export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const resData = await response.json();

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return resData.places;
}
export async function updateUserPlaces(places){
const response = await fetch('http://localhost:3000/user-places',{
  method:'PUT',// The method we need to use
  body:JSON.stringify({places:places}), // Which data should be attached as a request body to the outgoing request.
  headers: {
    'Content-Type': 'application/json'
  } 
});

const resData = await response.json();
if(!response.ok){
  throw new Error('Failed to update user data')
}
}