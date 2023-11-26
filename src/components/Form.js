import React from "react";
import {FetchingContext} from "../contexts/FetchingContext";

function Form({onSubmit, name, children, label, isActive}) {

    const isFetching = React.useContext(FetchingContext)

    return (

        <form
            onSubmit={onSubmit}
            noValidate=""
            name={name}
            className={`popup__container popup__container_type_${name}`}>
            {children}
            <button
                aria-label={label}
                type="submit"
                className={`button popup__submit-button popup__submit-button_${isActive ? 'active' : 'inactive'} popup__submit-button_profile`}
            >
                {isFetching ? 'Загрузка...' : label}
            </button>
        </form>
    );
}

export default Form;