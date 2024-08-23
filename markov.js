/** Textual markov chain generator */

class MarkovMachine {
    /** build markov machine; read in text. */
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.makeChains();
    }
  
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
        // TODO
      this.chains = {};
  
      for (let i = 0; i < this.words.length - 1; i++) {
        let word = this.words[i];
        let nextWord = this.words[i + 1];
  
        if (!this.chains[word]) {
          this.chains[word] = [];
        }
        this.chains[word].push(nextWord);
      }
  
      let lastWord = this.words[this.words.length - 1];
      if (!this.chains[lastWord]) {
        this.chains[lastWord] = [null];
      }
    }
  
    /** return random text from chains */
    // TODO
    makeText(numWords = 100) {
      if (Object.keys(this.chains).length === 0) {
        throw new Error("Chains not created. Call makeChains first.");
      }
  
      let words = [];
      let currentWord = this._getRandomKey(this.chains);
  
      while (words.length < numWords && currentWord !== null) {
        words.push(currentWord);
        currentWord = this._getRandomElement(this.chains[currentWord]);
      }
  
      return words.join(' ');
    }
  
    /** Helper method to get a random key from an object */
    _getRandomKey(obj) {
      let keys = Object.keys(obj);
      return keys[Math.floor(Math.random() * keys.length)];
    }
  
    /** Helper method to get a random element from an array */
    _getRandomElement(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
  }
  
  module.exports = { MarkovMachine };
  