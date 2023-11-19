import React from "react";
import {FetchingContext} from "../contexts/FetchingContext";
import {usePopupClose} from "../hooks/usePopupClose";

function PopupWithForm({onClose, onSubmit, name, isOpen, title, children, label, isActive}) {

    const isFetching = React.useContext(FetchingContext)
    usePopupClose(isOpen, onClose)

    return (
        <div className={`popup popup_type_${name} popup_${isOpen ? 'opened' : 'closed'}`}>
            <div className="popup__wrapper popup__wrapper_default">
                <button
                    title="Закрыть модальное окно"
                    aria-label="Закрыть модальное окно"
                    type="button"
                    className="button popup__close-button"
                />
                <h2 className="popup__purpose">{title}</h2>
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
            </div>
        </div>
    );
}

export default PopupWithForm;
