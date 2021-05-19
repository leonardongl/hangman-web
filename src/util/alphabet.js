const alphabet = [];

"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').map(letter => alphabet.push({ letter: letter, status: null }));

export default alphabet;