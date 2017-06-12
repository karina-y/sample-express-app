(function () {
    "use strict";

    angular.module(APPNAME)
    .factory('$baseService', baseServiceFactory);

    baseServiceFactory.$inject = ['$window', '$location', '$http', '$q', '$timeout'];

    function baseServiceFactory($window, $location, $http, $q, $timeout) {

        var bsf = this;
        bsf.$http = $http;
        bsf.$q = $q;
        bsf.$timeout = $timeout;

        function getChangeNotifier($scopeFromController) {

            function NotifyConstructor($s) {
                var self = this;

                self.scope = $s;

                return function (fx) {
                    self.scope.$apply(fx);
                }
            }

            return new NotifyConstructor($scopeFromController);
        }

        var baseService = {
            $window: $window
            , getNotifier: getChangeNotifier
            , $location: $location
            , merge: $.extend
            , $http: bsf.$http
            , $q: bsf.$q
            , $timeout: bsf.$timeout
        };

        return baseService;
    }
})();