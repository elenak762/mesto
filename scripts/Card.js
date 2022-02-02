import { openPopup, imageModal } from "./index.js";

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._cardSelector = cardSelector;
    this._imageModal = imageModal;
    this._imageModalCaption =
      this._imageModal.querySelector(".figure__caption");
    this._imageModalImg = this._imageModal.querySelector(".figure__image");
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
    // Запишем разметку в поле _element.
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__btn_cliked");
    //this._cardImage = this._element.querySelector(".card__image");
    // Добавим данные
    this._cardImage = this._element.querySelector(".card__image");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;
    this._setEventListeners(); // добавляем обработчик

    // Вернём элемент наружу
    return this._element;
  }

  // метод лайка карточки
  _handlelikeButton() {
    this._likeButton.classList.toggle("card__btn_action_like"); // при каждом нажатии меняется класс
  }
  // метод добавления слушателя
  _setEventListeners() {
    // Удаление карточки
    // Находим селектор кнопки удаления
    // Вешаем событие клика
    // Возвращаем метод _deleteCard
    this._element
      .querySelector(".card__btn_action_del")
      .addEventListener("click", () => {
        this._deleteCardBtn();
      });

    // Лайк карточки
    // Находим селектор кнопки лайка
    // Вешаем событие клика
    // Возвращаем метод _handlelikeButton

    this._likeButton.addEventListener("click", () => {
      this._handlelikeButton();
    });

    // Открытие попапа карточки
    // Находим селектор карточки
    // Вешаем событие клика
    // Возвращаем метод _openImage
    this._cardImage.addEventListener("click", () => {
      this._openImage();
    });
  }

  _deleteCardBtn() {
    this._element.remove(); // удаляем элемент из DOM
    this._element = null;
  }

  // метод открытия попапа с карточкой
  _openImage() {
    openPopup(imageModal); // функция открытия попапа с карточкой
    this._imageModalImg.src = this._link; // само фото
    this._imageModalImg.alt = this._name; // альт фото
    this._imageModalCaption.textContent = this._name; // заголовок
  }
}
export { Card };
