if (!betagig.messaging) {
    betagig.messaging = { services: {} };
}

betagig.messaging.services.getAllMessagesByCorrespondenceId = function (id, onSuccess, onError) {
    return this.$http.get('/api/messagethread/' + id)
                     .then(onSuccess)
                     .catch(onError);
}

betagig.messaging.services.getAllMessagesFromUserId = function (id, onSuccess, onError) {
    return this.$http.get('/api/message/' + id)
                     .then(onSuccess)
                     .catch(onError);
}

betagig.messaging.services.getAllMessagesToUserId = function (id, onSuccess, onError) {
    return this.$http.get('/api/messagesto/' + id)
                     .then(onSuccess)
                     .catch(onError);
}

betagig.messaging.services.addMessage = function (message, onSuccess, onError) {
    return this.$http.post('/api/message/', message)
                     .then(onSuccess)
                     .catch(onError);
}

betagig.messaging.services.updateMessageById = function (message, onSuccess, onError) {
    return this.$http.put('/api/message/', message)
                     .then(onSuccess)
                     .catch(onError);
}

betagig.messaging.services.deleteMessageById = function (id, onSuccess, onError) {
    return this.$http.delete('/api/message/' + id)
                     .then(onSuccess)
                     .catch(onError);
}