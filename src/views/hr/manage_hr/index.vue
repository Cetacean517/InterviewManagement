<template>
  <div class="hr-container">
    <div class="text">name:{{ name }}</div>
  </div>
</template>

<script>

export default {
  name: 'HRmModule',
  data: function() {
    return {
      name: 'HRmModule'
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
