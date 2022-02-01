import { openPopup } from "./index.js";

const imageModal = document.querySelector(".popup_content_image");
const imageModalCaption = imageModal.querySelector(".figure__caption");
const imageModalImg = imageModal.querySelector(".figure__image");
const imageModalCloseButton = imageModal.querySelector(".popup__btn_close");

class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._card = this._element.querySelector(".card__image");
    this._card.src = this._link;
    this._card.alt = this._name;
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
        this._element = null;
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
    this._card.addEventListener("click", () => {
      this._openImage();
    });
  }

  _deleteCardBtn() {
    this._element.remove(); // удаляем элемент из DOM
  }

  // метод открытия попапа с карточкой
  _openImage() {
    openPopup(imageModal); // функция открытия попапа с карточкой
    imageModalImg.src = this._link; // само фото
    imageModalImg.alt = this._name; // альт фото
    imageModalCaption.textContent = this._name; // заголовок
    imageModalCloseButton.addEventListener("click", () => {
      closePopup(imageModal);
    });
  }
}
export { Card };
