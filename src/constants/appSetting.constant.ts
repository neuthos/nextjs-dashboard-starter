import getConfig from 'next/config';

export const PublicAppSettings = {
  get current() {
    const config = getConfig();
    return { ...config.publicRuntimeConfig };
  },
};

export const PrivateAppSettings = {
  get current() {
    const config = getConfig();
    return { ...config.serverRuntimeConfig };
  },
};
