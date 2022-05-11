import { useQuery } from "react-query";
import { useAppState } from "../state/stateContext";
import { getAccessToken } from "./localStorage.service";

const endpoint = process.env.REACT_APP_SERVER_DEV + 'users/';

export function useGetUserDetails() {
    const { state } = useAppState();
    const jwtToken = getAccessToken();

    const userDetailsEndpoint = endpoint + 'me/';
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
        },
    }

    const executeRequest = () =>
        fetch(userDetailsEndpoint, request)
            .then(response => {
                if (!response.ok) {
                    switch(response.status) {
                        default:
                            throw Error(response.statusText);
                    }
                }
                return response;
            });

    return executeRequest;
}
