import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({isOpen, onClose, onDeleteCard}) {

    function handleSubmit(e) {
        e.preventDefault();
        onDeleteCard()
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}
            title={'Вы уверены?'}
            name={'delete'}
            label={'Да'}
            isActive={'active'}
        />
    )
}

export default DeleteCardPopup