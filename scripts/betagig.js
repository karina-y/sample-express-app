var APPNAME = 'BetagigApp';

var betagig = {
    utilities: {}
    , layout: {}
    , page: {
        handlers: {
        }
        , startUp: null
    }
    , services: {}
    , ui: {}
};

betagig.moduleOptions = {
    APPNAME: "BetagigApp"
        , extraModuleDependencies: []
        , runners: []
        , page: betagig.page
}


betagig.layout.startUp = function () {
    console.debug("betagig.layout.startUp");

    if (betagig.page.startUp) {
        console.debug("betagig.page.startUp");
        betagig.page.startUp();
    }
};

betagig.APPNAME = "BetagigApp";

$(document).ready(betagig.layout.startUp);