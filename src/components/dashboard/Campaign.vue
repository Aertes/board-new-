<template>
  <div class="campaign-wrap">

    <div class="table-nav clearfix">
      <h3><i class="color-line color1"></i>Campaign Performance Overview</h3>
      <div class="tool-box clearfix">
        <div class="selection-box">
          <selection :selections="test" class="select-colorOrange"></selection>
        </div>
        <div class="icon-box">
          <svg-icon sign="icon-chartbar" class="chart-icon"></svg-icon>
          <svg-icon sign="icon-erweima" class="erweima-icon"></svg-icon>
          <svg-icon sign="icon-link" class="link-icon"></svg-icon>
        </div>
      </div>
    </div>
    <div class="table-box">
      I am Table
    </div>

    <!---------------->

    <div class="table-nav clearfix">
      <h3><i class="color-line color1"></i>Individual Campaign Performance Analysis</h3>
      <div class="tool-box clearfix">
        <div class="selection-box">
          <selection :selections="test" class="select-colorOrange"></selection>
          <selection :selections="test" class="select-colorDarkseaGreen"></selection>
        </div>
        <div class="icon-box">
          <svg-icon sign="icon-chartbar" class="chart-icon"></svg-icon>
          <svg-icon sign="icon-erweima" class="erweima-icon"></svg-icon>
          <svg-icon sign="icon-link" class="link-icon"></svg-icon>
        </div>
      </div>
    </div>
    <div class="table-name color">Campaign name</div>
    <div>
      I am Table
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "campaign"
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../appmain/appmain.styl"
</style>
