import { StateModel } from "../../models";

export function setUserReducer(state: StateModel, payload: any|null) {
    return { ...state, userDetails: payload };
}