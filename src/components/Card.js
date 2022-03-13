class Card {
  constructor(
    data,
    currentUserId,
    cardSelector,
    { handleCardClick, handleDeleteCardClick, handleLikeClick }
  ) {
    this._name = data.name; // название/тайтл карточки
    this._link = data.link; // сыылка на изображение
    this._likes = data.likes ?? []; // лайки карточек, если их нет при загрузке применять правую часть, пустой массив
    this._cardId = data._id; // id карточки
    this._ownerId = data.owner._id; // id владельца юзера добавившего эту карточку
    this._currentUserId = currentUserId; // текущий пользватель
    this._alt = data.name; // альт карточки
    this._cardSelector = cardSelector; // селектор карточки
    this._handleCardClick = handleCardClick; // открыть карточку, попап
    this._handleDeleteCardClick = handleDeleteCardClick; // удаление карточки
    this._handleLikeClick = handleLikeClick; // лайк карточки
    this._element = this._getTemplate(); // Запишем разметку в поле _element
    this._cardImage = this._element.querySelector(".card__image"); // картинка по селектору
    this._likeButton = this._element.querySelector(".card__btn_cliked"); // кнопка лайка по селектору
    this._deleteButton = this._element.querySelector(".card__btn_action_del"); // кнопка удаления карточки
    this._likeCount = this._element.querySelector(".card__like-count"); // счетчик лайков
  }

  // метод _getTemplate - вернем разметку из template-элемента
  _getTemplate() {
    return document
      .querySelector(this._cardSelector) // забираем разметку из HTML и клонируем элемент
      .content.querySelector(".card")
      .cloneNode(true);
  }

  //  метод renderCard - подготовит карточку к публикации
  renderCard() {
    // Добавим данные
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._setEventListeners(); // добавляем обработчик
    this._handleCardDeleteVisible(); // кнопка удаления
    this.updateLikes(); // количество лайков

    // Вернём элемент наружу
    return this._element;
  }

  // метод добавления слушателя
  _setEventListeners() {
    // Удаление карточки
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCardClick(this);
    });

    // Лайк карточки
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    // Открытие попапа карточки
    this._cardImage.addEventListener("click", () => {
      this._openPopupWithImage();
    });
  }

  // проверяем есть ли лайки
  ifLiked() {
    return this._likes.some((like) => like.id === this._currentUserId);
  }

  // обновляем лайки карточек
  updateLikes() {
    this._likeCounter.textContent = this._likes.length;
    if (this.ifLiked()) {
      this._likeButton.classList.add("card__btn_action_like");
    } else {
      this._likeButton.classList.remove("card__btn_action_like");
    }
  }

  // метод установки лайков
  setLikesInfo(likes) {
    this._likes = likes;
    this.updateLikes();
  }
  // открытие попапа с карточкой
  _openPopupWithImage() {
    this._handleCardClick(this._name, this._link);
  }

  // проверям моя ли карточка и если да то показываем кнопку удаления
  _handleCardDeleteVisible() {
    if (this._ownerId === this._currentUserId) {
      this._deleteButton.classList.add("card__btn_visible_del");
    } else {
      this._deleteButton.classList.remove("card__btn_visible_del");
    }
  }

  // метод удаления карточки
  deleteCard() {
    this._element.remove(); // удаляем элемент из DOM
    this._element = null;
  }

  // id карточки
  cardId() {
    return this._cardId;
  }
}
export { Card };
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/* export default class Card {
  constructor(
    { data, handleCardClick, handleLike, handleDelete },
    templateSelector,
    cardSelector
  ) {
    this._templateSelector = templateSelector;
    this._className = cardSelector;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._isLiked = false;
    this._owner = data.owner;
    this._id = data.id;
    this._handleViewEvent = handleCardClick;
    this._handleLikeEvent = handleLike;
    this._handleDeleteEvent = handleDelete;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(this._className)
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    const data = { title: this._name, link: this._link };
    this._likeBtn.addEventListener("click", () => this._handleLikeEvent(this));
    this._delBtn.addEventListener("click", () => this._handleDeleteEvent(this));
    this._image.addEventListener("click", () => this._handleViewEvent(data));
  }

  _setLikeButton() {
    this._likeBtn.classList.add(".card__btn_action_like");
  }

  unsetLikeButton() {
    this._likeBtn.classList.remove(".card__btn_action_like");
  }

  delete() {
    this._element.remove();
    this._element = null;
  }

  setLikes(likes) {
    this._likes = likes;
  }

  getCardId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  setLikeGroup(userId) {
    this._isLiked = this._likes.some((user) => user.id === userId);
    this._numLikes.textContent = String(this._likes.length);
    if (this._likes.length) this._setLikeButton();
    else this._unsetLikeButton();
  }

  createCard(userId) {
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector(".card__btn_cliked");
    this._delBtn = this._element.querySelector(".card__btn_action_del");
    this._image = this._element.querySelector(".card__image");
    this._numLikes = this._element.querySelector(".card__like-count");
    this._setEventListeners();

    // Разбираемся с лайками
    this.setLikeGroup(userId);

    const isMine = this._owner === userId;
    this._delBtn.disabled = !isMine;
    this._delBtn.hidden = !isMine;

    this._image.src = this._link;
    this._image.alt = this._name;
    return this._element;
  }
} */
