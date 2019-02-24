<template>
    <div class="error-page">
        <div class="message-div">
            <h3 class="is-title is-size-3 sentence">뭔가 서버에 문제가 생긴거 같아요.</h3>
            <nuxt-link
                class="button is-primary go-home-button"
                to="/">메인으로 돌아가기</nuxt-link>
        </div>
    </div>
</template>

<script>
export default {

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
.sentence {
    margin-bottom: 30px;
}
.go-home-button {
    height: 50px;
}
</style>