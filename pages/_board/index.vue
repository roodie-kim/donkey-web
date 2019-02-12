<template>
    <div class="columns">
        <div class="column is-three-quarters">
            <board-header/>
            <div>
                <div
                    class="button is-primary general-button"
                    @click="goToCreatePage()">
                    <span class="font-awesome-margin-right"><i class="fas fa-pen"/></span>글쓰기
                </div>
            </div>
            <posts-list
                id="posts-list"
                :posts="posts"/>
            <div
                class="button is-primary general-button"
                @click="goToCreatePage()">
                <span class="font-awesome-margin-right"><i class="fas fa-pen"/></span>글쓰기
            </div>
            <paginationDiv/>
        </div>

        <div class="column">
            <side-bar/>
        </div>
    </div>
</template>

<script>
import SideBar from '../../components/sidebar/sidebar'
import boardHeader  from '@/components/boards/board-header'
import postsList from '@/components/posts/list'
import paginationDiv from '@/components/posts/pagination'
export default {
    head () {
        return {
            title: this.board.name,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.description
                }
            ]
        }
    },
    async asyncData({ app, store, params, query, error }) {
        const getBoardResponse = await store.dispatch('boards/getBoard', params.board)
        store.commit('boards/SET_BOARD', getBoardResponse.data)

        // 쿼리에서 현재 페이지를 따와서 저장
        const postsConditions = {}
        postsConditions.board_name = params.board
        if (query.page == null) {
            postsConditions.page = 1
        } else {
            postsConditions.page = query.page * 1
        }
        store.commit('posts/SET_PAGE', postsConditions.page)

        const getPostsResponse = await store.dispatch('posts/getPosts', postsConditions)
        store.commit('posts/SET_LIST', getPostsResponse.data)
    },
    watchQuery: ['page'],
    components: {
        SideBar,
        postsList,
        paginationDiv,
        boardHeader
    },
    computed: {
        board() {
            return this.$store.state.boards.info
        },
        posts() {
            return this.$store.state.posts.list
        },
        isLoggedIn() {
            return this.$store.getters['isAuthenticated']
        },
        description() {
            if (this.board.board_information === null) {
                return null
            }
            if (this.board.board_information.description === null) {
                return null
            }
            return this.board.board_information.description.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, '')
        }
    },
    methods: {
        goToCreatePage() {
            if (!this.isLoggedIn) {
                alert('로그인이 필요합니다.')
                return
            }
            this.$router.push('/' + this.board.name + '/create')
        }
    }
}
</script>

<style scoped>
.font-awesome-margin-right {
    margin-right: 10px;
}
.general-button {
    width: 100px;
}
.column {
    min-width: 0;
}

</style>