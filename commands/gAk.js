let scramble = "U2 F2 R' D2 U2 L2 B2 R' B2 R2 D' B' R2 F2 U L' U F2 L2 U F";

module.exports = {
	name: 'gak',
  aliases: ["gak","scramble"],
	description: 'gAk scramble!',
	execute(msg, args) {
		msg.channel.send(scramble);
	},
};