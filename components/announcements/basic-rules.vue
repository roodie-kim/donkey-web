<template>
    <article class="message">
        <div class="message-header">
            <p>게시판 이용 규칙</p>
        </div>
        <div class="message-body">
            <p>1. 작성 글은 기본적으로 20분 후 삭제됩니다.</p>
            <p>2. 작성 글이 추천 혹은 비추천을 받을 시 노출 시간이 10초씩 늘어나거나 줄어듭니다.</p>
            <p>3. 노출 시간은 최대 10분까지 늘어나거나 줄어들 수 있습니다.</p>
            <p>4. 작성 글과 글의 댓글은 2시간 이내에 DB에서 완전히 삭제됩니다.</p>
            <p>5. 과도한 비방이나 욕설, 기타 문제의 여지가 있는 글은 언제든 삭제될 수 있습니다.</p>

            <div class="flex-center close-button-div">
                <button
                    class="button is-primary confirm-button"
                    @click="setRulesChecked()">확인</button>
            </div>
        </div>
    </article>
</template>

<script>
export default {
    methods: {
        setRulesChecked() {
            this.$store.commit('SET_RULES_CHECKED', true)
        }
    }
}
</script>

<style scoped>
.message {
    margin: 10px 10px 20px 10px;
}
.flex-center {
    display: flex;
    justify-content: center;
}
.close-button-div {
    margin-top: 20px;
}
.confirm-button {
    min-width: 100px;
}
</style>