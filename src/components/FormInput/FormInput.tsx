import { FormInputModel } from '../../models';
import './FormInput.css'

function FormInput(props: { model: FormInputModel }) {

    return (
        <div className='input-container'>
            <input 
                className={
                    'input ' +
                    (props.model.data.error ? 'input-invalid' : '')
                }
                onChange={ e => props.model.validate(e) }
                placeholder={ props.model.getFieldName }
                type={ props.model.getInputFieldType } 
                value={ props.model.data.inputValue }/>
            <div className='input-error'>{ props.model.data.error }</div>
        </div>
    );
}

export default FormInput