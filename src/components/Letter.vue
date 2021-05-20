<template>
  <div class="hangman-letter">
    {{ letter ? letter : '' }}
  </div>
</template>

<script>
export default {
  name: 'Letter',
  props: ['letter']
}
</script>

<style scoped>
.hangman-letter {
  border-bottom: 2px solid #444;
  font-size: 30px;
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
}
</style>