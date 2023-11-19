import {useNavigate} from "react-router-dom";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Header({path, onLoggedIn, buttonLabel, setEmail}) {
    const navigate = new useNavigate()
    const email = React.useContext(CurrentUserContext).email
    const isLoggedIn = React.useContext(CurrentUserContext).isLoggedIn
    const [topBar, setTopBar] = React.useState(false)

    function handleAuth() {
        if (isLoggedIn) {
            localStorage.removeItem('token')
            setEmail('')
            setTopBar(false)
            onLoggedIn(false)
        }
        navigate(path, {replace: true})
    }

    function handleOpenTopBar() {
        if (topBar) setTopBar(false)
        else setTopBar(true)
    }

    return (
        <header className="header">
            <div className={`header__wrapper-bar header__wrapper-bar${topBar && isLoggedIn ? '_visible' : ''}`}>
                {
                    isLoggedIn && <>
                        <p className={`visible header__email`}>{email}</p>
                        <button onClick={handleAuth} className={`button visible header__button-auth
                header__button-auth_width-400`}>
                            {buttonLabel}
                        </button>
                    </>}
            </div>
            <div className={'header__container'}>
                <div className={'header__wrapper-logo'}>
                    <div className="header__logo"/>
                </div>
                <div className={'header__info'}>
                    {isLoggedIn && <p className={`header__email`}>{email}</p>}
                    <button onClick={handleAuth}
                            className={`button header__button-auth header__button-auth ${!isLoggedIn && 'visible'}`}>
                        {buttonLabel}
                    </button>
                </div>
                {isLoggedIn && <button onClick={handleOpenTopBar}
                                       className={`button header__button-menu header__button-menu_${topBar ? 'opened' : 'closed'}`}/>}
            </div>
        </header>

    )
}

export default Header