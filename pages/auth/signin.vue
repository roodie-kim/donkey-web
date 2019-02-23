<template>
    <div class="card auth-form">
        <h3 class="header subtitle is-4 has-text-weight-semibold">로그인</h3>
        <form
            novalidate
            @submit.prevent="validateBeforeSubmit">
            <input
                v-validate="'required|email'"
                :class="{'input': true, 'is-danger': errors.has('이메일') }"
                v-model="user.email"
                type="email"
                name="이메일"
                class="input seperated"
                placeholder="이메일">
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
                type="password"
                name="비밀번호"
                class="input seperated"
                placeholder="비밀번호 (최소 6, 최대 30자)">
            <i
                v-show="errors.has('비밀번호')"
                class="fa fa-warning"/>
            <span
                v-show="errors.has('비밀번호')"
                class="help is-danger">{{ errors.first('비밀번호') }}</span>
            <div>
                <button
                    class="button is-primary seperated submit-button"
                    type="submit">로그인</button>
            </div>
        </form>
        <p>아직 가입하지 않으셨나요? <span><nuxt-link to="/auth/signup">회원가입하기</nuxt-link></span></p>
        <p>비밀번호를 잊어버리셨나요? <span><nuxt-link to="/auth/findpassword">비밀번호 찾기</nuxt-link></span></p>
    </div>
</template>

<script>
export default {
    middleware: 'guest',
    data() {
        return {
            user: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        async signIn() {
            const response = await this.$store.dispatch('signIn', this.user)
            if (response.status) {
                this.$store.dispatch('readUser')
                this.$router.push('/')
            } else {
                const error = response.data.response
                if (error.status === 401) {
                    alert(error.data.message)
                } else {
                    alert('서버에 문제가 발생했습니다. 운영자에게 연락하거나 나중에 다시 시도해주세요.')
                }
            }
        },
        async validateBeforeSubmit() {
            const result = await this.$validator.validateAll()
            if (result) {
                this.signIn()
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