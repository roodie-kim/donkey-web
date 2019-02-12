import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import ko from 'vee-validate/dist/locale/ko'

Vue.use(VeeValidate)
Validator.localize('ko', ko)
