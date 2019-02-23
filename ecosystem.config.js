module.exports = {
    apps : [{
        name      : 'sonnol', // App name that shows in `pm2 ls`
        exec_mode : 'cluster', // enables clustering
        instances : '4', // or an integer
        cwd       : './', // only if using a subdirectory
        script    : './node_modules/nuxt/bin/nuxt-start', // The magic key
    }]
};