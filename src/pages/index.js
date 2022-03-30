import "./index.css";

import {
  config,
  editButton,
  addButton,
  profileName,
  profileDescription,
  popupAvatarButton,
  elements,
  editForm,
  addCardForm,
  popupData,
  popupSelectors,
  imageData,
  profileAvatar,
  avaButton,
  avatarForm,
  titleField,
  descriptionField,
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import PopupWihtConfirm from "../components/PopupWihtConfirm.js";
import { data } from "autoprefixer";

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

// новый экземпляр класса imageModal
const imageModal = new PopupWithImage(
  popupSelectors.viewCard,
  popupData,
  imageData
);
imageModal.setEventListeners();

// фунцкия создания карточки
const createCard = (item) => {
  const card = new Card(item, userId, ".photo__template", {
    handleCardClick: () => {
      // Создаем объект с методом открытия и событиями
      imageModal.open(item.name, item.link); // Передаем метод открытия popup
    },
    // удаление карточки, открытие попапа, появление кнопки удаления если карточка моя
    handkeDeleteCardClik: (card) => {
      popupDeleteCard.open();
      popupDeleteCard.setSubmitCallback(() => {
        api
          .deleteCard(card.cardId())
          .then(() => {
            card.deleteCard();
            popupDeleteCard.close();
          })
          .catch((err) => {
            console.log(`Ошибка при удалении карточки: ${err}`);
          });
      });
    },
    // лайк карточки
    handleLikeClick: (card) => {
      if (card.ifLiked()) {
        // проверям если ли лайк есть, то удаляем
        api
          .removeLike(card.cardId())
          .then((data) => {
            card.setLikesInfo(data.likes);
          })
          .catch((err) => {
            console.log(`Ошибка удаления лайка: ${err}`);
          });
      } else {
        // иначе ставим лайк
        api
          .likeCard(card.cardId())
          .then((data) => {
            card.setLikesInfo(data.likes);
          })
          .catch((err) => {
            console.log(`Ошибка лайка: ${err}`);
          });
      }
    },
  });
  return card.renderCard();
};

//функция добавления новой секции
const defaultCardList = new Section(
  {
    renderer: (item) => {
      defaultCardList.addItem(createCard(item));
    },
  },
  elements
);

// попап удаления карточки
const popupDeleteCard = new PopupWihtConfirm(".popup_confirm");
popupDeleteCard.setEventListeners();

//Класс UserInfo отвечает за управление отображением информации о пользователе на странице
const userInfo = new UserInfo({
  profileName,
  profileDescription,
  profileAvatar,
});

//Запрос к серверу
const api = new Api({
  address: "https://mesto.nomoreparties.co/v1/cohort-38",
  token: "691933c6-28d1-48c7-b0c2-f236e771d99c",
});

//переменная текущего пользователя
let userId;

Promise.all([api.getInitalCards(), api.getUserInfo()])
  .then(([userData, profile]) => {
    userId = profile._id;
    defaultCardList.renderItems(userData); // Рендерим  карточки пользователей
    userInfo.setUserInfo(profile); // грузим данные пользователя
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

// попап добавления новой карточки
const addCardModal = new PopupWithForm({
  popupSelector: ".popup_card",
  handleSubmit: (item) => {
    addCardModal.isLoading(true);

    api
      .postNewCard(item)
      .then((result) => {
        defaultCardList.prependItem(createCard(result)); // добавляем в начало - метод prependItem в Section.js
        addCardModal.close();
      })
      .catch((err) => {
        console.log(`Ошибка добавления карточки: ${err}`);
      })
      .finally(() => {
        addCardModal.isLoading(false);
      });
  },
});

addCardModal.setEventListeners();

// попап профиля пользователя
const editProfileModal = new PopupWithForm({
  popupSelector: ".popup_profile",
  handleSubmit: (item) => {
    editProfileModal.isLoading(true);
    api
      .patchUserProfile(item)
      .then((result) => {
        userInfo.setUserInfo(result); // метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.
        editProfileModal.close();
      })
      .catch((err) => {
        console.log(`Ошибка профиля пользователя: ${err}`);
      })
      .finally(() => {
        editProfileModal.isLoading(false);
      });
  },
});
editProfileModal.setEventListeners();

//Попап аватар
const editAvatar = new PopupWithForm({
  popupSelector: ".popup_avatar",
  handleSubmit: (item) => {
    editAvatar.isLoading(true);
    api
      .patchNewAvatar(item)
      .then((result) => {
        userInfo.setUserAvatar(result);
        editAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка при изменении аватара пользователя: ${err}`);
      })
      .finally(() => {
        editAvatar.isLoading(false);
      });
  },
});
editAvatar.setEventListeners();

// кнопка сменить аватар
avaButton.addEventListener("click", () => {
  editAvatar.open();
});

// валидация форм
const formEditProfileValidator = new FormValidator(config, editForm);
formEditProfileValidator.enableValidation();
const formAddCardValidator = new FormValidator(config, addCardForm);
formAddCardValidator.enableValidation();
const formAvatar = new FormValidator(config, avatarForm);
formAvatar.enableValidation();

// открытие попапа редактирования профиля
editButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  titleField.value = data.name;
  descriptionField.value = data.about;
  formEditProfileValidator.resetValidation();
  editProfileModal.open();
});

// открытие попапа добавления карточки
addButton.addEventListener("click", () => {
  formAddCardValidator.resetValidation();
  addCardModal.open();
  //formAddCardValidator.toggleButtonState();
});

// кнопка сменить аватар
popupAvatarButton.addEventListener("click", () => {
  editAvatar.open();
});

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Подтверждение удаления
/*const popupConfirm = new PopupWihtConfirm(
  popupSelectors.confirm,
  popupData,
  (card) => {
    deleteCard(card);
  }
);

const btnSubmitDelSelector = `${popupSelectors.confirm} ${config.submitButtonSelector}`;
const btnSubmitDel = document.querySelector(btnSubmitDelSelector);
console.log(btnSubmitDelSelector);

//Удаление карточки
function deleteCard(card) {
  btnSubmitDel.textContent = "Удаление...";
  api
    .deleteCard(card.getCardId())
    .then(() => {
      card.delete();
    })
    .catch((err) => {
      console.log(`Невозможно удалить карточку. Ошибка ${err}.`);
    })
    .finally(() => {
      popupConfirm.close();
      btnSubmitDel.textContent = "Да";
    });
}
// Форма добавления карточки
const formNewCardSelector = `${popupSelectors.createCard} ${config.formSelector}`;
const formNewCard = document.querySelector(formNewCardSelector);
const formNewCardValidation = new FormValidator(config, formNewCard);

const btnNewCard = document.querySelector(btnNewCardSelector);
const btnSubmitCard = formNewCard.querySelector(config.submitButtonSelector);

const popupNewCard = new PopupWithForm(
  popupSelectors.createCard,
  popupData,
  formData,
  (item) => {
    saveNewGard(item);
  }
);

function saveNewGard(item) {
  btnSubmitCard.textContent = "Сохранение...";
  api
    .postNewCard({ name: item.name, link: item.link })
    .then((res) => {
      addListItem({
        name: res.name,
        link: res.link,
        likes: res.likes,
        onwer: res.onwer._id,
        id: res._id,
      });
    })
    .catch((err) => {
      console.log(`Невозможно сохранить карточку на сервере. Ошибка ${err}.`);
    })
    .finally(() => {
      popupNewCard.close();
      btnSubmitCard.textContent = "Создать";
    });
}

// Редактирование профиля

const formEditProfileSelector = `${popupSelectors.editProfile} ${config.formSelector}`;
const formChangeAvatarSelector = `${popupSelectors.changeAvatar} ${config.formSelector}`;

const formEditProfile = document.querySelector(formEditProfileSelector);
const formEditProfileValidation = new FormValidator(config, formEditProfile);
const buttonEditProfile = document.querySelector(btnEditProfileSelector);
const buttonSubmitProfile = formEditProfile.querySelector(
  config.submitButtonSelector
);

const formChangeAvatar = document.querySelector(formChangeAvatarSelector);
const formChangeAvatarValidation = new FormValidator(config, formChangeAvatar);
const buttonChangeAvatar = document.querySelector(profileData.avatarSelector);
const buttonSubmitAvatar = formChangeAvatar.querySelector(
  config.submitButtonSelector
);

// Окно редактирования аватара пользователя
const popupChangeAvatar = new PopupWithForm(
  popupSelectors.changeAvatar,
  popupData,
  formData,
  (data) => {
    saveUserAvatar(data);
  }
);

// Окно редактирования профиля пользователя
const popupEditProfile = new PopupWithForm(
  popupSelectors.editProfile,
  popupData,
  formData,
  (data) => {
    saveUserProfile(data);
  }
);

// Сохранение аватара на сервере
function saveUserAvatar(data) {
  buttonSubmitAvatar.textContent = "Сохранение...";
  api
    .patchNewAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      userInfo.setUserId(res._id);
    })
    .catch((err) => {
      console.log(`Невозможно обновить аватар на сервере. ${err}.`);
    })
    .finally(() => {
      popupChangeAvatar.close();
      buttonSubmitAvatar.textContent = "Сохранить";
    });
}

// Сохранение профиля на сервере
function saveUserProfile(userData) {
  buttonSubmitProfile.textContent = "Сохранение...";
  api
    .patchUserProfile(userData)
    .then((res) => {
      userInfo.setUserInfo({ name: res.name, info: res.about });
      userInfo.setUserId(res._id);
    })
    .catch((err) => {
      console.log(`Невозможно обновить профиль пользователя. ${err}.`);
    })
    .finally(() => {
      popupEditProfile.close();
      buttonSubmitProfile.textContent = "Сохранить";
    });
}

// Обработка событий
popupNewCard.setEventListeners();
popupEditProfile.setEventListeners();
popupView.setEventListeners();
popupChangeAvatar.setEventListeners();
popupConfirm.setEventListeners();

// Включаем валидацию форм
formNewCardValidation.enableValidation();
formEditProfileValidation.enableValidation();
formChangeAvatarValidation.enableValidation();

// Нажатие на кнопку "Добавить карточку"
btnNewCard.addEventListener("click", () => {
  popupNewCard.open();
  formNewCardValidation.resetValidation();
});

// Нажатие на кнопку "Редактировать профиль"
buttonEditProfile.addEventListener("click", () => {
  popupEditProfile.open(userInfo.getUserInfo());
  formEditProfileValidation.resetValidation();
});

buttonChangeAvatar.addEventListener("click", () => {
  const avatar = userInfo.getUserAvatar();
  popupChangeAvatar.open({ avatar });
  formChangeAvatarValidation.resetValidation();
});

// Получаем данные с сервера
api
  .getUserInfo()
  .then((res) => {
    console.log("Информация о пользователе получена с сервера.");
    userInfo.setUserInfo({ name: res.name, info: res.about });
    userInfo.setUserAvatar(res.avatar);
    userInfo.setUserId(res._id);
  })
  .catch((err) => {
    console.log(`Невозможно прочитать профиль пользователя. ${err}.`);
  })
  .finally(() => {
    api
      .getInitalCards()
      .then((res) => {
        console.log("Информация о карточках получена с сервера.");
        cardsArray = res.map((item) => ({
          title: item.name,
          link: item.link,
          likes: item.likes,
          owner: item.owner._id,
          id: item._id,
        }));
      })
      .catch((err) => {
        console.log(`Невозможно получить карточки с сервера. ${err}.`);
        cardsArray = initialCards;
      })
      .finally(() => {
        // Создание контейнера
        cardsList = new Section(
          { items: cardsArray, renderer: (item) => addListItem(item) },
          listSelector
        );
        // Отображение карточек
        cardsList.renderItems();
      });
  });

let cardsArray = [];
let cardsList = null;

// Добавление карточки с фотографией в список
const addListItem = (item) => {
  const card = new Card(
    {
      data: item,
      handleCardClick: (clickedItem) => {
        imageModal.open(clickedItem);
      },
      handleLike: (likedItem) => {
        likeCard(likedItem);
      },
      handleDelete: (deletedItem) => {
        popupConfirm.open(deletedItem);
      },
    },
    cardTemplateSelector,
    carSelector
  );
  const cardElement = card.createCard(userInfo.getUserId());
  cardsList.setItem(cardElement);
};

// Постановка/снятие лайка
function likeCard(card) {
  const id = card.getCardId();
  const user = userInfo.getUserID();
  const likeState = card.isLiked();
  const action = likeState ? "удалить" : "поставить";
  const likeFunc = likeState
    ? (cardId) => api.unlikeCard(cardId)
    : (cardId) => api.likeCard(cardId);

  likeFunc(id)
    .then((res) => {
      card.setLikes(res.likes);
    })
    .catch((err) => {
      console.log(`Невозможно ${action} лайк. Ошибка ${err}.`);
      card.setLikes(!likeState ? [{ _id: user }] : []);
    })
    .finally(() => {
      card.setLikeGroup(user);
    });
}
 */
