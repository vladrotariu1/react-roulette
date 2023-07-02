import {Slot} from "./Slot.model";

export interface RouletteDetailsModel {
    slotsNumber: number,
    slotsPxWidth: number,
    slotsRollAcceleration: number,
    slotsRollFriction: number,
    slotsMaxSpeed: number,
    slotsViewportPxWidth: number,
    rouletteOffsetLeft: number,
    slots: Slot[],
}
