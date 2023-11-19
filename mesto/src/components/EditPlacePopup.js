import React from "react";
import PopupWithForm from "./PopupWithForm";
import {useFormAndValidation} from "../hooks/useFormAndValidation";

function EditProfilePopup({isOpen, onClose, onPostCard}) {
    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation(false)

    React.useEffect(() => {
        resetForm({name: '', link: ''}, {}, false)
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();

        onPostCard({
            name: values.name,
            link: values.link,
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onSubmit={handleSubmit}
            onClose={onClose}
            title={'Новое место'}
            name={'place'}
            label={'Добавить место'}
            isActive={isValid}
        >
            <fieldset name='place' className="popup__set">
                <label className="popup__field">
                    <input
                        value={values.name || ''}
                        onChange={handleChange}
                        className="popup__edit"
                        name="name"
                        placeholder="Название"
                        id="input-place"
                        type="text"
                        required
                        minLength={2}
                        maxLength={30}
                    />
                    <span className="popup__input-error">
                            {!isValid && errors.name}
                        </span>
                </label>
            </fieldset>
            <fieldset name='place' className="popup__set">
                <label className="popup__field">
                    <input
                        value={values.link || ''}
                        onChange={handleChange}
                        type="url"
                        className="popup__edit"
                        name="link"
                        id="input-link"
                        placeholder="Ссылка на картинку"
                        required
                    />
                    <span className="popup__input-error">
                            {!isValid && errors.link}
                        </span>
                </label>
            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup