export const getStorageItem = (name: string) => {
  const itemString = localStorage.getItem(name);

  // console.log('itemString', { itemString, name });

  const item = JSON.parse(itemString || '""');
  return item;
};

export const setStorageItem = async (key: string, value: string | null) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const clearStorage = async () => {
  localStorage.clear();
};

//Access Token
export const getStorageAccessToken = () => {
  const userToken = getStorageItem('@user_AccessToken');
  return userToken;
};

export const setStorageAccessToken = async (token: string | null) => {
  setStorageItem('@user_AccessToken', token);
};

//Refresh Token
export const getStorageRefreshToken = () => {
  const userToken = getStorageItem('@user_RefreshToken');
  return userToken;
};

export const setStorageRefreshToken = async (token: string | null) => {
  setStorageItem('@user_RefreshToken', token);
};

//Metamask Token
export const getStorageMetamaskToken = () => {
  const userToken = getStorageItem('@user_MetamaskToken');
  return userToken;
};

export const setStorageMetamaskToken = async (token: string | null) => {
  setStorageItem('@user_MetamaskToken', token);
};
