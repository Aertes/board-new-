<template>
  <div class="dotcom-wrap">

    <div class="table-nav clearfix">
      <h3><i class="color-line color2"></i>Dotcom Performance Overview</h3>
      <div class="tool-box clearfix">
        <div class="selection-box">
          <selection :selections="test" class="select-colorOrange"></selection>
        </div>
        <div class="icon-box">
          <svg-icon sign="icon-erweima" class="erweima-icon"></svg-icon>
          <svg-icon sign="icon-link" class="link-icon"></svg-icon>
        </div>
      </div>
    </div>
    <div class="table-name">B2C</div>
    <div class="table-box">
      I am Table
    </div>

    <!---------------->
    <div class="table-name">B2B</div>
    <div>
      I am Table
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "dotcom"
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../appmain/appmain.styl"
</style>
