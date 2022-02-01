import { initialCards, config } from "./constants.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//Popups modal windows

const editProfileModal = document.querySelector(".popup_content_profile");
const addCardModal = document.querySelector(".popup_content_card");
export const imageModal = document.querySelector(".popup_content_image");

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

export const imageModalCaption = imageModal.querySelector(".figure__caption");
export const imageModalImg = imageModal.querySelector(".figure__image");

const esc = "Escape";
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

function closeWithOverlay(popup) {
  popup.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("popup") ||
      e.target.classList.contains("popup__btn_close")
    ) {
      closePopup(popup);
    }
  });
}

closeWithOverlay(editProfileModal);
closeWithOverlay(addCardModal);
closeWithOverlay(imageModal);

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

// Функция закрытия по кнопке Escape
const setEscListener = function (evt) {
  if (evt.key === esc) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};
export function openPopup(popup) {
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

addCardModal.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCard = {
    name: placeInput.value,
    link: urlInput.value,
    alt: placeInput.value,
  };

  elements.prepend(createCard(newCard));
  closePopup(addCardModal);
  formAddCardValidator.disableSubmitButton();
});
const formEditProfileValidator = new FormValidator(config, editProfileForm);
formEditProfileValidator.enableValidation();
const formAddCardValidator = new FormValidator(config, addProfileForm);
formAddCardValidator.enableValidation();
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
