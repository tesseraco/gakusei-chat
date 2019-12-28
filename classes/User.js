module.exports = class User {
  constructor(name, id, isAdmin = false) {
    this.userName = name;
    this.userId = id;
    this.isAdmin = isAdmin;
  }
}
