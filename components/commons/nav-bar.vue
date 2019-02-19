<template>
    <nav
        class="navbar is-dark"
        role="navigation"
        aria-label="main navigation">
        <div class="navbar-brand">
            <nuxt-link
                class="navbar-item"
                to="/">
                <img
                    src="https://bulma.io/images/bulma-logo-white.png"
                    width="112"
                    height="28">
            </nuxt-link>
        </div>

        <div class="navbar-menu">
            <div class="navbar-end">
                <div
                    v-if="!isLoggedIn"
                    class="navbar-item">
                    <div class="buttons">
                        <nuxt-link
                            to="/auth/signup"
                            class="button is-primary button-width">
                            가입
                        </nuxt-link>
                        <nuxt-link
                            to="/auth/signin"
                            class="button is-light button-width">
                            로그인
                        </nuxt-link>
                    </div>
                </div>

                <div
                    v-if="isLoggedIn"
                    class="navbar-item">
                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">
                            {{ user.name }}
                        </a>

                        <div class="navbar-dropdown is-right">
                            <!--<hr class="navbar-divider">-->
                            <nuxt-link
                                class="navbar-item"
                                to="/config">
                                <span><i class="fas fa-cog"/> 설정</span>
                            </nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        isLoggedIn () {
            return this.$store.getters['isAuthenticated']
        },
        user () {
            return this.$store.state.user
        }
    },
}
</script>

<style scoped>
.button-width {
    min-width: 80px;
}
</style>