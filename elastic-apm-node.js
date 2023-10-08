module.exports = {
  serviceName: process.env.ELASTIC_APM_SERVICE_NAME ?? '',
  serverUrl: process.env.ELASTIC_APM_SERVER_URL ?? '',
  secretToken: process.env.ELASTIC_APM_SECRET_TOKEN ?? '',
  hostname: process.env.ELASTIC_APM_HOSTNAME ?? '',
};
