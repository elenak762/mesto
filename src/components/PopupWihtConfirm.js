import Popup from "./Popup.js";

export default class PopupWihtConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popup.querySelector(".popup__btn_submit");
  }

  setEventListeners() {
    super.setEventListeners();
    this._button.addEventListener("click", () => {
      this._handleSubmitCalllback();
    });
  }

  setSubmitCallback(callback) {
    this._handleSubmitCalllback = callback;
  }
}
