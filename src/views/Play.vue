<template>
  <v-container>
    <v-row>
      <v-col cols="4">
        <v-img src="https://www.sightwordsgame.com/wp-content/uploads/2011/11/Hangman.jpg" />
      </v-col>
      <v-col cols="8" class="d-flex flex-column justify-space-between">
        <div v-if="status !== 'P'" class="game-message">
          {{ status === 'V' ? 'YOU WIN' : 'YOU LOSE' }}
        </div>
        <div v-if="letters" class="d-flex justify-space-around">
          <letter 
            v-for="(letter, index) in letters" 
            :key="index" 
            :letter="letter"
          />
        </div>
      </v-col>
      <v-col cols="12">
        <v-btn 
          v-for="(letter, index) in alphabet" 
          :key="index" 
          @click="letter.status ? null : clickLetter(letter)" 
          :color="getLetterColor(letter.status)"
          :disabled="status !== 'P'"
          class="ma-1"
        >
          {{ letter.letter }}
        </v-btn>
      </v-col>
      <v-col cols="12">
        <span> INCORRECT LETTERS: </span>
        <span 
          v-for="(letter, index) in alphabet" 
          :key="index"
          class="text-error"
        >
          <v-chip v-if="letter.status === 'E'" color="error" class="mx-2">{{ letter.letter }}</v-chip>
        </span>
      </v-col>
      <v-col cols="12" class="d-flex justify-center">
        <v-btn to="/" class="mr-2">
          <v-icon>mdi-reply</v-icon> BACK TO HOME
        </v-btn>
        <v-btn color="primary" @click="newGame">
          <v-icon>mdi-play</v-icon> NEW GAME
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '../services/api';
import Letter from '../components/Letter';
import alphabet from '../util/alphabet';
export default {
  name: 'Play',
  components: { Letter },
  data: () => ({
    alphabet: JSON.parse(JSON.stringify(alphabet)),
    word: {},
    letters: [],
    status: 'P',
  }),
  created() {
    this.getWord();
  },
  methods: {
    async getWord() {
      await api.get(`words/get-word`)
        .then(res => {
          this.word = res.data;
          for (let i = 0; i < this.word.letters; i++) this.letters.push('');
        })
        .catch(err => {
          console.log(err);
          alert('Error to find a word!');
        });
    },
    async clickLetter(letter) {
      await api.get(`words/find-letter/${this.word.index}/${letter.letter}`)
        .then(res => {
          if (res.data.indexes.length > 0) {
            res.data.indexes.map(index => {
              console.log(index);
              this.letters[index] = letter.letter;
            });
            letter.status = 'C';
            this.$forceUpdate();
            this.checkVictory();
          } else {
            letter.status = 'E';
            this.checkDefeat();
          }
        })
        .catch(err => {
          console.log(err);
          alert('Error to send a letter!');
        });
    },
    checkVictory() {
      let win = true;
      this.letters.map(letter => {
        if (letter === '')
          win = false;
      });
      return win ? this.statusGame('V') : null;
    },
    checkDefeat() {
      let lostCount = 0;
      this.alphabet.map(letter => {
        if (letter.status === 'E')
          lostCount++;
      });
      return lostCount > 5 ? this.statusGame('L') : null;
    },
    statusGame(status) {
      this.status = status;
    },
    newGame() {
      this.alphabet = JSON.parse(JSON.stringify(alphabet));
      this.word = {};
      this.letters = [];
      this.status = 'P';
      this.getWord();
      this.$forceUpdate();
    },
    getLetterColor(status) {
      switch (status) {
        case 'C':
          return 'success';
        case 'E':
          return 'error';
        default:
          return 'primary';
      }
    }
  },
}
</script>

<style>
.game-message {
  height: 100%;
  font-size: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>