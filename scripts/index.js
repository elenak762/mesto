const modalWindow = document.querySelector('.popup');
const modalWindowCloseBtn = modalWindow.querySelector('.popup__btn_action_close');
const profileProjectLink = document.querySelector('.profile__edit-button');

function toggleModalWindow(){
  modalWindow.classList.toggle('popup__is-opened');
}

profileProjectLink.addEventListener('click',toggleModalWindow);
modalWindowCloseBtn.addEventListener('click',toggleModalWindow);
