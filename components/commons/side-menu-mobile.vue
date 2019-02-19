<template>
    <div class="side-menu-outter">
        <sidebar-menu/>
        <div v-if="!isLoggedIn">
            <div
                class="flex-center button-div"
                style="margin-top: 150px;">
                <button
                    class="button is-primary button-common"
                    @click="moveToSignup">
                    가입
                </button>
            </div>

            <div
                class="flex-center button-div"
                style="margin-top: 20px;">
                <button
                    class="button is-primary-reverse button-common"
                    @click="moveToSignin">
                    로그인
                </button>
            </div>
        </div>

        <div
            v-if="isLoggedIn"
            class="side-menu-inner">
            <div>
                <p class="has-text-weight-semibold">{{ user.name }}<span class="has-text-weight-normal">님 안녕하세요.</span>
                </p>
            </div>
            <a
                class="navbar-item"
                href="/config">
                <span><i class="fas fa-cog"/> 설정</span>
            </a>
        </div>
    </div>
</template>

<script>
import sidebarMenu from '../../components/commons/nav-bar-for-side-menu'
export default {
    components: {
        sidebarMenu
    },
    computed: {
        user() {
            return this.$store.getters['user']
        },
        isLoggedIn() {
            return this.$store.getters['isAuthenticated']
        },
    },
    methods: {
        moveToSignup() {
            this.$store.commit('SET_SIDE_MENU_STATUS', false)
            this.$router.push('/auth/signup')
        },
        moveToSignin() {
            this.$store.commit('SET_SIDE_MENU_STATUS', false)
            this.$router.push('/auth/signin')
        }
    }
}
</script>

<style scoped>
.side-menu-outter {
    position: fixed;
    background-color: #f5f5f5;
    top: 0px;
    left: 0px;
    width: 90%;
    height: 100%;
    z-index: 100;
    overflow-x: hidden;
}
.side-menu-inner {
    padding: 20px;
}
.button-div {
    width: 100%;
}
.button-common {
    width: 200px;
    height: 40px;
}
.flex-center {
    display: flex;
    justify-content: center;
}
</style>