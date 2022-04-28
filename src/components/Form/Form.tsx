import React, { SyntheticEvent } from "react";
import { FormProps } from "../../models";
import FormInput from "../FormInput/FormInput";
import "./Form.css";

function Form(props: FormProps) {

    const form = props.form;

    function resetForm() {
        Object.values(form).forEach(input => {
            input.setData({ inputValue: '', error: '' });
        });
    }

    function readyToSumbit(): boolean {
        let noErrors = true;
        let hasData = true;

        Object.values(form).forEach(input => {
            noErrors &&= !input.data.error;
            hasData &&= !!(input.data.inputValue);
        });

        return noErrors && hasData;
    }

    function onSubmit(e: SyntheticEvent) {
        e.preventDefault();
        props.submitCallback();
    }

    return (
        <div className='form-wrapper'>

            <h1>{ props.formTitle }</h1>

            <form className='form' onSubmit={ onSubmit }>

                { 
                    Object.values(props.form).map((inputField, i) => {
                        return <FormInput key={ i } model={ inputField } />
                    })
                }

                { 
                    props.globalError !== null ? 
                    <div className='form-global-error'>{ props.globalError }</div> :
                    null
                }

                <button disabled={ !readyToSumbit() } className='form-submit' type='submit'>
                    { props.formTitle }
                </button>

            </form>

        </div>
    );
}

export default Form;
