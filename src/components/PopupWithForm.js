import Popup from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
  }

  // метод который собирает данные всех полей формы
  _getInputVaiues() {
    // создаём пустой объект
    this._formValues = {};
    // добавляем в этот объект значения всех полей
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    // возвращаем объект значений
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // добавим вызов функции _handleSubmit
      // передадим ей объект — результат работы _getInputValues
      this._handleSubmit(this._getInputVaiues());
      //this.close();
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }

  /*   loadData(load) {
    if (load === true) {
      this._button.textContent = "Сохранение...";
    } else {
      this._button.textContent = "Сохранить";
    }
  } */
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/* export default class PopupWithForm extends Popup {
  constructor(selector, classes, { form, input }, submitHandler) {
    super(selector, classes);
    this._form = this._popup.querySelector(form);
    this._inputList = Array.from(this._form.querySelectorAll(input));
    this._submitHandler = submitHandler;
  }

  _emptyInputs() {
    this._inputList.forEach((input) => {
      input.value = "";
    });
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitHandler(this._getInputValues());
    });
  }

  open(values = {}) {
    this._inputList.forEach((input) => {
      input.value = values[input.name] || "";
    });
    super.open();
  }

  close() {
    super.close();
    this._emptyInputs();
  }
} */
