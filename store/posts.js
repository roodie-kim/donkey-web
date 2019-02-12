import { setToken } from '~/utils/auth'

export const state = () => ({
    list: [],
    postsCount: 0,
    info: null,
    page: 1,
    pagination: [],
})

export const mutations = {
    SET_LIST (state, posts) {
        state.list = posts.posts
        state.postsCount = posts.count
    },
    SET_INFO (state, post) {
        state.info = post
    },
    SET_PAGE (state, page) {
        state.page = page
    },
    SET_PAGINATION (state, pages) {
        state.pagination = pages
    },
    SET_VOTE (state, type) {
        state.info.has_voted = true
        if (type === 'up') {
            state.info.votes.up_count++
            state.info.my_vote_type = 'up'
        } else {
            state.info.votes.down_count++
            state.info.my_vote_type = 'down'
        }

    }
}

export const getters = {

}

export const actions = {
    async getPosts ({ commit, rootState }, conditions) {
        const accessToken = rootState.accessToken
        try {
            this.$axios.setToken(accessToken, 'Bearer')
            const response = await this.$axios.$get(
                '/v1/posts', {
                    params: conditions
                })

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
    async getPost ({ commit, rootState }, id) {
        const accessToken = rootState.accessToken
        try {
            this.$axios.setToken(accessToken, 'Bearer')
            const response = await this.$axios.$get(
                '/v1/posts/' + id
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
    async createPost ({ commit, rootState }, post) {
        const conditions = {
            board_name: rootState.boards.info.name
        }
        const accessToken = rootState.accessToken
        try {
            this.$axios.setToken(accessToken, 'Bearer')
            const response = await this.$axios.$post(
                '/v1/posts', post, {
                    params: conditions
                }
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
    async editPost ({ commit, rootState }, post) {
        const accessToken = rootState.accessToken
        let postInfo = {}
        postInfo.title = post.title
        postInfo.body = post.body
        try {
            this.$axios.setToken(accessToken, 'Bearer')
            const response = await this.$axios.$patch(
                '/v1/posts/' + post.id, post
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
    async deletePost ({ commit, rootState }, postId) {
        const accessToken = rootState.accessToken
        try {
            this.$axios.setToken(accessToken, 'Bearer')
            const response = await this.$axios.$delete(
                '/v1/posts/' + postId
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
    async vote ({ commit, rootState }, param) {
        const accessToken = rootState.accessToken
        try {
            this.$axios.setToken(accessToken, 'Bearer')
            const response = await this.$axios.$post(
                '/v1/votes/', param
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
    async getBestIndex ({ commit, rootState }, conditions) {
        const accessToken = rootState.accessToken
        try {
            this.$axios.setToken(accessToken, 'Bearer')
            const response = await this.$axios.$get(
                '/v1/bestindex/', {
                    params: conditions
                })

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