<template>
  <modal
    title="log In"
    @close="$emit('close')">
    <div slot="body">
      <form @submit.prevent="onSubmit">

        <!-- email -->
        <div class="form-item" :class="{ errorInput: $v.logInModal.email.$error }">
          <label>Email:</label>
          <p class="errorText" v-if="!$v.logInModal.email.required"> Filed is required! </p>
          <p class="errorText" v-if="!$v.logInModal.email.email"> Email is not correct!</p>
          <input
            v-model="logInModal.email"
            :class="{ error: $v.logInModal.email.$error }"
            @change="$v.logInModal.email.$touch()">
        </div>
              <!-- password -->
        <div>
          <div class="form-group" :class="{ 'form-group--error': $v.logInModal.password.$error }">
            <label class="form__label">Password</label>
            <input class="form__input" v-model.trim="$v.logInModal.password.$model"/>
          </div>
          <div class="error" v-if="!$v.logInModal.password.required">Password is required.</div>
          <div class="error" v-if="!$v.logInModal.password.minLength">Password must have at least {{ $v.logInModal.password.$params.minLength.min }} letters.</div>
        </div>
        <!-- button -->
        <button class="btn btnPrimary">Submit!</button>
      </form>
      <button class="btn" @click="$emit('singIn')">Sing in</button>
    </div>
  </modal>  

</template>

<script>
import modal from './UI/Modal.vue'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

export default {
  components: {modal},
  props: {
    logInModal: {
      required: true,
      type: Object
    }
  },
  validations: {
    logInModal: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const user = {
          email: this.logInModal.email,
          password: this.logInModal.password
        }
        console.log(user)

        this.logInModal.email = ''
        this.logInModal.password = ''
        this.$v.$reset()
        this.$emit('close')
      }
    },
  }
}
</script>

<style>

</style>