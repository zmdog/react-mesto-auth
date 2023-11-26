import React from "react";

function Input({value, type, onChange, name, placeholder, id, length, isValid, error}) {

    return (

        <fieldset name='place' className='popup__set'>
            <label className="popup__field">
                <input
                    value={value || ''}
                    onChange={onChange}
                    type={type}
                    className={'popup__edit'}
                    name={name}
                    id={id}
                    placeholder={placeholder && placeholder}
                    minLength={length && length.min}
                    maxLength={length && length.max}
                    required
                />
                <span className="popup__input-error">
                {!isValid && error}
            </span>
            </label>
        </fieldset>
    );
}

export default Input;