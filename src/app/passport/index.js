var passportClient = require('@raincatcher/angularjs-auth-passport');

passportClient.init('wfm-mobile');
var MOBILE_AUTH_MODULE_ID = "wfm.auth.mobile.passport";
var MobileAuthService = passportClient.MobileAuthService;

// TODO externalize appInit from that
var angularModule = angular.module(MOBILE_AUTH_MODULE_ID, []);

angular.module(MOBILE_AUTH_MODULE_ID).factory('authService', ['$http', '$window', '$mdDialog', '$state',
  function($http, $window, $mdDialog, $state) {
    return new MobileAuthService($http, $window, $mdDialog, $state);
  }]);

passportClient.tokenInterceptor(angularModule);

module.exports = MOBILE_AUTH_MODULE_ID;
