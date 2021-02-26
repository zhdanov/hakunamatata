module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-simple-vars'),
    require('autoprefixer')({
      grid: 'autoplace',
      'overrideBrowserslist': [
        'Android > 1',
        'Baidu > 1',
        'BlackBerry > 1',
        'Chrome > 1',
        'ChromeAndroid > 1',
        'Edge > 1',
        'Explorer > 1',
        'ExplorerMobile > 1',
        'Firefox > 1',
        'FirefoxAndroid > 1',
        'iOS > 1',
        'Opera > 1',
        'OperaMini > 1',
        'OperaMobile > 1',
        'QQAndroid > 1',
        'Safari > 1',
        'Samsung > 1',
        'UCAndroid > 1',
        'kaios > 1'
      ]
    }),
    require('cssnano')
  ]
}
