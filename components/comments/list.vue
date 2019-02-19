<template>
    <div class="comments-list">
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
            class="hr-body null-comment-margin">
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
            return this.$store.getters['comments/list']
        },
        noComments() {
            return this.commentsCount === 0 ? true : false
        },
        lessThanOnePage() {
            return this.commentsCount <= 50 ? true : false
        },
        commentsPage () {
            return this.$store.getters['comments/page']
        },
        post () {
            return this.$store.getters['posts/info']
        },
        commentsCount () {
            return this.$store.getters['comments/count']
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
.comments-list {
    margin-top: 30px;
}
.hr-body {
    margin-bottom: 10px;
    border-top: 2px solid #363636;
}
.null-comment-margin {
    margin-top: 0px;
}
</style>