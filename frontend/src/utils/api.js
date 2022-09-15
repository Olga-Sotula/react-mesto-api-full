import BASE_URL from "./constants";

class Api {
  constructor(baseUrl, groupId, header) {
    this._url = `${baseUrl}/${groupId}`;
    this._header = header;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
        headers: this._header
      })
      .then(this._handleResponse)
  }

  updateUserProfile(profile) {
    return fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: this._header,
        body: JSON.stringify(profile)
      })
      .then((res) => {
        return this._handleResponse(res);
      })
  }

  setUserAvatar(url) {
    return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._header,
        body: JSON.stringify({
          avatar: url
        })
      })
      .then((res) => {
        return this._handleResponse(res);
      })
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
        headers: this._header
      })
      .then((res) => {
        return this._handleResponse(res);
      })
  }

  addCard(card) {
    return fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: this._header,
        body: JSON.stringify(card)
      })
      .then((res) => {
        return this._handleResponse(res);
      })
  }

  changeLikeCardStatus(id, isLiked) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return this.updateLike(id, method);
  }

  updateLike(id, method) {
    return fetch(`${this._url}/cards/${id}/likes`, {
        method: method,
        headers: this._header
      })
      .then((res) => {
        return this._handleResponse(res);
      })
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
        method: 'DELETE',
        headers: this._header
      })
      .then((res) => {
        return this._handleResponse(res);
      })
  }
}

const api = new Api(
  BASE_URL,
  'cohort-43',
  {
    'authorization': 'WJDBMRp7RN6wN9NAstRruCdDg8MTkNer',
    'Content-Type': 'application/json'
  });

export default api;
