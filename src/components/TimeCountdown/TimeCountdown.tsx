import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { TimeCountdownProps } from "../../models";
import { useGetNextRoll } from "../../services/roulette.service";
import { COUNTDOWN_TIME, Modes } from "../../utils/constants";
import './TimeCountdown.css'

function TimeCountdown(props: TimeCountdownProps) {
    const { data: nextRollTimeObject } = useQuery('next-roll', useGetNextRoll(), { enabled: props.shouldRollOrCountDown === Modes.MODE_COUNT_DOWN });

    const [timeData, setTimeData] = useState(COUNTDOWN_TIME);

    useEffect(() => {
        if (props.shouldRollOrCountDown === Modes.MODE_COUNT_DOWN) {
            resetTime();

            const countDownInterval = setInterval(() => {
                updateRemainingTime();
            }, 1000);

            return () => clearInterval(countDownInterval);
        }
    }, [nextRollTimeObject]);

    function updateRemainingTime() {
        setTimeData(time => {
            if (time === 0)
                props.setModeToRoll();

            return time <= 0 ? 0 : time - 1;
        });
    }

    function resetTime() {
        const nextRollTime = nextRollTimeObject?.nextRoll;

        if (nextRollTime)
            setTimeData(Math.floor(nextRollTime));
    }

    return (
        <>
        {   
            timeData <= 10 ?
            <div
                style={{ 
                    visibility: 
                    (props.shouldRollOrCountDown === Modes.MODE_ROLL ? 'hidden' : 'visible') 
                }} 
                className="time-countdown">
                Next spin in: { timeData }
            </div> :
            <div className="time-countdown preparing">Preparing</div>
        }
        </>
    );
}

export default TimeCountdown;