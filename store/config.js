import { setToken } from '~/utils/auth'

export const state = () => ({
    nickname: null,
})

export const mutations = {
    SET_NICKNAME (state, user) {
        state.nickname = user.name
    },
}

export const getters = {

}

export const actions = {
    async getConfig ({ commit, rootState }) {
        const accessToken = rootState.accessToken
        try {
            this.$axios.setToken(accessToken, 'Bearer')
            const response = await this.$axios.$get(
                '/v1/config'
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
    async changeNickname ({ commit, rootState }, params) {
        const accessToken = rootState.accessToken
        try {
            this.$axios.setToken(accessToken, 'Bearer')
            const response = await this.$axios.$post(
                '/v1/changeNickname', params
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
    async changePassword ({ commit, rootState }, params) {
        const accessToken = rootState.accessToken
        try {
            this.$axios.setToken(accessToken, 'Bearer')
            const response = await this.$axios.$post(
                '/v1/changePassword', params
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