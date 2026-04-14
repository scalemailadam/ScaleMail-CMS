'use strict';

/**
 * system-settings service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::system-settings.system-settings');
