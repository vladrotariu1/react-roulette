import { ChangeEvent } from "react";

export interface FormsValidator {
    validate(e: ChangeEvent<HTMLInputElement>): boolean;
}
