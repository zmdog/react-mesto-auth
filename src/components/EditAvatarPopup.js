import React from "react";
import PopupWithForm from "./PopupWithForm";
import {useFormAndValidation} from "../hooks/useFormAndValidation";
import Input from "./Input";

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
            <Input
                value={values.link}
                type={'url'}
                onChange={handleChange}
                name={'link'}
                placeholder="Ссылка на картинку"
                id={'input-avatar'}
                isValid={isValid}
                error={errors.link}
            />
        </PopupWithForm>
    )
}

export default EditAvatarPopup