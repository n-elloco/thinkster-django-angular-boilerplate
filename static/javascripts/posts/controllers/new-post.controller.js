(function () {
    'use strict';

    angular
        .module('thinkster.posts.controllers')
        .controller('NewPostController', NewPostController);

    NewPostController.$inject = [
        '$rootScope', '$scope', 'Authentication', 'Posts', 'Snackbar'];

    function NewPostController($rootScope, $scope, Authentication, Posts, Snackbar) {
        var vm = this;

        vm.submit = submit;

        function submit() {
            $rootScope.$broadcast('post.created', {
                content: vm.content,
                author: {
                    username: Authentication.getAuthenticatedAccount().username
                }
            });
            $scope.closeThisDialog();
            Posts.create(vm.content).then(createPostSuccessFn, createPostFailureFn);

            function createPostSuccessFn() {
                Snackbar.show('Запись создана');
            }

            function createPostFailureFn(data) {
                $rootScope.$broadcast('post.created.error');
                Snackbar.error(data.error);
            }
        }
    }
})();
