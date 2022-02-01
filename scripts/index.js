import { initialCards, config } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//Popups modal windows

const editProfileModal = document.querySelector(".popup_content_profile");
const addCardModal = document.querySelector(".popup_content_card");

const editForm = editProfileModal.querySelector(".popup__form-name");
const addCardForm = addCardModal.querySelector(".popup__form-card");

//Buttons
const editProfileOpenButton = document.querySelector(".profile__edit-button");
const addCardOpenButton = document.querySelector(".profile__add-button");

const addCardCloseButton = addCardModal.querySelector(".popup__btn_close");
const btnCloseEditProfile = editProfileModal.querySelector(".popup__btn_close");

const profileName = document.querySelector(".profile__user-name");
const profileDesc = document.querySelector(".profile__user-description");

//Form data
const nameInput = editForm.querySelector(".popup__input_type_name");
const jobInput = editForm.querySelector(".popup__input_type_description");

const placeInput = addCardForm.querySelector(".popup__input_type_place");
const urlInput = addCardForm.querySelector(".popup__input_type_link");

const ESC = "Escape";
const elements = document.querySelector(".photo-grid__list");

const editProfileForm = editProfileModal.querySelector(".popup__form");
const addProfileForm = addCardModal.querySelector(".popup__form");

// фунцкия создания карточки
function createCard(item) {
  const card = new Card(item, ".photo__template");
  return card.renderCard();
}

// первичная загрузка карточек из constants.js
initialCards.forEach((item) => {
  elements.append(createCard(item));
});

//функция закрытия по оверлей

const closeWithOverlay = function (evt) {
  const openedPopup = document.querySelector(".popup_opened");
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
};

editProfileOpenButton.addEventListener("click", () => {
  openPopup(editProfileModal);

  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
});

btnCloseEditProfile.addEventListener("click", () => {
  closePopup(editProfileModal);
});

addCardOpenButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

addCardCloseButton.addEventListener("click", () => {
  closePopup(addCardModal);
});

editForm.addEventListener("submit", handleProfileFormSubmit);

// Функция закрытия по кнопке Escape
const setEscListener = function (evt) {
  if (evt.key === ESC) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", setEscListener);
  document.addEventListener("mousedown", closeWithOverlay);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", setEscListener);
  document.removeEventListener("mousedown", closeWithOverlay);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;

  closePopup(editProfileModal);
}

addCardModal.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCard = {
    name: placeInput.value,
    link: urlInput.value,
  };

  elements.prepend(createCard(newCard));
  addCardForm.reset();
  closePopup(addCardModal);
});

const formEditProfileValidator = new FormValidator(config, editProfileForm);
formEditProfileValidator.enableValidation();
const formAddCardValidator = new FormValidator(config, addProfileForm);
formAddCardValidator.enableValidation();
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
