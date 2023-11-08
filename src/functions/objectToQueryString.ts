/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */

function objectToQueryString(obj: any) {
  const keyValuePairs = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key]) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(obj[key]);
      keyValuePairs.push(`${encodedKey}=${encodedValue}`);
    }
  }

  return keyValuePairs.join('&');
}

export default objectToQueryString;
