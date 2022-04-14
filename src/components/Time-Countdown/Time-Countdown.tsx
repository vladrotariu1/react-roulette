import React, { useState } from "react";
import './Time-Countdown.css'

function TimeCountdown() {

    const [timeData, setTimeData] = useState(10);

    const countDownInterval = setInterval(() => {
        // setTimeData(time => time - 1);
    }, 1000);

    return (
        <div className="time-countdown">Next spin in: {timeData}</div>
    );
}

export default TimeCountdown;