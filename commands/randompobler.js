const faker = require('faker');

function randomPoblersName() {
    let name = faker.name.findName();
    let fname = name.slice(0,name.indexOf(" "));
    let lname = name.slice(name.indexOf(" ")+1, name.indexOf(" ")+2) + "oblers";
    return `${fname} ${lname}`;
}

module.exports = {
	name: 'randompobler',
  aliases: ["pobler", "poblers", "randompoblers"],
	description: 'Provides a random pobler',
	execute(msg, args) {
		msg.channel.send(randomPoblersName())
	},
};