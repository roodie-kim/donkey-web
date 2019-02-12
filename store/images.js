import { setToken } from '~/utils/auth'

export const state = () => ({

})

export const mutations = {

}

export const getters = {

}

export const actions = {
    async upload ({ commit, rootState }, formData) {
        const accessToken = rootState.accessToken
        try {
            this.$axios.setToken(accessToken, 'Bearer')
            const response = await this.$axios.$post(
                '/v1/images', formData
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
}