module.exports = {
    apps : [{
        name      : 'sonnol', // App name that shows in `pm2 ls`
        exec_mode : 'cluster', // enables clustering
        instances : 'max', // or an integer
        script    : './node_modules/nuxt/bin/nuxt.js', // The magic key
    }]
};