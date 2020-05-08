const initialCards = [
  {
    name: 'Barcelona',
    link: 'https://images.unsplash.com/photo-1587789202069-f57c846b85db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80'
  },
  {
    name: 'Maldives',
    link: 'https://images.unsplash.com/photo-1587578075208-f206676d9860?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=802&q=80'
  },
  {
    name: 'Shanghai',
    link: 'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  },
  {
    name: 'Langjokull',
    link: 'https://images.unsplash.com/photo-1482778090591-caf9a0149412?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Cambodia',
    link: 'https://images.unsplash.com/photo-1540525080980-b97c4be3c779?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
  },
  {
    name: 'London',
    link: 'https://images.unsplash.com/photo-1472725485116-45d54945b877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1142&q=80'
  },
  {
    name: 'Moulton Falls',
    link: 'https://images.unsplash.com/photo-1465021696408-57e53e164d0e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
  },
  {
    name: 'Sri Lanka',
    link: 'https://images.unsplash.com/photo-1586870336143-d652f69d44c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Rheinland-Pfalz',
    link: 'https://images.unsplash.com/photo-1574013573452-2d89828155a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
  },
  {
    name: 'Kyoto',
    link: 'https://images.unsplash.com/photo-1558159857-6282096da77b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'
   }
];

// Декларация переменных
const placesContainer = document.querySelector('.places-list');

const formPlace = document.forms.place;
const formPerson = document.forms.profile;

const inputPlaceName = formPlace.elements.name;
const inputPlaceLink = formPlace.elements.link;
const inputPersonName = formPerson.elements.name;
const inputPersonAbout = formPerson.elements.about;

const popupPerson = document.querySelector('.popup_person');
const popupPlace = document.querySelector('.popup_place');
const popupImage = document.querySelector('.popup_image');

const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const personButton = document.querySelector('.popup__button_person');
const placeButton = document.querySelector('.popup__button_place');

const errorMessages = {
  empty: 'Это обязательное поле',
  tooShort: 'Должно быть от 2 до 30 символов',
  url: 'Здесь должна быть ссылка'
};

const customCard = {
  name: '',
  link: ''
};

const personInfo = {
  name: '',
  about: ''
};


// Функции
// Создание карточки
const createPlaceCard = function() {
  const markup = `
    <div class="place-card">
      <div class="place-card__image">
        <button class="place-card__delete-icon"></button>
      </div>
      <div class="place-card__description">
        <h3 class="place-card__name"></h3>
        <button class="place-card__like-icon"></button>
      </div>
    </div>
  `;

  const placeCard = document.createElement('div');
  placeCard.insertAdjacentHTML('afterbegin', markup);
  /*REVIEW. Отлично, что функция createPlaceCard отвечает только за создание шаблона карточки, а добавление карточки к общему списку
  происходит в другой функции. Это соответствует принципу единственной ответственности функции. Такие функции, независящие от размётки
  страницы, можно переиспользовать в других проектах. */
  return placeCard.firstElementChild;
};


// popup для изображений
const imagePopup = function(event) {
  const backgroundImage = event.target.style.backgroundImage.split('').slice(5, length-2).join('');
  document.querySelector('.popup__image-open').setAttribute('src', backgroundImage);
  showPopup(popupImage);
}

// Отрисовка карточки и определение её элементов
const renderPlaceCard = function(item) {
  const newPlaceCard = createPlaceCard();
  newPlaceCard.querySelector('.place-card__image').setAttribute('style', `background-image: url(${item['link']})`);
  newPlaceCard.querySelector('.place-card__name').textContent = item['name'];

  const likeButton = newPlaceCard.querySelector('.place-card__like-icon');
  const deleteButton = newPlaceCard.querySelector('.place-card__delete-icon');

  /*REVIEW. Можно лучше. Обработчиками событий карточки лучше делать именованные функции, а не безымянные, чтобы эти обработчики можно было удалять при удалении самой карточки - это будет обязательным в 8-м задании.*/
  
  // Исправил, также вынес функции из тела renderPlaceCard 

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);
  newPlaceCard.querySelector('.place-card__image').addEventListener('click', imagePopup);

  placesContainer.appendChild(newPlaceCard);
};

function deleteCard() {
  event.target.closest('.place-card').remove();
  event.stopPropagation();
};

function likeCard() {
  event.target.classList.toggle('place-card__like-icon_liked');
};


// Добавление кастомной карточки
const userPlaceCard = function() {
  customCard.name = inputPlaceName.value;
  customCard.link = inputPlaceLink.value;
  initialCards.push(customCard);
  formPlace.reset();
  renderPlaceCard(initialCards[initialCards.length-1]);
};

// Инициализация пользователя
const changeUserInfo = function() {
  document.querySelector('.popup__input_type_person-name').setAttribute('value', userInfoName.textContent);
  document.querySelector('.popup__input_type_about').setAttribute('value', userInfoJob.textContent);
};

// Изменение пользователя
const person = function() {
  personInfo.name = inputPersonName.value;
  personInfo.about = inputPersonAbout.value;
  formPerson.reset();
  userInfoName.textContent = personInfo.name;
  userInfoJob.textContent = personInfo.about;
  changeUserInfo();
};

// Отображение попапа

const showPopup = function(popup) {
  /*REVIEW. Надо исправить. Нельзя обращаться к DOM-элементам по индексам. Это сильно осложняет сопровождение и расширении проекта. При добавлении
  ещё одного всплывающего окна формы (а это будет в 9-м задании), Вы вряд ли избежите проверки существующего кода, которая будет нужна
  чтобы избежать конфликты номеров всплывающих окон. А по принципу открытости-закрытости, которому должны подчиняться все проекты, написанные на js,
  расширение проекта никак не должно затрагивать старый код. Поэтому к DOM-элементам надо обращаться по индивидуальным селекторам, отражающим их суть,
  а не номер, и этот селектор, в соответствии с системой БЭМ, должен быть классом, а не идентификатором. Индексы можно использовать только при переборе
  коллекции элементов в цикле.
  Устраните использование индексов DOM-элементов во всём проекте. */

  //Исправил на названия классов, но, знаю что (вроде бы) можно делать через bind. Эти темы будут в следующих спринтах, потому пока боюсь за это браться.

  popup.classList.toggle('popup_is-opened');
  popup.querySelector('.popup__close').addEventListener('click', e => {
    popup.classList.remove('popup_is-opened');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      popup.classList.remove('popup_is-opened');
    };
  });
};


// Валидация, любимая

// Управление кнопками
const blockButton = function(button, status) {
  if (status === true) {
    button.classList.remove('popup__button_active');
    button.disabled = true;
    button.style.cursor = 'not-allowed';
  } else {
    button.classList.add('popup__button_active');
    button.disabled = false;
    button.style.cursor = 'pointer';
  };
};

//Сбросить все ошибки на всех формах
function resetErrors() {
  document.querySelectorAll('.error-message').forEach(item => {
    item.textContent = '';
  });
};

//Обнулить поля и заблочить кнопку в place форме
function resetPlaceFields() {
  inputPlaceName.value = '';
  inputPlaceLink.value = '';
  blockButton(placeButton, true);
};

// Для person
function actualizePersonFields() {
  inputPersonName.value = userInfoName.textContent;
  inputPersonAbout.value = userInfoJob.textContent;
  blockButton(personButton, false);
  resetErrors();
};

const personValidity = function() {
  const currentInput = event.target;
  const errorELem = currentInput.parentNode.querySelector(`#error-${currentInput.id}`);
  if(currentInput.value.length === 0 || currentInput.value.length === 0) {
    currentInput.setCustomValidity(errorMessages.empty);
    blockButton(personButton, true);
  } else if(currentInput.value.length < 2 || currentInput.value.length > 30) {
    currentInput.setCustomValidity(errorMessages.tooShort);
    blockButton(personButton, true);
  } else {
    currentInput.setCustomValidity('');
    blockButton(personButton, false);
  };
  errorELem.textContent = currentInput.validationMessage;
};

// Для place
const placeValidity = function() {
  if (inputPlaceName.value.length === 0 || inputPlaceLink.value.length === 0) {
    blockButton(placeButton, true);
  } else {
    blockButton(placeButton, false);
  };
};


// Слушатели
formPerson.addEventListener('input', personValidity);
formPlace.addEventListener('input', placeValidity);


document.querySelector('.user-info__edit-button').addEventListener('click', e => { showPopup(popupPerson); actualizePersonFields(); });
document.querySelector('.user-info__button').addEventListener('click', e => { showPopup(popupPlace); resetPlaceFields(); });

formPerson.addEventListener('submit', function(event) {
  event.preventDefault();
  showPopup(popupPerson);
  person();
});

formPlace.addEventListener('submit', function(event) {
  userPlaceCard();
  event.preventDefault();
  showPopup(popupPlace);
});

// Вызовы функций и методов
changeUserInfo();

initialCards.forEach(function(item) {
  renderPlaceCard(item);
});



/*REVIEW. Резюме.

Работа неплохая. Функционал, требуемый по заданию, работает, кроме до конца правильной валидации обеих форм.

Так же требуется оптимизация проекта.

Что надо исправить.

1. Устранить использование индексов DOM-элементов во всём проекте (подробности в ревью в коде showPopup). --Исправил

2. По чеклисту требуется, чтобы на формах не появлялись системные сообщения об ошибках. Сейчас они появляются на форме карточки.
Сделайте минимальную валидацию формы добавления новой карточки. По заданию даже не требуется полной валидации этой формы, достаточно
только сделать так, чтобы кнопка сабмита этой формы была заблокирована, если хотя бы одно из полей форм пустое, и была разблокирована,
если в обоих полях есть какая-то информация, то есть оба поля непустые. Сообщения об ошибках при минимальной валидации высвечиваться
не должны.

--Сделал минимально, пытался сделать полную валидацию, так и не вышло :(




3. Нужно до конца правильной сделать валидацию формы профиля. Сейчас она работает правильно только наполовину, только когда Вы выходите
из формы по сабмиту, но, если выйти из формы по крестику, предварительно сделав информацию в полях невалидной, то при повторном входе в
форму информация со страницы на неё не переносится, хотя по заданию эта информация должна переноситься на форму в любом случае при её открытии.
На форме видны сообщения об ошибках, оставшиеся от предыдущего неправильного ввода, чего быть не должно, так как на форме при её открытии всегда должна находиться валидная информация. Поэтому в слушателе открытия формы профиля, нужно переносить информацию со страницы в поля формы, производить удаление сообщений об ошибках, делать кнопку сабмита активной и чёрного цвета. Это можно будет сделать с помощью вызовов функции валидации полей формы профиля в слушателе события открытия формы. --Исправил

Что можно улучшить.

1. Обработчиками событий карточки лучше делать именованные функции (подробности в ревью в коде renderPlaceCard). --Исправил

*/