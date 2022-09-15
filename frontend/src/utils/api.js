import BASE_URL from "./constants";

class Api {
  constructor(baseUrl) {
    this._url = baseUrl;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        return this._handleResponse(res)
      })
  }

  updateUserProfile(profile, token) {
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      })
      .then((res) => {
        return this._handleResponse(res);
      })
  }

  setUserAvatar(url, token) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: url
        })
      })
      .then((res) => {
        return this._handleResponse(res);
      })
  }

  getCards(token) {
    return fetch(`${this._url}/cards`, {
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        return this._handleResponse(res);
      })
  }

  addCard(card, token) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(card)
      })
      .then((res) => {
        return this._handleResponse(res);
      })
  }

  changeLikeCardStatus(id, isLiked, token) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return this.updateLike(id, method, token);
  }

  updateLike(id, method, token) {
    return fetch(`${this._url}/cards/${id}/likes`, {
        method: method,
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        return this._handleResponse(res);
      })
  }

  deleteCard(id, token) {
    return fetch(`${this._url}/cards/${id}`, {
        method: 'DELETE',
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        return this._handleResponse(res);
      })
  }
}

const api = new Api(BASE_URL);

export default api;
