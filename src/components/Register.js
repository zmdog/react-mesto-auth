import Authorization from "./Authorization";
import React from "react";
import {useNavigate, Link, Navigate} from "react-router-dom";
import {apiAuthorization} from "../utils/apiAuthorization";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Registration({onTooltipClick}) {
    const navigate = useNavigate();
    const isLoggedIn = React.useContext(CurrentUserContext).isLoggedIn

    function handleSubmit(password, email) {

        apiAuthorization.signUp(password, email)
            .then(() => {
                onTooltipClick(true)
                navigate('/sign-in', {replace: true})
            })
            .catch(err => {
                onTooltipClick(false)
                console.log(err)
            })
    }

    return (
        isLoggedIn ? <Navigate to="/" replace/> :
            <Authorization
                onSubmit={handleSubmit}
                title={`Регистрация`}
                label={`Зарегистрироваться`}
                name={`registration`}
            >
                <p className={`authorization__redirect`}>Уже зарегистрированы? <Link
                    className={`button authorization__redirect`} to={`/sign-in`}>Войти</Link></p>
            </Authorization>
    );
}

export default Registration;