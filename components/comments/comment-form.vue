<template>
    <div class="comment-form">
        <form @submit.prevent="submit" >
            <div>
                <div>
                    <textarea
                        v-model="comment.body"
                        class="comment-input textarea"
                        type="string"
                        name="body"
                        placeholder="댓글"/>
                </div>
                <div class="justify-right">
                    <button
                        type="submit"
                        class="button is-primary submit-buttom">
                        완료
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        relatedComment: {
            type: Number,
            default () {
                return null
            }
        }
    },
    data() {
        return {
            comment: {
                body: ''
            }
        }
    },
    computed: {
        post () {
            return this.$store.getters['posts/info']
        },
        commentsCount () {
            return this.$store.getters['comments/count']
        },
        commentsPage () {
            return this.$store.getters['comments/page']
        }
    },
    methods: {
        async submit () {
            // create comment
            const data = {}
            data.body = this.comment.body
            data.post_id = this.post.id
            data.comment_id = this.relatedComment
            const response = await this.$store.dispatch('comments/createComment', data)

            // if comment is created, move to comment page 1 of comments and empty comment-form
            if (response.status) {
                this.$store.commit('comments/SET_PAGE', 1)
                const conditions = {}
                conditions.post_id = this.post.id
                conditions.page = this.commentsPage
                const getCommentsResponse = await this.$store.dispatch('comments/getComments', conditions)
                this.$store.commit('comments/SET_LIST', getCommentsResponse.data)
                this.comment.body = ""
            }
        }
    }
}
</script>

<style scoped>
.comment-form {
    margin-top: 3px;
    border-top: 2px solid #363636;
    border-bottom: 2px solid #363636;
    padding: 10px;
    margin-bottom: 0px;
}
.comment-input {
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
}
.justify-right {
    display: flex;
    justify-content: flex-end;
}
.submit-buttom {
    width: 80px;
}
</style>