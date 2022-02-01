import { useEffect, useState } from 'react';

import '../styles/Characters.css';

export const Characters = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((res) => res.json())
      .then((data) => setCharacters(data.results));
    console.log(characters);
  }, []);

  return (
    <div className="Characters">
      {characters.map((character) => (
        <div className="Characters-container" key={character.id}>
          <img src={character.image} alt={character.name} />
          <h3>{character.name}</h3>
          <p>Gender: {character.gender}</p>
          <p>Status: {character.status}</p>
        </div>
      ))}
    </div>
  );
};
