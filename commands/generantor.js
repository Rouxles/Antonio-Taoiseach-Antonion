// Basically all of this was done by guido, thanks tao

const Discord = require('discord.js');
const {thanks} = require('../config.json');

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
	name: 'generantor',
	description: "Uses generantor for a name alongside the tier. Put 'changenickname' at the end to make the generator change your nickname.",
	execute(msg, args) {
    const thank_message = generateThanks(thanks);
    const tier = generateTier();
    const name = generateName(tier);

    if(args.length != 2) {
      if(args[2] == "changenickname") {
        msg.member.setNickname(name)
        .catch(console.error)
      }
    }

    const embed = new Discord.MessageEmbed()
      .setColor('#CCFF00')
      .setTitle(thank_message)
      .setDescription(`You have been named ${name}`)
      .addFields(
        {name: `Tier:`, value: tier}
      )
    
    msg.channel.send(embed);
  }
}

