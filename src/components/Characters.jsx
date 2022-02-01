import { useEffect, useReducer, useState } from 'react';

import '../styles/Characters.css';

const initialState = {
  favorites: [],
};

const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVORITE':
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    default:
      return state;
  }
};

export const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((res) => res.json())
      .then((data) => setCharacters(data.results));
    console.log(characters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (favorite) => {
    dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite });
  };

  console.log(favorites);

  return (
    <div className="Characters">
      {characters.map((character) => (
        <div className="Characters-container" key={character.id}>
          <img src={character.image} alt={character.name} />
          <h3>{character.name}</h3>
          <p>Gender: {character.gender}</p>
          <p>Status: {character.status}</p>
          <button type="button" onClick={() => handleClick(character)}>
            Add to favorite
          </button>
        </div>
      ))}
    </div>
  );
};
