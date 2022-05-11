import { LOCAL_STORAGE_ACCESS_TOKEN } from "../utils/constants";

export function setAccessToken(token: string) {
    localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN, token);
}

export function getAccessToken() {
    return localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN);
}
