<template>
  <v-container>
    <v-row>
      <v-col sm="4" cols="12">
        <img style="height: 300px; margin: 0 auto" :src="require(`@/assets/hangman${countErrors}.png`)" />
      </v-col>
      <v-col sm="8" cols="12" class="d-flex flex-column justify-space-between">
        <div class="game-message">
          <div v-if="status === 'V'" class="div-message">
            <v-icon x-large color="success">
              mdi-emoticon
            </v-icon>
            YOU WON<br/>
            <small>THE CORRECT WORD IS <b>{{ correctWord }}</b></small>
          </div>
          <div v-if="status === 'D'" class="div-message">
            <v-icon x-large color="error">
              mdi-emoticon-dead
            </v-icon>
            YOU LOSE
          </div>
        </div>
        <div v-if="letters" class="d-flex flex-wrap justify-space-around">
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
      <v-col cols="12" class="d-flex justify-center mt-5">
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
    correctWord: null,
    letters: [],
    status: 'P',
    countErrors: 0
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
    async guessWord() {
      let text = this.letters.toString().replaceAll(',', '');
      await api.get(`words/guess-word/${this.word.index}/${text}`)
        .then(res => {
          this.correctWord = res.data.text;
          this.statusGame('V');
        })
        .catch(err => {
          console.log(err);
          alert('Error to guess a word!');
        });
    },
    async clickLetter(letter) {
      await api.get(`words/find-letter/${this.word.index}/${letter.letter}`)
        .then(res => {
          if (res.data.indexes.length > 0) {
            res.data.indexes.map(index => {
              this.letters[index] = letter.letter;
            });
            letter.status = 'C';
            this.$forceUpdate();
            this.checkVictory();
          } else {
            this.countErrors++;
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
      return win ? this.guessWord() : null;
    },
    checkDefeat() {
      let lostCount = 0;
      this.alphabet.map(letter => {
        if (letter.status === 'E')
          lostCount++;
      });
      return lostCount > 6 ? this.statusGame('D') : null;
    },
    statusGame(status) {
      this.status = status;
    },
    newGame() {
      this.alphabet = JSON.parse(JSON.stringify(alphabet));
      this.word = {};
      this.letters = [];
      this.status = 'P';
      this.countErrors = 0;
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
.div-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>