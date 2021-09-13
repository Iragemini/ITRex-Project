/* eslint-disable */

const signin = async (email, password) => {
  const config = {
    method: 'POST',
    url: 'http://127.0.0.1:3000/api/login',
    data: {
      email,
      password,
    },
  };

  const res = await axios(config)
    .then(function (response) {
      if (response.status === 200) {
        location.assign('/');
      }
    })
    .catch(function (error) {
      alert(error);
      // showAlert('error', error.response.data.message);
    });
};


const doctorSignin = async (email, password) => {
  const config = {
    method: 'POST',
    url: 'http://127.0.0.1:3000/api/login',
    data: {
      email,
      password,
    },
  };

  const res = await axios(config)
    .then(function (response) {
      if (response.status === 200) {
        location.assign('/process');
      }
    })
    .catch(function (error) {
      alert(error);
      // showAlert('error', error.response.data.message);
    });
};

const signout = async () => {
  const config = {
    method: 'GET',
    url: 'http://127.0.0.1:3000/api/signout',
  };

  const res = await axios(config)
    .then(function (response) {
      if (response.status === 200) {
        location.assign('/');
      }
    })
    .catch(function (error) {
      alert(error);
      // showAlert('error', error.response.data.message);
    });
};

const signup = async (
  name,
  email,
  password,
  passwordConfirm,
  gender,
  birthday,
) => {
  const config = {
    method: 'POST',
    url: 'http://127.0.0.1:3000/api/signup',
    headers: {},
    data: {
      name,
      email,
      password,
      passwordConfirm,
      gender,
      birthday,
    },
  };

  const res = await axios(config)
    .then(function (response) {
      if (response.status === 201) {
        location.assign('/');
      }
    })
    .catch(function (error) {
      alert(error);
      // showAlert('error', error.response.data.message);
    });
};

export { signin, signout, signup, doctorSignin };
