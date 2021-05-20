<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="d-flex justify-center">
        <img style="width: 310px;" :src="require(`@/assets/logo.png`)" />
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <div class="hangman-rules">
          <h2 class="text-center">RULES</h2>
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
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 20px;
  margin: 40px;
  width: 100%;
  max-width: 500px;
}
</style>