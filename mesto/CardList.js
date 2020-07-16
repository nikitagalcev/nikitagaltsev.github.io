class CardList {
  constructor(container) {
    this.container = container;
  }

  addCard(card) {
    this.container.append(card)
  }

  render(startCards) {
    startCards.forEach(card => this.addCard(card));
  }
}