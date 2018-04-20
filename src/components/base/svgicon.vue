<template>
  <svg v-if="SignCode" class="icon" aria-hidden="true">
    <use :xlink:href="SignCode"></use>
  </svg>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "SvgIcon",
    props: {
      sign: {
        type: String,
        default: ''
      }
    },
    computed: {
      SignCode() {
        return this.sign ? `#${this.sign}` : '';
      }
    }
  }
</script>
