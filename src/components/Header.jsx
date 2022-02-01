import { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

import '../styles/Header.css';

export const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(false);

  const handleClick = () => {
    setDarkMode(!darkMode);
    theme === 'bg-light' ? setTheme('bg-dark') : setTheme('bg-light');
  };

  return (
    <div className="Header">
      <h1>ReactHooks</h1>
      <button type="button" onClick={handleClick}>
        {darkMode ? 'Dark Mode' : 'Light Mode'}
      </button>
    </div>
  );
};
