class Card {
  constructor(cardData, template, openImageCallback) {
    this.name = cardData.name;
    this.link = cardData.link;
    this.template = template;
    this.openImageCallback = openImageCallback;
    this.openImageCallback = this.openImageCallback.bind(this);
    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  remove(event) {
    this._view.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
    this._view.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
    this._view.querySelector('.place-card__image').removeEventListener('click', this.onImageClick);
    event.stopPropagation();
    this._view.remove();
  }

  onImageClick = () => {
    this.openImageCallback(this.link)
  }

  create() {
    this._view = this.template.cloneNode(true).children[0];
    this._view.querySelector('.place-card__name').textContent = this.name;
    this._view.querySelector('.place-card__image').setAttribute('style', `background-image: url(${this.link})`);
    this._view.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this._view.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    this._view.querySelector('.place-card__image').addEventListener('click', this.onImageClick);
    return this._view;
  }
}