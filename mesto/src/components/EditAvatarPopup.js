import React from "react";
import PopupWithForm from "./PopupWithForm";
import {useFormAndValidation} from "../hooks/useFormAndValidation";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation(false)

    React.useEffect(() => {
        resetForm({link: ''}, {}, false)
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            link: values.link,
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={'Обновить аватар'}
            name={'avatar'}
            label={'Сохранить'}
            isActive={isValid}
        >
            <fieldset className="popup__set">
                <label className="popup__field">
                    <input
                        value={values.link || ''}
                        onChange={handleChange}
                        type="url"
                        className="popup__edit"
                        name="link"
                        id="input-avatar"
                        placeholder="Ссылка на картинку"
                        required
                    />
                    <span className="popup__input-error input-avatar-error">
                        {!isValid && errors.link}
                    </span>
                </label>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditAvatarPopup