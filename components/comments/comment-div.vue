<template>
    <div class="comment-component">
        <div v-if="!editMode">
            <div class="comment-div-header">
                <div class="comment-div-header-left">
                    <p>
                        {{ comment.user.name }} | <span> {{ comment.created_at }}</span>
                    </p>
                </div>
                <div
                    v-if="comment.is_mine"
                    class="comment-div-header-right">
                    <button
                        class="button is-small comment-button"
                        @click="toggleEditMode(true)"><i class="fas fa-edit"/></button>
                    <button
                        class="button is-small comment-button"
                        @click="deleteComment()"><i class="fas fa-eraser"/></button>
                </div>
            </div>
            <div>{{ comment.body }}</div>
        </div>

        <div v-if="editMode">
            <form @submit.prevent="submit">
                <textarea
                    v-model="editedBody"
                    type="string"
                    name="body"
                    placeholder="내용"/>
                <div>
                    <button type="submit">완료</button>
                    <button @click="deleteComment()">삭제</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        comment: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            editMode: false,
            editedBody: ''
        }
    },
    mounted () {
        this.editedBody = this.comment.body
    },
    methods: {
        toggleEditMode (bool) {
            this.editMode = bool
        },
        async submit () {
            const data = {}
            data.commentId = this.comment.id
            data.body = this.editedBody
            const response = await this.$store.dispatch('comments/editComment', data)
            if (response.status) {
                this.comment.body = response.data.body
                this.editMode = false
            }
        },
        async deleteComment () {
            const response = await this.$store.dispatch('comments/deleteComment', this.comment.id)
            if (response.status) {
                this.$store.commit('comments/DELETE_COMMENT', this.comment.id)
                this.$store.commit('comments/SET_COUNT', this.$store.state.comments.count - 1)
            }
        }
    }
}
</script>

<style scoped>
.comment-component {
    border-bottom: 2px solid #F5F5F5;
    padding: 6px 8px;
}
.comment-div-header {
    display: flex;
}
.comment-div-header-left, .comment-div-header-right {
    width: 50%;
    display: flex;
}
.comment-div-header-left {
    justify-content: flex-start;
}
.comment-div-header-right {
    justify-content: flex-end;
}
.comment-button {
    margin-left: 3px;
    margin-right: 3px;
}
</style>