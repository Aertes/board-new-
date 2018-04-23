<template>
  <div class="app-main-wrap">
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import xhrUrls from '../../assets/config/xhrUrls'
  import {get, post, uploadPost} from '../../assets/config/http'

  let OVDateUrl = xhrUrls.OV_DATE
  let CAM_CATEGORY = xhrUrls.CAM_CATEGORY
  let CAM_GETPARAMETER = xhrUrls.CAM_GETPARAMETER
  let EC_CATEGORY = xhrUrls.EC_CATEGORY

  export default {
    name: "appmain",
    data() {
      return {
      }
    },
    computed: {
      type() {
        return this.$store.state.type
      },
      getYearMonth() {
        return this.$store.getters.getYearMonth
      }
    },
    mounted() {

    },
    updated() {
      this.locationHash = false
    },
    methods: {

    },
    components: {
    },
    watch: {
      type: function () {

      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
