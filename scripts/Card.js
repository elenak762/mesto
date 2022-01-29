import {
  openPopup,
  imageModalCaption,
  imageModalImg,
  imageModal,
} from "index.js";

class Card {
  constructor(name, link, alt, cardSelector) {
    this._name = name;
    this._link = link;
    this._alt = alt;
    this._cardSelector = cardSelector;
  }

  // метод _getTemplate - вернем разметку из template-элемента
  _getTemplate() {
    return document
      .querySelector(this._cardSelector) // забираем разметку из HTML и клонируем элемент
      .content.querySelector(".card")
      .cloneNode(true);
  }

  // публичный метод renderCard - подготовит карточку к публикации
  renderCard() {
    // Запишем разметку в поле _element.
    this._element = this._getTemplate();
    this._likeBtnCard = this._element.querySelector(".card__btn_cliked"); //кнопка лайка по слелектору
    this._cardImage = this._element.querySelector(".card__image");
    // Добавим данные
    this._photo = this._element.querySelector(".card__image");
    this._photo.src = this._link; //изображение/фото
    this._photo.alt = this._alt;
    this._element.querySelector(".figure__caption").textContent = this._name;
    this._setEventListeners(); // добавляем обработчик

    // Вернём элемент наружу
    return this._element;
  }

  // метод добавления слушателя (отдельный)
  _setEventListeners() {
    // Удаление карточки
    // Находим селектор кнопки удаления
    // Вешаем событие клика
    // Возвращаем метод _deleteCard(ниже)
    this._element
      .querySelector(".card__btn_action_del")
      .addEventListener("click", () => {
        this._deleteCardBtn();
      });
    // Лайк карточки
    // Находим селектор кнопки лайка
    // Вешаем событие клика
    // Возвращаем метод _likeCard(ниже)
    this._likeBtnCard.addEventListener("click", () => {
      this._likeCard();
    });
  }
  // метод удаления карточки
  _deleteCard() {
    this._element.remove(); // удаляем элемент из DOM
  }
  // метод лайка карточки
  _likeCard() {
    this._likeBtnCard.classList.toggle(".card__btn_action_like"); // при каждом нажатии меняется класс
  }

  // метод открытия попапа с карточкой
  _cardImage() {
    openPopup(imageModal); // функция открытия попапа с карточкой
    imageModalImg.src = this._link; // само фото
    imageModalImg.alt = this._name; // альт фотки
    imageModalCaption.textContent = this._name; // заголовок
  }
}
export default Card;
