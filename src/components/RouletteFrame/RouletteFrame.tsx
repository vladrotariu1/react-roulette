import React, { useState } from "react";
import { Modes, SLOT_COLOR_RED } from "../../utils/constants";
import Roulette from "../Roulette/Roulette";
import TimeCountdown from "../TimeCountdown/TimeCountdown";
import "./RouletteFrame.css"

function RouletteFrame() {

    const [ winnerSlotColorData, setWinnerSlotColorData ] = useState('Color');
    const [ modeData, setModeData ] = useState(Modes.MODE_COUNT_DOWN);
  
    function setModeToCountDown() {
      setModeData(Modes.MODE_COUNT_DOWN);
    }
  
    function setModeToRoll() {
      setModeData(Modes.MODE_ROLL);
    }
  
    return (
      <div className='roulette-frame'>
  
        <TimeCountdown 
          shouldRollOrCountDown={ modeData }
          setModeToRoll={ setModeToRoll }/>
  
        <Roulette 
          shouldRollOrCountDown={ modeData } 
          setWinnerSlotColor={ setWinnerSlotColorData } 
          setModeToCountDown={ setModeToCountDown }/>
  
        <div 
          className={ 
            'winner-slot-color '  + 
            (winnerSlotColorData === SLOT_COLOR_RED ? 'winner-slot-red' : 'winner-slot-black')
          }>
          { winnerSlotColorData.toUpperCase() }
        </div>
  
      </div>
    );
  }
  
  export default RouletteFrame;