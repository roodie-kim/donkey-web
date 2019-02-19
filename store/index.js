import { setToken, setUser, signOut } from '~/utils/auth'

export const strict = false

export const state = () => ({
    accessToken: null,
    user: null,
    isMobile: true,
    sideMenuOn: false,
    rulesChecked: true,
})

export const mutations = {
    SET_ACCESS_TOKEN(state, accessToken) {
        state.accessToken = accessToken || null
        if (accessToken !== null) {
            setToken(accessToken)
        }
    },
    SET_USER(state, user) {
        state.user = user || null
    },
    SIGN_OUT(state) {
        state.accessToken = null
        state.user = null
        signOut()
    },
    SET_IS_MOBILE(state, isMobile) {
        state.isMobile = isMobile
    },
    SET_SIDE_MENU_STATUS(state, menuState) {
        state.sideMenuOn = menuState
    },
    SET_RULES_CHECKED(state, checked) {
        state.rulesChecked = checked
        window.localStorage.setItem('rulesChecked', checked)
    }
}

export const getters = {
    user(state) {
        return state.user
    },
    isAuthenticated(state) {
        return !!state.accessToken && !!state.user
    },
    isMobile(state) {
        return state.isMobile
    },
    rulesChecked(state) {
        return state.rulesChecked
    }
}

export const actions = {
    async nuxtServerInit({commit}, {req}) {
        commit('SET_IS_MOBILE', this.$device.isMobile)

        if (!req.headers.cookie) return
        const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
        const accessToken = jwtCookie.split('=')[1]

        try {
            this.$axios.setToken(accessToken, 'Bearer')
            const response = await this.$axios.$get('/v1/user')
            commit('SET_ACCESS_TOKEN', accessToken)
            commit('SET_USER', response)
        } catch (e) {
            console.log(e)
            return false
        }
    },
    async signUp ({commit}, user) {
        try {
            const token = await this.$axios.$post('/v1/users', user)
            commit('SET_ACCESS_TOKEN', token.access_token)
            return {
                status: true,
                data: token
            }
        } catch (e) {
            console.log(e)
            return {
                status: false,
                data: e
            }
        }
    },
    async signIn ({commit}, user) {
        try {
            const token = await this.$axios.$post('/v1/auth', user)
            commit('SET_ACCESS_TOKEN', token.access_token)
            return {
                status: true,
                data: token
            }
        } catch (e) {
            console.log(e)
            return {
                status: false,
                data: e
            }
        }
    },
    async readUser ({ commit, state }) {
        try {
            this.$axios.setToken(state.accessToken, 'Bearer')
            const user = await this.$axios.$get('/v1/user')
            commit('SET_USER', user)
            return {
                status: true,
                data: user
            }
        } catch (e) {
            console.log(e)
            return {
                status: false,
                data: e
            }
        }
    },
    signOut ({ commit }) {
        commit('SIGN_OUT')
    },
    async resetPasswordEmail ({ commit }, params) {
        try {
            const user = await this.$axios.$post('/v1/resetPasswordEmail', params)
            return {
                status: true,
                data: user
            }
        } catch (e) {
            console.log(e)
            return {
                status: false,
                data: e
            }
        }
    },
    async resetPassword ({ commit }, params) {
        try {
            const user = await this.$axios.$post('/v1/resetPassword', params)
            return {
                status: true,
                data: user
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