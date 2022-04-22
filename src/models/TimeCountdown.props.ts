import { Modes } from "../utils/constants";

export interface TimeCountdownProps {
    shouldRollOrCountDown: Modes,
    setModeToRoll: () => void
}