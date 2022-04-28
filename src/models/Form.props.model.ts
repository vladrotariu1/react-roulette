import { FormInputModel } from "./FormInput.model";

export interface FormProps {
    formTitle: string,
    form: { [key: string]: FormInputModel },
    submitCallback: () => void,
    globalError ?: string,
}