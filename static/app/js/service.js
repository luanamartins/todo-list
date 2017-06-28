'use strict';

app.service('pollServices',[ '$q', '$http' , function($q, $http) {
    var service = {
        'request': function (args) {
            var API_URL = '/poll';

            args = args || {};
            var deferred = $q.defer(),
                url = API_URL + args.url,
                method = args.method || "GET",
                params = args.params || {},
                data = args.data || {};

            $http({
                url: url,
                method: method.toUpperCase(),
                params: params,
                data: data
            })
            .success(angular.bind(this, function (data, status, headers, config) {
                    deferred.resolve(data, status);
            }))
            .error(angular.bind(this, function (data, status, headers, config) {
                console.log("error syncing with: " + url);
                // Set request status
                deferred.reject(data, status, headers, config);
            }));
            return deferred.promise;
        },

        'getPoll': function() {
            return this.request({
                'method':"GET",
                'url':'/'
            })
        },

        'addPoll': function(args) {
            return this.request({
                'method': "POST",
                'url': '/',
                'data': args
            })
        },

        'editPoll': function(args) {
            return this.request({
				'method': "PUT",
				'url': "/"+args.id+"/",
                'data': args
			});
        },

        'deletePoll': function(id) {
            return this.request({
				'method': "DELETE",
				'url': "/"+id+"/"
			});
        },

        'searchPool': function() {

        },
    };

    return service;
}]);
