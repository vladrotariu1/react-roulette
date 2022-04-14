import React, { useState, useRef, useEffect } from "react";
import { SLOTS_NUMBER, SLOTS_PX_WIDTH, SLOTS_ROLL_ACCELERATION, SLOTS_ROLL_FRICTION } from "../../utils/constants";
import './Roulette.css';

interface RouletteProps {
    buttonClick: number
}

function Roulette(props: RouletteProps) {

    let slotsArray = [];
    let slotsRef = useRef<any>();

    for (let i = 0; i < SLOTS_NUMBER; i++) {
        slotsArray.push(
            <div 
                key={i}
                className={ 'slot ' + (i % 2 === 0 ? 'slot-red' : 'slot-black') }>
                    {i}
            </div>
        );
    }

    const [ slotsArrayData, setSlotsArrayData ] = useState(slotsArray);

    const moveLastSlotToFront = () => {
        
        const slotsContainer = slotsRef.current;
        const offsetLeft = slotsContainer.offsetLeft;

        slotsContainer.style.left = offsetLeft - SLOTS_PX_WIDTH + 'px';

        setSlotsArrayData(
            arr => [arr[arr.length - 1], ...arr.slice(0, arr.length - 1)]
        );
    }

    const roll = () => {

        const slotsContainer = slotsRef.current;

        let velocity = 0;
        const acceleration = SLOTS_ROLL_ACCELERATION;
        let friction = SLOTS_ROLL_FRICTION;
        let accelerationTime = 300;
        let time = 0;
        
        const stopAnimation = () => {
            clearInterval(rollAnimation);
        }
        
        const rollAnimation = setInterval(() => {

            const offsetLeft = slotsContainer.offsetLeft;

            if (time++ < accelerationTime) {
                velocity += acceleration;
                slotsContainer.style.left = offsetLeft + velocity + 'px';
            }
            else if(velocity > 0.1) {
                velocity *= friction
                friction -= 0.0001;
                slotsContainer.style.left = offsetLeft + velocity + 'px';
            }
            else {
                stopAnimation();
            }

            if (offsetLeft > 0 - SLOTS_PX_WIDTH) {
                moveLastSlotToFront();
            }

        }, 1);
    }

    useEffect(roll, [props.buttonClick]);

    return (
        <div>
            <div className='slots-container-viewport'>
                <div ref={ slotsRef } className='slots-container'>
                    { slotsArrayData }
                </div>
            </div>
        </div>
    );
}

export default Roulette;