import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onLikeClick, onCardDelete}) {
    const userInfo = React.useContext(CurrentUserContext).currentUser
    const isOwn = card.owner._id === userInfo._id;
    const isLiked = card.likes.some(elem => elem._id === userInfo._id);

    function handleClick() {
        onCardClick(card);
    }

    function handleDeleteCard() {
        onCardDelete(card._id)
    }


    if (card) {
        return (
            <article className="element">
                {isOwn && <button aria-label={`Удалить ${card.name}`} onClick={handleDeleteCard} type="button"
                                  className="button element__delete"/>}
                <img onClick={handleClick} src={card.link} className="element__photo" alt={`Фото: ${card.name}`}/>
                <div className="element__label">
                    <h2 className="element__title">{card.name}</h2>
                    <div className="element__group">
                        <button aria-label="" onClick={() => onLikeClick(card, isLiked)} type="button"
                                className={`button element__like ${isLiked && 'element__like_active'}`}/>
                        <p className="element__counter_like">{card.likes.length}</p>
                    </div>
                </div>
            </article>
        );
    }
}

export default Card;