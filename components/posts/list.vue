<template>
    <div id="posts-list">
        <!--데스크탑-->
        <div v-if="!isMobile">
            <div
                class="posts-row posts-column-names-row">
                <div class="posts-column-title"><p>제목</p></div>
                <div class="posts-column-author"><p>닉네임</p></div>
                <div class="posts-column-date"><p>작성일시</p></div>
                <div class="posts-column-upvotes"><p>추/비추</p></div>
                <div class="posts-column-view-count"><p>조회수</p></div>
            </div>
            <div
                v-if="noPosts"
                class="no-posts-div">
                보여질 글이 없습니다.
            </div>
            <div v-if="!noPosts">
                <nuxt-link
                    v-for="(post, index) in posts"
                    :to="postUrl(post)"
                    :key="index">
                    <li class="posts-row posts-content-rows">
                        <div class="posts-column-title has-text-grey-dark">
                            <p class="post-row-title">{{ post.title }}<span class="has-text-danger comments-count"> {{ post.comments_count }}</span></p>
                        </div>
                        <div class="posts-column-author has-text-grey-dark">{{ post.user.name }}</div>
                        <div class="posts-column-date has-text-grey-dark">{{ setTimeFormat(post.created_at) }}</div>
                        <div class="posts-column-upvotes has-text-grey-dark">{{ totalVotes(post) }}</div>
                        <div class="posts-column-view-count has-text-grey-dark">{{ post.view_count }}</div>
                    </li>
                </nuxt-link>
            </div>
        </div>

        <!--모바일-->
        <div v-if="isMobile">
            <div
                v-if="noPosts"
                class="no-posts-div">
                보여질 글이 없습니다.
            </div>
            <div v-if="!noPosts">
                <nuxt-link
                    v-for="(post, index) in posts"
                    :to="postUrl(post)"
                    :key="index">
                    <li class="posts-row posts-content-rows-mobile space-between">
                        <div>
                            <div class="has-text-grey-dark post-row-title-mobile-div">
                                <span class="post-row-title-mobile">{{ post.title }}</span>
                            </div>
                            <div class="flex-start">
                                <div class="post-row-content-mobile has-text-grey-dark">{{ post.user.name }}</div>
                                <div class="post-row-content-mobile has-text-grey-dark"><span>&nbsp;|&nbsp;</span></div>
                                <div class="post-row-content-mobile has-text-grey-dark">{{ setTimeFormat(post.created_at) }}</div>
                                <div class="post-row-content-mobile has-text-grey-dark"><span>&nbsp;|&nbsp;</span></div>
                                <div class="post-row-content-mobile has-text-grey-dark">조회수 {{ post.view_count }}</div>
                                <div class="post-row-content-mobile has-text-grey-dark"><span>&nbsp;|&nbsp;</span></div>
                                <div class="post-row-content-mobile has-text-grey-dark">추/비추
                                    <span class="has-text-danger has-text-weight-semibold">{{ totalVotes(post) }}</span>
                                </div>
                                <div class="post-row-content-mobile has-text-grey-dark"><span>&nbsp;|&nbsp;</span></div>
                                <div class="post-row-content-mobile has-text-grey-dark">댓글
                                    <span class="has-text-danger has-text-weight-semibold">{{ post.comments_count }}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                </nuxt-link>
            </div>
        </div>
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
        isMobile() {
            return this.$store.getters['isMobile']
        },
        noPosts() {
            const posts = this.$store.getters['posts/list']
            return posts.length === 0 ? true : false
        }
    },
    methods: {
        postUrl(post) {
            return '/' + post.id
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
    border-top: 2px solid #363636;
    border-bottom: 2px solid #363636;
}
.posts-row {
    display: flex;
    align-items: center;
}
.posts-content-rows {
    min-height: 30px;
    border-bottom: 1px solid #DBDBDB;
}
.posts-content-rows-mobile {
    min-height: 45px;
    border-bottom: 1px solid #DBDBDB;
    padding: 3px;
}
.post-row-title-mobile {
    font-size: 1.1rem;
}
.post-row-title-mobile-div {
    max-height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
}
.posts-column-names-row {
    min-height: 30px;
    text-align: center;
    border-bottom: 1px solid #363636;
    font-weight: 500;
}
.flex-start {
    display: flex;
    justify-content: flex-start;
}
.space-between {
    display: flex;
    justify-content: space-between;
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
.post-row-content-mobile {
    font-size: 0.8rem;
}
.comments-count {
    font-weight: 700;
}
.no-posts-div {
    height: 100px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>