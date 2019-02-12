<template>
    <nav
        class="navbar is-transparent"
        role="navigation"
        aria-label="main navigation">
        <div class="navbar-brand">
            <nuxt-link
                class="navbar-item"
                to="/">
                <img
                    src="https://bulma.io/images/bulma-logo.png"
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
                            class="button is-primary">
                            <strong>가입</strong>
                        </nuxt-link>
                        <nuxt-link
                            to="/auth/signin"
                            class="button is-light">
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
                            <a
                                class="navbar-item"
                                href="/config">
                                <span><i class="fas fa-cog"/> 설정</span>
                            </a>
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

</style>