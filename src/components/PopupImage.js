import Popup from "./Popup";

function PopupImage({card, onClose, isOpen}) {

    return (

        <Popup
            type={`image`}
            isOpen={isOpen}
            onClose={onClose}
            children={<>
                <img className="popup__image" src={card.link} alt={`Фото: ${card.name}`}
                     aria-label={`Фото: ${card.name}`}/>
                <p className="popup__title_image">{card.name}</p>
            </>}
        />
    )

}

export default PopupImage;
