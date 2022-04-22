import { Dispatch, SetStateAction } from "react";
import { Modes } from "../utils/constants";

export interface RouletteProps {
    shouldRollOrCountDown: Modes,
    setWinnerSlotColor: Dispatch<SetStateAction<string>>,
    setModeToCountDown: () => void
}