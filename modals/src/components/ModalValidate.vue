<template>
  <modal
    title="Modal with form + Validate"
    @close="$emit('close')">
    <!-- body -->
    <div slot="body">
      <form @submit.prevent="onSubmit">

        <!-- name -->
        <div class="form-item" :class="{ errorInput: $v.thirdModal.name.$error }">
          <label>Name:</label>
          <p class="errorText" v-if="!$v.thirdModal.name.required"> Filed is required! </p>
          <p class="errorText" v-if="!$v.thirdModal.name.minLength"> Name must have at least {{ $v.thirdModal.name.$params.minLength.min }} !</p>
          <input
            v-model="thirdModal.name"
            :class="{ error: $v.thirdModal.name.$error }"
            @change="$v.thirdModal.name.$touch()">
        </div>

      <!-- password -->
        <div>
          <div class="form-group" :class="{ 'form-group--error': $v.thirdModal.password.$error }">
            <label class="form__label">Password</label>
            <input class="form__input" v-model.trim="$v.thirdModal.password.$model"/>
          </div>
          <div class="error" v-if="!$v.thirdModal.password.required">Password is required.</div>
          <div class="error" v-if="!$v.thirdModal.password.minLength">Password must have at least {{ $v.thirdModal.password.$params.minLength.min }} letters.</div>
          <div class="form-group" :class="{ 'form-group--error': $v.thirdModal.repeatPassword.$error }">
            <label class="form__label">Repeat password</label>
            <input class="form__input" v-model.trim="$v.thirdModal.repeatPassword.$model"/>
          </div>
          <div class="error" v-if="!$v.thirdModal.repeatPassword.sameAsPassword">Passwords must be identical.</div>
        </div>

        <!-- email -->
        <div class="form-item" :class="{ errorInput: $v.thirdModal.email.$error }">
          <label>Email:</label>
          <p class="errorText" v-if="!$v.thirdModal.email.required"> Filed is required! </p>
          <p class="errorText" v-if="!$v.thirdModal.email.email"> Email is not correct!</p>
          <input
            v-model="thirdModal.email"
            :class="{ error: $v.thirdModal.email.$error }"
            @change="$v.thirdModal.email.$touch()">
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
    thirdModal: {
      required: true,
      type: Object
    }
  },
  validations: {
    thirdModal: {
      name: {
        required,
        minLength: minLength(4)
      },
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
          name: this.thirdModal.name,
          email: this.thirdModal.email,
          password: this.thirdModal.password
        }
        console.log(user)

        this.thirdModal.name = ''
        this.thirdModal.email = ''
        this.thirdModal.password = ''
        this.thirdModal.repeatPassword = ''
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
