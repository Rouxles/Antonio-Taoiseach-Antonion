let recon = `U2 F2 R' D2 U2 L2 B2 R' B2 R2 D' B' R2 F2 U L' U F2 L2 U F\n\n[E', L' U L]\n[U: [L2, S']]\n[R, U' S U]\n[M U: [M', U2]]\nM' U2 M U' M' U M' U2 M U M U'\n\n[R U'D': [R' D' R, U2]]\n[R D: [D, R' U' R]]\n[R D': [R D R', U]]\n[U: [D, R U' R']]\nUD R2 U' R2 U R2 D' R2 U R2 U' R2 U2`;

module.exports = {
	name: 'gakrecon',
  aliases: ["recon","gakreconstruction"],
	description: 'gAk reconstruction!',
	execute(msg, args) {
		msg.channel.send(recon);
	},
};