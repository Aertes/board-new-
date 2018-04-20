// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

//字体模块
import SvgIcon from '@/components/base/svgicon'

Vue.component('SvgIcon', SvgIcon)

//select模块
import Selection from '@/components/base/selection'

Vue.component('Selection', Selection)

//svg字体配置(Js)
import './assets/font/iconfont'

//网站基础样式
import './assets/style/base.styl'

//fastClick
import './assets/js/fastclick'

$(function () {
  FastClick.attach(document.body);
});

//网站自适应JS库
import 'amfe-flexible/index'

//table分页条
import "./assets/style/tablepagination.css"

//弹出框
import './assets/layer/theme/default/layer.css'
import './assets/layer/layer'

//ztree
import './assets/ztree/js/jquery.ztree.all'
import './assets/ztree/css/zTreeStyle/zTreeStyle.css'

//图表
import Echarts from 'echarts'

Vue.prototype.$echarts = Echarts


//非父子组件通信中转站
let Hub = new Vue();
Vue.prototype.$Hub = Hub

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    type: 1,
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  },
  mutations: {
    increment: state => {
      if (state.type == 7) return
      state.type++
    },
    decrement: state => {
      if (state.type == 1) return
      state.type--
    },
    voluation: (state, val) => {
      state.type = val
    },
    yearVoluation: (state, val) => {
      state.year = val
    },
    monthVoluation: (state, val) => {
      state.month = val
    },
  },
  getters: {
    getYearMonth: state => {

      if (state.month < 10) {

        return state.year + '0' + state.month

      } else {

        return state.year.toString() + state.month.toString()

      }

    },
    typesOfName: state => {

      switch(state.type){
        case 1:
          return 'coverpage'
          break;
        case 2:
          return 'overview'
          break;
        case 3:
          return 'campaign'
          break;
        case 4:
          return 'dotcom'
          break;
        case 5:
          return 'crm'
          break;
        case 6:
          return 'ratingreview'
          break;
        case 7:
          return 'ecommerce'
          break;
      }

    }
  }
})

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})

