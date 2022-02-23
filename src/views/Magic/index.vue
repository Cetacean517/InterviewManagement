<template>
  <div>
    <!-- Magic School -->
  </div>
</template>

<script>
export default {
  mounted: function() {
    console.log(this.$store.getters.roles.indexOf('ROLE_EMPLOYER'))
    if (this.$store.getters.roles.indexOf('ROLE_EMPLOYER') >= 0) {
      this.$router.push({ path: '/curdHR' })
    }
    this.$router.push({ path: '/User/checkMSG' })
  }

}
</script>

<style>

</style>
