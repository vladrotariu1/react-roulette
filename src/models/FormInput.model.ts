import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { FormsValidator, handleInputOnChange } from "../utils/FormsValidation";
import { FormInputDataModel } from "./FormInputData.model";

export class FormInputModel {
    constructor(
        public data: FormInputDataModel, 
        public setData: Dispatch<SetStateAction<FormInputDataModel>>,
        private fieldName: string,
        private inputFieldType: string,
        private validators?: FormsValidator[]
    ) {}

    get getFieldName() {
        return this.fieldName;
    }

    get getInputFieldType() {
        return this.inputFieldType;
    }

    public validate(e: ChangeEvent<HTMLInputElement>) {
        handleInputOnChange(e, this.setData, this.validators);
    }
}