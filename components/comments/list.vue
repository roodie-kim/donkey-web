<template>
    <div>
        <p class="has-text-weight-bold">댓글: <span class="has-text-danger">{{ commentsCount }}</span>개</p>
        <comment-form/>
        <div
            v-for="(comment, index) in comments"
            :key="index">
            <commentDiv
                :comment="comment"
                class="comment-div"/>
        </div>
        <pagination-div v-if="!lessThanOnePage"/>
        <hr
            v-if="!noComments"
            class="hr-body">
    </div>
</template>

<script>
import paginationDiv from '@/components/comments/pagination'
import commentForm from '@/components/comments/comment-form'
import commentDiv from '@/components/comments/comment-div'
export default {
    components: {
        commentForm,
        paginationDiv,
        commentDiv
    },
    computed: {
        comments () {
            return this.$store.state.comments.list
        },
        noComments() {
            return this.commentsCount === 0 ? true : false
        },
        lessThanOnePage() {
            return this.commentsCount <= 50 ? true : false
        },
        commentsPage () {
            return this.$store.state.comments.page
        },
        post () {
            return this.$store.state.posts.info
        },
        commentsCount () {
            return this.$store.state.comments.count
        }
    },
    async mounted () {
        const conditions = {}
        conditions.post_id = this.post.id
        conditions.page = this.commentsPage
        const getCommentsResponse = await this.$store.dispatch('comments/getComments', conditions)
        this.$store.commit('comments/SET_LIST', getCommentsResponse.data)
    }
}
</script>

<style scoped>
.hr-body {
    margin-top: 10px;
    margin-bottom: 10px;
    border-top: 2px solid #7957d5;
}
</style>