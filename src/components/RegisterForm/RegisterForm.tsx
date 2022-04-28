import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInputDataModel, FormInputModel, UserModel } from "../../models";
import { useCreateUser } from "../../services/auth.service";
import { AtLeastNChars, EmailValidator, NotEmpty } from "../../utils/FormsValidation";
import Form from "../Form/Form";
import "./RegisterForm.css";

function RegisterForm() {
    const navigator = useNavigate();

    const { mutate: createUser } = useCreateUser();

    const form = {
        email: 
        new FormInputModel(
            ...useState(new FormInputDataModel()), 
            'Email',
            'text',
            [new NotEmpty(), new EmailValidator()]
        ),
        password: 
        new FormInputModel(
            ...useState(new FormInputDataModel()), 
            'Password',
            'password',
            [new NotEmpty(), new AtLeastNChars(8)]
        ),
        checkPassword: 
        new FormInputModel(
            ...useState(new FormInputDataModel()), 
            'Password check',
            'password',
            [new NotEmpty()]
        )
    };

    const [formGlobalErrorData, setFormGlobalErrorData] = useState('');

    function passwordsMatch() {
        return (
            form.password.data.inputValue === 
            form.checkPassword.data.inputValue
        );
    }

    function submit() {
        if (!passwordsMatch()) {
            setFormGlobalErrorData('Passwords do not match');
            return;
        }

        setFormGlobalErrorData('');

        const userDataPayload: UserModel = {
            email: form.email.data.inputValue,
            password: form.password.data.inputValue
        };

        createUser(userDataPayload, {
                onError: (error: any) => setFormGlobalErrorData(error.message),
                onSuccess: (data) => navigator('/login')
            }
        );
    }

    return (
        <Form  
            formTitle="Register" 
            form={ form } 
            submitCallback={ submit }
            globalError={ formGlobalErrorData }/>
    );
}

export default RegisterForm;