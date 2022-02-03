import { useCallback, useMemo, useReducer, useRef, useState } from 'react';
import { useCharacters } from '../hooks/useCharacters';

import '../styles/Characters.css';
import Search from './Search';

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

const API = 'https://rickandmortyapi.com/api/character';

export const Characters = () => {
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  const { characters } = useCharacters(API);

  const handleClick = (favorite) => {
    dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite });
  };

  // const handleSearch = () => {
  //   setSearch(searchInput.current.value);
  // };

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  // const filteredUsers = characters.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // });

  const filteredUsers = useMemo(
    () =>
      characters.filter((user) => {
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [characters, search]
  );

  return (
    <>
      <Search handleSearch={handleSearch} searchInput={searchInput} />

      {favorites.favorites.map((favorite) => (
        <div key={favorite.id} className="Favorite">
          <li>{favorite.name}</li>
        </div>
      ))}

      <div className="Characters">
        {filteredUsers.map((character) => (
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
    </>
  );
};
