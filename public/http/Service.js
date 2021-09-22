import getToken from './utils/token.js';
export default class Service {
  constructor() {
    this.base = 'http://localhost:3000/api';
    this.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
  }

  headersWithToken = () => {
    this.headers.Authorization = getToken();
    return this.headers;
  };

  errorHandler = (url, err) => {
    const error = new Error();
    const code = err.code ? err.code : err.status;
    const message = err.message ? err.message : '';
    error.code = code;
    error.message = message;
    error.text = `Could not fetch ${url}, received ${code}`;
    throw error;
  };

  makeRequest = async (url, options) => {
    try {
      const response = await fetch(`${this.base}${url}`, options);
      if (!response.ok) {
        this.errorHandler(`${this.base + url}`, await response.json());
      }
      const responseHeaders = response.headers.get('content-type');
      if (!responseHeaders) {
        return {};
      }
      const type = responseHeaders.split(';')[0];
      let result = {};
      if (type === 'application/json') {
        result = await response.json();
      }
      return result;
    } catch (error) {
      this.errorHandler(url, error);
    }
  };

  /* GET */
  getResource = async (url) => {
    const options = {
      method: 'GET',
      withCredentials: true,
      headers: this.headersWithToken(),
    };
    const result = await this.makeRequest(url, options);
    return result;
  };

  /* GET PUBLIC */
  getPublicResource = async (url) => {
    const options = {
      method: 'GET',
      headers: this.headers,
    };
    const result = await this.makeRequest(url, options);
    return result;
  };

  /* POST */
  postResource = async (url, data = {}) => {
    const options = {
      method: 'POST',
      withCredentials: true,
      headers: this.headersWithToken(),
      body: JSON.stringify(data),
    };
    const result = await this.makeRequest(url, options);
    return result;
  };

  /* POST PUBLIC */
  postPublicResource = async (url, data = {}) => {
    const options = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    };
    const result = await this.makeRequest(url, options);
    return result;
  };

  /* PATCH */
  patchResource = async (url, data = {}) => {
    const options = {
      method: 'PATCH',
      withCredentials: true,
      headers: this.headersWithToken(),
      body: JSON.stringify(data),
    };
    const result = await this.makeRequest(url, options);
    return result;
  };

  /* DELETE */
  deleteResource = async (url, data = {}) => {
    const options = {
      method: 'DELETE',
      withCredentials: true,
      headers: this.headersWithToken(),
      body: JSON.stringify(data),
    };
    const result = await this.makeRequest(url, options);
    return result;
  };
}
