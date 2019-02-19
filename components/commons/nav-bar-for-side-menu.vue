<template>
    <nav
        class="navbar is-dark"
        role="navigation"
        aria-label="main navigation">
        <div class="navbar-brand">
            <nuxt-link
                class="navbar-item"
                to="/"
                @click.native="closeSidebar">
                <img
                    src="https://bulma.io/images/bulma-logo-white.png"
                    width="112"
                    height="28">
            </nuxt-link>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        closeSidebar() {
            this.$store.commit('SET_SIDE_MENU_STATUS', false)
        }
    }
}
</script>

<style scoped>

</style>