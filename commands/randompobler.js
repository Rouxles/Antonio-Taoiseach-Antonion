const faker = require('faker');

function randomPoblersName() {
    let name = faker.fake("{{name.firstName}} {{name.lastName}}");
    let fname = name.slice(0,name.indexOf(" "));
    let lname = name.slice(name.indexOf(" ")+1, name.indexOf(" ")+2) + "oblers";
    return `${fname} ${lname}`;
}

module.exports = {
	name: 'randompobler',
  aliases: ["pobler", "poblers", "randompoblers"],
	description: 'Provides a random pobler',
	execute(msg, args) {

    let random_pobler_name = randomPoblersName();

		msg.channel.send(random_pobler_name);

    if(args.length != 2) {
      if(args[2].toLowerCase() == "changenickname") {
        msg.member.setNickname(random_pobler_name)
        .catch(console.error)
      }
    }
	},
};