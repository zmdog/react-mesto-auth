import {BaseApi} from "./BaseApi";

class ApiAuthorization extends BaseApi{

    constructor(options) {
        super(options)
        this._registrationEndpoint = options.registrationEndpoint
        this._loginEndpoint = options.loginEndpoint
        this._profileEndpoint = options.profileEndpoint
    }

    signUp(password, email) {
        return this._request(this._registrationEndpoint, {
            headers: this._headers,
            body: JSON.stringify({
                password: password,
                email: email
            }),
            method: 'POST'
        })
    }

    signIn(password, email) {
        return this._request(this._loginEndpoint, {
            headers: this._headers,
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