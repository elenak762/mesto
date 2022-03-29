export default class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  //обработчик ответа
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  // получение данных профиля с сервера
  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  // метод получения карточек с сервера
  getInitalCards() {
    return fetch(`${this._address}/cards`, {
      method: "GET",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
  // добавление карточки
  postNewCard(data) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  // поменять аватар
  patchNewAvatar(item) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: item.avatar,
      }),
    }).then(this._checkResponse);
  }

  // редактирование профиля
  patchUserProfile(item) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: item.name, about: item.description }),
    }).then(this._checkResponse);
  }

  // добавление лайка
  likeCard(id) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: "PUT",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  // удаление лайка
  unlikeCard(id) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  // удаление карточки
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }
}
