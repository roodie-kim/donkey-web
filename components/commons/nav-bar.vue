<template>
    <div>
        <navbar-mobile v-if="isMobile"/>
        <navbar-desktop v-if="!isMobile"/>
    </div>
</template>

<script>
import navbarMobile from '@/components/commons/nav-bar-mobile'
import navbarDesktop from '@/components/commons/nav-bar-desktop'
export default {
    components: {
        navbarMobile,
        navbarDesktop
    },
    computed: {
        isMobile () {
            return this.$store.state.isMobile
        }
    },
}
</script>

<style scoped>

</style>