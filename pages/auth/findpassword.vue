<template>
    <div>
        <div class="card auth-form">
            <h3 class="header subtitle is-4 has-text-weight-semibold">비밀번호찾기</h3>
            <form
                novalidate
                @submit.prevent="validateBeforeSubmit">
                <input
                    v-validate="'required|email'"
                    :class="{'input': true, 'is-danger': errors.has('이메일') }"
                    v-model="email"
                    class="input seperated"
                    type="email"
                    name="이메일"
                    placeholder="회원 가입 시 사용한 이메일을 입력해 주세요.">
                <i
                    v-show="errors.has('이메일')"
                    class="fa fa-warning"/>
                <span
                    v-show="errors.has('이메일')"
                    class="help is-danger">{{ errors.first('이메일') }}</span>
                <div>
                    <button
                        type="submit"
                        class="button is-primary seperated submit-button">
                        이메일 보내기
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
let VeeValidate
if (process.browser) {
    VeeValidate = require('vee-validate')
}
export default {
    middleware: 'guest',
    data() {
        return {
            email: ''
        }
    },
    methods: {
        async sendRequest() {
            let params = {}
            params.email = this.email
            const response = await this.$store.dispatch('resetPasswordEmail', params)
            if (response.status) {
                alert('입력하신 주소로 이메일이 발송되었습니다. 확인 후 비밀번호를 변경해주세요.')
                this.$router.push('/')
            } else {
                alert('서버에 문제가 발생했습니다. 운영자에게 연락하거나 나중에 다시 시도해주세요.')
            }
        },
        async validateBeforeSubmit() {
            const result = await this.$validator.validateAll()
            if (result) {
                this.sendRequest()
            } else {
                alert('입력 내용을 확인해주세요.')
            }
        }
    }
}
</script>

<style scoped>
.auth-form {
    margin: auto;
    margin-top: 50px;
    min-width: 300px;
    max-width: 500px;
    padding: 30px;
}
.header {
    text-align: center;
}
.seperated {
    margin-bottom: 15px;
    margin-top: 15px;
}
.submit-button {
    width: 100%;
}
</style>