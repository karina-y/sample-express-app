(function () {
    "use strict";

    angular.module(APPNAME)
    .controller("messagingController", MessagingController);

    MessagingController.$inject = ['$scope', '$timeout', '$baseController', '$messagingService', 'messageCorrespondenceId'];

    function MessagingController(
        $scope
        , $timeout
        , $baseController
        , $messagingService
        , messageCorrespondenceId) {

        var vm = this;
        $baseController.merge(vm, $baseController);
        vm.$scope = $scope;
        vm.$timeout = $timeout;
        vm.$messagingService = $messagingService;
        vm.messageCorrespondenceId = messageCorrespondenceId;

        vm.currentUserId = 1;
        vm.currentUserMessages = [];
        vm.editing = false;
        vm.editMsg = {};
        vm.inboxCount = null;
        vm.messageThread =[];
        vm.newMessage = null;
        vm.sending = true;

        vm.cancelMessage = _cancelMessage;
        vm.deleteMessage = _deleteMessage;
        vm.editMessage = _editMessage;
        vm.getAllMessagesFromUserId = _getAllMessagesFromUserId;
        vm.getAllMessagesToUserId = _getAllMessagesToUserId;
        vm.getAllMessagesByCorrespondenceId = _getAllMessagesByCorrespondenceId;
        vm.sendMessage = _sendMessage;
        vm.updateMessage = _updateMessage;
        vm.error = _error;
        vm.threadUpdateSuccess = _threadUpdateSuccess;
        vm.updateMessageSuccess = _updateMessageSuccess;

        
        //correspondence user's messages
        if(vm.messageCorrespondenceId != null)
            $messagingService.getAllMessagesByCorrespondenceId(vm.messageCorrespondenceId, vm.getAllMessagesByCorrespondenceId, vm.error);
        
        //current user's messages
        else
            $messagingService.getAllMessagesFromUserId(vm.currentUserId, vm.getAllMessagesFromUserId, vm.error);


        function _getAllMessagesFromUserId(data) {
            vm.currentUserMessages = data.data;

            var arr = [];
            for(var i = 0; i< vm.currentUserMessages.length; i++){    
                if(arr.indexOf(vm.currentUserMessages[i].MessageCorrespondenceId) === -1){
                    arr.push(vm.currentUserMessages[i].MessageCorrespondenceId);        
                }        
            }
            
            vm.inboxCount = arr.length;

            $messagingService.getAllMessagesToUserId(vm.currentUserId, vm.getAllMessagesToUserId, vm.error);
        };

        function _getAllMessagesToUserId(data) {
            vm.correspondenceMessages = data.data.sort(function(a, b) {
                return parseInt(a.ParentMessageId) - parseInt(b.ParentMessageId);
            });
        }

        function _getAllMessagesByCorrespondenceId(data) {
            vm.messageThread = data.data.sort(function(a, b) {
                return parseInt(a.ParentMessageId) - parseInt(b.ParentMessageId);
            });

            console.log("message list", vm.messageThread);
        };

        function _editMessage(msg) {
            vm.newMessage = msg.MessageBody;
            vm.editMsg = msg;
            vm.editing = true;
            vm.sending = false;
        };

        function _updateMessage() {
            if(vm.newMessage != null && vm.newMessage != "")
            {
                vm.editMsg.MessageBody = vm.newMessage;
                vm.editMsg.DateUpdated = new Date();

                $messagingService.updateMessageById(vm.editMsg, vm.updateMessageSuccess, vm.error);
            }
            else {
                alert("Please enter a message");
            }
        };

        function _cancelMessage() {
            if(vm.newMessage != null && vm.newMessage != "" || vm.editing)
            {
                vm.newMessage = null;
                vm.editing = !vm.editing;
                vm.sending = !vm.sending;
            }
        };

        function _deleteMessage(id) {
            $messagingService.deleteMessageById(id, vm.threadUpdateSuccess, vm.error);
        };

        function _sendMessage() {
            if(vm.newMessage != null && vm.newMessage != "")
            {
                var lastMsg = vm.messageThread[vm.messageThread.length-1];
                var message = vm.messageThread[0];

                message.MessageId = message.MessageId + 1;
                message.ParentMessageId = lastMsg.ParentMessageId + 1;
                message.MessageBody = vm.newMessage;
                message.DateCreated = new Date();
                message.DateUpdated = new Date();

                $messagingService.addMessage(message, vm.threadUpdateSuccess, vm.error);
            }
            else {
                alert("Please enter a message");
            }
        };

        function _threadUpdateSuccess() {
            vm.$timeout(function () {
                vm.newMessage = null;
                $messagingService.getAllMessagesByCorrespondenceId(vm.messageCorrespondenceId, vm.getAllMessagesByCorrespondenceId, vm.error);
            }, 0);
        };

        function _updateMessageSuccess() {
            vm.$timeout(function () {
                vm.cancelMessage();
                $messagingService.getAllMessagesByCorrespondenceId(vm.messageCorrespondenceId, vm.getAllMessagesByCorrespondenceId, vm.error);
            }, 0);
        };        

        function _error(response) {
            console.log("error", response);
        };
    }
})();