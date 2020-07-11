function randomChar(word) {
    word_array = word.split("");
    return word_array[Math.floor(Math.random()*word_array.length)]
}

function generatePobler(name) {
    if(name.toLowerCase().replace( /\s/g, '') == "taotry") {
      return `13 13 13`;
    } else {
        let words = name.split(" ");
        let string = "";
        for(let i = 0; i<words.length; i++) {
            if (words[i].slice(-1) == "s") {
                string = string + `${randomChar(words[i]).slice(0,1).toUpperCase()}oblers `;
            } else {
                string = string + `${randomChar(words[i]).slice(0,1).toUpperCase()}obler `;
            }      
        }
        return `Hello ${string}`;
    }
}

module.exports = {
	name: 'hello',
	description: 'Returns pobler name of nickname',
  aliases: ["info", "information", "help", "hi"],
	execute(msg, args) {

    let pobler_name = generatePobler(msg.member.displayName)

		msg.channel.send(pobler_name);

    
	},
};