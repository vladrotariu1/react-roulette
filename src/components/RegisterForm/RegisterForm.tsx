import React, { ChangeEvent, SetStateAction, SyntheticEvent, useEffect, useState } from "react";
import { FormInputDataModel } from "../../models";
import { AtLeastNChars, EmailValidator, handleInputOnChange } from "../../utils/FormsValidation";
import "./RegisterForm.css";

function RegisterForm() {

    const [emailData, setEmailData] = useState( new FormInputDataModel() );
    const [passwordData, setPasswordData] = useState( new FormInputDataModel() );
    const [passwordCheckData, setPasswordCheckData] = useState( new FormInputDataModel() );

    function readyToSumbit(): boolean {
        return (
            !(emailData.error || passwordData.error || passwordCheckData.error) &&
            !!(emailData.inputValue && passwordData.inputValue && passwordCheckData.inputValue)
        );
    }

    function resetForm() {
        setEmailData(new FormInputDataModel());
        setPasswordData(new FormInputDataModel());
        setPasswordCheckData(new FormInputDataModel());
    }

    function submit(e: SyntheticEvent) {
        e.preventDefault();

        const email = emailData.inputValue;
        const password = passwordData.inputValue;
        const passwordCheck = passwordCheckData.inputValue;

        if (password !== passwordCheck) {
            setPasswordCheckData({ ...passwordCheckData, error: 'Passwords do not match' });
            return;
        }

        const userDataPayload = {
            email: email,
            password: password,
        };

        resetForm();

        console.log(userDataPayload);
    }

    return (
        <div className='register-form-wrapper'>

            <h1>Register</h1>

            <form className='register-form' onSubmit={ submit }>

                <div className='register-form-input-container'>
                    <input 
                        className={
                            'register-form-input ' +
                            (emailData.error ? 'register-form-input-invalid' : '')
                        }
                        placeholder='Email'
                        type='text' 
                        onChange={ e => handleInputOnChange(e, setEmailData, [new EmailValidator()]) }/>
                    <div className='register-form-input-error'>{ emailData.error }</div>
                </div>

                <div className='register-form-input-container'>
                    <input 
                        className={
                            'register-form-input ' +
                            (passwordData.error ? 'register-form-input-invalid' : '')
                        }
                        placeholder='Password' 
                        type='password'  
                        onChange={ e => handleInputOnChange(e, setPasswordData, [new AtLeastNChars(8)]) }/>
                    <div className='register-form-input-error'>{ passwordData.error }</div>
                </div>

                <div className='register-form-input-container'>
                    <input 
                        className={
                            'register-form-input ' +
                            (passwordCheckData.error ? 'register-form-input-invalid' : '')
                        }
                        placeholder='Password again' 
                        type='password'  
                        onChange={ e => handleInputOnChange(e, setPasswordCheckData) }/>
                    <div className='register-form-input-error'>{ passwordCheckData.error }</div>
                </div>

                <button disabled={ !readyToSumbit() } className='register-form-submit' type="submit">Sign up</button>

            </form>

        </div>
    );
}

export default RegisterForm;