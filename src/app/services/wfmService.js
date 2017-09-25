var WfmService = require('@raincatcher/wfm').WfmService;

angular.module('wfm.common.apiservices').service("wfmService", ["workorderService", "userService", function(workorderService, userService) {
  return new WfmService(workorderService, userService);
}]);
