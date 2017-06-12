(function () {
    "use strict";

    angular.module(APPNAME)
     .factory('$messagingService', MessagingServiceFactory);

    MessagingServiceFactory.$inject = ['$baseService'];

    function MessagingServiceFactory($baseService) {
        var aMessagingServiceObject = betagig.messaging.services;
        var newService = $baseService.merge(true, {}, aMessagingServiceObject, $baseService);
        return newService;
    }
})();