import { useState } from 'react';
import './App.css';
import { Characters } from './components/Characters';
import { Header } from './components/Header';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const [theme, setTheme] = useState('bg-light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={('App', theme)}>
        <Header />
        <Characters />
        <h1>Hola Mundo</h1>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
