function UserService(authService) {
  this.auth = authService;
}

/**
 * Fetch profile data of currently logged in user
 */
UserService.prototype.readUser = function readUser() {
  return this.auth.getProfile();
};

/**
 * Checks if user has proper role
 * @argument role - role for user
 * @argument resource - (optional) resource user want to access
 */
UserService.prototype.hasRole = function hasRole(role, resource) {
  return this.auth.hasRole(role, resource);
};

/**
 * Perform login operation
 */
UserService.prototype.login = function login() {
  return this.auth.login();
};

/**
 * Perform logout operation
 */
UserService.prototype.logout = function logout() {
  return this.auth.logout();
};

/**
 * Authenticate by providing user name and password
 */
UserService.prototype.authenticate = function authenticate(username, password) {
  return this.auth.authenticate(username, password);
};

angular.module('wfm.common.apiservices').service('userService', ['authService', function(authService) {
  return new UserService(authService);
}]);
