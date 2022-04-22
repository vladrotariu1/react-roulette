import React, { SyntheticEvent, useState } from "react";
import { FormInputDataModel, FormInputModel } from "../../models";
import { AtLeastNChars, EmailValidator } from "../../utils/FormsValidation";
import FormInput from "../FormInput/FormInput";
import "./RegisterForm.css";

function RegisterForm() {

    const form = {
        email: 
        new FormInputModel(
            ...useState(new FormInputDataModel()), 
            'Email',
            'text',
            [new EmailValidator()]
        ),
        password: 
        new FormInputModel(
            ...useState(new FormInputDataModel()), 
            'Password',
            'password',
            [new AtLeastNChars(8)]
        ),
        checkPassword: 
        new FormInputModel(
            ...useState(new FormInputDataModel()), 
            'Password check',
            'password'
        )
    };

    const [formGlobalErrorData, setFormGlobalErrorData] = useState('');

    function readyToSumbit(): boolean {
        let noErrors = true;
        let hasData = true;

        Object.values(form).forEach(input => {
            noErrors &&= !input.data.error;
            hasData &&= !!input.data.inputValue;
        });

        return noErrors && hasData;
    }

    function resetForm() {
        Object.values(form).forEach(input => {
            input.setData({ inputValue: '', error: '' });
        })
    }

    function passwordsMatch() {
        return (
            form.password.data.inputValue === 
            form.checkPassword.data.inputValue
        );
    }

    function submit(e: SyntheticEvent) {
        e.preventDefault();

        if (!passwordsMatch()) {
            setFormGlobalErrorData('Passwords do not match');
            return;
        }

        setFormGlobalErrorData('');

        const userDataPayload = {
            email: form.email.data.inputValue,
            password: form.password.data.inputValue
        };

        console.log(userDataPayload);

        resetForm();
    }

    return (
        <div className='register-form-wrapper'>

            <h1>Register</h1>

            <form className='register-form' onSubmit={ submit }>

                { 
                    Object.values(form).map((inputField, i) => {
                        return <FormInput key={ i } model={ inputField } />
                    })
                }

                <div className='register-form-global-error'>
                    { formGlobalErrorData }
                </div>

                <button disabled={ !readyToSumbit() } className='register-form-submit' type="submit">Sign up</button>

            </form>

        </div>
    );
}

export default RegisterForm;