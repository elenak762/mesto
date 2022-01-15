import { initialCards } from "./initialCards.js";
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//Popups modal windows

const editProfileModal = document.querySelector(".popup_content_profile");
const addCardModal = document.querySelector(".popup_content_card");
const imageModal = document.querySelector(".popup_content_image");

const editForm = editProfileModal.querySelector(".popup__form-name");
const addCardForm = addCardModal.querySelector(".popup__form-card");

//Buttons
const editProfileOpenButton = document.querySelector(".profile__edit-button");
const addCardOpenButton = document.querySelector(".profile__add-button");

const addCardCloseButton = addCardModal.querySelector(".popup__btn_close");
const editProfileCloseButton =
  editProfileModal.querySelector(".popup__btn_close");
const imageModalCloseButton = imageModal.querySelector(".popup__btn_close");

const submitPopupButton = document.querySelector(".popup__btn_submit");

const profileName = document.querySelector(".profile__user-name");
const profileDesc = document.querySelector(".profile__user-description");

//Form data
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");

const placeInput = addCardForm.querySelector(".popup__input_type_place");
const urlInput = addCardForm.querySelector(".popup__input_type_link");

const imageModalCaption = imageModal.querySelector(".figure__caption");
const imageModalImg = imageModal.querySelector(".figure__image");

const esc = "Escape";

//функция закрытия по оверлей

editProfileModal.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__btn_close")
  ) {
    closePopup(editProfileModal);
  }
});

addCardModal.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__btn_close")
  ) {
    closePopup(addCardModal);
  }
});

imageModal.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__btn_close")
  ) {
    closePopup(imageModal);
  }
});

//Template
const cardTemplate = document
  .querySelector(".photo__template")
  .content.querySelector(".card");
const elements = document.querySelector(".photo-grid__list");

editProfileOpenButton.addEventListener("click", () => {
  openPopup(editProfileModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
});

editProfileCloseButton.addEventListener("click", () => {
  closePopup(editProfileModal);
});

addCardOpenButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

addCardCloseButton.addEventListener("click", () => {
  closePopup(addCardModal);
});

imageModalCloseButton.addEventListener("click", () => {
  closePopup(imageModal);
});

editForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", addCardSubmitHandler);

function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true); //тру чтобы все входяшиее элементы сохранились
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__btn_action_like");
  const cardDeleteButton = cardElement.querySelector(".card__btn_action_del");

  // событие лайка
  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__btn_cliked");
  });
  // событие удаления
  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // popup big image
  cardImage.addEventListener("click", function () {
    imageModalCaption.textContent = data.name;
    imageModalImg.src = data.link;
    imageModalImg.alt = "Фотография";
    openPopup(imageModal);
  });

  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = "Фотография";

  return cardElement;
}

function renderCard(data) {
  elements.prepend(createCard(data));
}

initialCards.forEach((data) => {
  renderCard(data);
});

// Функция закрытия по кнопке Escape
const setEscListener = function (evt) {
  if (evt.key === esc) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", setEscListener);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", setEscListener);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closePopup(editProfileModal);
}

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  renderCard({ name: placeInput.value, link: urlInput.value });
  closePopup(addCardModal);
  addCardForm.reset();
  disableSubmitButton(buttonElement, inactiveButtonClass);
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
