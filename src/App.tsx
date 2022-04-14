import React, { useState } from 'react';
import './App.css';
import Roulette from './components/Roulette/Roulette';

function App() {

  const [ buttonClickData, setButtonClickData ] = useState(0);

  const handleRoll = () => {
    setButtonClickData(val => val + 1);
  }

  return (
    <div>

      <div className="roulette-wrapper">
        <Roulette buttonClick={ buttonClickData } />
      </div>

      <button onClick={ handleRoll }>Roll</button>

    </div>
  );
}

export default App;
