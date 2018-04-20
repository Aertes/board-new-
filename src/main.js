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
$(function () {FastClick.attach(document.body);});

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

//vue-tree
/*import 'vue-tree-halower/dist/halower-tree.min.css' // 你可以自定义树的样式
import VTree from 'vue-tree-halower'*/

//图表
import Echarts from 'echarts'
Vue.prototype.$echarts = Echarts


//非父子组件通信中转站
let Hub = new Vue();
Vue.prototype.$Hub = Hub

Vue.use(Vuex)

/*Vue.use(VTree)*/

const store = new Vuex.Store({
  state: {
    type: 0,
    year: null,
    month: null,
    /************************/
    camOneCategory:null,
    camOneTwoCategory:null,
    camCategory:null,
    camCompaign:null,
    camWeek:null,
    comMarketType:'B2C',
    comMarketTypeTwo:'B2C',
    rrOneChannel:null,
    rrChannel:null,
    ecCategory:null,
    /************************/
    camOneCategoryId:0,
    camOneTwoCategoryId:0,
    camCategoryId:0,
    camCompaignId:0,
    camWeekId:0,
    comMarketTypeId:0,
    comMarketTypeTwoId:0,
    rrOneChannelId:0,
    rrChannelId:0,
    ecCategoryId:0
  },
  mutations: {
    increment: state => {
      if (state.type == 14) return
      state.type++
    },
    decrement: state => {
      if (state.type == 0) return
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
    /************************/
    camOneCategoryVoluation:(state, val) => {
      if(val == 'ALL PRODUCTS') val =null
      state.camOneCategory = val
    },
    camOneTwoCategoryVoluation:(state, val) => {
      if(val == 'ALL PRODUCTS') val =null
      state.camOneTwoCategory = val
    },
    camCategoryVoluation:(state, val) => {
      if(val == 'ALL PRODUCTS') val =null
      state.camCategory = val
    },
    camCompaignVoluation:(state, val) => {
      if(val == 'ALL PRODUCTS') val =null
      state.camCompaign = val
    },
    camWeekVoluation:(state, val) => {
      if(val == 'ALL PRODUCTS') val =null
      state.camWeek = val
    },
    comMarketTypeVoluation:(state, val) => {
      state.comMarketType = val
    },
    comMarketTypeTwoVoluation:(state, val) => {
      state.comMarketTypeTwo = val
    },
    rrOneChannelVoluation:(state, val) => {
      if(val == 'ALL CHANNEL') val =null
      state.rrOneChannel = val
    },
    rrChannelVoluation:(state, val) => {
      if(val == 'ALL CHANNEL') val =null
      state.rrChannel = val
    },
    ecCategoryVoluation:(state, val) => {
      if(val == 'ALL PRODUCTS') val =null
      state.ecCategory = val
    },
    /************************/
    camOneCategoryIdVoluation:(state, val) => {
      state.camOneCategoryId = val
    },
    camOneTwoCategoryIdVoluation:(state, val) => {
      state.camOneTwoCategoryId = val
    },
    camCategoryIdVoluation:(state, val) => {
      state.camCategoryId = val
    },
    camCompaignIdVoluation:(state, val) => {
      state.camCompaignId = val
    },
    camWeekIdVoluation:(state, val) => {
      state.camWeekId = val
    },
    comMarketTypeIdVoluation:(state, val) => {
      state.comMarketTypeId = val
    },
    comMarketTypeTwoIdVoluation:(state, val) => {
      state.comMarketTypeTwoId = val
    },
    rrOneChannelIdVoluation:(state, val) => {
      state.rrOneChannelId = val
    },
    rrChannelIdVoluation:(state, val) => {
      state.rrChannelId = val
    },
    ecCategoryIdVoluation:(state, val) => {
      state.ecCategoryId = val
    }

  },
  getters: {
    getYearMonth: state => {
      if (state.year == null && state.month == null) {

        state.year = new Date().getFullYear().toString()

        state.month = (new Date().getMonth()).toString()
        //state.month = (new Date().getMonth() + 1).toString()

      }

      if (state.month < 10) {

        return state.year + '0' + state.month

      } else {

        return state.year.toString() + state.month.toString()

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

