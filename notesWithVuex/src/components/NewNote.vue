<template>
  <!-- new note -->
  <div class="new-note">
    <label>Title</label>
    <input v-model="note.title" type="text">
    <label>Description</label>
    <textarea v-model="note.descr"></textarea>
    <div class="new-note__type">
      <div class="new-note__type-list">
        <span class="new-note__label">Regular</span>
        <input type="radio" v-model="note.type" value="regular">
      </div>
      <div class="new-note__type-list">
        <span class="new-note__label">Pre-important</span>
        <input type="radio" class="new-note__input" v-model="note.type" value="pre-important">
      </div>
      <div class="new-note__type-list"> 
        <span class="new-note__label">Important</span>
        <input type="radio" v-model="note.type" value="important">
      </div>
    </div>
    <button class="btn btnPrimary" @click="addNote">New note</button>
  </div>
</template>

<script>
export default {
  computed: {
    note() {
      return this.$store.state.notes.note
    }
  },
  methods: {
    addNote () {
      this.$store.dispatch('addNote', { note: this.note })
      this.note.title = ''
      this.note.descr = ''
      this.note.type = 'regular'
    }
  }
}
</script>

<style lang="scss">
.new-note {
  text-align: center;
}
.new-note__type {
  margin-top: 50px;
  display: flex;
  justify-content: center;
}
.new-note__type-list {
  margin: 0 30px;
}
</style>

