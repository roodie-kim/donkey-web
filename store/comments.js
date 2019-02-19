import { setToken } from '~/utils/auth'

export const state = () => ({
    list: [],
    count: 0,
    info: null,
    page: 1
})

export const mutations = {
    CHANGE_PAGE_NUMBER(state, pageNumber) {
        state.page = pageNumber
    },
    SET_LIST(state, comments) {
        state.list = comments.comments
        state.count = comments.count
    },
    SET_INFO(state, comment) {
        state.info = comment
    },
    SET_PAGE(state, page) {
        state.page = page
    },
    SET_COUNT(state, count) {
        state.count = count
    },
    PUSH_COMMENT(state, comment) {
        state.list.push(comment)
    },
    DELETE_COMMENT(state, commentId) {
        const index = state.list.findIndex(
            comment => comment.id === commentId
        )
        state.list.splice(index, 1)
    }
}

export const getters = {
    list(state) {
        return state.list
    },
    count(state) {
        return state.count
    },
    page(state) {
        return state.page
    }
}

export const actions = {
    async getComments({ commit, rootState }, conditions) {
        const accessToken = rootState.accessToken
        this.$axios.setToken(accessToken, 'Bearer')
        try {
            const response = await this.$axios.$get(
                '/v1/comments', {
                    params: conditions
                }
            )

            return {
                status: true,
                data: response
            }
        } catch (e) {
            console.log(e)
            return {
                status: false,
                data: e
            }
        }
    },
    async createComment({ commit, rootState }, conditions) {
        const accessToken = rootState.accessToken
        try {
            this.$axios.setToken(accessToken, 'Bearer')
            const response = await this.$axios.$post(
                '/v1/comments', conditions
            )

            return {
                status: true,
                data: response
            }
        } catch (e) {
            console.log(e)
            return {
                status: false,
                data: e
            }
        }
    },
    async editComment({ commit, rootState }, data) {
        const accessToken = rootState.accessToken
        let newComment = {}
        newComment.body = data.body
        try {
            this.$axios.setToken(accessToken, 'Bearer')
            const response = await this.$axios.$patch(
                '/v1/comments/' + data.commentId, newComment
            )

            return {
                status: true,
                data: response
            }
        } catch (e) {
            console.log(e)
            return {
                status: false,
                data: e
            }
        }
    },
    async deleteComment({ commit, rootState }, commentId) {
        const accessToken = rootState.accessToken
        try {
            this.$axios.setToken(accessToken, 'Bearer')
            const response = await this.$axios.$delete(
                '/v1/comments/' + commentId
            )

            return {
                status: true,
                data: response
            }
        } catch (e) {
            console.log(e)
            return {
                status: false,
                data: e
            }
        }
    }
}