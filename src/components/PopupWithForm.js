import React from "react";
import Popup from "./Popup";
import Form from "./Form";

function PopupWithForm({onClose, onSubmit, name, isOpen, title, children, label, isActive}) {


    return (

        <Popup
            onClose={onClose}
            type={`default`}
            isOpen={isOpen}
        >
            <>
                <h2 className="popup__purpose">{title}</h2>
                <Form
                    onSubmit={onSubmit}
                    isActive={isActive}
                    label={label}
                    name={name}
                    children={children}
                />
            </>
        </Popup>
    );
}

export default PopupWithForm;
