import { RouletteDetailsModel } from "../models/RouletteDetails.model";

const endpoint = process.env.REACT_APP_SERVER_DEV + 'roulette/';

export function useGetNextRollTime() {

    const nextRollTimeEndpoint = endpoint + 'next-roll/time/';
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const executeRequest = () =>
        fetch(nextRollTimeEndpoint, request)
            .then(async (response) => {
                if (!response.ok) {
                    switch(response.status) {
                        default:
                            throw Error(response.statusText);
                    }
                }
                return await response.json() as { nextRollTime: number };
            });

    return executeRequest;
}

export function useGetNextRollAcceleration() {

    const nextRollAccelerationEndpoint = endpoint + 'next-roll/acceleration/';
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const executeRequest = () =>
        fetch(nextRollAccelerationEndpoint, request)
            .then(async (response) => {
                if (!response.ok) {
                    switch(response.status) {
                        default:
                            throw Error(response.statusText);
                    }
                }
                return await response.json() as { nextRollAcceleration: number };
            });

    return executeRequest;
}

export function useGetRouletteDetails() {

    const rouletteDetailsEndpoint = endpoint + 'props/';
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const executeRequest = () =>
        fetch(rouletteDetailsEndpoint, request)
            .then(async (response) => {
                if (!response.ok) {
                    switch(response.status) {
                        default:
                            throw Error(response.statusText);
                    }
                }
                return await response.json() as RouletteDetailsModel;
            });

    return executeRequest;
}
