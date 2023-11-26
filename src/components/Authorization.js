import {useFormAndValidation} from "../hooks/useFormAndValidation";
import React from "react";


function Authorization({title, onSubmit, label, name, children}) {

    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation(false)

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(values.password, values.email)
    }

    React.useEffect(() => {
        resetForm()
    }, []);

    return (
        <div className="authorization">
            <h2 className="authorization__title">{title}</h2>
            <form
                onSubmit={handleSubmit}
                className="authorization__container"
                name={name}
            >
                <fieldset className={`authorization__set`}>
                    <input
                        onChange={handleChange}
                        value={values.email || ''}
                        className={`authorization__edit`}
                        placeholder={`Email`}
                        name="email"
                        id="input-email"
                        type="email"
                        minLength={6}
                        maxLength={30}
                        required
                    />
                    <span className="popup__input-error">
                        {!isValid && errors.email}
                    </span>
                </fieldset>
                <fieldset className={`authorization__set`}>
                    <input
                        onChange={handleChange}
                        value={values.password || ''}
                        className={`authorization__edit`}
                        placeholder={`Пароль`}
                        name="password"
                        id="input-password"
                        type="password"
                        minLength={6}
                        maxLength={30}
                        required
                    />
                    <span className="popup__input-error">
                        {!isValid && errors.password}
                    </span>
                </fieldset>
                <button
                    aria-label={label}
                    type="submit"
                    className={`button authorization__submit-button`}
                >
                    {label}
                </button>
                {children}
            </form>
        </div>
    );
}

export default Authorization;