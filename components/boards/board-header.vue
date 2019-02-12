<template>
    <div>
        <h4 class="title is-4 has-text-primary board-title">
            <nuxt-link :to="boardUrl">
                {{ boardName }} 게시판
            </nuxt-link>
        </h4>

        <hr class="hr-primary">
    </div>
</template>

<script>
export default {
    computed: {
        boardName() {
            return this.$route.params.board
        },
        boardUrl() {
            return '/' + this.boardName
        }
    }
}
</script>

<style scoped>
.board-title {
    margin-bottom: 0px;
}
.hr-primary {
    border-top: 2px solid #7957d5;
    margin-top: 15px;
    margin-bottom: 15px;
}
</style>