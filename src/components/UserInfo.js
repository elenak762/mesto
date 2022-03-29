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
  constructor({ profileName, profileDescription, profileAvatar }) {
    this._profileName = profileName;
    this._profileDescription = profileDescription;
    this._profileAvatar = profileAvatar;
  }

  // метод getUserInfo, который возвращает(получает) объект с данными пользователя
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileDescription.textContent,
    };
  }

  // метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(item) {
    this._profileName.textContent = item.name;
    this._profileDescription.textContent = item.about;
    this._profileAvatar.src = item.avatar;
  }
}
