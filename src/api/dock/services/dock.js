'use strict';

/**
 * dock service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::dock.dock');
