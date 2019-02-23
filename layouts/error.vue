<template>
    <div class="nuxt-error">
        <component
            :is="errorPage"
            :error="error" />
    </div>
</template>

<script>
import error429 from '~/components/errors/429.vue'
import error500 from '~/components/errors/500.vue'
export default {
    layout: 'default',
    props: {
        error: {
            type: Object,
            default: () => {
            },
        },
    },
    computed: {
        errorPage() {
            if (this.error.statusCode === 429) {
                return error429;
            }
            return error500;
        },
    }
}
</script>

<style scoped>

</style>