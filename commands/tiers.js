tier_list = `S: Tony, Tung\nA: Anto, Ho\nB: Kam\nC: 甘\nD: 浩, 東\nE: Guido\nF: Antonio`

module.exports = {
	name: 'tiers',
  aliases: ["tier"],
	description: 'Names!',
	execute(msg, args) {
		msg.channel.send(tier_list)
	},
};