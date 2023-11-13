export default function createWebSocketPlugin (socket) {
  return (store) => {
    socket.on('update', data => {
      store.dispatch('UPDATE_STOCKS', data);
    });
    socket.on('stop', () => {
      store.commit('stopAuction');
    });

  }
}
