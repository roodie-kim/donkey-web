<template>
    <div class="card config-form">
        <h3 class="header subtitle is-4 has-text-weight-semibold">설정</h3>

        <!--nickname-->
        <div class="description-div">
            닉네임:
        </div>
        <div class="flex-box">
            <div class="contents-div">
                <div
                    v-if="!nicknameForm.editMode"
                    class="contents-div-inner">
                    {{ nickname }}
                    <button
                        class="button button-details"
                        @click="toggleNicknameForm()">
                        <i class="fas fa-pen"/>
                    </button>
                </div>
                <div
                    v-if="nicknameForm.editMode"
                    class="contents-div-inner">
                    <form
                        class="single-form"
                        novalidate
                        data-vv-scope="nickname-form"
                        @submit.prevent="validateNicknameBeforeSubmit('nickname-form')">
                        <div>
                            <input
                                v-validate="'required|max:15|min:3'"
                                :class="{'input': true, 'is-danger': errors.has('nickname-form.닉네임') }"
                                v-model="nicknameForm.data"
                                type="string"
                                name="닉네임"
                                class="input seperated"
                                placeholder="3~15자 -, _ 사용가능">
                            <i
                                v-show="errors.has('nickname-form.닉네임')"
                                class="fa fa-warning"/>
                            <span
                                v-show="errors.has('nickname-form.닉네임')"
                                class="help is-danger">{{ errors.first('nickname-form.닉네임') }}</span>
                        </div>
                        <button
                            class="button button-details"
                            type="submit">수정</button>
                        <button
                            type="button"
                            class="button button-details"
                            @click="toggleNicknameForm()">취소</button>
                    </form>
                </div>
            </div>
        </div>

        <hr class="hr-margin-null">
        <div class="description-div">
            비밀번호 변경:
        </div>
        <div class="flex-box">
            <div class="contents-div">
                <form
                    class="single-form"
                    novalidate
                    data-vv-scope="password-form"
                    @submit.prevent="validatePasswordBeforeSubmit('password-form')">
                    <div>
                        <div class="upper-input">
                            <input
                                v-validate="'required|max:30|min:6'"
                                :class="{'input': true, 'is-danger': errors.has('password-form.기존비밀번호') }"
                                v-model="password.current"
                                class="input seperated"
                                type="password"
                                name="기존비밀번호"
                                placeholder="기존비밀번호">
                            <i
                                v-show="errors.has('password-form.기존비밀번호')"
                                class="fa fa-warning"/>
                            <span
                                v-show="errors.has('password-form.기존비밀번호')"
                                class="help is-danger">{{ errors.first('password-form.기존비밀번호') }}</span>
                        </div>
                        <div>
                            <input
                                v-validate="'required|max:30|min:6'"
                                :class="{'input': true, 'is-danger': errors.has('password-form.새비밀번호') }"
                                v-model="password.new"
                                class="input seperated"
                                type="password"
                                name="새비밀번호"
                                placeholder="새비밀번호 (최소 6, 최대 30자)">
                            <i
                                v-show="errors.has('password-form.새비밀번호')"
                                class="fa fa-warning"/>
                            <span
                                v-show="errors.has('password-form.새비밀번호')"
                                class="help is-danger">{{ errors.first('password-form.새비밀번호') }}</span>
                        </div>
                    </div>
                    <div class="flex-box">
                        <button
                            class="button button-details"
                            type="submit">변경</button>
                    </div>
                </form>
            </div>
        </div>
        <hr class="hr-margin-null">
        <div class="description-div">
            로그아웃:
        </div>
        <div class="flex-box">
            <div class="contents-div">
                <button
                    class="button"
                    @click="signOut">로그아웃</button>
            </div>
        </div>
    </div>
</template>

<script>
let VeeValidate
if (process.browser) {
    VeeValidate = require('vee-validate')
}
export default {
    middleware: 'signedIn',
    data () {
        return {
            nicknameForm: {
                editMode: false,
                data: ''
            },
            password: {
                current: '',
                new: ''
            }
        }
    },
    computed: {
        nickname () {
            return this.$store.state.config.nickname
        }
    },
    methods: {
        signOut() {
            this.$store.dispatch('signOut')
            this.$router.push('/')
        },
        toggleNicknameForm() {
            if (!this.nicknameForm.editMode) {
                this.nicknameForm.data = this.nickname
            } else {
                this.nicknameForm.data = ''
            }
            this.nicknameForm.editMode = !this.nicknameForm.editMode
        },
        async validateNicknameBeforeSubmit(scope) {
            if (this.nickname === this.nicknameForm.data) {
                this.nicknameForm.editMode = false
                this.nicknameForm.data = ''
                return
            }
            const result = await this.$validator.validateAll(scope)
            if (result) {
                this.changeNickname()
            } else {
                alert('닉네임 입력 내용을 확인해주세요.')
            }
        },
        async changeNickname() {
            let params = {}
            params.name = this.nicknameForm.data
            const nicknameResponse = await this.$store.dispatch('config/changeNickname', params)
            if (nicknameResponse.status) {
                this.$store.commit('config/SET_NICKNAME', nicknameResponse.data)
                this.$store.commit('SET_USER', nicknameResponse.data)
                this.nicknameForm.editMode = false
                this.nicknameForm.data = ''
            } else {
                const error = nicknameResponse.data.response
                if (error.status === 400) {
                    if (error.data.name != null) {
                        if (error.data.name == 'The name has already been taken.') {
                            alert('이미 사용중인 닉네임입니다.')
                        } else {
                            alert ('서버에 문제가 발생했습니다. 운영자에게 연락하거나 나중에 다시 시도해주세요.')
                        }
                    }
                } else {
                    alert('서버에 문제가 발생했습니다. 운영자에게 연락하거나 나중에 다시 시도해주세요.')
                }
                this.nicknameForm.editMode = false
                this.nicknameForm.data = ''
            }
        },
        async validatePasswordBeforeSubmit(scope) {
            const result = await this.$validator.validateAll(scope)
            if (result) {
                this.changePassword()
            } else {
                alert('비밀번호 입력 내용을 확인해주세요.')
            }
        },
        async changePassword() {
            const passwordResponse = await this.$store.dispatch('config/changePassword', this.password)
            if (passwordResponse.status) {
                alert('변경되었습니다.')
            } else {
                const error = passwordResponse.data.response
                if (error.status === 401) {
                    alert(error.data.message)
                } else {
                    alert('서버에 문제가 발생했습니다. 운영자에게 연락하거나 나중에 다시 시도해주세요.')
                }
            }
        }
    }
}
</script>

<style scoped>
.config-form {
    margin: auto;
    margin-top: 50px;
    min-width: 300px;
    max-width: 700px;
    padding: 30px;
}
.header {
    text-align: center;
}
.flex-box {
    display: flex;
    align-items: center;
    min-height: 60px;
}
.contents-div {
    padding: 3px 10px;
    display: flex;
    align-items: center;
}
.contents-div-inner {
    display: flex;
    align-items: center;
}
.hr-margin-null {
    margin-top: 10px;
    margin-bottom: 10px;
}
.button-details {
    margin-left: 20px;
    cursor: pointer;
}
.single-form {
    display: flex;
}
.input {
    width: 200px;
}
.upper-input {
    margin-bottom: 10px;
}
</style>