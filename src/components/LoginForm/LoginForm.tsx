import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormInputDataModel, FormInputModel, UserModel } from "../../models";
import { useLoginUser } from "../../services/auth.service";
import { setAccessToken } from "../../services/localStorage.service";
import { useAppState } from "../../state/stateContext";
import { ACTION_SET_USER_LOGGED_IN } from "../../utils/constants";
import Form from "../Form/Form";

function LoginForm() {
    const navigator = useNavigate();

    const { dispatch } = useAppState();
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
            onSuccess: async (data) => {
                const dataObject = await data.json();
                setAccessToken(dataObject.access_token);
                dispatch({ type: ACTION_SET_USER_LOGGED_IN , payload: true });
                navigator('/');
            }
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