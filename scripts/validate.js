/* const showInputError = (formElement, inputElement, errorMessage) => {
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
};

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
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement);
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
//enableValidation();

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn_submit",
  inactiveButtonClass: "popup__btn_submit_disabled",
  inputErrorClass: "popup__input_active",
  errorClass: "popup__error",
}); */
//===================================================================================
import { validationConfig } from "./validationConfig.js";

/*Функция показа ошибки*/
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  _inputErrorClass,
  errorClass
) => {
  inputElement.classList.add(inputElement.classList.inputErrorClass);
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}Error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

/*Функция скрытия ошибки*/
const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}Error`);
  inputElement.classList.remove(inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(errorClass);
  // Очистим ошибку
  errorElement.textContent = "";
};

// функция проверки валидности поля ввода
const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

//Функция проверки все ли поля прошли валидацию
const hasInvalidInput = (inputList) => {
  // Функция принимает массив полей
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
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут

  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    disableSubmitButton(addCardSubmitBtn, validationConfig.inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    enableSubmitButton(buttonElement, inactiveButtonClass);
  }
};

const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
};

const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
};

// функция-обработчик форм
const setEventListeners = (
  formElement,
  {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  }
) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  //toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", function () {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      //toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

// функция включения валидации
const enableValidation = (config) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(formElement, config);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn_submit",
  inactiveButtonClass: "popup__btn_submit_disabled",
  inputErrorClass: "popup__input_active",
  errorClass: "popup__error-visible",
});

enableValidation(validationConfig);
//===================================================================================
//const formElement = document.querySelector(".popup__form");
//const formInput = formElement.querySelector(".popup__input");
//const formError = formElement.querySelector(`#${formInput.id}Error`);

/* const showInputError = (formElement, inputElement, errorMessage) => {
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

    popupsContainer.forEach((formElement) => {
      // Для каждой формы вызовем функцию setEventListeners,
      // передав ей элемент формы
      setEventListeners(formElement);
    });
  });
};

// Вызовем функцию
//enableValidation();

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
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn_submit",
  inactiveButtonClass: "popup__btn_submit_disabled",
  inputErrorClass: "popup__input_active",
  errorClass: "popup__error",
});
 */
//=================================================================================
/*Функция показа ошибки*/
/* const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  _inputErrorClass,
  errorClass
) => {
  inputElement.classList.add(inputElement.classList.inputErrorClass);
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`#${inputElement.id}Error`);

  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}; */

/*Функция скрытия ошибки*/
/* const hideInputError = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}Error`);
  inputElement.classList.remove(inputErrorClass);
  // Скрываем сообщение об ошибке
  errorElement.classList.remove(errorClass);
  // Очистим ошибку
  errorElement.textContent = "";
};

// функция проверки валидности поля ввода
const checkInputValidity = (
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};

//Функция проверки все ли поля прошли валидацию
const hasInvalidInput = (inputList) => {
  // Функция принимает массив полей
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
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    // иначе сделай кнопку активной
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }
}; */

/* const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
};

const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}; */

/* // функция-обработчик форм
const setEventListeners = (
  formElement,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  // Найдём в текущей форме кнопку отправки
  const buttonElement = formElement.querySelector(submitButtonSelector);
  // Вызовем toggleButtonState, чтобы не ждать ввода данных в поля
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);

  const openFormButtons = Array.from(
    document.querySelectorAll(".profile__open-button")
  );

  openFormButtons.forEach((button) => {
    button.addEventListener("click", () => {
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });

  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      checkInputValidity(
        formElement,
        inputElement,
        inputErrorClass,
        errorClass
      );

      // Вызовем toggleButtonState и передадим ей массив полей и кнопку
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
};

// функция включения валидации
const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  // Найдём все формы с указанным классом в DOM,
  // сделаем из них массив методом Array.from
  const formList = Array.from(document.querySelectorAll(formSelector));
  // Переберём полученную коллекцию
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners,
    // передав ей элемент формы
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    );
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn_submit",
  inactiveButtonClass: "popup__btn_submit_disabled",
  inputErrorClass: "popup__input_active",
  errorClass: "popup__error-visible",
});
 */
