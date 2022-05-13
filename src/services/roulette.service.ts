const endpoint = process.env.REACT_APP_SERVER_DEV + 'roulette/';

export function useGetNextRoll() {

    const userDetailsEndpoint = endpoint + 'next-roll/';
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const executeRequest = () =>
        fetch(userDetailsEndpoint, request)
            .then(async (response) => {
                if (!response.ok) {
                    switch(response.status) {
                        default:
                            throw Error(response.statusText);
                    }
                }
                return await response.json() as { nextRoll: number };
            });

    return executeRequest;
}
