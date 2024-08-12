import image from '../assets/sl.png';

export default function Places({ title, places = [], fallbackText, onSelectPlace, isLoading, loadingText }) {
  console.log(places);
  
  const loadingArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];

  return (
    <section className="places-category">
      <h2>{title}</h2>
      
      {isLoading ? (
        <ul className="places">
          {loadingArray.map((_, index) => (
            <li key={index} className="place-item">
              <button>
                <img src={image} alt="Loading placeholder" />
                <h3>{loadingText}</h3>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <>
          {places.length === 0 && <p className="fallback-text">{fallbackText}</p>}
          {places.length > 0 && (
            <ul className="places">
              {places.map((place) => (
                <li key={place.id} className="place-item">
                  <button onClick={() => onSelectPlace(place)}>
                    <img src={`http://localhost:3000/${place.image.src}`} alt={place.image.alt} />
                    <h3>{place.title}</h3>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  );
}