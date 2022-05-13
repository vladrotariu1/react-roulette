import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useQuery } from "react-query";
import { StateModel, UserDetailsModel } from "../models";
import { useGetUserDetails } from "../services/user.service";
import { ACTION_SET_USER } from "../utils/constants";
import { reducer } from "./baseReducer";

interface AppContext {
    state: StateModel,
    dispatch: React.Dispatch<{
        type: string;
        payload: any;
    }>
}

const StateContext = createContext({} as AppContext);

export function useAppState() {
    return useContext(StateContext);
}

export default function StateProvider( { children }: any ) {
    const [state, dispatch] = useReducer(reducer, {} as StateModel);

    const { isError, data, isSuccess } = useQuery('user-info', useGetUserDetails(), { 
        enabled: !!state.userLoggedIn 
    });

	useEffect(() => {
        if (isSuccess) {
            dispatch({ 
                type: ACTION_SET_USER,
                payload: data 
            });
        } else if (isError) {
            console.log('error getting user info');
        }
	}, [isError, isSuccess]);

    return (
        <StateContext.Provider value={ { state, dispatch } }>
            { children }
        </StateContext.Provider>
    );
}
