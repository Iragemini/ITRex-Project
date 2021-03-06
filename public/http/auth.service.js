import Service from './Service.js';

class AuthService extends Service {
  getUser = async () => {
    const res = await this.getResource('/user');
    return res;
  };

  registerUser = async (data) => {
    const res = await this.postPublicResource('/signup', data);
    return res;
  };

  authenticateUser = async (data) => {
    const res = await this.postPublicResource('/login', data);
    return res;
  };
}

const authService = new AuthService();

export default authService;
