let mix = require('laravel-mix');
const path = require('path');

mix
  .setPublicPath('dist')
  .js('resources/js/tool.js', 'js')
  .vue({ version: 3 })
  .sass('resources/sass/tool.sass', 'css')
  .webpackConfig({
    resolve: {
      alias: {
        'laravel-nova': path.resolve(__dirname, 'resources/js/mocks/laravel-nova.js')
      }
    }
  });
