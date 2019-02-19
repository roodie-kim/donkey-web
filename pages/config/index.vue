<template>
    <div>
        <config-desktop v-if="!isMobile"/>
        <config-mobile v-if="isMobile"/>
    </div>
</template>

<script>
import configDesktop from '../../components/config/desktop'
import configMobile from '../../components/config/mobile'
export default {
    async asyncData({ app, store, error }) {
        const configResponse = await store.dispatch('config/getConfig')
        store.commit('config/SET_NICKNAME', configResponse.data)
    },
    components: {
        configDesktop,
        configMobile
    },
    computed: {
        isMobile() {
            return this.$store.getters['isMobile']
        }
    }
}
</script>

<style scoped>

</style>