// Basically all of this was done by guido, thanks tao

const Discord = require('discord.js');
const {thanks} = require('../config.json');

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

function generateTier(){
    const tiers = ['S','A','B','C','D','E','F',
                   'S','A','B','C','D','E','F',
                  'gAk', 'gAk', 'gAk','toa','ben',
                  'gAk', 'gAk', 'gAk','toa','ben',
                  'gAk', 'gAk', 'gAk','toa','ben',
				  'epic','epic'];
    return randomElem(tiers);
}

function gAkName(){
  const alphabet = ['1','2','3','4','5','A','B','C','D','E','F','G','H','I','J',
                   'L','M','N','O','P','Q','R','S','T','U',
                   'V','W','X','Y','Z','Sp','Sl','Sc',"Ma'"];
  return `${randomElem(alphabet)}am`;
}

function randomElem(array){
    var rand = Math.floor(Math.random() * array.length);
    return array[rand];
}

function generateThanks(thanks){
  return thanks[Math.floor(Math.random()*thanks.length)];
}

function generateName(tier){
    // S: Tony, Tung
    // A: Anto, Ho
    // B: Kam, Ben
    // C: 甘
    // D: 浩, 東
    // E: Guido
    // F: Antonio
    const fns = ['The Real','Antonio','Antonium','Anto',
				'Guido','Ben','Tao','Abhi','Kam','Toa','To','Welcome',
				'Taoiseach','Limmy','Zhouheng','Yoni','Thanks'];
    const lns = ['Tung','Kam','Ho','Kam Ho Tung','Baron',
				'Baroon','Barrow','Badron','Dipietro',
				'Yu','Camotún','Go-kar','Yo',
				'Limmy','Sara','Cube','Iseach','Kamium','Antonion',
				'True','Channel','Cibfeatukam','Campos','Bonham','Come On'];
    const names = {
        'S': ['Tony','Tung'],
        'A': ['Anto','Ho'],
        'B': ['Kam','Ben'],
        'C': ['甘'],
        'D': ['浩', '東'],
        'E': ['Guido'],
        'F': ['Antonio'],
        'toa': ['Tao Yu','Tao Iseach','The Real Tao',
				'Biang Biang Kam','Spéaclaí Toa','Dale Palmares'],
        'ben': ['Ben Bad','Benjamin Baron','Ben Bad Ron','Ben Jammin','Ben Barman']
    }
    switch(tier){
      case 'gAk':
        return `Antonio ${gAkName()}`;
      case 'toa':
        return randomElem(names[tier]);
      case 'ben':
        return randomElem(names[tier]);
      case 'epic':
        const fn = randomElem(fns);
        const mn = randomElem(fns);
        const ln = randomElem(lns);
        return `${fn} ${mn} ${ln}`;
      default:
        return `Antonio ${randomElem(names[tier])}`;
    }
}

module.exports = {
	name: 'benerantor',
	description: "Gives a generantor name ran through the benerator. 'changenickname' at the end of the string to change the nickname.",
	execute(msg, args) {
    const thank_message = generateThanks(thanks);
    const tier = generateTier();
    const name = generateName(tier);
    let benerate_percentage = 25;
    let nickname = false;

    if(args.length == 3) {
      if(isNaN(args[2]) === false && args[2] >= 1 && args[2] <= 100) {
        benerate_percentage = Math.floor(args[2]);
      } else if(args[2] == "changenickname") {
        nickname = true;
      }
    } else if(args.length == 4) {
      if(isNaN(args[2]) === false && args[2] >= 1 && args[2] <= 100) {
        console.log(args[2]);
        benerate_percentage = Math.floor(args[2]);
      }
      if(args[3] == "changenickname") {
        nickname = true;
      }
    }

    let benerated_thanks = thank_message.substr(0,1) + benWord(thank_message, benerate_percentage).substr(1);
    let benerated_name = name.substr(0,1) + benWord(name,benerate_percentage).substr(1);

    const embed = new Discord.MessageEmbed()
      .setColor('#CCFF00')
      .setTitle(benerated_thanks)
      .setDescription(`Y${benWord("ou have been named",benerate_percentage)} ${benerated_name}`)
      .addFields(
        {name: `T${benWord("ier:",benerate_percentage)}`, value: tier.substr(0,1) + benWord(benWord(tier,benerate_percentage).substr(1))}
      )
    
    msg.channel.send(embed);

    if(nickname == true) {
      msg.member.setNickname(benerated_name)
      .catch(console.error)
    }

  }
  }