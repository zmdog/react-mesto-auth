import React from 'react';
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import {CardsContext} from "../contexts/CardsContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditPlacePopup from "./EditPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import {FetchingContext} from "../contexts/FetchingContext";
import {apiAuthorization} from "../utils/apiAuthorization";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import Header from "./Header";

function App() {

    const [isEditAvatarPopupOpen, setPopupAvatar] = React.useState(false)
    const [isEditProfilePopupOpen, setPopupProfile] = React.useState(false)
    const [isAddPlacePopupOpen, setPopupPlace] = React.useState(false)
    const [isImagePopupOpen, setPopupImage] = React.useState(false)
    const [isDeleteCardPopupOpen, setPopupDeleteCard] = React.useState(false)
    const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false)
    const [isRegistered, setRegistered] = React.useState(false)
    const [isFetching, setFetched] = React.useState(false)
    const [loggedIn, setLoggedIn] = React.useState(false)

    const [selectedCard, setPopupCard] = React.useState({})

    const [currentUser, setUserInfo] = React.useState({})
    const [cards, setCards] = React.useState([])
    const [cardId, setCardId] = React.useState()
    const [email, setEmail] = React.useState('')


    function initialCards() {
        api.getInitialCards()
            .then((dataCards) => {
                setCards(dataCards)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleEditAvatarClick() {
        setPopupAvatar(true)
    }

    function handleTooltipClick(registered) {
        setRegistered(registered)
        setInfoTooltipPopupOpen(true)
    }

    function handleEditProfileClick() {
        setPopupProfile(true)
    }

    function handleAddPlaceClick() {
        setPopupPlace(true)
    }

    function handleCardClick(card) {
        setPopupCard({id: card._id, link: card.link, name: card.name})
        setPopupImage(true)
    }

    function handleCardLike(card, isLiked) {
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleSubmit(request) {
        setFetched(true)
        request()
            .then(closeAllPopups)
            .catch(console.error)
            .finally(() => setFetched(false))
    }

    function handleUpdateUser(data) {
        function makeRequest() {
            return api.setInfoProfile(data).then(res => setUserInfo(res))
        }

        handleSubmit(makeRequest)
    }

    function handleUpdateAvatar(data) {
        function makeRequest() {
            return api.setInfoAvatar(data).then(res => setUserInfo(res))
        }

        handleSubmit(makeRequest)
    }

    function handleDeleteCard(cardId) {
        setCardId(cardId)
        setPopupDeleteCard(true)
    }

    function postCard(data) {
        function makeRequest() {
            return api.postCard(data).then(res => setCards([res, ...cards]))
        }

        handleSubmit(makeRequest)
    }

    function closeAllPopups() {
        setPopupAvatar(false)
        setPopupProfile(false)
        setPopupPlace(false)
        setPopupImage(false)
        setPopupCard({})
        setPopupDeleteCard(false)
        setInfoTooltipPopupOpen(false)
    }

    function deleteCard() {
        function makeRequest() {

            return api.deleteCard(cardId).then(() =>
                setCards((state) =>
                    state.filter((item) => item._id !== cardId)))
        }

        handleSubmit(makeRequest)
    }

    React.useEffect(() => {
        api.getInfoProfile().then(info => setUserInfo(info))
            .catch(err => console.log(err))
    }, [isEditProfilePopupOpen])
    React.useEffect(() => {
        initialCards()
    }, [])
    React.useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            apiAuthorization.validationToken(localStorage.getItem('token'))
                .then(res => {
                    setEmail(res.data.email)
                })
                .finally(() => {
                    setLoggedIn(true)
                })
                .catch(err => console.log(err))
        }
    }, [localStorage.getItem('token')])


    return (
        <CurrentUserContext.Provider
            value={{currentUser: currentUser, email: email, isLoggedIn: loggedIn, isRegistered: isRegistered}}>
            <FetchingContext.Provider value={isFetching}>
                <BrowserRouter>
                    <div className="page">
                        <Routes>
                            <Route exact path='/' element={
                                <Header
                                    setEmail={setEmail}
                                    onLoggedIn={setLoggedIn}
                                    buttonLabel={'Выйти'}
                                    path={'/sign-in'}
                                />
                            }/>
                            <Route exact path='/sign-up' element={
                                <Header
                                    setEmail={setEmail}
                                    onLoggedIn={setLoggedIn}
                                    buttonLabel={'Войти'}
                                    path={'/sign-in'}
                                />}/>
                            <Route exact path='/sign-in' element={
                                <Header
                                    setEmail={setEmail}
                                    onLoggedIn={setLoggedIn}
                                    buttonLabel={'Регистрация'}
                                    path={'/sign-up'}
                                />}/>
                        </Routes>
                        <CardsContext.Provider value={cards}>
                            <Main
                                onLoggedIn={setLoggedIn}
                                onEditAvatar={handleEditAvatarClick}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onCardClick={handleCardClick}
                                onLikeClick={handleCardLike}
                                onCardDelete={handleDeleteCard}
                                onTooltipClick={handleTooltipClick}
                            />
                        </CardsContext.Provider>
                        <EditAvatarPopup
                            onUpdateAvatar={handleUpdateAvatar}
                            isOpen={isEditAvatarPopupOpen}
                            onClose={closeAllPopups}
                        />
                        <EditProfilePopup
                            onUpdateUser={handleUpdateUser}
                            isOpen={isEditProfilePopupOpen}
                            onClose={closeAllPopups}
                        />
                        <EditPlacePopup
                            onPostCard={postCard}
                            isOpen={isAddPlacePopupOpen}
                            onClose={closeAllPopups}
                        />
                        <DeleteCardPopup
                            onDeleteCard={deleteCard}
                            isOpen={isDeleteCardPopupOpen}
                            onClose={closeAllPopups}
                        />
                        <ImagePopup
                            onClose={closeAllPopups}
                            card={selectedCard}
                            isOpen={isImagePopupOpen}
                        />
                        <InfoTooltip
                            onClose={closeAllPopups}
                            isOpen={isInfoTooltipPopupOpen}
                        />
                        <Footer/>
                    </div>
                </BrowserRouter>
            </FetchingContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;
