<template>
  <modal
    title="Sign In "
    @close="$emit('close')">
    <!-- body -->
    <div slot="body">
      <form @submit.prevent="onSubmit">

      <!-- email -->
      <div class="form-item" :class="{ errorInput: $v.signInModal.email.$error }">
        <label>Email:</label>
        <p class="errorText" v-if="!$v.signInModal.email.required"> Filed is required! </p>
        <p class="errorText" v-if="!$v.signInModal.email.email"> Email is not correct!</p>
        <input
          v-model="signInModal.email"
          :class="{ error: $v.signInModal.email.$error }"
          @change="$v.signInModal.email.$touch()">
      </div>

      <!-- password -->
        <div>
          <div class="form-group" :class="{ 'form-group--error': $v.signInModal.password.$error }">
            <label class="form__label">Password</label>
            <input class="form__input" v-model.trim="$v.signInModal.password.$model"/>
          </div>
          <div class="error" v-if="!$v.signInModal.password.required">Password is required.</div>
          <div class="error" v-if="!$v.signInModal.password.minLength">Password must have at least {{ $v.signInModal.password.$params.minLength.min }} letters.</div>
          <div class="form-group" :class="{ 'form-group--error': $v.signInModal.repeatPassword.$error }">
            <label class="form__label">Repeat password</label>
            <input class="form__input" v-model.trim="$v.signInModal.repeatPassword.$model"/>
          </div>
          <div class="error" v-if="!$v.signInModal.repeatPassword.sameAsPassword">Passwords must be identical.</div>
        </div>
        <!-- button -->
        <button class="btn btnPrimary">Submit!</button>
      </form>
    </div>
  </modal>
</template>

<script>
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import modal from '@/components/UI/Modal.vue'

export default {
  components: { modal },
  props: {
    signInModal: {
      required: true,
      type: Object
    }
  },
  validations: {
    signInModal: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      repeatPassword: {
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const user = {
          email: this.signInModal.email,
          password: this.signInModal.password
        }
        console.log(user)

        this.signInModal.email = ''
        this.signInModal.password = ''
        this.signInModal.repeatPassword = ''

        this.$v.$reset()
        this.$emit('close')
      }
    },
  }
}
</script>

<style lang="scss">
.form-item .errorText {
  display: none;
  margin-bottom: 8px;
  font-size: 13.4px;
  color: #de4040;
}
.form-item {
  &.errorInput .errorText {
    display: block;
  }
}
input.error {
  border-color: #de4040;
}

</style>
