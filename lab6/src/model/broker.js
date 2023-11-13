export default class Broker {
  constructor(id, username, cash) {
    this.id = id;
    this.username = username;
    this.cash = cash;
    this.stocks = [];
  }
}
