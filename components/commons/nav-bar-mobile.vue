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
    </nav>
</template>

<script>
export default {
    computed: {
        isLoggedIn() {
            return this.$store.getters['isAuthenticated']
        },
    }
}
</script>

<style scoped>

</style>