'use strict';

app.controller('TaskController', ['$scope', '$state', '$modal', 'taskServices', function($scope, $state, $modal, taskServices) {

    taskServices.getTask()
        .then(function(data) {
            $scope.tasks = data;
        },
        function(data) {
           console.log('error', data);
        });

    $scope.addTask = function() {

        console.log("addTask");

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'addTaskModalContent.html',
            controller: 'addTaskModalInstanceCtrl',
            size: '',
            keyboard: false,
            resolve: {
                //index: id
            }
        });

        modalInstance.result
            .then(function (task) {
                $scope.tasks.push(task);

            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
    };

    $scope.editTask = function(formData) {

        console.log("editTask");

        var taskData = angular.copy(formData);

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'addTaskModalContent.html',
            controller: 'editTaskModalInstanceCtrl',
            size: '',
            keyboard: false,
            resolve: {
                formData: taskData
            }
        });

        modalInstance.result
            .then(function (task) {

                for(var i = 0; i < $scope.tasks.length; i++) {
                    if($scope.tasks[i].id == task.id) {
                        $scope.tasks[i] = task;
                    }
                }

            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
    };

    $scope.deleteTask = function(id) {

        console.log("deleteTask");

        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'deleteTaskModalContent.html',
            controller: 'deleteTaskModalInstanceCtrl',
            size: '',
            keyboard: false,
            resolve: {
                index: id
            }
        });

        modalInstance.result
            .then(function (deleted_id) {

                for (var i = 0; i < $scope.tasks.length; i++) {
                    if ($scope.tasks[i].id == deleted_id) {
                        $scope.tasks.splice(i, 1);
                    }
                }

            }, function () {
                console.log('Modal dismissed at: ' + new Date());
            });
    };

}]);


app.controller('addTaskModalInstanceCtrl', ['$scope', '$state', '$modalInstance', 'taskServices', function ($scope, $state, $modalInstance, taskServices) {

    $scope.model = { 'description': '' , 'poll_key' : $state.current.poll_key };

    $scope.save = function () {
      console.log('Model ',$scope.model)
        taskServices.addTask($scope.model)
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


app.controller('editTaskModalInstanceCtrl', ['$scope', '$modalInstance', 'taskServices', 'formData', function ($scope, $modalInstance, taskServices, formData) {

    $scope.model = formData;

    $scope.save = function () {

        taskServices.editTask($scope.model)
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


app.controller('deleteTaskModalInstanceCtrl', ['$scope', '$modalInstance', 'index', 'taskServices', function ($scope, $modalInstance, index, taskServices) {

    $scope.ok = function () {
        taskServices.deleteTask(index)
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
