export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.close = this.close.bind(this);
    this._setEscListener = this._setEscListener.bind(this);
    this._popupSaveBtn = this._popup.querySelector(".popup__btn_submit");
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._setEscListener);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._setEscListener);
  }

  setEventListeners() {
    const button = this._popup.querySelector(".popup__btn_close");
    button.addEventListener("click", () => this.close());

    this._popup.addEventListener("click", (e) => {
      if (e.target.classList.contains("popup")) this.close();
    });
  }

  // Функция закрытия по кнопке Escape
  _setEscListener = function (evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  // метод загрузки  'Сохранение...'
  isLoading(isLoading) {
    if (isLoading) {
      this._popupSaveBtn.textContent = "Сохранение...";
    } else if (this._popupSelector === ".popup_card") {
      this._popupSave = "Создать";
    } else {
      this._popupSaveBtn.textContent = "Сохранить";
    }
  }
}
