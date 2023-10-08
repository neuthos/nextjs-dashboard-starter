/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */

const { NextFederationPlugin } = require('@module-federation/nextjs-mf');
const apm = require('elastic-apm-node');
const apmConfig = require('./elastic-apm-node');

module.exports = {
  output: 'standalone',
  eslint: {
    dirs: ['.'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_SICS_HOME: process.env.NEXT_PUBLIC_SICS_HOME,
    NEXT_PUBLIC_SICS_MEMBER: process.env.NEXT_PUBLIC_SICS_MEMBER,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_PRODUCT_NAME: process.env.NEXT_PUBLIC_PRODUCT_NAME,
  },
  serverRuntimeConfig: {
    OIDC_ISSUER: process.env.OIDC_ISSUER,
    OIDC_CLIENT_ID: process.env.OIDC_CLIENT_ID,
    OIDC_CLIENT_SECRET: process.env.OIDC_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ?? '',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? 'http://localhost:3000',
    IRSX_SECRET: process.env.IRSX_SECRET,
    ELASTIC_APM_SERVICE_NAME: process.env.ELASTIC_APM_SERVICE_NAME,
    ELASTIC_APM_SERVER_URL: process.env.ELASTIC_APM_SERVER_URL,
    ELASTIC_APM_SECRET_TOKEN: process.env.ELASTIC_APM_SECRET_TOKEN,
    ELASTIC_APM_HOSTNAME: process.env.ELASTIC_APM_HOSTNAME,
  },
  reactStrictMode: false,
  images: {
    domains: [
      'api.dicebear.com',
      'source.unsplash.com',
      'irmastore.sgp1.digitaloceanspaces.com',
    ],
  },
  webpack(config, options) {
    const { isServer, dev } = options;
    const runApm = !dev && process.env.NODE_ENV === 'production';
    // eslint-disable-next-line no-console
    console.log(
      `is apm running? ${runApm} config: ${JSON.stringify(apmConfig)}`
    );

    if (runApm) {
      if (apmConfig.serverUrl && apmConfig.secretToken) {
        apm.start(apmConfig);
      } else {
        // eslint-disable-next-line no-console
        console.log('apm tidak terinisialisasi karena env tidak ada');
      }
    }

    config.plugins.push(
      new NextFederationPlugin({
        name: 'sics_simpin',
        remotes: {
          sics_home: `sics_home@${
            process.env.NEXT_PUBLIC_SICS_HOME
          }/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
          sics_member: `sics_member@${
            process.env.NEXT_PUBLIC_SICS_MEMBER
          }/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
        },
        filename: 'static/chunks/remoteEntry.js',
      })
    );

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
