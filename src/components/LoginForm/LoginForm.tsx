import React, { useState } from "react";
import { FormInputDataModel, FormInputModel, UserModel } from "../../models";
import { useLoginUser } from "../../services/auth.service";
import Form from "../Form/Form";

function LoginForm() {
    const { mutate: loginUser } = useLoginUser();

    const form = {
        email: 
        new FormInputModel(
            ...useState(new FormInputDataModel()), 
            'Email',
            'text',
        ),
        password: 
        new FormInputModel(
            ...useState(new FormInputDataModel()), 
            'Password',
            'password',
        )
    };

    const [formGlobalErrorData, setFormGlobalErrorData] = useState('');

    function submit() {
        const userDataPayload: UserModel = {
            email: form.email.data.inputValue,
            password: form.password.data.inputValue
        }

        loginUser(userDataPayload, {
            onError: (error: any) => setFormGlobalErrorData(error.message),
            onSuccess: async (data) => console.log(await data.json())
        });
    }

    return (
        <Form 
            formTitle="Login" 
            form={ form } 
            submitCallback= { submit } 
            globalError={ formGlobalErrorData } />
    );
}

export default LoginForm;