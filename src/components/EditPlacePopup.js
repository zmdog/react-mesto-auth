import React from "react";
import PopupWithForm from "./PopupWithForm";
import {useFormAndValidation} from "../hooks/useFormAndValidation";
import Input from "./Input";

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
            <Input
                value={values.name}
                type={'text'}
                onChange={handleChange}
                name={'name'}
                placeholder="Название"
                id={'input-place'}
                length={{min: 2, max: 30}}
                isValid={isValid}
                error={errors.name}
            />
            <Input
                value={values.link}
                type={'url'}
                onChange={handleChange}
                name={'link'}
                placeholder="Ссылка на картинку"
                id={'input-link'}
                isValid={isValid}
                error={errors.link}
            />
        </PopupWithForm>
    )
}

export default EditProfilePopup