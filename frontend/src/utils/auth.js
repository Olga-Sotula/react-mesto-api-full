import BASE_URL from "./constants";

class Auth {
  constructor({baseUrl}){
    this._url = baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  sign = (password, email, endpoint) => {
    return fetch(`${this._url}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then((res) => {
      return this._handleResponse(res);
    })
  };

  checkToken = (jwt) => {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${jwt}`
      }
    })
    .then((res) => {
      return this._handleResponse(res);
    })
  };
}

const auth = new Auth({
  baseUrl: BASE_URL,
});

export default auth;
