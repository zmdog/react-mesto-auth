class Api {
    constructor(options) {
        this._options = options
        this._profileAvatarEndpoint = options.profileAvatarEndpoint
        this._baseUrl = options.baseUrl
        this._cardsEndpoint = options.cardsEndpoint
        this._profileInfoEndpoint = options.profileInfoEndpoint

    }

    _request(endpoint, options) {
        return fetch(`${this._baseUrl}${endpoint}`, options).then(this._getResponseData)
    }

    getInitialCards() {
        return this._request(this._cardsEndpoint, {headers: this._options.headers})
    }

    getInfoProfile() {
        return this._request(this._profileInfoEndpoint, {headers: this._options.headers})
    }

    changeLikeCardStatus(id, isLiked) {
        const endpoint = `${this._cardsEndpoint}/${id}/likes`
        const header = this._options.headers
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
            headers: this._options.headers})
    }

    postCard(data) {

        return this._request(this._cardsEndpoint, {
            method: 'POST',
            headers: this._options.headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })})
    }

    setInfoProfile(data) {
        return this._request(this._profileInfoEndpoint, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                name: data.name,
                about: data.status
            })})
    }

    setInfoAvatar(data) {
        return this._request(this._profileAvatarEndpoint, {
            method: 'PATCH',
            headers: this._options.headers,
            body: JSON.stringify({
                avatar: data.link
            })})
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json()
        }

        return Promise.reject(`Ошибка: ${res.status}`);
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