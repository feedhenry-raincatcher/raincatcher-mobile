function UserService(authService) {
  this.auth = authService;
}

/**
 * Fetch profile data of currently logged in user
 */
UserService.prototype.readUser = function readUser() {
  return this.auth.getProfile();
};

UserService.prototype.hasResourceRole = function hasResourceRole(role) {
  return this.auth.hasResourceRole(role);
};

UserService.prototype.login = function login() {
  return this.auth.login();
};

UserService.prototype.logout = function logout() {
  return this.auth.logout();
};

UserService.prototype.authenticate = function authenticate(username, password) {
  return this.auth.authenticate(username, password);
};

angular.module('wfm.common.apiservices').service('userService', ['authService', function(authService) {
  return new UserService(authService);
}]);
