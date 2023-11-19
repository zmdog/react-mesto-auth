import Authorization from "./Authorization";
import React from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {apiAuthorization} from "../utils/apiAuthorization";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Login({onLoggedIn}) {
    const navigate = useNavigate();
    const isLoggedIn = React.useContext(CurrentUserContext).isLoggedIn

    function handleLoggedIn(password, email) {
        apiAuthorization.signIn(password, email)
            .then(res => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    onLoggedIn(true)
                    navigate('/', {replace: true})
                }
            })
            .catch(err => console.log(err))
    }

    return (
        isLoggedIn ? <Navigate to="/" replace/> :
            <Authorization
                onSubmit={handleLoggedIn}
                title={`Вход`}
                label={`Войти`}
                name={`login`}
            >
                <p className={`authorization__redirect`}>Еще нет профиля? <Link
                    className={`button authorization__redirect`} to={`/sign-up`}>Зарегистрироваться</Link></p>
            </Authorization>
    );
}

export default Login;