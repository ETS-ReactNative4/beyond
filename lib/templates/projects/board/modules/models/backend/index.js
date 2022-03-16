module.exports = function (service) {
    this.users = new (require('./users'))();
};
