var config = require("../../config.json").sync;
var _ = require('lodash');
var Promise = require('bluebird');
var logger = require('@raincatcher/logger');
var syncClient = require("@raincatcher/datasync-client");
var syncNetworkInit = require('./init/syncGlobalNetworkInit');
var syncServices = require('./syncDataServices');

var DataManager = syncClient.DataManager;
var syncApi = syncClient.sync;


/**
 * Hides complexity of all sync operations and allow to register/unregister datasets
 */
var SyncManager = function() {
  // Contains all dataset managers initialized by this class
  this.syncManagers = [];
  // Promise that will be satisfied when managers will be activated
};

/**
* Manage sync dataset
*
* @param {*} datasetId
* @param {*} options
* @param {*} queryParams
* @param {*} metaData
*/
SyncManager.prototype.manageDataset = function(datasetId, options, queryParams, metaData) {
  return new Promise(function(resolve, reject) {
    syncApi.manage(datasetId, options, queryParams, metaData, function(err) {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
};

/**
 * Remove synchronization managers
 */
SyncManager.prototype.removeManagers = function() {
  var self = this;
  if (this.syncManagers) {
    return Promise.map(this.syncManagers, function(syncManager) {
      syncManager.safeStop()
        .then(function() {
          syncManager.clearCache();
        })
        .then(function() {
          self.syncManagers = [];
        });
    });
  }
  return Promise.resolve();
};

/**
 * Create array of sync managers that can be used to do data operations
 */
SyncManager.prototype.syncManagerMap = function(profileData) {
  var self = this;
  if (!profileData) {
    return Promise.resolve({});
  }

  if (this.syncManagers.length !== 0) {
    return Promise.resolve(this.syncManagers);
  }

  var filter = {
    'assignee': profileData.id
  };
  //Initialisation of sync data sets to manage.
  return Promise.all([
    self.manageDataset(config.datasetIds.workorders, config.syncOptions.workorders, filter, {})
  ]).then(function() {
    var workorderManager = new DataManager(config.datasetIds.workorders);
    workorderManager.start(function() { }); //start sync for this dataset
    self.syncManagers.push(workorderManager);
    syncServices.workordersService.setManager(workorderManager);

    // Force sync to make sure that data is automatically refreshed
    self.forceSync(self.syncManagers).delay(config.forceSyncDelay * 1000).then(function() {
      self.forceSync(self.syncManagers);
    });
    return self.syncManagers;
  });
};

/**
 * Force sync to be executed.
 * Note: Due to async behavior of sync we cannot guarantee that response will return latest data.
 */
SyncManager.prototype.forceSync = function(managers) {
  var promises = [];
  _.forOwn(managers, function(manager) {
    promises.push(
      manager.forceSync()
        .then(function() {
          return manager;
        })
    );
  });
  return Promise.all(promises);
};

/**
 * Service to manage init all of the sync data sets.
 *
 * @param $q
 * @returns {{}}
 * @constructor
 */
function createGlobalManagerService($http, authService) {
  //Init the sync service
  syncNetworkInit.initSync($http).catch(function(error) {
    logger.getLogger().error("Failed to initialize sync", error);
  });
  var syncManager = new SyncManager();
  authService.setLoginListener(function(profileData) {
    syncManager.syncManagerMap(profileData);
  });

  authService.setLogoutListener(function() {
    syncManager.removeManagers();
  });
  return syncManager;
}

angular.module('wfm.sync')
  .service('syncGlobalManager', ['$http', 'authService', createGlobalManagerService]);
