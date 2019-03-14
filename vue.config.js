const ajax = require('superagent')

const data = require('./fakedata.json')
const self = data.self
const friends = data.friend
module.exports = {
    /** 区分打包环境与开发环境
     * process.env.NODE_ENV==='production'  (打包环境)
     * process.env.NODE_ENV==='development' (开发环境)
     * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
     */
    // 基本路径
    baseUrl: './',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
   // lintOnSave: true,
    // use the full build with in-browser compiler?
    // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
   //compiler: false,
    // webpack配置
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    chainWebpack: () => {},
    configureWebpack: () => {},
    //如果想要引入babel-polyfill可以这样写
    // configureWebpack: (config) => {
    //   config.entry = ["babel-polyfill", "./src/main.js"]
    // },
    // vue-loader 配置项
    // https://vue-loader.vuejs.org/en/options.html
    //vueLoader: {},
    // 生产环境是否生成 sourceMap 文件
   // productionSourceMap: true,
    // css相关配置
    //css: {
        // 是否使用css分离插件 ExtractTextPlugin
     //   extract: true,
        // 开启 CSS source maps?
     //   sourceMap: false,
        // css预设器配置项
     //   loaderOptions: {},
        // 启用 CSS modules for all css / pre-processor files.
        // modules: false
    // },
    // use thread-loader for babel & TS in production build
    // enabled by default if the machine has more than 1 cores
    //parallel: require('os').cpus().length > 1,
    // 是否启用dll
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
   // dll: false,
    // PWA 插件相关配置
    // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
 //   pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '127.0.0.1',
        port: 8888,
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        before: app => {
        	app.get('/api/self', (req, res) => {
                res.json({data: self})
            })
            app.get('/api/friends', (req, res) => {
                res.json({data: friends})
            })
            app.get('/api/robot', (req, res) => {
                // 当请求http://localhost:8080/api/robot?id=123&msg=hello
                // req.query = {id: 123,msg: 'hello'}
                console.log(req.query)
                let info = req.query.msg
                let userid = req.query.id
                let key = '069e90c4262243bf964ad95014371384'
                // 后台网络请求其他服务器的数据
                ajax.post('http://www.tuling123.com/openapi/api')
                    .send({info, userid, key})
                    .end((err,data) => {
                        if(err){
                            console.log(err)
                        }
                        res.json({
                            data: data.text
                        })
                    })
            })
        }
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}
