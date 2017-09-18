var keycloakConfig = require('../../config.json');

require('@raincatcher/angularjs-auth-keycloak')('wfm-mobile', keycloakConfig.keycloak, keycloakConfig.keycloakInit);
