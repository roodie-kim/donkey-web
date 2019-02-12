import { setToken } from '~/utils/auth'

export const state = () => ({
    list: [],
    recentList: [],
    info: null
})

export const mutations = {
    SET_RECENT_BOARDS(state, boards) {
        state.recentList = boards
    },
    SET_BOARDS(state, boards) {
        state.list = boards
    },
    SET_BOARD (state, board) {
        state.info = board
    },
}

export const getters = {

}

export const actions = {
    async getRecentBoards({ commit }) {
        try {
            const response = await this.$axios.$get(
                '/v1/boards/recent'
            )

            return {
                status: true,
                data: response
            }
        } catch (e) {
            return {
                status: false,
                data: e
            }
        }
    },
    async getBoards({ commit }) {
        try {
            const response = await this.$axios.$get(
                '/v1/boards'
            )

            return {
                status: true,
                data: response
            }
        } catch (e) {
            return {
                status: false,
                data: e
            }
        }
    },
    async getBoard({ commit }, slug) {
        try {
            const response = await this.$axios.$get(
                '/v1/boards/' + encodeURI(slug)
            )

            return {
                status: true,
                data: response
            }
        } catch (e) {
            return {
                status: false,
                data: e
            }
        }
    },
    async requestAddBoard({ commit, rootState }, params) {
        const accessToken = rootState.accessToken
        try {
            this.$axios.setToken(accessToken, 'Bearer')
            const response = await this.$axios.$post(
                '/v1/boards/request', params
            )

            return {
                status: true,
                data: response
            }
        } catch (e) {
            return {
                status: false,
                data: e
            }
        }
    }
}