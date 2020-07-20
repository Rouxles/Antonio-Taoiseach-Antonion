const {createCanvas, loadImage} = require('canvas');
const Discord = require('discord.js');

module.exports = {
	name: 'ccff00',
	description: 'Puts a CCFF00 overlay on an image',
	execute(msg, args) {

    async function renderImage(img,opacity) {
      img = await loadImage(img)
      const canvas = createCanvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = '#CF0';
      ctx.fillRect(0, 0, img.width, img.height);
      return attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ccff00.png');
    }

    (async function () {
    let attachment;
    let user;

    let opacity = 0.5;
    if(!isNaN(args[2]) && args[2] >= 0 && args[2] <= 100) {
      opacity = parseInt(args[2])/100
    }    

    if(msg.attachments.find(attachments => attachments.height !== null)) {
      attachment = await renderImage(msg.attachments.first().url,opacity)
    } else if(msg.mentions.users.first()) {
      user = msg.mentions.users.first()
      attachment = await renderImage(user.displayAvatarURL({format: 'jpg', size: 1024}),opacity)
    } else {
      user = msg.author
      attachment = await renderImage(user.displayAvatarURL({format: 'jpg', size: 1024}),opacity)
    }
    msg.channel.send(attachment);
    })();
	},
};
