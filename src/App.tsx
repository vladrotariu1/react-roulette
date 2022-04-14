import React, { useState } from 'react';
import './App.css';
import Roulette from './components/Roulette/Roulette';
import TimeCountdown from './components/Time-Countdown/Time-Countdown';
import { SLOT_COLOR_RED } from './utils/constants';

function App() {

  console.log('here');

  const [ buttonClickData, setButtonClickData ] = useState(0);
  const [ winnerSlotColorData, setWinnerSlotColorData ] = useState('Color');

  const handleRoll = () => {
    setButtonClickData(val => val + 1);
  }

  return (
    <div className='roulette-wrapper'>

      <TimeCountdown />

      <Roulette 
        setWinnerSlotColor={ setWinnerSlotColorData } 
        buttonClick={ buttonClickData } />

      <div 
        className={ 
          'winner-slot-color '  + 
          (winnerSlotColorData === SLOT_COLOR_RED ? 'winner-slot-red' : 'winner-slot-black')
        }>
        { winnerSlotColorData.toUpperCase() }
      </div>  

      <button onClick={ handleRoll }>Roll</button>
    </div>
  );
}

export default App;
