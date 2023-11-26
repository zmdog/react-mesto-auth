export class BaseApi {

    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }


    _request(endpoint, params) {

        return fetch(`${this._baseUrl}${endpoint}`, params).then(this._getResponseData);
    }

    _getResponseData(res) {
        return res.ok
            ? res.json()
            : Promise.reject(`Ошибка: ${res.status}`)

    }
}