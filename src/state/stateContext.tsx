import React, { createContext, useContext, useEffect, useReducer } from "react";
import { useQuery } from "react-query";
import { StateModel, UserDetailsModel } from "../models";
import { useGetRouletteDetails } from "../services/roulette.service";
import { useGetUserDetails } from "../services/user.service";
import { ACTION_SET_ROULETTE_DETAILS, ACTION_SET_USER } from "../utils/constants";
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

    const { 
        isError: userInfoError, 
        data: userInfoData, 
        isSuccess: userInfoSuccess
    } = useQuery('user-info', useGetUserDetails(), { 
        enabled: !!state.userLoggedIn 
    });

    const { 
        isError: rouletteDetailsError, 
        data: rouletteDetailsData, 
        isSuccess: rouletteDetailsSuccess
    } = useQuery('roulette-props', useGetRouletteDetails(), {
        enabled: true
    });

	useEffect(() => {
        if (userInfoSuccess) {
            dispatch({ 
                type: ACTION_SET_USER,
                payload: userInfoData 
            });
        } else if (userInfoError) {
            console.log('error getting user info');
        }
	}, [userInfoError, userInfoSuccess]);

    useEffect(() => {
        console.log('getting roulette details');
        if (rouletteDetailsSuccess) {
            console.log(rouletteDetailsData);
            dispatch({ 
                type: ACTION_SET_ROULETTE_DETAILS,
                payload: rouletteDetailsData 
            });
        } else if (rouletteDetailsError) {
            console.log('error getting roulette details');
        }
    }, [rouletteDetailsSuccess, rouletteDetailsError])

    return (
        <StateContext.Provider value={ { state, dispatch } }>
            { children }
        </StateContext.Provider>
    );
}
