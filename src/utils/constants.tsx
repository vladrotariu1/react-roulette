/* Roulette constants */
export const SLOTS_NUMBER = 20;
export const SLOTS_PX_WIDTH = 100;
export const SLOTS_ROLL_ACCELERATION = 0.5;
export const SLOTS_ROLL_FRICTION = 0.99999;
export const SLOTS_MAX_SPEED = 8;
export const SLOTS_VIEWPORT_PX_WIDTH = 1000;
export const SLOT_COLOR_RED = 'red';
export const SLOT_COLOR_BLACK = 'black';

/* Countdown constants */
export const COUNTDOWN_TIME = 10;

export enum Modes {
    MODE_COUNT_DOWN,
    MODE_ROLL
}

/* Local Storage constants */
export const LOCAL_STORAGE_ACCESS_TOKEN = 'accessToken';

/* Reducer actions constants */
export const ACTION_SET_USER = 'ACTION_SET_USER';
export const ACTION_SET_USER_LOGGED_IN = 'ACTION_SET_USER_LOGGED_IN';
