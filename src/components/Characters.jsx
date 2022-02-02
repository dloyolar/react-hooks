import { useEffect, useMemo, useReducer, useState } from 'react';

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
  const [search, setSearch] = useState('');

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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

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
      <div className="Search">
        <p>Search</p>
        <input type="text" value={search} onChange={handleSearch} />
      </div>

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
