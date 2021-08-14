class Service {
  constructor() {
    this.base = 'http://localhost:3000/api';
    this.headers = { 'Content-Type': 'application/json' };
  }

  errorHandler = (url, err) => {
    let code = '';
    let message = '';
    if (err.code) {
      code = err.code;
    } else {
      code = err.status;
    }
    if (err.message) {
      message = err.message;
    }
    const error = new Error();
    error.code = code;
    error.message = message;
    error.text = `Could not fetch ${url}, received ${code}`;
    throw error;
  };

  /* GET */
  getResource = async (url) => {
    const response = await fetch(`${this.base}${url}`, {
      method: 'GET',
      headers: this.headers,
    });
    if (!response.ok) {
      this.errorHandler(`${this.base + url}`, await response.json());
    }
    const result = await response.json();
    return result;
  };

  /* POST */
  postResource = async (url, data = {}) => {
    const response = await fetch(`${this.base}${url}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      this.errorHandler(`${this.base + url}`, await response.json());
    }
    const result = await response.json();
    return result;
  };

  /* PATCH */
  patchResource = async (url, data = {}) => {
    const response = await fetch(`${this.base}${url}`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      this.errorHandler(`${this.base + url}`, await response.json());
    }
    const result = await response.json();
    return result;
  };

  /* DELETE */
  deleteResource = async (url, data = {}) => {
    const response = await fetch(`${this.base}${url}`, {
      method: 'DELETE',
      headers: this.headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      this.errorHandler(`${this.base + url}`, await response.json());
    }
    const result = await response.json();
    return result;
  };

  /* QUEUE */
  getCurrentInQueue = async () => {
    const res = await this.getResource('/queue');
    return res;
  };

  postPatientInQueue = async (data) => {
    const res = await this.postResource('/queue', data);
    return res;
  };

  deletePatientFromQueue = async (name) => {
    const res = await this.deleteResource(`/queue/${name}`);
    return res;
  };

  /* RESOLUTION */
  getResolution = async (name) => {
    const res = await this.getResource(`/resolution/${name}`);
    return res;
  };

  patchResolution = async (name, data) => {
    const res = await this.patchResource(`/resolution/${name}`, data);
    return res;
  };

  deleteResolution = async (name) => {
    const res = await this.patchResource(`/resolution/${name}/delete`);
    return res;
  };
}

const service = new Service();

export default service;
