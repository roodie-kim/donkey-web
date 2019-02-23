<template>
    <section :class="{ 'desktop-padding': !isMobile, 'mobile-padding': isMobile }">
        <div :class="{ 'desktop-inner-padding': !isMobile, 'mobile-inner-padding': isMobile, 'side-padding': isMobile }">
            <p class="has-text-weight-bold">{{ post.title }}</p>
            <p>{{ post.user.name }}<span> | </span>{{ post.created_at }}</p>
        </div>

        <hr class="hr-title">

        <div :class="{ 'side-padding': isMobile }">
            <div
                class="post-body ql-editor"
                v-html="post.body"/>
        </div>

        <div class="votes-buttons">
            <button
                :disabled="votesButtonDisabled"
                :class="{ 'is-outlined': !upVoted}"
                class="button is-primary is-medium vote-button"
                @click="vote('up')">
                <span class="votes-count">{{ post.votes.up_count }}</span><i class="far fa-hand-point-up"/>
            </button>
            <button
                :disabled="votesButtonDisabled"
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
                    to="/create"
                    class="button buttons-row-button is-primary">
                    <span class="font-awesome-margin-right"><i class="fas fa-pen"/></span>글쓰기
                </nuxt-link>
            </div>
        </div>
    </section>
</template>

<script>
import commentsList from '@/components/comments/list'
export default {
    async asyncData({ app, store, params, query, error, redirect }) {
        const postResponse = await store.dispatch('posts/getPost', params.id)
        if(!postResponse.status) {
            return redirect('/')
        }
        store.commit('posts/SET_INFO', postResponse.data)

        store.commit('comments/SET_PAGE', 1)
        store.commit('comments/SET_COUNT', postResponse.data.comments_count)
    },
    components: {
        commentsList,
    },
    data() {
        return {
            votesButtonDisabled: false,
        }
    },
    computed: {
        isMobile() {
            return this.$store.getters['isMobile']
        },
        post() {
            return this.$store.getters['posts/info']
        },
        page() {
            return this.$store.getters['posts/page']
        },
        comments() {
            return this.$store.getters['comments/list']
        },
        editUrl() {
            return '/' + this.post.id + '/edit'
        },
        postListUrl() {
            return '/?page=' + this.page
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
        },
        isLoggedIn() {
            return this.$store.getters['isAuthenticated']
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
            if (!this.isLoggedIn) {
                if (confirm("로그인이 필요한 기능입니다. 지금 로그인 하시겠습니까?")) {
                    this.$router.push('/auth/signin')
                } else {
                    return
                }
            } else {
                if (this.post.has_voted) {
                    let krType = '추천'
                    if (this.post.my_vote_type === 'down') {
                        krType = '비추천'
                    }
                    alert('이미 ' + krType +'한 글입니다.')
                    return
                }
                this.votesButtonDisabled = true
                const param = {
                    'post_id': this.post.id,
                    'type': voteType
                }
                const response = await this.$store.dispatch('posts/vote', param)
                if (response.status) {
                    this.votesButtonDisabled = false
                    this.$store.commit('posts/SET_VOTE', voteType)
                } else {
                    alert('서버에 문제가 발생했습니다. 운영자에게 연락하거나 나중에 다시 시도해주세요.')
                }
            }
        }
    }
}
</script>

<style scoped>
.desktop-padding {
    padding: 40px;
}
.mobile-padding {
    padding-top: 20px;
}
.side-padding {
    padding-right: 10px;
    padding-left: 10px;
}
.hr-title {
    margin-top: 5px;
    margin-bottom: 15px;
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
    margin-top: 10px;
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