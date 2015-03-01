angular
    .module('thinkster', [
        'thinkster.config',
        'thinkster.routes',
        'thinkster.authentication',
        'thinkster.layout',
        'thinkster.posts',
        'thinkster.profiles',
        'thinkster.utils'
    ])
    .run(run);

run.$inject = ['$http'];

angular.module('thinkster.config', []);
angular.module('thinkster.routes', ['ngRoute']);

function run($http) {
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
}
