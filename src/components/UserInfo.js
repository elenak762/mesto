/* export class UserInfo {
  constructor({ profileName, profileDesc }) {
    this._profileName = profileName;
    this._profileDesc = profileDesc;
  }

  // метод getUserInfo, который возвращает(получает) объект с данными пользователя
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileDesc.textContent,
    };
  }

  // метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(name, description) {
    this._profileName.textContent = name;
    this._profileDesc.textContent = description;
  }
}
 */
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export class UserInfo {
  constructor({ nameSelector, infoSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  // метод getUserInfo, который возвращает(получает) объект с данными пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
    };
  }

  // метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(item) {
    this._name.textContent = item.name;
    this._info.textContent = item.info;
  }

  setUserAvatar(item) {
    this._avatar.src = item.avatar;
  }

  /*   setUserId(id) {
    this._userId = id;
  } */
}
