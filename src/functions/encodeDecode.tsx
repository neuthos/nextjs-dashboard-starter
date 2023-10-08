export const EncodeData = (encodedURLData: string) => {
  try {
    const data = Buffer.from(encodedURLData, 'base64').toString('ascii');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

export const DecodeData = (data: any) => {
  try {
    const decodeData = Buffer.from(JSON.stringify(data));
    return decodeData.toString('base64');
  } catch (error) {
    return null;
  }
};
