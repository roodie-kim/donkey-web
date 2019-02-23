<template>
    <div class="card auth-form">
        <h3 class="header subtitle is-4 has-text-weight-semibold">회원 가입</h3>
        <form
            novalidate
            @submit.prevent="validateBeforeSubmit">
            <input
                v-validate="'required|email'"
                :class="{'input': true, 'is-danger': errors.has('이메일') }"
                v-model="user.email"
                class="input seperated"
                type="email"
                name="이메일"
                placeholder="이메일 (로그인, 비밀번호 찾기 시 사용됩니다)">
            <i
                v-show="errors.has('이메일')"
                class="fa fa-warning"/>
            <span
                v-show="errors.has('이메일')"
                class="help is-danger">{{ errors.first('이메일') }}</span>

            <input
                v-validate="'required|max:30|min:6'"
                :class="{'input': true, 'is-danger': errors.has('비밀번호') }"
                v-model="user.password"
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

            <input
                v-validate="'required|max:15|min:3|regex:^[a-zA-Z0-9ㄱ-ㅎ가-힣-_]*$'"
                :class="{'input': true, 'is-danger': errors.has('닉네임') }"
                v-model="user.name"
                class="input seperated"
                type="text"
                name="닉네임"
                placeholder="닉네임 (최소 3자, 최대 15자, 영어, 한글, 숫자와 -, _ 를 사용할 수 있습니다.">
            <i
                v-show="errors.has('닉네임')"
                class="fa fa-warning"/>
            <span
                v-show="errors.has('닉네임')"
                class="help is-danger">{{ errors.first('닉네임') }}</span>

            <div>
                <button
                    type="submit"
                    class="button is-primary seperated submit-button">
                    가입하기
                </button>
            </div>
        </form>
        <p>이미 가입하셨나요? <span><nuxt-link to="/auth/signin">로그인하기</nuxt-link></span></p>
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
            user: {
                email: '',
                password: '',
                name: ''
            }
        }
    },
    methods: {
        async signUp() {
            const response = await this.$store.dispatch('signUp', this.user)
            if (response.status) {
                this.$store.dispatch('readUser')
                this.$router.push('/')
            } else {
                const error = response.data.response
                if (error.status === 400) {
                    if (error.data.email != null) {
                        if (error.data.email == 'The email has already been taken.') {
                            alert('이미 사용중인 이메일입니다.')
                        } else {
                            alert ('서버에 문제가 발생했습니다. 운영자에게 연락하거나 나중에 다시 시도해주세요.')
                        }
                    } else if (error.data.name != null) {
                        if (error.data.name == 'The name has already been taken.') {
                            alert('이미 사용중인 닉네임입니다.')
                        } else {
                            alert ('서버에 문제가 발생했습니다. 운영자에게 연락하거나 나중에 다시 시도해주세요.')
                        }
                    }
                } else {
                    alert('서버에 문제가 발생했습니다. 운영자에게 연락하거나 나중에 다시 시도해주세요.')
                }
            }
        },
        async validateBeforeSubmit() {
            const result = await this.$validator.validateAll()
            if (result) {
                this.signUp()
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