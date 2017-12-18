'use strict';

var angular = require('angular');
window.async = require('async');
window._ = require('underscore');
var logger = require('@raincatcher/logger');
var $fh = require('fh-js-sdk');

var accidentStep = require('@raincatcher-examples/step-accident');
var vehicleInspectionStep = require('@raincatcher-examples/step-vehicle-inspection');
var signatureStep = require('@raincatcher/step-signature');
var galleryStep = require('@raincatcher/step-gallery');

logger.setLogger(new logger.ClientLogger(2));

angular.module('wfm-mobile', [
  require('angular-ui-router'),
  require('angular-material'),
  // Enables passport auth service to be used
  require('./passport'),
  require('@raincatcher/angularjs-auth')(),
  // Enables keycloak auth service to be used
  // require('./keycloak'),
  require('./services'),
  require('./sync'),
  // Set of the data services
  require('@raincatcher/angularjs-workflow')({
    mode: "user",
    mainColumnViewId: "content@app",
    toolbarViewId: "toolbar@app"
  }),
  require('@raincatcher/angularjs-workorder')({
    mode: "user",
    mainColumnViewId: "content@app",
    toolbarViewId: "toolbar@app"
  }),
  require('@raincatcher-examples/angularjs-extensions'),
  vehicleInspectionStep.ngModule(),
  accidentStep.ngModule(),
  signatureStep.ngModule(),
  galleryStep.ngModule($fh, undefined, "user")
]);


require('./initialisation');

