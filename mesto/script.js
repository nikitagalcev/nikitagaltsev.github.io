(function () {
  const placesContainer = document.querySelector('.places-list');
  const template = document.querySelector('#place-template').content;
  const formPlace = document.forms.place;
  const formPerson = document.forms.profile;
  
  const userInfoName = document.querySelector('.user-info__name');
  const userInfoJob = document.querySelector('.user-info__job');
  const inputPersonName = formPerson.elements.name;
  const inputPersonJob = formPerson.elements.about;
  const inputPlaceName = formPlace.elements.name;
  const inputPlaceLink = formPlace.elements.link;


  const popupPerson = new Popup(document.querySelector('.popup_person'));
  const popupPlace = new Popup(document.querySelector('.popup_place'));
  const popupImage = new ImagePopup(document.querySelector('.popup_image'));

  const userData = {
    name: 'Jaques Causteau',
    job: 'Sailor, Researcher'
  }

  const userInfo = new UserInfo(userInfoName, userInfoJob, inputPersonName, inputPersonJob, userData);

  userInfo.updateUserInfo();

  const cardList = new CardList(placesContainer);

  const personValidity = new FormValidator(formPerson);
  const placeValidity = new FormValidator(formPlace);
  personValidity.setEventListeners();
  placeValidity.setEventListeners();

  //Функции
  function openImagePopup(imageUrl) {
    popupImage.open(imageUrl);
  }

  //Отрендерить начальные карточки
  const cardElements = initialCards.map(cardData => new Card(cardData, template, openImagePopup).create());
  cardList.render(cardElements);

  // Открыть нужный попап
  /*
    Можно лучше: здесь и далее вынести все обработчики из addEventListener в отдельные именованные функции -- исправил
  */ 
  //Слушатели
  document.querySelector('.user-info__edit-button').addEventListener('click', e => {
    userInfo.updateUserInputs();
    popupPerson.open();
    personValidity.resetErrors();
    personValidity.setSubmitButtonState();
    
  });

  formPerson.addEventListener('submit', event => {
    event.preventDefault();
    userInfo.setUserInfo(inputPersonName.value, inputPersonJob.value);
    userInfo.updateUserInfo();
    formPerson.reset();
    popupPerson.close();
  })


  document.querySelector('.user-info__button').addEventListener('click', e => {
    popupPlace.open();
    formPlace.reset();
    placeValidity.resetErrors();
    placeValidity.setSubmitButtonState(true);
  });

  formPlace.addEventListener('submit', event => {
    event.preventDefault();
    cardList.addCard(new Card({
        name: inputPlaceName.value, 
        link: inputPlaceLink.value
      }, template, openImagePopup).create());
    popupPlace.close();
  })

})();

/*
В целом отличная работа, большая часть задания работает верно, но есть несколько замечаний:

Наша команда приносит извинения, при проверке работы на предыдущем спринте были пропущены следующие ошибки:
	Надо исправить: кнопка в форме становится активна, если одно поля пустое и при этом редактировать другое поле т.к. для задания активности кнопки
	используется только текущее проверяемое поля, а должно проверяться, что оба поля валидны
	Для решения этой проблемы можно использовать метод checkValidity у валидируемой формы 
	https://developer.mozilla.org/ru/docs/Web/Guide/HTML/%D0%A4%D0%BE%D1%80%D0%BC%D1%8B_%D0%B2_HTML
	Который проверяет, что валидны все поля формы
Данные исправления необходимо внести, т.к в дальнейшем вы можете столкнуться с проблемами при выполнении заданий и сдачи проектных и дипломной работы
Для исправления этого замечания попросил добавить Вам несколько дней к дедлайну 

Замечания по 8 проектной работе:
Класс Card
	Надо исправить:
	- если в функции нужен объект event, нужно его явно указывать как параметр  функции
	- при удалении элемента со страницы удалять с него обработчики
	- класс Card не должен напрямую обращаться к методам Popup, передавать колбэк в класс Card на открытие попапа
	- не вызывать добавление карточки в классе Card, из метода create возвращать созданный DOM элемент, а script.js показал как добавлять
    карточки в контейнер не передавая cardList в класс Card
    

	Можно лучше:
	- в конструктор  карточки лучше передавать не отдельные параметры, а сразу весь объект
	- лучше привязать контекст обработчиков событий к контексту класса
	
Класс CardList
	Надо исправить:
	- метод addCard должен добавлять одну карточку в контейнер
	- метод render отрисовывает массив переданных карточек вызывая addCard
	
	Можно лучше:
	- массив startCards лучше передавать не в конструктор, а в метод render
	
Класс FormValidator
	Надо испарвить:
	- при вызове метода resetErrors нужно очищать не вообще все ошибки на странице, а
      только ошибки в форме для которой создан экзмепляр класса
	- исправить проблемы с валидацией которые описаны выше
	
Класс Popup
	Надо испарвить:
	- привел пример как сделать класс Popup отвечающим принципу единственной ответсвенности
	
Класс UserInfo
	Надо испарвить:
	- передавать используемые DOM жлементы как параметры конструктора класса, а не использовать глобальные переменые
	- в метод setUserInfo передавать данные как параметры, а не хардкордить там форму
	
Файл scripts.js
	Надо испарвить:
	- валидация должна настраиваться один раз, а не при каждом открытии попапа
	- использовать экземпляр класса UserInfo, а не создавать его каждый раз при открытии попапа
	- реорганизовать работу с попапами как показано в классе Popup
	- когда код расположен в разных файлах, его нужно 
	заключать в модули, т.к. если файлов будет много, то в разных 
	файлах могут появится функции или переменные с одинаковыми именами,
	они будут переопределять друг друга. Модуль должен предоставлять
	наружу только минимально необходимый api
	Для создании модулей можно воспользоваться IIFE, подробнее:
	https://learn.javascript.ru/closures-module
	https://habr.com/ru/company/ruvds/blog/419997/ 
	Нужно обернуть в модули как минимум содержимое файла script.js
	Оборачивание кода в IIFE не позволит глобально использовать переменные объявленные в нем и
	и заставит явно передавать их туда, где они необходимы, как например в конструкторы классов
	
*/

/**
 Исправил все недочеты (по сути переписал всю работу, хех), спасибо Вам за шикарное ревью! Очень многое понял, теперь ООП не кажется таким страшным :)
 */


/*
  Отлично, по ООП все замечания исправлены, рад, что ревью помогло разобраться,
  но осталось замечание по валидации:
  Надо исправить:
  - поле ссылки ненужно валидировать по длинне http://prntscr.com/sqjzic
  подробнее см. замечание в FormValidator, приношу извинения если пропусти это на прошлом ревью --Исправил

  - так же в классе Card Вы забыли удалить обработчик с this._view.querySelector('.place-card__image') -- Исправил.

*/

/*
  Теперь валидация работает верно
  
  Если захотите углубиться в тему ООП и рефакторинга оставлю пару ссылок:
  https://ota-solid.now.sh/ - принципы проектирования SOLID применяемые для проектирования ООП программ  
  https://refactoring.guru/ru/design-patterns - паттерны проектирования
  https://refactoring.guru/ru/refactoring - рефакторинг

  Успехов в дальнейшем обучении!

*/