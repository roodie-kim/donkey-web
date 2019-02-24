<template>
    <div class="error-page">
        <div class="message-div">
            <h3 class="is-title is-size-3">사람이 많네요.</h3>
            <h3 class="is-title is-size-3">잠시만 기다려주세요.</h3>
            <h5 class="is-subtitle is-size-5">로딩중입니다.</h5>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        this.$router.push('/')
    }
}
</script>

<style scoped>
.error-page {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 200px;
}
.message-div {
    text-align: center;
}
</style>