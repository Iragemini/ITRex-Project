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

  try {
    const response = await axios(config)
    localStorage.setItem('token', response.data.token);
    location.assign('/');
  } catch (error) {
    console.log(error);
  }
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

  try {
    const response = await axios(config)
    localStorage.setItem('token', response.data.token);
    location.assign('/process');
  } catch (error) {
    console.log(error);
  }
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

  try {
    const response = await axios(config)
    if (response.status === 201) {
      location.assign('/');
    }
  } catch (error) {
    alert(error.response.data.message)
    console.log(error.response);
  }
};

export { signin, signup, doctorSignin };
