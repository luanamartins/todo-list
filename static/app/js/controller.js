'use strict';

app.controller('PollController', ['$scope', '$state', '$modal', 'pollServices', function($scope, $state, $modal, pollServices) {

    pollServices.getPoll()
        .then(function(data) {
            $scope.polls = data;
        },
        function(data) {
           console.log('error', data);
        });

    $scope.addPoll = function() {

        console.log("addPoll");

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'addPollModalContent.html',
            controller: 'addPollModalInstanceCtrl',
            size: '',
            keyboard: false,
            resolve: {
                //index: id
            }
        });

        modalInstance.result
            .then(function (poll) {
                $scope.polls.push(poll);

            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
    };

    $scope.editPoll = function(formData) {

        console.log("editPoll");

        var pollData = angular.copy(formData);

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'addPollModalContent.html',
            controller: 'editPollModalInstanceCtrl',
            size: '',
            keyboard: false,
            resolve: {
                formData: pollData
            }
        });

        modalInstance.result
            .then(function (poll) {

                for(var i = 0; i < $scope.polls.length; i++) {
                    if($scope.polls[i].id == poll.id) {
                        $scope.polls[i] = poll;
                    }
                }

            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
    };

    $scope.viewPoll = function(poll_id, link){
      $state.get("task").poll_key = poll_id;
      $state.go("task");
    };

    $scope.deletePoll = function(id) {

        console.log("deletePoll");

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'deletePollModalContent.html',
            controller: 'deletePollModalInstanceCtrl',
            size: '',
            keyboard: false,
            resolve: {
                index: id
            }
        });

        modalInstance.result
            .then(function (deleted_id) {

                for (var i = 0; i < $scope.polls.length; i++) {
                    if ($scope.polls[i].id == deleted_id) {
                        $scope.polls.splice(i, 1);
                    }
                }

            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
    };

}]);


app.controller('addPollModalInstanceCtrl', ['$scope', '$modalInstance', 'pollServices', function ($scope, $modalInstance, pollServices) {

    $scope.model = {'title': '', 'description': ''};

    $scope.save = function () {

        pollServices.addPoll($scope.model)
            .then(function(data) {

                $modalInstance.close(data);

            }, function(data) {
               console.log('error', data);
            });
    };

    $scope.cancel = function () {
       $modalInstance.dismiss('cancel');
    };

}]);


app.controller('editPollModalInstanceCtrl', ['$scope', '$modalInstance', 'pollServices', 'formData', function ($scope, $modalInstance, pollServices, formData) {

    $scope.model = formData;

    $scope.save = function () {

        pollServices.editPoll($scope.model)
            .then(function(data) {

                $modalInstance.close(data);

            }, function(data) {
                console.log('error', data);
            });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}]);


app.controller('deletePollModalInstanceCtrl', ['$scope', '$modalInstance', 'index', 'pollServices', function ($scope, $modalInstance, index, pollServices) {

    $scope.ok = function () {
        pollServices.deletePoll(index)
            .then(function(data) {

                $modalInstance.close(index);

            }, function(data) {
               console.log('error', data);
            });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
