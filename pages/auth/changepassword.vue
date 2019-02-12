<template>
    <div class="card auth-form">
        <div>
            <h3 class="header subtitle is-4 has-text-weight-semibold">비밀번호 변경</h3>
            <form
                novalidate
                @submit.prevent="validateBeforeSubmit">
                <input
                    v-validate="'required|max:30|min:6'"
                    :class="{'input': true, 'is-danger': errors.has('비밀번호') }"
                    v-model="password"
                    class="input seperated"
                    type="password"
                    name="비밀번호"
                    placeholder="비밀번호 (최소 6, 최대 30자)">
                <i
                    v-show="errors.has('비밀번호')"
                    class="fa fa-warning"/>
                <span
                    v-show="errors.has('비밀번호')"
                    class="help is-danger">{{ errors.first('비밀번호') }}</span>

                <div>
                    <button
                        type="submit"
                        class="button is-primary seperated submit-button">
                        비밀번호 변경
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
    data () {
        return {
            token: this.$route.query.token,
            email: this.$route.query.email,
            password: null,
        }
    },
    methods: {
        async changePassword() {
            let params = {}
            params.token = this.token
            params.email = this.email
            params.password = this.password
            const result = await this.$store.dispatch('resetPassword', params)
            if (result.status) {
                alert('비밀번호가 변경되었습니다.')
                this.$router.push('/auth/signin')
            } else {
                alert('서버에 문제가 발생했습니다. 운영자에게 연락하거나 나중에 다시 시도해주세요.')
            }
        },
        async validateBeforeSubmit() {
            const result = await this.$validator.validateAll()
            if (result) {
                this.changePassword()
            } else {
                alert('입력 내용을 확인해주세요.')
            }
        }
    }
}
</script>

<style>
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