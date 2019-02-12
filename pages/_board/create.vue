<template>
    <div class="columns">
        <div class="column is-three-quarters">
            <board-header/>
            <post-editor/>
        </div>
        <div class="column">
            <side-bar/>
        </div>
    </div>
</template>

<script>
import BoardHeader from '@/components/boards/board-header'
import PostEditor from '@/components/posts/posts-editor.vue'
import SideBar from '../../components/sidebar/sidebar'
export default {
    middleware: 'signedIn',
    async asyncData ({ app, store, params, query, error }) {
        const getBoardResponse = await store.dispatch('boards/getBoard', params.board)
        store.commit('boards/SET_BOARD', getBoardResponse.data)
    },
    components: {
        SideBar,
        BoardHeader,
        PostEditor
    },
    computed: {

    },
    methods: {

    }
}
</script>

<style scoped>

</style>