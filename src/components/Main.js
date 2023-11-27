import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CardsContext} from "../contexts/CardsContext";

function Main({
                  handleEditAvatarClick,
                  handleEditProfileClick,
                  handleAddPlaceClick,
                  handleDeleteCard,
                  handleCardClick,
                  handleCardLike,
                  Card
}) {
    const currentUser = React.useContext(CurrentUserContext).currentUser
    const cards = React.useContext(CardsContext)


    return (
        <>
            <section className="profile" aria-label="Шапка профиля">
                <button
                    onClick={handleEditAvatarClick}
                    className=" button profile__change-button">
                    <img className="profile__avatar" src={currentUser.avatar}
                         alt="Иконка профиля"/>
                </button>
                <div className="profile__info">
                    <div className="profile__wrapper">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            onClick={handleEditProfileClick}
                            title="Изменить имя и статус профиля"
                            aria-label="Изменить имя и статус профиля"
                            type="button"
                            className="button profile__edit-button"
                        ></button>
                    </div>
                    <p className="profile__status">{currentUser.about}</p>
                </div>
                <button
                    onClick={handleAddPlaceClick}
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
                                onCardDelete={handleDeleteCard}
                                onCardClick={handleCardClick}
                                onLikeClick={handleCardLike}
                                card={card}
                            />
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default Main;