<template>
    <div>
        <div>
            <nav-bar/>
        </div>
        <div class="container is-widescreen">
            <nuxt :class="{ main: !isMobile }"/>
        </div>
        <button
            v-if="isMobile"
            class="main-fab button is-primary"
            @click="openSideMenu()">
            <i class="fas fa-bars"/>
        </button>

        <transition name="slide">
            <side-menu v-if="isMobile && sideMenuOn"/>
        </transition>
    </div>
</template>

<script>
import navBar from '@/components/commons/nav-bar'
import sideMenu from '../components/commons/side-menu-mobile'
export default {
    components: {
        navBar,
        sideMenu,
    },
    computed: {
        isMobile() {
            return this.$store.state.isMobile
        },
        sideMenuOn() {
            return this.$store.state.sideMenuOn
        }
    },
    methods: {
        openSideMenu() {
            this.$store.commit('SET_SIDE_MENU_STATUS', !this.sideMenuOn)
        }
    }
}
</script>

<style>
html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    margin-bottom: 100px;
}
*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
}
.main {
    padding-top: 30px;
}
.main-fab {
    background-color: #FF2434;
    color: #FFFFFF;
    border: none;
    outline: none;
    position: fixed;
    bottom: 20px;
    right: 10px;
    height: 50px;
    width: 50px;
    border-radius: 30px;
    box-shadow: 1px 3px 5px #888888;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    z-index: 150;
}
.slide-leave-active,
.slide-enter-active {
    transition: 0.1s;
}
.slide-enter {
    transform: translate(-100%, 0);
}
.slide-leave-to {
    transform: translate(-100%, 0);
}
</style>
