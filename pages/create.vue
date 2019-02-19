<template>
    <section
        :class="{ 'desktop-padding': !isMobile, 'mobile-padding': isMobile }"
        class="container">
        <form
            @submit.prevent="submit">
            <input
                v-model="post.title"
                type="string"
                name="title"
                placeholder="제목"
                class="input create-post-title is-size-6">
            <div
                v-quill:myQuillEditor="editorOption"
                v-model="post.body"
                class="quill-editor"/>
            <div>
                <button
                    class="button is-primary submit-button"
                    type="submit">작성하기</button>
            </div>
        </form>
    </section>
</template>

<script>
import Vue from 'vue'
export default {
    data () {
        return {
            post: {
                title: '',
                body: '',
            },
            editorOption: null
        }
    },
    computed: {
        isMobile() {
            return this.$store.getters['isMobile']
        }
    },
    beforeMount() {
        const VueQuillEditor = require('vue-quill-editor/dist/ssr');
        const Quill = require('quill');
        const {ImageExtend, QuillWatch, container} = require('quill-image-extend-module');

        this.editorOption = {
            modules: {
                toolbar: {
                    container: [
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ size: ['small', false, 'large', 'huge'] }],
                        [{ color: [] }, { background: [] }],
                        [{ align: [] }],
                        ['link', 'image', 'video']
                    ],
                    handlers: {
                        'image': function () {
                            QuillWatch.emit(this.quill.id)
                        }
                    }
                },
                ImageExtend: {
                    loading: true,
                    name: 'image',
                    action: process.env.TV_API + '/v1/images',
                    response: (res) => {
                        const imageUrl = process.env.AWS_URL + '/' + process.env.ENVIRONMENT + '/'
                            + this.$store.state.user.id + '/' + res.new_name + '.' + res.ext
                        return imageUrl
                    },
                    headers: (xhr) => {
                        xhr.setRequestHeader('Authorization','Bearer ' + this.$store.state.accessToken)
                    },
                    error: () => {
                        alert('파일이 업로드되지 않았습니다.')
                    },
                },
            }
        }

        if (!Quill.imports['modules/ImageExtend']) {
            Quill.register('modules/ImageExtend', ImageExtend);
        }
        Vue.use(VueQuillEditor)
    },
    methods: {
        async submit() {
            if (this.isEmpty(this.post.title)) {
                alert('제목을 입력해 주세요.')
                return
            }
            if (this.isEmpty(this.post.body)) {
                alert('본문을 입력해 주세요.')
                return
            }
            const response = await this.$store.dispatch('posts/createPost', this.post)
            if (response.status) {
                this.$router.push('/' + response.data.id)
            } else {
                const error = response.data.response
                if (error.status === 400) {
                    alert('제목과 본문을 확인해주세요.')
                } else {
                    alert('서버에 문제가 발생했습니다. 운영자에게 연락하거나 나중에 다시 시도해주세요.')
                }
            }
        },
        isEmpty(string) {
            const stringsToCheckArray = ['&nbsp;', ' ', '<p>', '</p>', '<br>'];

            stringsToCheckArray.forEach(item => {
                let stringArray = string.split(item)
                string = ''
                stringArray.forEach(stringItem => {
                    string = string + stringItem
                })
            })

            if (string === '') {
                return true
            } else {
                return false
            }
        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    margin: 0 auto;
}
.desktop-padding {
    padding: 40px;
}
.mobile-padding {
    padding-top: 20px;
}
.quill-editor {
    max-height: 600px;
    overflow-y: auto;
}
.create-post-title {
    width: 100%;
    height: 35px;
    margin-bottom: 10px;
}
.submit-button {
    margin-top: 10px;
    min-width: 100px;
}
</style>
