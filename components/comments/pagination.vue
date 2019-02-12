<template>
    <ul class="pagination">
        <a
            v-for="(page, index) in pages"
            :key="index"
            :class="{ 'has-background-primary': selectedPage(page) }"
            class="pagination-item"
            @click="changePage(page)">
            <li
                :class="{ 'has-text-white': selectedPage(page) }"
                class="is-size-7">{{ page }}</li>
        </a>
    </ul>
</template>

<script>
import pagination from '@/utils/pagination.js'
export default {
    computed: {
        pages () {
            const pages = pagination.getPages(this.commentsCount, this.currentPage, 50)
            return pages
        },
        commentsCount () {
            return this.$store.state.comments.count
        },
        currentPage () {
            return this.$store.state.comments.page
        },
        post () {
            return this.$store.state.posts.info
        }
    },
    methods: {
        async changePage (page) {
            this.$store.commit('comments/SET_PAGE', page)

            let conditions = {}
            conditions.post_id = this.post.id
            conditions.page = this.currentPage
            const comments = await this.$store.dispatch('comments/getComments', conditions)
            if (comments.status) {
                this.$store.commit('comments/SET_LIST', comments.data)
            }

            let commentDiv = document.getElementById('comments-list')
            commentDiv.scrollIntoView()

        },
        selectedPage (page) {
            return this.currentPage === page
        }
    }
}
</script>

<style scoped>
.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
}
.pagination-item {
    border: 1px solid #7957d5;
    border-radius: 3px;
    margin: 20px 3px 3px 3px;
    min-width: 30px;
}
</style>