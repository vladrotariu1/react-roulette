import React, { useState, useEffect } from "react";
import { COUNTDOWN_TIME, Modes } from "../../utils/constants";
import './Time-Countdown.css'

interface TimeCountdownInterface {
    shouldRollOrCountDown: Modes,
    setModeToRoll: () => void
}

function TimeCountdown(props: TimeCountdownInterface) {

    const [timeData, setTimeData] = useState(COUNTDOWN_TIME);

    useEffect(() => {
        if (props.shouldRollOrCountDown === Modes.MODE_COUNT_DOWN) {
            resetState();

            const countDownInterval = setInterval(() => {
                updateRemainingTime();
            }, 1000);

            return () => clearInterval(countDownInterval);
        }
    }, [props.shouldRollOrCountDown]);

    function updateRemainingTime() {
        setTimeData(time => {
            if (time === 0)
                props.setModeToRoll();

            return time === 0 ? 0 : time - 1;
        });
    }

    function resetState() {
        setTimeData(COUNTDOWN_TIME);
    }

    return (
        <div
            style={{ 
                visibility: 
                (props.shouldRollOrCountDown === Modes.MODE_ROLL ? 'hidden' : 'visible') 
            }} 
            className="time-countdown">
            Next spin in: {timeData}
        </div>
    );
}

export default TimeCountdown;