module.exports = class User {
  constructor(name, id, isAdmin = false) {
    this.name = name;
    this.id = id;
    this.isAdmin = isAdmin;
  }
}
