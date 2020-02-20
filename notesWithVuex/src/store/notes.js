export default {
  state: {
    title: 'Notes App',
    showModal: false,
    message: null,
    search: '',
    grid: true,
    editedNote: {
      title: '',
      descr: '',
    },
    editedIndex: null,
    note: {
      title: '',
      descr: '',
      type: 'regular'
    },
    notes: [
      {
        title: 'First Note',
        descr: 'Description for first note',
        date: new Date(Date.now()).toLocaleString(),
        type: 'regular'
      },
      {
        title: 'Second Note',
        descr: 'Description for second note',
        date: new Date(Date.now()).toLocaleString(),
        type: 'regular'
      },
      {
        title: 'Third Note',
        descr: 'Description for third note',
        date: new Date(Date.now()).toLocaleString(),
        type: 'regular'
      }
    ]
  },
  mutations: {
    changeSearch(state, payload) {
      state.search = payload
    },
    showModal(state, payload) {
      state.showModal = payload
    },
    addNote(state, payload) {
      let {title, descr, type} = payload.note

      if (title === '') {
        state.message = 'title can`t be blank!'
        return false
      }

      state.notes.push({
        title,
        descr,
        date: new Date(Date.now()).toLocaleString(),
        type
      })

      state.message = null
    },
    editNote(state, payload) {
      const {title, descr} = payload
      
      state.notes[state.editedIndex].title = title
      state.notes[state.editedIndex].descr = descr
    },
    openModal(state, payload) {
      state.editedIndex = payload
    },
    removeNote(state, payload) {
      state.notes.splice(payload, 1)
    }
  },
  actions: {
    showModal({commit}, payload) {commit('showModal', payload)},

    addNote({commit}, payload) {commit('addNote', payload)},

    editNote({commit}, payload) {commit('editNote', payload)},

    openModal({commit}, payload) {commit('openModal', payload)},

    removeNote({commit}, payload) {commit('removeNote', payload)},

    changeSearch({commit}, payload) {commit('changeSearch', payload)}
  },
  getters: {
    getNotes: state => {
      return state.notes.filter(note => {
        if (note.title.toLowerCase().indexOf(state.search) !== -1) {
          return note
        }
      })
    },
    // закоментировал другой вариант, который почему-то не работает, а почему, 
    // я понять не могу) возможно это из-зо того, что в Notes мы вызываем геттер ?

    // getNotes: state => (payload = '') => {
    //   return state.notes.filter(note => {
    //     if (note.title.toLowerCase().indexOf(payload) !== -1) {
    //       return note
    //     }
    //   })
    // }
  }
}