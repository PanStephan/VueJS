<template>
  <div class="modal" :class="{show : showModal}">
    <div>
      <label>Change Title</label>
      <input v-model="editedNote.title" type="text" class="input">
      <label>Change Text</label>
      <input type="text" class="input" v-model="editedNote.descr">
    </div>
    <div>
      <button class="btn" @click="changeNote()">Edit</button>
      <button class="btn" @click="closeModal()">Cansel</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    editedNote: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    changeNote() {
      this.$emit('changeNote', this.editedNote)
    }
  }
}
</script>

<style scoped lang='scss'>

label {
  font-size: 18px;
}

.modal {
  z-index: 10;
  display: none;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 350px;
  width: 350px;
  padding: 25px 20px;
  background-color: #ffffff;
  box-shadow: 0 30px 30px rgba(0,0,0,.02);
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
} 

.show {
  display: flex;
}

</style>