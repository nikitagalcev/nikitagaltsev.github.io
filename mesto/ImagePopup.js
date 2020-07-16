class ImagePopup extends Popup {

  constructor(element) {
    super(element);
    this.image = element.querySelector('.popup__image-open');
  }

  open(imageUrl) {
    this.image.setAttribute('src', imageUrl);
    super.open();
  }
}