import { ChangeEvent } from "react";
import { FormsValidator } from "../FormsValidator";

export class EmailValidator implements FormsValidator{
    validate(e: ChangeEvent<HTMLInputElement>): boolean {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!e.target.value.match(validRegex)) throw new Error('Invalid E-Mail');
        
        return true;
    }
}