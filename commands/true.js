function randomName(names) {
  return names[Math.floor(Math.random() * names.length)];
}

function generateThanks(thanks){
  return thanks[Math.floor(Math.random()*thanks.length)];
}

module.exports = {
	name: 'true',
  aliases: ["false"],
	description: 'Cibfeatukations!',
	execute(msg, args) {
    const {names, thanks} = require('../config.json');
		msg.channel.send(`${generateThanks(thanks)} ${randomName(names)}`)
	},
};