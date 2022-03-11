module.exports = function () {
    this.login = function hello(params, session) {
        return 'hello world';
    };

    this.bye = function (params, session) {
        session.socket.leave('javier-channel');
    };
};
