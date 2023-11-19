import {usePopupClose} from "../hooks/usePopupClose";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function InfoTooltip({isOpen, onClose}) {
    const isRegistered = React.useContext(CurrentUserContext).isRegistered
    usePopupClose(isOpen, onClose)

    return (
        <div className={`popup popup_type_tooltip popup_${isOpen ? 'opened' : 'closed'}`}>
            <div className={`popup__wrapper popup__wrapper_default popup__wrapper_tooltip`}>
                <button
                    title="Закрыть модальное окно"
                    aria-label="Закрыть модальное окно"
                    type="button"
                    className="button popup__close-button popup__close-button_tooltip"
                />
                <div className={`popup__tooltip popup__tooltip_${isRegistered ? 'agreed' : 'denied'}`}/>
                <p className="popup__title_tooltip">
                    {isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </p>
            </div>
        </div>
    )
}

export default InfoTooltip