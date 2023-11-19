import {usePopupClose} from "../hooks/usePopupClose";

function ImagePopup({card, onClose, isOpen}) {

    usePopupClose(isOpen, onClose)

    return (
        <div className={`popup popup_type_image popup_${isOpen ? 'opened' : 'closed'}`}>
            <div className="popup__wrapper popup__wrapper_image">
                <button
                    title="Закрыть модальное окно"
                    aria-label="Закрыть модальное окно"
                    type="button"
                    className="button popup__close-button popup__close-button_image"
                />
                <img className="popup__image" src={card.link} alt={`Фото: ${card.name}`}
                     aria-label={`Фото: ${card.name}`}/>
                <p className="popup__title_image">{card.name}</p>
            </div>
        </div>
    )

}

export default ImagePopup;
