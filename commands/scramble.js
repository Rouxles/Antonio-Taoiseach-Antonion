const Discord = require('discord.js');

modules.export = {
    name: 'scramble',
    description: 'Show a virtual representation of a scramble as an image',
    execute(msg, args) {
        msg.channel.send("http://cube.rider.biz/visualcube.png?alg="+args.join("")+"&view=plan");
    }
}
