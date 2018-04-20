// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "postcss-aspect-ratio-mini":{},
    "postcss-cssnext":{},
    "cssnano":{
      preset: "advanced",
      autoprefixer: false,
      "postcss-zindex": false
    },
    /*
    "postcss-pxtorem":{
      "rootValue": 192,//设计稿宽度除以10搭配手淘flexible布局
      "propList": ["*"],
      "minPixelValue": 2
    }*/
  }
}


