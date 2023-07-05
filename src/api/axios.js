import axios from 'axios';
//helpers
import {
  getStorageAccessToken,
  getStorageRefreshToken,
  setStorageAccessToken,
} from './helpers';

const axiosApiInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosApiInstance.interceptors.request.use(
  async (config) => {
    // console.log('axiosApiInstance request config', config.url);
    const token = config.token || (await getStorageAccessToken());
    // console.log('axiosApiInstance token', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data?.formData) {
      // console.log('config formdata <--');
      delete config.data.formData;
      const formData = new FormData();
      Object.keys(config.data).map((key) => {
        return formData.append(key, config.data[key]);
      });
      config.data = formData;
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApiInstance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    // console.log(
    //   'axiosApiInstance response error',
    //   error,
    //   error.response.status,
    //   error.config._isRetry
    // );
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        // console.log('refresh');
        const { data } = await refreshToken();
        // console.log('axiosApiInstance refresh-token', data);
        if (data) {
          setStorageAccessToken(data?.accessToken);
          axios.defaults.headers.common.Authorization =
            'Bearer ' + data?.accessToken;
        }

        return await axiosApiInstance.request(originalRequest);
      } catch (e) {
        console.log('Not auth');
        // return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

async function refreshToken(Token) {
  let token = Token || (await getStorageRefreshToken());

  return axiosApiInstance.post(
    'public/common/access/refresh-token',
    {
      refreshToken: token,
    },
    { _isRetry: true }
  );
}

export default axiosApiInstance;
