export default class Service {
  constructor() {
    this.base = 'http://localhost:3000/api';
    this.headers = { 'Content-Type': 'application/json' };
  }

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
      headers: this.headers,
    };
    return this.makeRequest(url, options);
  };

  /* POST */
  postResource = async (url, data = {}) => {
    const options = {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    };
    return this.makeRequest(url, options);
  };

  /* PATCH */
  patchResource = async (url, data = {}) => {
    const options = {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    };
    return this.makeRequest(url, options);
  };

  /* DELETE */
  deleteResource = async (url, data = {}) => {
    const options = {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(data),
    };
    return this.makeRequest(url, options);
  };
}
