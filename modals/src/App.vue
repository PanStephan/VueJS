<template>
  <div class="wrapper">
    <div class="wrapper-content">

      <section>
        <div class="container">

          <!-- first modal -->
          <button class="btn btnPrimary" @click="modalFirst = !modalFirst">Show first modal</button>
          <modals
            title="First modal"
            v-show="modalFirst"
            @close="modalFirst = false">
            <!-- body -->
            <div slot="body">
              <p> Text Text Text Text Text Text Text </p>
              <button class="btn btnPrimary" @click="modalFirst = !modalFirst">Well Done!</button>
            </div>
          </modals>

          <!-- second modal -->
          <button class="btn btnPrimary" @click="modalSecond.show = !modalSecond.show">Show modal with form</button>
          <modals
            title="Modal with form"
            v-show="modalSecond.show"
            @close="modalSecond.show = false">
            <!-- body -->
            <div slot="body">
              <form @submit.prevent="submitSecondForm">
                <label>Name:</label>
                <input type="text" required v-model="modalSecond.name">
                <label>Email:</label>
                <input type="email" required v-model="modalSecond.email">
                <button class="btn btnPrimary">Submit!</button>
              </form>
            </div>
          </modals>

          <!-- modal with validate -->
          <button class="btn btnPrimary" @click="thirdModal.show = !thirdModal.show">Show modal with form + validate</button>
          <modalValidate v-show="thirdModal.show" @close="closeModalValidate" :thirdModal="thirdModal"/>

          <button class="btn btnPrimary" @click="logInModal.show = !logInModal.show">Hard Modal Task Log in</button>
          <logInModal v-show="logInModal.show" @singIn="singIn" @close="closeLogInModal" :logInModal="logInModal"/>

          <button class="btn btnPrimary" @click="signInModal.show = !signInModal.show">Hard Modal Task Sing In</button>
          <signInModal v-show="signInModal.show" @close="closeSignInModal" :signInModal="signInModal"/>

        </div>
      </section>


    </div>
  </div>
</template>

<script>
import modals from '@/components/UI/Modal.vue'
import modalValidate from '@/components/ModalValidate.vue'
import logInModal from '@/components/LogInModal.vue'
import signInModal from '@/components/SignInModal.vue'

export default {
  components: { modals, modalValidate, logInModal, signInModal},
  data () {
    return {
      modalFirst: false,
      modalSecond: {
        show: false,
        name: '',
        email: ''
      },
      thirdModal: {
        name: '',
        email: '',
        password: '',
        repeatPassword: '',
        show: false
      },
      logInModal: {
        email: '',
        password: '',
        show: false
      },
      signInModal: {
        email: '',
        password: '',
        repeatPassword: '',
        show: false
      }
    }
  },
  methods: {
    singIn() {
      this.logInModal.show = false
      this.thirdModal.show = true
    },
    closeLogInModal() {
      this.logInModal.email = ''
      this.logInModal.password = ''
      this.logInModal.show = false
    },
    closeSignInModal() {
      this.signInModal.show = false
    },
    closeModalValidate() {
      this.thirdModal.name = ''
      this.thirdModal.email = ''
      this.thirdModal.password = ''
      this.thirdModal.repeatPassword = ''
      this.thirdModal.show = false
    },
    submitSecondForm () {
      console.log({
        name: this.modalSecond.name,
        email: this.modalSecond.email
      })
      this.modalSecond.name = ''
      this.modalSecond.email = ''
      this.modalSecond.show = false

    }
  }
}
</script>
