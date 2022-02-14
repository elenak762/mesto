import Popup from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(name, link) {
    super.open();
    const imageModalImg = this._popup.querySelector(".figure__image");
    const imageModalCaption = this._popup.querySelector(".figure__caption");

    imageModalImg.src = link;
    imageModalImg.alt = name;
    imageModalCaption.textContent = name;
  }
}
