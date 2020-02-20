import loadMore from '../assets/js/loadMore.js'
import axios from 'axios'

export default {
  state: {
    messages: [],
    messagesMain: [],
  },
  mutations: {
    setMessage (state, payload) {
      state.messages = payload
    },
    setMessageMain (state, payload) {
      state.messagesMain = payload
    },
    loadMessages (state, payload) {
      state.messagesMain = [...state.messagesMain, ...payload]
    },
  },
  actions: {
    async getNotify ({commit, dispatch}) {
      dispatch('loaders/setLoading', true, { root: true })
      await axios.get('https://tocode.ru/static/c/vue-pro/notifyApi.php')
        .then(reseponse => {
          let res = reseponse.data.notify,
              messages = [],
              messagesMain = []

          // filter
          for (let i = 0; i < res.length; i++) {
            if (res[i].main) messagesMain.push(res[i])
            else messages.push(res[i])
          }   
          
          commit('setMessage', messages)
          commit('setMessageMain', messagesMain)
        })
        .catch(error => {
          dispatch('errors/setError', 'Error: Network Error', { root: true })
        })
        .finally(() => (dispatch('loaders/setLoading', true), { root: true }))
    },
    getNotifyLazy ({commit, dispatch}) {
      setTimeout (() => {
        dispatch('getNotify')
      }, 1800)
    },
    setMessage ({commit}, payload) {
      commit('setMessage', payload)
    },
    setMessageMain ({commit}, payload) {
      commit('setMessageMain', payload)
    },
    loadMessages ({commit, getters}) {
      let res = getters.getMessageFilter
      commit('loadMessages', loadMore(res))
    },
  },
  getters: {
    getMessage (state) {
      return state.messages
    },
    getMessageFilter (state) {
      return state.messages.filter(mes => {
        return mes.main === false
      })
    },
    getMessageMain (state) {
      return state.messagesMain
    }
  }
}