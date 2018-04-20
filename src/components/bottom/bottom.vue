<template>
  <div class="bottom-wrap">
    <h5>Highlight
      <svg-icon sign="icon-tianjia"></svg-icon>
    </h5>
    <ul>
      <li>
        <input type="text" value="Overall, we achieved great performance on most of the KPIs.">
        <p>
          <span>Overall, we achieved great performance on most of the KPIs.</span><svg-icon sign="icon-closed"></svg-icon>
        </p>
      </li>
      <li>
        <input type="text" value="For “Review & Rating”,  we deep rating to 4.3 (as global target), 4.5 (as China target) and 4.8 (as aggressive target) and more review responses to both negative and neutral reviews in JD.">
        <p>
          <span>Overall, we achieved great performance on most of the KPIs.</span><svg-icon sign="icon-closed"></svg-icon>
        </p>
      </li>
      <li>
        <input type="text" value="The big achievement from B2B is the first success SQL.">
        <p>
          <span>Overall, we achieved great performance on most of the KPIs.</span><svg-icon sign="icon-closed"></svg-icon>
        </p>
      </li>
      <li>
        <input type="text" value="The big achievement from B2B is the first success SQL.">
        <p>
          <span>Overall, we achieved great performance on most of the KPIs.</span><svg-icon sign="icon-closed"></svg-icon>
        </p>
      </li>
      <li>
        <input type="text" value="The big achievement from B2B is the first success SQL.">
        <p>
          <span>Overall, we achieved great performance on most of the KPIs.</span><svg-icon sign="icon-closed"></svg-icon>
        </p>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "bottom",
    data(){
      return{
        time:'201803',
        type:[
          'overview',
          'campaign',
          'dotcom',
          'ratingreview',
          'ecommerce'
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/style/mixin.styl';
  .bottom-wrap
    font-size 20px
    margin-top 30px
    h5
      margin-bottom 20px
      font-weight normal
      font-size 25px
      color #C89000
    .icon
      color #A3A2A2
      font-size 20px
      vertical-align -2px
      margin-left 15px
      cursor pointer
    ul
      li
        position relative
        padding-left 30px
        margin-bottom 5px
        &:after
          e-pos(top:50%, y:-50%)
          left 0
          content ''
          width 8px
          height 8px
          background-color black
          border-radius 50%
        input
          display none
          width 100%
          height 35px
          font-size 20px
          border 1px solid #eaeaea
          padding 0 10px
        p
          display inline-block
          span
            line-height 30px
            display inline-block
          .icon
            font-size 18px
            display none
          &:hover
            .icon
              display inline-block
        &.edit
          input
            display block
          p
            display none

  @media screen and (max-width: 1235px)
    .bottom-wrap
      .icon
        font-size 28px
      ul
        li
          margin-bottom 10px
          input
            height 60px
            font-size 20px
          span
            line-height 40px
          &:hover
            .icon
              display none!important
</style>
