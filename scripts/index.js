const modalWindow = document.querySelector(".popup");
const modalWindowCloseBtn = modalWindow.querySelector(
  ".popup__btn_action_close"
);
const profileProjectLink = document.querySelector(".profile__edit-button");
const formElement = document.querySelector(".popup__form-name");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const userName = document.querySelector(".profile__user-name");
const userDescription = document.querySelector(".profile__user-description");

function toggleModalWindow() {
  modalWindow.classList.toggle("popup_opened");

  nameInput.value = userName.textContent;
  jobInput.value = userDescription.textContent;
}

profileProjectLink.addEventListener("click", toggleModalWindow);
modalWindowCloseBtn.addEventListener("click", toggleModalWindow);

function formSubmitHandler(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userDescription.textContent = jobInput.value;
  toggleModalWindow();
}

formElement.addEventListener("submit", formSubmitHandler);
