import React from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {useFormAndValidation} from "../hooks/useFormAndValidation";
import Input from "./Input";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const {values, handleChange, errors, isValid, resetForm} = useFormAndValidation(true)
    const currentUser = React.useContext(CurrentUserContext).currentUser;


    React.useEffect(() => {
        resetForm({'status': currentUser.about, 'name': currentUser.name}, {}, true)
    }, [isOpen])

    function handleOnSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name: values.name,
            status: values.status,
        });
    }

    return (
        <PopupWithForm
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleOnSubmit}
            title={'Редактировать профиль'}
            name={'profile'}
            label={'Сохранить изменения'}
            isActive={isValid}
        >

            <Input
                value={values.name}
                type={'text'}
                onChange={handleChange}
                name={'name'}
                id={'input-name'}
                length={{min: 2, max: 40}}
                isValid={isValid}
                error={errors.name}
            />
            <Input
                value={values.status}
                type={'text'}
                onChange={handleChange}
                name={'status'}
                id={'input-status'}
                length={{min: 2, max: 200}}
                isValid={isValid}
                error={errors.status}
            />
        </PopupWithForm>
    )
}

export default EditProfilePopup