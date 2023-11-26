import {BaseApi} from "./BaseApi";

class Api extends BaseApi{
    constructor(options) {
        super(options)
        this._profileAvatarEndpoint = options.profileAvatarEndpoint
        this._cardsEndpoint = options.cardsEndpoint
        this._profileInfoEndpoint = options.profileInfoEndpoint

    }

    getInitialCards() {
        return this._request(this._cardsEndpoint, {headers: this._headers})
    }

    getInfoProfile() {
        return this._request(this._profileInfoEndpoint, {headers: this._headers})
    }

    changeLikeCardStatus(id, isLiked) {
        const endpoint = `${this._cardsEndpoint}/${id}/likes`
        const header = this._headers
        if(isLiked) {
            return this._request(endpoint, {
                method: 'PUT',
                headers: header})
        }else{
            return this._request(endpoint, {
                method: 'DELETE',
                headers: header})
        }

    }

    deleteCard(id) {
        return this._request(`${this._cardsEndpoint}/${id}`, {
            method: 'DELETE',
            headers: this._headers})
    }

    postCard(data) {

        return this._request(this._cardsEndpoint, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })})
    }

    setInfoProfile(data) {
        return this._request(this._profileInfoEndpoint, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.status
            })})
    }

    setInfoAvatar(data) {
        return this._request(this._profileAvatarEndpoint, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.link
            })})
    }

}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-73',
    cardsEndpoint: '/cards',
    profileInfoEndpoint: '/users/me',
    profileAvatarEndpoint: '/users/me/avatar',
    headers: {
        authorization: '94ec7d81-a68f-476c-85b4-29b28770f78f',
        'Content-Type': 'application/json'
    }
});