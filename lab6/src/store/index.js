import { createStore } from 'vuex'
import AuthService from "@/services/auth.service";
import io from 'socket.io-client'
import createWebSocketPlugin from "@/plugins/websocketPlugin";
import HandlerService from "@/services/handler.service";

const socketInstance = io('http://localhost:5001', {
  transports : ['websocket']
})

const webSocketPlugin = createWebSocketPlugin(socketInstance);

export default createStore( {
  state: {
    isLogged: false,
    broker: {},
    brokersPortfolio: {},
    stocks: [],
    settings: {},
    income: []
  },
  getters: {
    IS_LOGGED: state => {
      return state.isLogged;
    },
    STATE: state => {
      return state;
    },
    BROKER: state => {
      return state.broker;
    },
    NAME: state => {
      return state.broker.name;
    },
    CASH: state => {
      return state.broker.cash;
    },
    ID: state => {
      return state.broker.id;
    },
    DATE: state => {
      return state.settings.date;
    },
    STATUS: state => {
      return state.settings.status;
    },
    STOCKS: state => {
      return state.stocks;
    },
    getPortfolio: state => {
      return state.brokersPortfolio;
    },
    getIncome: state => {
      return state.income;
    }
  },
  mutations: {
    loginSuccess: (state, broker) => {
      state.isLogged = true;
      state.broker = broker
    },
    loginFailure: (state) => {
      state.isLogged = false;
    },
    logOut: (state) => {
      state.isLogged = false;
      state.broker = {};
      state.settings = {};
      state.stocks = [];
      state.brokersPortfolio = []
    },
    setSettings: (state, date, status) => {
      state.settings.date = date;
      console.log(status);
      if(status) {
        state.settings.status = 'Активны';
      } else {
        state.settings.status = 'Завершены';
      }
    },
    stopAuction: (state) => {
      state.settings.status = 'Завершены';
    },
    setStocks: (state, newStocks) => {
      console.log(newStocks);
      state.stocks = newStocks;
      state.settings.status = 'Активны';
    },
    setBrokersPortfolio: (state, newBrokersPortfolio) => {
      state.brokersPortfolio = newBrokersPortfolio;
    },
    setCash: (state, newCash) => {
      state.broker.cash = newCash;
    },
  },
  actions: {
    LOGIN: async (context, username) => {
      return await AuthService.login(username).then(
        broker => {
          context.commit('loginSuccess', broker);
        }
      )
      .catch(error => {
        context.commit('loginFailure');
      })
    },
    LOG_OUT: async (context) => {
      context.commit('logOut');
    },
    INIT_SETTINGS: async ({commit, state}, data) => {
      if(data.isStarted) {
        state.settings.status = 'Активны';
      } else {
        state.settings.status = 'Завершены';
      }
      state.settings.date = data.currentDate;
    },
    INIT_BROKER_STOCKS: async (context, id) => {
      let data = await HandlerService.initBrokerStocks(id);
      console.log(data);
      for(let stock of data.stocks){
        stock.finalPurchase = stock.price * stock.count;
      }
      context.commit('setBrokersPortfolio', data.stocks);
    },
    BUY_STOCK: async ({commit, state}, data) => {
      const sendData = data.data;
      let postData = await HandlerService.buyStock(sendData);
      if(postData.error){
        throw new Error(postData.error)
      }
      console.log(postData);

      const index = state.brokersPortfolio.findIndex(item => item.id === postData.id);
      if(postData.id === sendData.stockId) {
        state.brokersPortfolio[index].finalPurchase += postData.price * postData.count;
        state.brokersPortfolio[index].count += postData.count;
        state.brokersPortfolio[index].price = postData.price;
      }
      console.log(state.brokersPortfolio);
      let cash = await HandlerService.getCash(sendData.brokerId);
      commit('setCash', cash);
    },
    SELL_STOCK: async ({commit, state}, data) => {
      let postData = await HandlerService.sellStock(data);
      if(postData.error){
        throw new Error(postData.error)
      }
      console.log(postData);
      const index = state.brokersPortfolio.findIndex(item => item.id === postData.id);
      if(postData.id === data.stockId) {
        console.log('ok')
        state.brokersPortfolio[index].finalPurchase -= postData.price * postData.count;
        state.brokersPortfolio[index].count -= postData.count;
        state.brokersPortfolio[index].price = postData.price;
      }

      let cash = await HandlerService.getCash(data.brokerId);
      commit('setCash', cash);
    },
    UPDATE_STOCKS: async ({commit, state}, data) => {
      state.income = [];
      for(const stock of data.updatedStocks){
        const index = state.brokersPortfolio.findIndex(item => item.id === stock.id);
        let brokerStock = state.brokersPortfolio[index];
        let curIncome = {
          id: stock.id,
          value: stock.price * brokerStock.count - brokerStock.finalPurchase
        }
        state.settings.date = data.newTime;
        state.income.push(curIncome);
      }
      console.log(state.income);
      commit('setStocks', data.updatedStocks);
    },
  },
  modules: {
  },
  plugins: [
    webSocketPlugin
  ]
})
