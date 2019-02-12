<template>
    <div class="columns">
        <div class="column is-three-quarters">
            <board-header/>
            <div id="post-info">
                <p class="has-text-weight-bold">{{ post.title }}</p>
                <p>{{ post.user.name }}<span> | </span>{{ post.created_at }}</p>
            </div>
            <hr class="hr-title">

            <div
                class="post-body ql-editor"
                v-html="post.body"/>

            <div class="votes-buttons">
                <button
                    :class="{ 'is-outlined': !upVoted}"
                    class="button is-primary is-medium vote-button"
                    @click="vote('up')">
                    <span class="votes-count">{{ post.votes.up_count }}</span><i class="far fa-hand-point-up"/>
                </button>
                <button
                    :class="{ 'is-outlined': !downVoted}"
                    class="button is-danger is-medium vote-button"
                    @click="vote('down')">
                    <i class="far fa-hand-point-down"/><span class="votes-count">{{ post.votes.down_count }}</span>
                </button>
            </div>

            <commentsList id="comments-list"/>

            <div class="buttons-row">
                <div class="buttons-row-left">
                    <nuxt-link
                        :to="postListUrl"
                        class="button buttons-row-button is-primary">
                        <span class="font-awesome-margin-right"><i class="fas fa-list"/></span>목록
                    </nuxt-link>
                </div>
                <div
                    v-if="post.is_mine"
                    class="buttons-row-right">
                    <nuxt-link
                        :to="editUrl"
                        class="button buttons-row-button is-primary">
                        <span class="font-awesome-margin-right"><i class="fas fa-edit"/></span>수정
                    </nuxt-link>
                    <button
                        class="button buttons-row-button is-primary is-outlined"
                        @click="deletePost()">
                        <span class="font-awesome-margin-right"><i class="far fa-trash-alt"/></span>삭제
                    </button>
                    <nuxt-link
                        :to="createPostUrl"
                        class="button buttons-row-button is-primary">
                        <span class="font-awesome-margin-right"><i class="fas fa-pen"/></span>글쓰기
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="column">
            <side-bar/>
        </div>
    </div>
</template>

<script>
import boardHeader  from '@/components/boards/board-header'
import commentsList from '@/components/comments/list'
import SideBar from '../../../components/sidebar/sidebar'
export default {
    head () {
        return {
            title: this.post.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.post.body.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, '')
                }
            ]
        }
    },
    async asyncData({ app, store, params, query, error }) {
        const boardResponse = await store.dispatch('boards/getBoard', params.board)
        store.commit('boards/SET_BOARD', boardResponse.data)

        const postResponse = await store.dispatch('posts/getPost', params.id)
        store.commit('posts/SET_INFO', postResponse.data)

        store.commit('comments/SET_PAGE', 1)
        store.commit('comments/SET_COUNT', postResponse.data.comments_count)
    },
    components: {
        SideBar,
        commentsList,
        boardHeader
    },
    computed: {
        board() {
            return this.$store.state.boards.info
        },
        post() {
            return this.$store.state.posts.info
        },
        postPage() {
            return this.$store.state.posts.page
        },
        comments() {
            return this.$store.state.comments.list
        },
        editUrl() {
            return '/' + this.board.name + '/' + this.post.id + '/edit'
        },
        postListUrl() {
            return '/' + this.$route.params.board + '?page=' + this.postPage
        },
        createPostUrl() {
            return '/' + this.board.name + '/create'
        },
        upVoted() {
            if (this.post.my_vote_type === 'up') {
                return true
            } else {
                return false
            }
        },
        downVoted() {
            if (this.post.my_vote_type === 'down') {
                return true
            } else {
                return false
            }
        }
    },
    methods: {
        async deletePost() {
            const response = await this.$store.dispatch('posts/deletePost', this.$route.params.id)
            if (response.status) {
                this.$router.go(-1)
            }
        },
        async vote(voteType) {
            if (this.post.has_voted) {
                let krType = '추천'
                if (this.post.my_vote_type === 'down') {
                    krType = '비추천'
                }
                alert('이미 ' + krType +'한 글입니다.')
                return
            }
            const param = {
                'board_id': this.post.board_id,
                'post_id': this.post.id,
                'type': voteType
            }
            const response = await this.$store.dispatch('posts/vote', param)
            if (response.status) {
                this.$store.commit('posts/SET_VOTE', voteType)
            } else {
                alert('서버에 문제가 발생했습니다. 운영자에게 연락하거나 나중에 다시 시도해주세요.')
            }
        }
    }
}
</script>

<style scoped>
.hr-title {
    margin-top: 10px;
    margin-bottom: 40px;
}
.post-body {
    min-height: 260px;
    margin-bottom: 40px;
}
.ql-editor {
    padding: 0;
    height: auto;
}
.votes-buttons {
    text-align: center;
}
.vote-button {
    min-width: 150px;
}
.votes-count {
    margin-right: 10px;
    margin-left: 10px;
}
.buttons-row {
    display: flex;
    justify-content: space-between;
}
.buttons-row-left, .buttons-row-right {
    width: 40%;
    display: flex;
}
.buttons-row-left {
    justify-content: flex-start;
}
.buttons-row-right {
    justify-content: flex-end;
}
.buttons-row-button {
    width: 100px;
    margin-left: 4px;
    margin-right: 4px;
}
.font-awesome-margin-right {
    margin-right: 10px;
}
.column {
    min-width: 0;
}
</style>