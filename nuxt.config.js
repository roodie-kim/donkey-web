require('dotenv').config()
const pkg = require('./package')

module.exports = {
    mode: 'universal',

    /*
    ** Headers of the page
    */
    head: {
        title: '손가락 놀이터 | 글이 순삭되는 손놀 게시판',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '모든 글이 순삭되는 게시판. 내 과거의 글이 웹세상을 표류하는 것이 싫은 사람들을 위한곳.' },
            { hid: 'image', name: 'image', content: 'https://s3.ap-northeast-2.amazonaws.com/project-donkey/resources/logos/SEO_Image.png' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
        script: [
            { src: 'https://use.fontawesome.com/releases/v5.1.0/js/all.js' },
        ]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },

    /*
    ** Global CSS
    */
    css: [
        { src: '~/assets/css/tv-bulma.scss', lang: 'scss'},
        'quill/dist/quill.snow.css',
        'quill/dist/quill.bubble.css',
        'quill/dist/quill.core.css'
    ],

    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        { src: '~plugins/moment.js', ssr: true },
        { src: '~plugins/vee-validate.js', ssr: true},
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/dotenv',
        '@nuxtjs/google-gtag',
        'nuxt-device-detect',
        ['nuxt-buefy', { css: false, materialDesignIcons: false }],
    ],
    'google-gtag':{
        id: process.env.GA_ID, // required
        config:{
            // this are the config options for `gtag
            // check out official docs: https://developers.google.com/analytics/devguides/collection/gtagjs/
            anonymize_ip: true, // anonymize IP
            send_page_view: false, // might be necessary to avoid duplicated page track on page reload
        },
        debug: true, // enable to track in dev mode
        disableAutoPageTrack: false, // disable if you don't want to track each page route with router.afterEach(...)
        // optional you can add more configuration like [AdWords](https://developers.google.com/adwords-remarketing-tag/#configuring_the_global_site_tag_for_multiple_accounts)
        // additionalAccounts:[{
        //     id: 'AW-XXXX-XX', // required if you are adding additional accounts
        //     config:{
        //         send_page_view:false // optional configurations
        //     }
        // }]
    },
    /*
    ** Axios module configuration
    */
    axios: {
        baseURL: process.env.TV_API
    },

    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },
    dev: (process.env.NODE_ENV !== 'production'),
}
