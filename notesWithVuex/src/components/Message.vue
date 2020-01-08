<template>
  <div class="message">
    <p>{{ $store.state.notes.message }}</p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.message {
  text-align: center;
  padding: 20px;
}
p {
  color: #ba3838;
}
</style>
