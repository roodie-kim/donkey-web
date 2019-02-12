<template>
    <ul class="pagination">
        <nuxt-link
            v-for="(page, index) in pages"
            :to="makeUrl(page)"
            :key="index"
            @click.native="scrollTop()">
            <div
                :class="{ 'has-background-primary': selectedPage(page) }"
                class="pagination-item">
                <p
                    :class="{ 'has-text-white': selectedPage(page) }"
                    class="is-size-7">{{ page }}</p>
            </div>
        </nuxt-link>
    </ul>
</template>

<script>
import pagination from '@/utils/pagination.js'
export default {
    computed: {
        pages () {
            const pages = pagination.getPages(this.postsCount, this.currentPage, 50)
            return pages
        },
        postsCount () {
            return this.$store.state.posts.postsCount
        },
        currentPage () {
            return this.$store.state.posts.page
        }
    },
    methods: {
        makeUrl (page) {
            const url = '/' + this.$route.params.board + '?page=' + page
            return url
        },
        scrollTop () {
            document.body.scrollTop = 0
            document.documentElement.scrollTop = 0
        },
        selectedPage (page) {
            return page === this.currentPage ? true : false
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