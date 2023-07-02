import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "react-query";
import { RouletteProps } from "../../models";
import { useGetNextRollPositionsArray } from "../../services/roulette.service";
import { useAppState } from "../../state/stateContext";
import {Modes, SLOTS_VIEWPORT_PX_WIDTH} from "../../utils/constants";
import './Roulette.css';

function Roulette(props: RouletteProps) {
    const { data: nextRollPositionsArray } = useQuery(
        'next-roll/positions-array',
        useGetNextRollPositionsArray(),
        { enabled: props.shouldRollOrCountDown === Modes.MODE_COUNT_DOWN }
    );
    const { state } = useAppState();

    const {
        slotsNumber: SLOTS_NUMBER,
        slotsPxWidth: SLOTS_PX_WIDTH,
        rouletteOffsetLeft: INITIAL_OFFSET,
        slots: initialSlots,
    } = state.rouletteDetails;

    let slotsRef = useRef<any>();
    const [ slotsArrayData, setSlotsArrayData ] = useState(
        [...Array(SLOTS_NUMBER).keys()]
            .map(index =>{
                const currentSlot = initialSlots[index];
                return (<div
                    key={ currentSlot.number }
                    color={ currentSlot.color }
                    className={ 'slot ' + (currentSlot.number % 2 === 0 ? 'slot-red' : 'slot-black') }>
                    { currentSlot.number }
                </div>)
            })
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
        if (nextRollPositionsArray) {
            const slotsContainer = slotsRef.current;
            let positionArrayCurrentIndex = 0;

            const stopAnimation = () => {
                props.setWinnerSlotColor(() => slotsRollResult());
                props.setModeToCountDown();
                clearInterval(rollAnimation);
            }
            
            const rollAnimation = setInterval(() => {
                if (positionArrayCurrentIndex > 0 &&
                    nextRollPositionsArray[positionArrayCurrentIndex] < nextRollPositionsArray[positionArrayCurrentIndex - 1]) {
                    moveLastSlotToFront();
                }

                slotsContainer.style.left = nextRollPositionsArray[positionArrayCurrentIndex] + 'px';
                positionArrayCurrentIndex++;

                if (positionArrayCurrentIndex >= nextRollPositionsArray.length) stopAnimation();
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
                <div style={{ left: INITIAL_OFFSET + 'px' }} ref={ slotsRef } className='slots-container'>
                    { slotsArrayData }
                </div>
            </div>
        </div>
    );
}

export default Roulette;