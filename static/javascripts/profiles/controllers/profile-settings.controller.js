(function () {
    'use strict';

    angular
        .module('thinkster.profiles.controllers')
        .controller('ProfileSettingsController', ProfileSettingsController);

    ProfileSettingsController.$inject = [
        '$location', '$routeParams', 'Authentication', 'Profile', 'Snackbar'];

    function ProfileSettingsController($location, $routeParams, Authentication, Profile, Snackbar) {
        var vm = this;
        vm.destroy = destroy;
        vm.update = update;

        activate();

        function activate() {
            var authenticatedAccount = Authentication.getAuthenticatedAccount(),
                username = $routeParams.username.substr(1);

            if (!authenticatedAccount) {
                $location.url('/');
                Snackbar.error('Необходимо авторизоваться');
            } else if (authenticatedAccount.username !== username) {
                $location.url('/');
                Snackbar.error('Нет доступа к этой странице');
            }

            Profile.get(username).then(profileSuccessFn, profileFailureFn);

            function profileSuccessFn(data) {
                vm.profile = data.data;
            }

            function profileFailureFn() {
                $location.url('/');
                Snackbar.error('Пользователь не существует');
            }
        }

        function destroy() {
            Profile.destroy(vm.profile).then(profileSuccessFn, profileFailureFn);

            function profileSuccessFn() {
                Authentication.unauthenticate();
                window.location = '/';
                Snackbar.show('Профиль удален');
            }

            function profileFailureFn(data) {
                Snackbar.error(data.data.error);
            }
        }

        function update() {
            Profile.update(vm.profile).then(profileSuccessFn, profileFailureFn);

            function profileSuccessFn(data) {
                Snackbar.show('Профиль обновлен');
            }

            function profileFailureFn() {
                $location.url('/');
                Snackbar.error('Пользователь не существует');
            }
        }
    }
})();
