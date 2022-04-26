import { useMutation } from "react-query";
import { UserModel } from "../models";

const endpoint = process.env.REACT_APP_SERVER_DEV + 'auth/';

export function useCreateUser() {
    const createUserEndpoint = endpoint + 'signup/';
    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded',
        },
    }

    const executeRequest = (newUser: UserModel) =>
        fetch(createUserEndpoint, {...request, body: JSON.stringify(newUser)})
            .then(response => {
                if (!response.ok) {
                    switch(response.status) {
                        case 403:
                            throw Error('Credentials taken');
                        default:
                            throw Error(response.statusText);
                    }
                }
                return response;
            });

    return useMutation(
        (newUser: UserModel) => executeRequest(newUser)
    );
}