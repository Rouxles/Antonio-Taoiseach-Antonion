// Init
const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const faker = require('faker');

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`taotry listening at http://localhost:${port}`));

// Main Code

const {prefix, names, thanks} = require('./config.json');
const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(`taotry`, {type: "LISTENING"})
  .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
  .catch(console.error);
});

client.on('message', msg => {

  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  const args = msg.content.slice(prefix.length-1).split(/ +/);
  var command_name;
  try {
    command_name = args.filter((el) => el !== '').shift().toLowerCase();
  }
  catch {
    command_name = null
  }

  const command = client.commands.get(command_name)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command_name));

  if(!command) return;

  if (command.args && args.length == 2) {
    if(command.usage) {
      return msg.reply(`${command.argsmessage}\nUsage would be: ${command.usage}`);
    }
	}

  try {
   command.execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply('there were poblers trying to execute that command!');
  }


//   if (msg.content === `${prefix} ping`) {
//     msg.reply('pong!');
//   }
//   else if (msg.content === `${prefix} info`) {
//     msg.channel.send(`${generatePobler(msg.member.displayName)}`)
//   }
//   else if (msg.content === `${prefix} true`) {
//     msg.channel.send(`${generateThanks(thanks)} ${randomName(names)}`)
//   }
// });
});

// process.on('unhandledRejection', error => {
// 	console.error('Unhandled promise rejection:', error);
// });

client.login(process.env.TOKEN);