var Router = require('route-tree');

module.exports = new Router({
    home:{
        _url: ['/', ''],
        signin:{
            _url: '/signin'
        },
        users: {
            _url: '/users'
        },
        majigger: {
            _url: '/majigger'
        },
        things: {
            _url: '/things'
        },
        whatsits: {
            _url: '/whatsits' //don't need them but examples anyway
        }
    },
    usersData: {
        _url: '/api/users'
    }
});