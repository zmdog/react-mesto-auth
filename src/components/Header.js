import {Routes, Route, Link} from "react-router-dom";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Header({onLoggedIn, setEmail}) {
    const email = React.useContext(CurrentUserContext).email
    const isLoggedIn = React.useContext(CurrentUserContext).isLoggedIn
    const [topBar, setTopBar] = React.useState(false)

    function handleLogOut() {
        localStorage.removeItem('token')
        setEmail('')
        setTopBar(false)
        onLoggedIn(false)

    }

    function handleOpenTopBar() {
        if (topBar) setTopBar(false)
        else setTopBar(true)
    }

    return (
        <header className="header">
            <Routes>
                <Route exact path='/' element={isLoggedIn && <div
                    className={`header__wrapper-bar header__wrapper-bar${topBar ? '_visible' : ''}`}>

                    <p className={`visible header__email`}>{email}</p>
                    <button onClick={handleLogOut}
                            className={`button visible header__button-auth header__button-auth_width-400`}>
                        Выйти
                    </button>
                </div>}/>
            </Routes>

            <div className={'header__container'}>
                <div className={'header__wrapper-logo'}>
                    <div className="header__logo"/>
                </div>
                <div className={'header__info'}>
                    {isLoggedIn && <p className={`header__email`}>{email}</p>}
                    <Routes>
                        <Route path="/sign-up" element={
                            <Link
                                className={`button header__button-auth header__button-auth ${!isLoggedIn && 'visible'}`}
                                to="/sign-in">
                                Войти
                            </Link>
                        }/>
                        <Route path="/sign-in" element={
                            <Link
                                className={`button header__button-auth header__button-auth ${!isLoggedIn && 'visible'}`}
                                to="/sign-up">
                                Регистрация
                            </Link>
                        }/>
                        <Route path="/" element={
                            <>
                                <button onClick={handleOpenTopBar}
                                        className={`button header__button-menu header__button-menu_${topBar ? 'opened' : 'closed'}`}/>
                                <button onClick={handleLogOut}
                                        className={`button header__button-auth header__button-auth ${!isLoggedIn && 'visible'}`}>
                                    Выйти
                                </button>
                            </>
                        }/>
                    </Routes>
                </div>
            </div>
        </header>

    )
}

export default Header