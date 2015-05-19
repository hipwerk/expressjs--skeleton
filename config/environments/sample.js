/*
 * Sample config
 *
 * Usage: rename the file to an environment name, for example `development.js`
 *
 */

module.exports = {
  port: 3000,
  host: '127.0.0.1',
  domain: '//localhost',
  baseUrl: '//localhost:3000',
  app: {
    name: 'hipwerk',
    title: 'Startup-minded Web & Mobile development from Cluj-Napoca, Romania'
  },
  env: {
    serverStatic: process.env['NODE_SERVE_STATIC'] || 1,                        // serve satic files from public folder
    trustProxy: process.env['NODE_TRUST_PROXY'] || 0                            // if behind a proxy set it to `1`
  }
};
