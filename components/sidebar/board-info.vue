<template>
    <div>
        <h4 class="title is-4 has-text-primary board-title"> {{ board.name }} 정보</h4>
        <div class="best-post-row">
            <div v-html="board.board_information.description"/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        board(){
            return this.$store.state.boards.info
        }
    },
    async mounted() {

    },
}
</script>

<style scoped>
.title {
    margin-bottom: 0px;
}
.best-post-row {
    margin-top: 15px;
    border-top: 2px solid #7957d5;
    border-bottom: 2px solid #7957d5;
    width: 100%;
}
.margin-bottom {
    margin-bottom: 10px;
}
</style>