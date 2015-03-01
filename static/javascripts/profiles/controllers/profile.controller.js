(function () {
    'use strict';

    angular
        .module('thinkster.profiles.controllers')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = [
        '$location', '$routeParams', 'Posts', 'Profile', 'Snackbar'];

    function ProfileController($location, $routeParams, Posts, Profile, Snackbar) {
        var vm = this;
        vm.profile = undefined;
        vm.posts = [];

        activate();

        function activate() {
            var username = $routeParams.username.substr(1);
            Profile.get(username).then(profileSuccessFn, profileFailureFn);
            Posts.get(username).then(postsSuccessFn, postsFailureFn);

            function profileSuccessFn(data) {
                vm.profile = data.data;
            }

            function profileFailureFn() {
                $location.url('/');
                Snackbar.error('Пользователь не существует');
            }

            function postsSuccessFn(data) {
                vm.posts = data.data;
            }

            function postsFailureFn() {
                Snackbar.error(data.data.error);
            }
        }
    }
})();
