const showInputError = (formElement, inputElement, errorMessage) => {
  inputElement.classList.add("popup__input_active");
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}Error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}Error`);
  inputElement.classList.remove("popup__input_active");
  // Скрываем сообщение об ошибке
  errorElement.classList.remove("popup__error");
  // Очистим ошибку
  errorElement.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Передадим сообщение об ошибке вторым аргументом
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//функция добавления неактивной кнопки
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
    });
  });
};

const enableValidation = (formElement) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement);
  });
};
// Вызовем функцию
enableValidation();

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn_submit",
  inactiveButtonClass: "popup__btn_submit_disabled",
  inputErrorClass: "popup__input_active",
  errorClass: "popup__error",
});

//===================================================================================
//const formElement = document.querySelector(".popup__form");
//const formInput = formElement.querySelector(".popup__input");
//const formError = formElement.querySelector(`#${formInput.id}Error`);

/*const showInputError = (formElement, inputElement, errorMessage) => {
  inputElement.classList.add("popup__input_active");
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}Error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}Error`);
  inputElement.classList.remove("popup__input_active");
  // Скрываем сообщение об ошибке
  errorElement.classList.remove("popup__error");
  // Очистим ошибку
  errorElement.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Передадим сообщение об ошибке вторым аргументом
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};

formElement.addEventListener("submit", function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});
//функция добавления неактивной кнопки
const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));

  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(".popup__btn_submit");

  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    const popupsContainer = Array.from(
      formElement.querySelectorAll(".popup__container")
    );
    popupsContainer.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement);
    });
  });
};

// Вызовем функцию
enableValidation();

// Функция принимает массив полей

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};

// Функция принимает массив полей ввода
// и элемент кнопки, состояние которой нужно менять

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.classList.add("popup__btn_submit_disabled");
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove("popup__btn_submit_disabled");
  }
};*/

/* enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn_submit",
  inactiveButtonClass: "popup__btn_submit_disabled",
  inputErrorClass: "popup__input_active",
  errorClass: "popup__error",
}); */

//=================================================================================
/* const formElement = document.querySelector(".popup__form");
const formInput = formElement.querySelector(".popup__input");
// Выбираем элемент ошибки на основе уникального класса
const formError = formElement.querySelector(`#${formInput.id}Error`);

// Функция, которая добавляет класс с ошибкой
const showInputError = (element, errorMessage) => {
  element.classList.add("popup__input_active");
  // Заменим содержимое span с ошибкой на переданный параметр
  formError.textContent = errorMessage;
  // Показываем сообщение об ошибке
  formError.classList.add("popup__error");
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
  element.classList.remove("popup__input_active");
  // Скрываем сообщение об ошибке
  formError.classList.remove("popup__error");
  // Очистим ошибку
  formError.textContent = "";
};

// Функция, которая проверяет валидность поля
const isValid = () => {
  if (!formInput.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formInput);
    // Передадим сообщение об ошибке вторым аргументом
    showInputError(formInput, formInput.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formInput);
  }
};

formElement.addEventListener("submit", function (evt) {
  // Отменим стандартное поведение по сабмиту
  evt.preventDefault();
});

// Вызовем функцию isValid на каждый ввод символа
formInput.addEventListener("input", isValid);
 */
