<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn to="/">
          Go to home
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-row v-if="word.letters" class="justify-space-around">
          <letter 
            v-for="(letter, index) in word.letters" 
            :key="index" 
          />
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-btn 
          v-for="(letter, index) in letters" 
          :key="index" 
          @click="clickLetter(letter)" 
          color="primary"
          class="ma-1"
        >
          {{ letter }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '../services/api';
import Letter from '../components/Letter';
export default {
  name: 'Play',
  components: { Letter },
  data: () => ({
    letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
    word: {},
  }),
  created() {
    this.getWord();
  },
  methods: {
    async getWord() {
      await api.get(`words/get-word`)
        .then(res => {
          this.word = res.data;
        })
        .catch(err => {
          console.log(err);
          alert('Error to find a word');
        });
    },
    async clickLetter(letter) {
      await api.get(`words/find-letter/${this.word.index}/${letter}`)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          alert('Error to find a word');
        });
    }
  },
}
</script>
