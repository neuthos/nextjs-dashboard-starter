interface ProductConfigDto {
  envVal: string;
  TselKey: string;
  name: string;
  html: {
    title: string;
  };
  asset: {
    headerBg: string;
    toggleIcon: string;
    logoIcon: string;
    envelope: string;
  };
  color: {
    primary: {
      '700': string;
    };
    colorPrimary: string;
    bgPurple1: string;
    bgPurple2: string;
  };
}

const TselKey = 'KOPERASI_DIGITAL';
const envVal = process.env.NEXT_PUBLIC_PRODUCT_NAME ?? '';
const isKoperasiDigital = envVal === TselKey;

const ProductConfig: ProductConfigDto = {
  envVal,
  TselKey,
  name: isKoperasiDigital ? 'Koperasi Digital' : 'IRSX',
  html: {
    title: isKoperasiDigital ? 'Koperasi Digital' : 'Sics Console',
  },
  asset: {
    headerBg: isKoperasiDigital
      ? 'https://hay-images.sgp1.digitaloceanspaces.com/148e04ec5281a6a8576f406a9cf1fc04-original'
      : 'https://hay-images.sgp1.digitaloceanspaces.com/148e04ec5281a6a8576f406a9cf1fc04-original',

    toggleIcon: isKoperasiDigital
      ? 'https://hay-images.sgp1.digitaloceanspaces.com/05e42375c7686765e4d4d84d69a56706-original'
      : 'https://irmastore.sgp1.digitaloceanspaces.com/1686033405617_svg',

    logoIcon: isKoperasiDigital
      ? 'https://hay-images.sgp1.digitaloceanspaces.com/fc00104b02cb14975a829fe9c0c5c00b-original'
      : 'https://irmastore.sgp1.digitaloceanspaces.com/1686033429145_svg',

    envelope: isKoperasiDigital
      ? 'https://hay-images.sgp1.digitaloceanspaces.com/72e1d94ce5fc35001c7e65a94dbb3a2a-original'
      : 'https://irmastore.sgp1.digitaloceanspaces.com/1688107655262_svg',
  },

  color: {
    colorPrimary: isKoperasiDigital ? '#001A41' : '#5d15ed',
    bgPurple1: isKoperasiDigital ? '#001A41' : '#7D44F1',
    bgPurple2: isKoperasiDigital ? '#FFA8A8' : '#DABAFF',

    primary: {
      '700': isKoperasiDigital ? '#001A41' : '#380D8E',
    },
  },
};

export default ProductConfig;
