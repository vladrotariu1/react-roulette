import { ChangeEvent } from "react";
import { FormsValidator } from "../FormsValidator";

export class AtLeastNChars implements FormsValidator {
    constructor(private expectedNumberOfChars: number) { }

    validate(e: ChangeEvent<HTMLInputElement>): boolean {
        const inputLength = e.target.value.length;

        if (inputLength < this.expectedNumberOfChars) 
            throw new Error(
                `Should be at least ${this.expectedNumberOfChars} characters long`
            );
        
        return true;
    }
}