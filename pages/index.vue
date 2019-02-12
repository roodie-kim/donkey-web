<template>
    <div>
        <div class="top-index">
            <h4 class="title is-4 has-text-weight-semibold top-index-title">신규 게시판</h4>
            <hr class="hr-body">
            <div class="category boards-wrapper  has-background-white-bis">
                <div class="request-add-board-div">
                    <div class="field is-grouped">
                        <p class="control is-expanded request-add-board-input">
                            <input
                                v-model="requestBoard.name"
                                class="input"
                                type="text"
                                placeholder="게시판 추가 요청">
                        </p>
                        <p class="control">
                            <button
                                class="button is-primary"
                                @click="requestAddBoard()">
                                요청하기
                            </button>
                        </p>
                    </div>
                    <p class="info-text">※ 원하는 게시판이 없다면 요청해주세요. 24시간 이내에 검토 후 추가됩니다.</p>
                </div>
                <nuxt-link
                    v-for="(board, index) in recentBoards"
                    :key="index"
                    :to="boardUrl(board)"
                    class="board-name">
                    {{ board.name }}
                </nuxt-link>
            </div>
        </div>
        <div
            v-for="(top, index) in topIndex"
            :key="index"
            class="top-index">
            <h4 class="title is-4 has-text-weight-semibold top-index-title">{{ top.name }}</h4>
            <hr class="hr-body">
            <div
                v-for="(categories, index) in top.board_categories"
                :key="index"
                class="category">
                <h4 class="subtitle is-5 has-text-weight-semibold category-title">{{ categories.name }}</h4>
                <div class="boards-wrapper">
                    <nuxt-link
                        v-for="(board, index) in categories.boards"
                        :key="index"
                        :to="boardUrl(board)"
                        class="board-name">
                        {{ board.name }}
                    </nuxt-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    async asyncData({ app, store, params, query, error }) {
        const getRecentBoardsResponse = await store.dispatch('boards/getRecentBoards')
        store.commit('boards/SET_RECENT_BOARDS', getRecentBoardsResponse.data)

        const getBoardsResponse = await store.dispatch('boards/getBoards')
        store.commit('boards/SET_BOARDS', getBoardsResponse.data)
    },
    data() {
        return {
            requestBoard: {
                name: ''
            }
        }
    },
    computed: {
        topIndex() {
            return this.$store.state.boards.list
        },
        recentBoards() {
            return this.$store.state.boards.recentList
        }
    },
    methods: {
        boardUrl(board) {
            return '/' + board.name
        },
        async requestAddBoard() {
            const response = await this.$store.dispatch('boards/requestAddBoard', this.requestBoard)
            if (response.status) {
                alert('요청되었습니다. 24시간 내에 결과를 알려드리겠습니다.')
            } else {
                alert('문제가 생겼습니다. 나중에 다시 시도해주세요.')
            }
            this.requestBoard.name = ''
        }
    }
}
</script>

<style>
.request-add-board-div {
    width: 100%;
}
.request-add-board-input {
    max-width: 300px;
}
.info-text {
    color: red;
    margin-top: -5px;
    margin-bottom: 10px;
}
.hr-body {
    margin-top: 10px;
    margin-bottom: 10px;
    border-top: 2px solid #7957d5;
}
.top-index {
    margin-bottom: 20px;
}
.top-index-title {
    margin-bottom: 0px !important;
}
.category {
    padding: 5px;
    border: 1px solid #F5F5F5;
    border-radius: 3px;
    margin-bottom: 10px;
}
.category-title {
    margin-bottom: 5px !important;
}
.boards-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
}
.board-name {
    min-width: 150px;
    height: 25px;
    width: 20%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
