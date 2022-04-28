import { ChangeEvent } from "react";
import { FormsValidator } from "../FormsValidator";

export class NotEmpty implements FormsValidator {
    validate(e: ChangeEvent<HTMLInputElement>): boolean {
        if (e.target.value.length > 0) return true;
        else throw new Error('Field is empty');
    }
}