const modalWindow = document.querySelector('.popup');
const modalWindowCloseBtn = modalWindow.querySelector('.popup__btn_action_close');
const profileProjectLink = document.querySelector('.profile__edit-button');

function toggleModalWindow(){
  modalWindow.classList.toggle('popup__is-opened');
}

profileProjectLink.addEventListener('click',toggleModalWindow);
modalWindowCloseBtn.addEventListener('click',toggleModalWindow);





// Находим форму в DOM
//let formElement = document.querySelector('.popup__form');
// Находим поля формы в DOM
//let nameInput = document.querySelector('.popup__user-name');
//let jobInput = document.querySelector('.popup__user-description');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
//function formSubmitHandler (evt) {
    //evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    //document.getElementById("user-name-input").value;
    //document.getElementById("user-description-input").value;
    // Выберите элементы, куда должны быть вставлены значения полей
    //let nameInput = document.querySelector('.popup__user-name');
    //let jobInput = document.querySelector('.popup__user-description');
    // Вставьте новые значения с помощью textContent
    //textContent = "Имя";
    //textContent ="Описание";
//}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
//formElement.addEventListener('submit', formSubmitHandler);


const form = modalWindow.querySelector('.popup__form');

form.addEventListener('submit',function(e){
  e.preventDefault();
  console.log(e);
})




