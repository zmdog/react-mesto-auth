import React from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CardsContext} from "../contexts/CardsContext";
import {Route, Routes} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";

function Main({
                  onCardClick,
                  onLoggedIn,
                  onEditAvatar,
                  onEditProfile,
                  onTooltipClick,
                  onAddPlace,
                  onLikeClick,
                  onCardDelete
              }) {
    const userInfo = React.useContext(CurrentUserContext).currentUser
    const cards = React.useContext(CardsContext)

    return (
        <main className="content">
            <Routes>
                <Route exact path='/' element={<ProtectedRoute element={() => {
                    return (
                        <>
                            <section className="profile" aria-label="Шапка профиля">
                                <button
                                    onClick={onEditAvatar}
                                    className=" button profile__change-button">
                                    <img className="profile__avatar" src={userInfo.avatar} alt="Иконка профиля"/>
                                </button>
                                <div className="profile__info">
                                    <div className="profile__wrapper">
                                        <h1 className="profile__name">{userInfo.name}</h1>
                                        <button
                                            onClick={onEditProfile}
                                            title="Изменить имя и статус профиля"
                                            aria-label="Изменить имя и статус профиля"
                                            type="button"
                                            className="button profile__edit-button"
                                        ></button>
                                    </div>
                                    <p className="profile__status">{userInfo.about}</p>
                                </div>
                                <button
                                    onClick={onAddPlace}
                                    title="Добавить новое Место"
                                    aria-label="Добавить новое Место"
                                    type="button"
                                    className="button profile__add-button"
                                ></button>
                            </section>
                            <section className="elements" aria-label="Места для посещения">
                                <ul className="elements__elements-grid">
                                    {cards.map(card => (
                                        <li key={card._id} className="wrapper-element">
                                            <Card
                                                onCardDelete={onCardDelete}
                                                onCardClick={onCardClick}
                                                onLikeClick={onLikeClick}
                                                card={card}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </>
                    )
                }}/>}/>
                <Route exact path='/sign-up' element={<Register onTooltipClick={onTooltipClick}/>}/>
                <Route exact path='/sign-in' element={<Login onLoggedIn={onLoggedIn}/>}/>
            </Routes>
        </main>
    );
}

export default Main;