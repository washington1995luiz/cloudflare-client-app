const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://146.235.40.35:8080', // Your Spring Boot API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/,''),
      },
    },
  },
})
