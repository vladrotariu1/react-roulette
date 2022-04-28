import { ChangeEvent, SetStateAction } from "react";
import { FormInputDataModel } from "../../models";
import { FormsValidator } from "./FormsValidator";

export function handleInputOnChange(
    e: ChangeEvent<HTMLInputElement>, 
    callback: (data: SetStateAction<FormInputDataModel>) => void,
    validators?: FormsValidator[]
) {

    function callCallback({ inputValue, error }: { inputValue: string, error: string }) {
        callback(formInputData => {
            let formInputDataCopy = { ...formInputData };
            formInputDataCopy.inputValue = inputValue;
            formInputDataCopy.error = error;
            return formInputDataCopy;
        });
    }

    let errorMessages: string[] = [];

    if (validators) {
        validators.forEach(validator => {
            try {
                validator.validate(e)
            } catch (error: any) {
                errorMessages.push(error.message);
            }
        });
    }

    callCallback({ 
        inputValue: e.target.value, 
        error: errorMessages.length > 0 ? errorMessages[0] :  ''
    });
}