class ApiAuthorization {

    constructor(options) {
        this._baseUrl = options.baseUrl
        this._registrationEndpoint = options.registrationEndpoint
        this._loginEndpoint = options.loginEndpoint
        this._profileEndpoint = options.profileEndpoint
        this._options = options
    }

    _request(endpoint, options) {
        return fetch(`${this._baseUrl}${endpoint}`, options).then(this._getResponseData)
    }

    signUp(password, email) {
        return this._request(this._registrationEndpoint, {
            headers: this._options.headers,
            body: JSON.stringify({
                password: password,
                email: email
            }),
            method: 'POST'
        })
    }

    signIn(password, email) {
        return this._request(this._loginEndpoint, {
            headers: this._options.headers,
            body: JSON.stringify({
                password: password,
                email: email
            }),
            method: 'POST'
        })
    }

    validationToken(token) {
        return this._request(this._profileEndpoint, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            method: 'GET'
        })
    }

    _getResponseData(res) {
        if (res.ok) {
            return res.json()
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }


}

export const apiAuthorization = new ApiAuthorization(
    {
        baseUrl: `https://auth.nomoreparties.co`,
        registrationEndpoint: `/signup`,
        loginEndpoint: `/signin`,
        profileEndpoint: `/users/me`,
        headers: {
            "Content-Type": "application/json"
        }
    }
)