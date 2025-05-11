'use strict';

/**
 * dock controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::dock.dock');
