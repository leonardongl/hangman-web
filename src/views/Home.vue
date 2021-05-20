<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <img style="width: 310px;" :src="require(`@/assets/logo.png`)" />
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <div class="hangman-rules">
          <h2 class="text-center">HOW TO PLAY</h2>
          <p>When starting the game, you will be given a random word to guess.</p>
          <p>Click on one of the letters you think you might have in the word.</p>
          <p>If the letter exists in the word, it will appear in the exact position and will be green in the virtual keyboard.</p>
          <p>If the letter does not exist, it will appear in the <b>INCORRECT LETTERS</b> area and will be red in the virtual keyboard.</p>
          <p>If you miss 7 letters, YOU LOSE!</p>
        </div>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn color="primary" x-large to="/play">
          PLAY NOW
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style>
.hangman-rules {
  border-radius: 20px;
  padding: 20px;
  margin: 40px;
  width: 100%;
  max-width: 500px;
}
.hangman-rules p {
  text-align: justify;
}
</style>