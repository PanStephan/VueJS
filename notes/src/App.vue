<template>
  <div class="wrapper">
    <div class="wrapper-content">

      <section>
        <div class="container">
          <div class="note-header" style="margin: 36px 0; justify-content: center;">
            <p> {{ title }} </p>
          </div>
          <!-- message -->
          <message v-if="message" :message="message"/>

          <!-- new note -->
          <newNote 
            :note="note"
            @addNote="addNote"
          />

          <modal
            :showModal='showModal'
            @closeModal='closeModal'
            :editedNote='editedNote'
            @changeNote='changeNote'
          />

          <div class="note-header" style="margin: 36px 0;">
            <!-- title -->
            <h1> {{ title }} </h1>

            <!-- search -->
            <search
              :value="search"
              placeholder="Find your note"
              @search="search = $event"/>

            <!-- icons controls -->
            <div class="icons">
              <svg :class="{ active: grid }" @click="grid = true" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <svg :class="{ active: !grid }" @click="grid = false" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
            </div>
          </div>

          <!-- note list -->
          <notes 
            :notes="notesFilter"
            :grid="grid"
            @remove="removeNote" 
            @openModal='openModal'
          />

        </div>
      </section>

    </div>
  </div>
</template>

<script>
import message from './components/Message'
import notes from './components/Notes'
import newNote from './components/NewNote'
import search from './components/Search'
import modal from './components/Modal'

export default {
  components: {
    message, notes, newNote, search, modal
  },
  data () {
    return {
      title: 'Notes App',
      showModal: false,
      search: '',
      message: null,
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
    }
  },
  computed: {
    notesFilter () {
      let array = this.notes,
          search = this.search
      if (!search) return array
      search = search.trim().toLowerCase()

      array = array.filter(function (item) {
        if (item.title.toLowerCase().indexOf(search) !== -1) {
          return item
        }
      })
      return array
    }
  },
  methods: {
    addNote () {
      let {title, descr, type} = this.note

      if (title === '') {
        this.message = 'title can`t be blank!'
        return false
      }

      this.notes.push({
        title,
        descr,
        date: new Date(Date.now()).toLocaleString(),
        type
      })

      this.message = null
      this.note.title = ''
      this.note.descr = ''
      this.note.type = 'regular'
    },
    removeNote (index) {
      this.notes.splice(index, 1)
    },
    openModal(index) {
      this.showModal = true
      this.editedIndex = index
    },
    closeModal() {
      this.showModal = false
    },
    changeNote() {
      this.showModal = false
      const {title, descr} = this.editedNote
      
      this.notes[this.editedIndex].title = title
      this.notes[this.editedIndex].descr = descr
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 800px;
}
</style>
