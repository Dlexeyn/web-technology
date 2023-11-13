import axios from 'axios';

const API_URL = 'http://localhost:5000/';

class HandlerService{
  async initBrokerStocks(id){
    return await axios.get(API_URL + 'brokers/stocks/' + id)
      .then(res => {
        if(res.data){
          return res.data;
        }
        else {
          throw new Error("Broker stocks not found!");
        }
      })
  }

  async buyStock(data) {
    return axios.post(API_URL + 'market/buy', data)
      .then(res => {
        if(res.data){
          return res.data;
        }
        else {
          throw new Error("Broker transaction error!");
        }
      })
  }

  async sellStock(data) {
    return axios.post(API_URL + 'market/sell', data)
      .then(res => {
        if(res.data){
          return res.data;
        }
        else {
          throw new Error("Broker transaction error!");
        }

      })
  }

  async getCash(id) {
    return axios.get(API_URL + 'brokers/cash/' + id)
      .then(res => {
        if(res.data){
          return res.data;
        }
        else {
          throw new Error("Broker not found!");
        }
      })
  }
}

export default new HandlerService();
