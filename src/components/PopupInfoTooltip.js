import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import Popup from "./Popup";

function PopupInfoTooltip({isOpen, onClose}) {
    const isRegistered = React.useContext(CurrentUserContext).isRegistered

    return (

        <Popup
            isOpen={isOpen}
            type={`tooltip popup__wrapper_default`}
            onClose={onClose}
        >
            <>
                <div className={`popup__tooltip popup__tooltip_${isRegistered ? 'agreed' : 'denied'}`}/>
                <p className="popup__title_tooltip">
                    {isRegistered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </p>
            </>
        </Popup>
    )
}

export default PopupInfoTooltip