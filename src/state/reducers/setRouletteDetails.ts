import { StateModel } from "../../models";

export function setRouletteDetailsReducer(state: StateModel, payload: any|null) {
    return { ...state, rouletteDetails: payload };
}