import { StateModel } from "../models";
import { ACTION_SET_USER, ACTION_SET_USER_LOGGED_IN } from "../utils/constants";
import { setUserReducer } from "./reducers/setUser";
import { setUserLoggedInReducer } from "./reducers/setUserLoggedIn";

interface ReducerDictionary {
    action: string,
    reducer: (state: StateModel, payload: any|null) => StateModel
}

const reducerDictionaryArray: ReducerDictionary[] = [
    {
        action: ACTION_SET_USER,
        reducer: setUserReducer
    },
    {
        action: ACTION_SET_USER_LOGGED_IN,
        reducer: setUserLoggedInReducer
    }
]

export function reducer(state: StateModel, action: { type: string, payload: any|null }): StateModel {
    for (const r of reducerDictionaryArray) {
        if (r.action === action.type) {
            return r.reducer(state, action.payload);
        }
    }
    return state;
}
