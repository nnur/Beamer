angular.module('beamer.common.models', ['beamer.common.session'])
    .factory('user', ['session', '$resource', 'root', User])
    .factory('route', ['$resource', 'root', Route])
    .factory('blog', ['$resource', 'root', Blog]);
