import { StateModel } from "../../models";

export function setUserLoggedInReducer(state: StateModel, payload: any|null) {
    return { ...state, userLoggedIn: payload };
}