var path = require('path');

var languages = require("../src/refbox/languages.js");
var getCommonPlugins = require('./plugins');
var getCommonLoaders = require('./loaders');

var I18nPlugin = require("i18n-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// Add one HtmlWebpackPlugin for index and angular, add one lamguage plugin to embed translation
function _getDevelPlugins(src, language){
  return [].concat(['index', 'angular'].map(function(fileNamePrefix){
    return new HtmlWebpackPlugin({
      filename: language === 'en' ? fileNamePrefix + '.html' :  fileNamePrefix + '_' + language + '.html',
      template: '!!swig-loader!' + path.join(src, fileNamePrefix + '.html'),
      inject: true,
      minify: false
    })
  }),
    new I18nPlugin(languages[language]));
}

// generates one development configuration for each language
// generates localized index*.html and angular*.html files
module.exports = function (options) {
  var src = options.src;
  var pages = options.pages;
  var publicPath = options.publicPath;
  var globals = options.globals;

  var localizedDevelopmentConfigs = Object.keys(languages).map(function(language){
    var lang_dir = language === 'en' ? '' : language;
    return {
      entry: {
        "angular-lindat": path.join(src, 'angular-dev.js'),
        lindat: path.join(src, 'index-dev.js')
      },
      output: {
        path: pages,
        publicPath: publicPath,
        filename: path.join('public', 'js', lang_dir, '[name].js')
      },
      module: getCommonLoaders(src, globals),
      plugins: [].concat(
        getCommonPlugins(src, globals),
        _getDevelPlugins(src, language)
      )
    };
  });
  return localizedDevelopmentConfigs;
};
