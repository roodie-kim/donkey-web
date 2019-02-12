<template>
    <div id="posts-list">
        <div class="posts-row posts-column-names-row">
            <div class="posts-column-title"><p>제목</p></div>
            <div class="posts-column-author"><p>닉네임</p></div>
            <div class="posts-column-date"><p>시간</p></div>
            <div class="posts-column-upvotes"><p>추/비추</p></div>
            <div class="posts-column-view-count"><p>조회수</p></div>
        </div>
        <nuxt-link
            v-for="(post, index) in posts"
            :to="postUrl(post)"
            :key="index">
            <li class="posts-row posts-content-rows">
                <div class="posts-column-title has-text-grey-dark">
                    <p class="post-row-title">{{ post.title }}<span class="has-text-primary comments-count"> {{ post.comments_count }}</span></p>
                </div>
                <div class="posts-column-author has-text-grey-dark">{{ post.user.name }}</div>
                <div class="posts-column-date has-text-grey-dark">{{ setTimeFormat(post.created_at) }}</div>
                <div class="posts-column-upvotes has-text-grey-dark">{{ totalVotes(post) }}</div>
                <div class="posts-column-view-count has-text-grey-dark">{{ post.view_count }}</div>
            </li>
        </nuxt-link>
    </div>
</template>

<script>
export default {
    props: {
        posts: {
            type: Array,
            default() {
                return []
            }
        }
    },
    computed: {
        board() {
            return this.$store.state.boards.info
        }
    },
    methods: {
        postUrl(post) {
            return '/' + this.board.name + '/' + post.id
        },
        setTimeFormat(time) {
            const today = this.$moment().local().format('YYYY-MM-DD')
            const createdDate = this.$moment(time).local().format('YYYY-MM-DD')

            if (today === createdDate) {
                return this.$moment(time).local().format('h:mm:ss')
            } else {
                return this.$moment(time).local().format('YYYY-MM-DD')
            }
        },
        totalVotes(post) {
            return post.votes.up_count + post.votes.down_count
        }
    }
}
</script>

<style scoped>
#posts-list {
    margin-top: 5px;
    margin-bottom: 5px;
    border-top: 2px solid #7957d5;
    border-bottom: 2px solid #7957d5;
}
.posts-row {
    display: flex;
    align-items: center;
}
.post-row-title {

}
.posts-content-rows {
    min-height: 30px;
    border-bottom: 1px solid #DBDBDB;
}
.posts-column-names-row {
    min-height: 30px;
    text-align: center;
    border-bottom: 1px solid #7957d5;
    font-weight: 500;
}
.posts-column-title {
    width: 70%;
}
.posts-column-author {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 10%;
    text-align: center;
}
.posts-column-date {
    width: 10%;
    text-align: center;
}
.posts-column-upvotes {
    width: 5%;
    text-align: center;
}
.posts-column-view-count {
    width: 5%;
    text-align: center;
}
.comments-count {
    font-weight: 700;
}
</style>