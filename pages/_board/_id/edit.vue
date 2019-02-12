<template>
    <div>
        <edit-editor/>
    </div>
</template>

<script>
import EditEditor from '@/components/posts/edit-editor'
export default {
    middleware: 'signedIn',
    components: {
        EditEditor
    },
    data () {
        return {
            post: {
                title: '',
                body: ''
            }
        }
    },

    methods: {
        async submit () {

        }
    }
}
</script>

<style scoped>

</style>