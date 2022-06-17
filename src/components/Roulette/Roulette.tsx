import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { RouletteProps } from "../../models";
import { useGetNextRollAcceleration } from "../../services/roulette.service";
import { useAppState } from "../../state/stateContext";
import { 
    Modes,
    SLOTS_ROLL_ACCELERATION, 
    SLOTS_ROLL_FRICTION, 
    SLOTS_VIEWPORT_PX_WIDTH, 
    SLOT_COLOR_BLACK, 
    SLOT_COLOR_RED } from "../../utils/constants";
import './Roulette.css';

function Roulette(props: RouletteProps) {
    const { data: nextRollAccelerationObject } = useQuery('next-roll/acceleration', useGetNextRollAcceleration(), { enabled: props.shouldRollOrCountDown === Modes.MODE_COUNT_DOWN });
    const { state } = useAppState();

    const {
        slotsMaxSpeed: SLOTS_MAX_SPEED,
        slotsNumber: SLOTS_NUMBER,
        slotsPxWidth: SLOTS_PX_WIDTH
    } = state.rouletteDetails;

    let slotsRef = useRef<any>();
    const [ slotsArrayData, setSlotsArrayData ] = useState(
        [...Array(SLOTS_NUMBER).keys()]
            .map(index => 
                <div 
                    key={ index }
                    color={ index % 2 === 0 ? SLOT_COLOR_RED : SLOT_COLOR_BLACK }
                    className={ 'slot ' + (index % 2 === 0 ? 'slot-red' : 'slot-black') }>
                    { index }
                </div>
            )
    );

    function slotsRollResult(): string {
        const offsetLeft = slotsRef.current.offsetLeft;
        const slotIndex = Math.floor(((SLOTS_VIEWPORT_PX_WIDTH / 2) - offsetLeft) / SLOTS_PX_WIDTH);

        return slotsRef.current.children[slotIndex].getAttribute('color');
    }

    function moveLastSlotToFront() {
        
        const slotsContainer = slotsRef.current;
        const offsetLeft = slotsContainer.offsetLeft;

        slotsContainer.style.left = Math.floor(offsetLeft - SLOTS_PX_WIDTH) + 'px';

        setSlotsArrayData(
            arr => [arr[arr.length - 1], ...arr.slice(0, arr.length - 1)]
        );
    }

    function roll() {
        if (nextRollAccelerationObject?.nextRollAcceleration) {
            console.log('should roll');
            const slotsContainer = slotsRef.current;

            let velocity = 0;
            const acceleration = SLOTS_ROLL_ACCELERATION;
            let friction = SLOTS_ROLL_FRICTION;
            let accelerationTime = nextRollAccelerationObject.nextRollAcceleration;
            let time = 0;
            
            const stopAnimation = () => {
                props.setWinnerSlotColor(val => slotsRollResult());
                props.setModeToCountDown();
                clearInterval(rollAnimation);
            }
            
            const rollAnimation = setInterval(() => {

                const offsetLeft = slotsContainer.offsetLeft;

                if (time++ < accelerationTime) {
                    velocity += velocity < SLOTS_MAX_SPEED ?  acceleration : 0;
                    slotsContainer.style.left = Math.floor(offsetLeft + velocity) + 'px';
                }
                else if(velocity > 0.1) {
                    velocity *= friction;
                    friction -= velocity < 3 ? 0.00066 : 0.00006;
                    slotsContainer.style.left = Math.floor(offsetLeft + velocity) + 'px';
                }
                else {
                    stopAnimation();
                }

                if (offsetLeft > 0 - SLOTS_PX_WIDTH) {
                    moveLastSlotToFront();
                }

            }, 1);
        }
    }

    useEffect(() => {
        if (props.shouldRollOrCountDown === Modes.MODE_ROLL) {
            roll();
        }
    }, [props.shouldRollOrCountDown]);

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