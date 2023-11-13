import axios from 'axios';

const API_URL = 'http://localhost:5000/brokers/';

class AuthService{
  async login(username){
    return axios.post(API_URL + 'login', {
      username: username
    })
      .then(res => {
        console.log(res);
        if(res.data){
          return res.data;
        }
        else {
          throw new Error("Broker not found!");
        }
      })
  }
}

export default new AuthService();
