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

    if (validators) {
        validators.forEach(validator => {
            try {
                if (validator.validate(e)) 
                    callCallback({ inputValue: e.target.value, error: '' });
            } catch (error: any) {
                callCallback({ inputValue: e.target.value, error: error.message });
            }
        });
    } else {
        callCallback({ inputValue: e.target.value, error: '' });
    }
}