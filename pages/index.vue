<template>
    <div>
        <!--데스크탑-->
        <div
            v-if="!isMobile"
            class="outter-padding">
            <div class="flex-box-start">
                <h4 class="is-title is-size-4 has-text-weight-semibold board-title">
                    자유게시판
                </h4>
                <p
                    class="is-italic hover"
                    @click="unsetRulesChecked()"><u>규칙보기</u></p>
            </div>
            <basic-rules v-if="!rulesChecked"/>
            <posts-list :posts="posts"/>
            <div class="flex-box-end">
                <button
                    class="button is-primary general-button"
                    @click="goToCreatePage()">
                    <span class="font-awesome-margin-right"><i class="fas fa-pen"/></span>글쓰기
                </button>
            </div>
            <paginationDiv/>
        </div>

        <!--모바일-->
        <div
            v-if="isMobile"
            class="outer-padding-mobile">
            <div
                class="flex-box-start"
                style="padding-left: 5px;">
                <h4 class="is-title is-size-4 has-text-weight-semibold board-title">자유게시판</h4>
                <p
                    class="is-italic hover"
                    @click="unsetRulesChecked()"><u>규칙보기</u></p>
            </div>
            <basic-rules v-if="!rulesChecked"/>
            <posts-list :posts="posts"/>
            <div class="flex-box-end">
                <button
                    class="button is-primary general-button"
                    @click="goToCreatePage()">
                    <span class="font-awesome-margin-right"><i class="fas fa-pen"/></span>글쓰기
                </button>
            </div>
            <paginationDiv/>
        </div>
    </div>
</template>

<script>
import postsList from '@/components/posts/list'
import paginationDiv from '@/components/posts/pagination'
import basicRules from '../components/announcements/basic-rules'
export default {
    async asyncData({ app, store, params, query, error }) {
        if (query.page == null) {
            query.page = 1
        } else {
            query.page = query.page * 1
        }

        store.commit('posts/SET_PAGE', query.page)

        const getPostsResponse = await store.dispatch('posts/getPosts', query)
        store.commit('posts/SET_LIST', getPostsResponse.data)
    },
    watchQuery: ['page'],
    components: {
        postsList,
        paginationDiv,
        basicRules,
    },
    computed: {
        posts() {
            return this.$store.getters['posts/list']
        },
        isLoggedIn() {
            return this.$store.getters['isAuthenticated']
        },
        isMobile() {
            return this.$store.getters['isMobile']
        },
        rulesChecked() {
            return this.$store.getters['rulesChecked']
        }
    },
    mounted() {
        let rulesChecked = window.localStorage.getItem('rulesChecked')
        let value
        if (rulesChecked == null) {
            value = false
        } else {
            if (rulesChecked == 'true') {
                value = true
            } else {
                value = false
            }
        }
        this.$store.commit('SET_RULES_CHECKED', value)
    },
    methods: {
        goToCreatePage() {
            if (!this.isLoggedIn) {
                alert('로그인이 필요합니다.')
                return
            }
            this.$router.push('/create')
        },
        unsetRulesChecked() {
            this.$store.commit('SET_RULES_CHECKED', false)
        }
    }
}
</script>

<style scoped>
.outter-padding {
    padding: 40px;
}
.outer-padding-mobile {
    padding-top: 15px;
}
.font-awesome-margin-right {
    margin-right: 10px;
}
.general-button {
    width: 100px;
}
.flex-box-start {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.flex-box-end {
    display: flex;
    justify-content: flex-end;
}
.board-title {
    margin-right: 10px;
}
.hover {
    cursor: pointer;
}
</style>