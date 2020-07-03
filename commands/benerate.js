// Basically all of this was done by guido, thanks tao

// Helper Functions

function randomLetter(word){
    let randomIndex = Math.floor(Math.random()*word.length);
    return word[randomIndex];
}

function shuffle(a) { //Fisher-Yates algorithm
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function generateMask(power, n){ //Binary mask to know which letters to modify
    let mask = [];
    for(let i=0; i<(n-power); i++){
        mask[i] = 0;
    }
    for(let j=(n-power); j<n; j++){
        mask[j] = 1;
    }
    return shuffle(mask);
}

function adequatePower(word, percentage){ //Gives num power according to percentage and word length
    return Math.floor(((word.length)*(percentage))/100);
}

function longWordPresent(text){
  let words = text.split(" ");
  let longest = 0;
  let len;
  for(let i=0; i<words.length; i++){
    len = words[i].length;
    if(len > longest){
      longest = len;
    }
  }
  return len>12;
}

//////// Ben functions ////////

function benLetter(letter){ //A letter, as typed by Benjamin Baron
    // Letters/symbols that are close in a QWERTY layout
    // Don't worry, I didn't type all of this by hand
    const benphabet = {
        'a': 'qwsz',
        'b': 'vghn',
        'c': 'xdfv',
        'd': 'werfcxs',
        'e': '34rdsw',
        'f': 'ertgvcd',
        'g': 'rtyhbvf',
        'h': 'tyujnbg',
        'i': '89okju',
        'j': 'yuikmnh',
        'k': 'uiol,mj',
        'l': 'iop;.,k',
        'm': 'njk,',
        'n': 'bhjm',
        'o': '90plki',
        'p': '0-[;lo',
        'q': '12wsa',
        'r': '45tfde',
        's': 'qwedxza',
        't': '56ygfr',
        'u': '78ijhy',
        'v': 'cfgb',
        'w': '23esaq',
        'x': 'zsdc',
        'y': '67uhgt',
        'z': 'asx',
        'A': 'QWSZ',
        'B': 'VGHN',
        'C': 'XDFV',
        'D': 'WERFCXS',
        'E': '34RDSW',
        'F': 'ERTGVCD',
        'G': 'RTYHBVF',
        'H': 'TYUJNBG',
        'I': '89OKJU',
        'J': 'YUIKMNH',
        'K': 'UIOL,MJ',
        'L': 'IOP;.,K',
        'M': 'NJK,',
        'N': 'BHJM',
        'O': '90PLKI',
        'P': '0-[;LO',
        'Q': '12WSA',
        'R': '45TFDE',
        'S': 'QWEDXZA',
        'T': '56YGFR',
        'U': '78IJHY',
        'V': 'CFGB',
        'W': '23ESAQ',
        'X': 'ZSDC',
        'Y': '67UHGT',
        'Z': 'ASX'
    }
    return randomLetter(benphabet[letter]);
}

function benWord(word, p){ //A word, as typed by Benjamin Baron
    let outword = [];
    let power = adequatePower(word, p);
    const mask = generateMask(power, word.length);

    for(let i=0; i<word.length; i++){
        if(mask[i] && word[i].match(/[a-z]|[A-Z]/)){
            outword[i] = benLetter(word[i]);
        }
        else {
            outword[i] = word[i];
        }
    }
    
    return outword.join('');
}

module.exports = {
	name: 'benerate',
  args: true,
  argsmessage: `Poblers! Please supply a percentage and a word for beneration.`, 
  usage: `taotry benerate (percentage) <message> \n\t\t[example: taotry benerate 25 thanks guido]`,
  aliases: ["benerator", "beneration"],
	description: "Returns a benerated name when you supply a string and a beneration power (default beneration power is 25%). Put 'changenickname' at the end of the string if you want to change your nickname to what the beneration gives you.",
  
	execute(msg, args) {
    let benerate_percentage = args[2];
    let benerate_word;
    let length = args.length;
    let nickname = false;

    if(args.slice(-1) == "changenickname") {
      length--;
      nickname = true
    }

    if(isNaN(benerate_percentage)) {
      benerate_percentage = 25;
      benerate_word = args.slice(2,length).join(" ");
    } else {
      benerate_percentage = args[2]
      benerate_word = args.slice(3,length).join(" ");
    }
    if(benerate_percentage <= 0 || benerate_percentage > 100) {
      msg.reply(`Poblers! The percentage must be an integer between 1 and 100 !`);
      return;
    }
    if(benerate_word.toLowerCase().replace(/\s/g, '') == "taotry") {
      msg.channel.send(`13 13 13`);
      return;
    }

    benerate_percentage = Math.floor(benerate_percentage);
    
    let benerated = `${benerate_word.substr(0,1) + benWord(benerate_word, benerate_percentage).substr(1)}`

    msg.channel.send(benerated)

    if(nickname == true) {
      msg.member.setNickname(benerated)
      .catch(console.error)
    }

  }
  }