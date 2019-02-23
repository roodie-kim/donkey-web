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
                    src="https://s3.ap-northeast-2.amazonaws.com/project-donkey/resources/logos/logo-long.png"
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