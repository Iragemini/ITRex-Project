import constants from "./constants.js";

const { baseUrl } = constants;

const signin = async (email, password) => {
  const config = {
    method: 'POST',
    url: `${baseUrl}/api/login`,
    data: {
      email,
      password,
    },
  };

  axios(config)
    .then(function (response) {
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        location.assign('/');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};


const doctorSignin = async (email, password) => {
  const config = {
    method: 'POST',
    url:  `${baseUrl}/api/login`,
    data: {
      email,
      password,
    },
  };

  axios(config)
    .then(function (response) {
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        location.assign('/process');
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};

const signup = async (
  name,
  email,
  password,
  confirmPassword,
  gender,
  birthDate,
) => {
  const config = {
    method: 'POST',
    url:  `${baseUrl}/api/signup`,
    data: {
      name,
      email,
      password,
      confirmPassword,
      gender,
      birthDate,
    },
  };

  axios(config)
    .then(function (response) {
      if (response.status === 201) {
        location.assign('/');
      }
    })
    .catch(function (error) {
      alert(error.response.data.message)
      console.log(error.response);
    });
};

export { signin, signup, doctorSignin };
