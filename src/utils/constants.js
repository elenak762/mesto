export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn_submit",
  inactiveButtonClass: "popup__btn_submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error-visible",
};

export const editButton = document.querySelector(".profile__edit-button");
export const addButton = document.querySelector(".profile__add-button");
export const avaButton = document.querySelector(".profile__container-img");
export const editForm = document.querySelector(".popup__form-name");
export const addCardForm = document.querySelector(".popup__form-card");
export const avatarForm = document.querySelector(".popup__form-avatar");

export const elements = document.querySelector(".photo-grid__list");
export const popupData = {
  buttonClose: ".popup__btn_close",
  openedClass: ".popup_opened",
};

export const popupSelectors = {
  viewCard: ".popup_image",
  createCard: ".popup_card",
  editProfile: ".popup_profile",
  changeAvatar: ".popup_avatar",
  confirm: ".popup_confirm",
};

export const imageData = {
  imageSelector: ".figure__image",
  captionSelector: ".figure__caption",
};

export const renderItems = ".profile__edit-button";
export const btnNewCardSelector = ".profile__add-button";

export const formData = {
  form: config.formSelector,
  input: config.inputSelector,
};

export const cardTemplateSelector = ".photo__template";

export const titleField = document.querySelector(".popup__input_type_name");
export const descriptionField = document.querySelector(
  ".popup__input_type_description"
);
export const popupAvatarButton = document.querySelector(".profile__avatar");
export const profileName = document.querySelector(".profile__user-name");
export const profileDescription = document.querySelector(
  ".profile__user-description"
);
export const profileAvatar = document.querySelector(".profile__avatar");
