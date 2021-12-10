const initialCards = [
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

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

//Popups modal windows
const popup = document.querySelector(".popup");
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

//Template
const cardTemplate = document
  .querySelector(".photo__template")
  .content.querySelector(".card");
const elements = document.querySelector(".photo-grid__list");

editProfileOpenButton.addEventListener("click", () => {
  togglePopup(editProfileModal);
  nameInput.value = profileName.textContent;
  jobInput.value = profileDesc.textContent;
});

editProfileCloseButton.addEventListener("click", () => {
  togglePopup(editProfileModal);
});

addCardOpenButton.addEventListener("click", () => {
  togglePopup(addCardModal);
});

addCardCloseButton.addEventListener("click", () => {
  togglePopup(addCardModal);
});

imageModalCloseButton.addEventListener("click", () => {
  togglePopup(imageModal);
});

editForm.addEventListener("submit", formSubmitHandler);
addCardForm.addEventListener("submit", addCardSubmitHandler);

const closePopup = () => {
  const item = document.querySelector("popup_opened");
  togglePopup(item);
};

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
    togglePopup(imageModal);
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

function togglePopup(modalWindow) {
  modalWindow.classList.toggle("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  togglePopup(editProfileModal);
}

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  renderCard({ name: placeInput.value, link: urlInput.value });
  togglePopup(addCardModal);
  addCardForm.reset();
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
