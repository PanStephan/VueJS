export default {
  state: {
    shopList: [
      {
        id: 1,
        title: 'Nike Red',
        descr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
        img: require('../assets/img/1.png')
      },
      {
        id: 2,
        title: 'Nike Default',
        descr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
        img: require('../assets/img/4.png')
      },
      {
        id: 3,
        title: 'Nike Green',
        descr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
        img: require('../assets/img/7.png')
      },
      {
        id: 4,
        title: 'Nike Street',
        descr: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut',
        img: require('../assets/img/10.png')
      }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    getShopList (state) {
      return state.shopList
    },
    getProduct: (state) => (id) => {
      return state.shopList.find(product => product.id == id)
    }
  },
}