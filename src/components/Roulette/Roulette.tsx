import React, { useRef } from "react";
import './Roulette.css';

function Roulette() {

    const slotsNumber = 1;
    let slotsArray = [];
    let slotsRef = useRef<any>();

    for (let i = 0; i < slotsNumber; i++) {
        slotsArray.push(
            <div 
                key={i}
                className={ 'slot ' + (i % 2 === 0 ? 'slot-red' : 'slot-black') }>
                    {i}
            </div>
        );
    }

    const roll = () => {

        let velocity = 0;
        const acceleration = 0.2;
        let friction = 0.8;
        let acceleration_time = 20;
        let time = 0;

        for (; time < acceleration_time; time++) {
            const offsetLeft = slotsRef.current.offsetLeft;

            velocity += acceleration;
            slotsRef.current.style.left = offsetLeft + velocity + 'px';
        }
        
        for(; velocity > 0.1; velocity *= friction, friction -= 0.0006) {
            const offsetLeft = slotsRef.current.offsetLeft;

            velocity += acceleration;
            slotsRef.current.style.left = offsetLeft + velocity + 'px';
        }
    }

    return (
        <div>
            <div className='slots-container-viewport'>
                <div ref={ slotsRef } className='slots-container'>
                    { slotsArray }
                </div>
            </div>
            <button onClick={ roll }>Click</button>
        </div>
    );
}

export default Roulette;