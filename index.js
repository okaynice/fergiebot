const Discord = require("discord.js");
const moment = require("moment");
const client = new Discord.Client();
const token = process.env.TOKEN;
const prefix = ","
require('dotenv/config');
const http = require('http');
const port = process.env.PORT || 3000;
http.createServer().listen(port);

var version = '1.0.2';

// Runs a message in cmd terminal when bot is online, and sets the 'activity' of the bot on discord.
client.on('ready', () =>{
    console.log(`I am now ONLINE on ${client.guilds.size} servers watching ${client.users.size} users!`)
    client.user.setActivity(`${client.users.size} users |  ,help`, { type: 'WATCHING'}).catch(console.error);
})

// This event will run on every single message received, from any channel or DM.
client.on("message", async message => {
    if(message.author.bot) return;
    // Also good practice to ignore any message that does not start with our prefix.
    if(message.content.indexOf(prefix) !== 0) return;
    
    // Here we separate our "command" name, and our "arguments" for the command. 
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
//GENERAL COMMANDS//

    if(command === "kick") {
        var embed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTimestamp()
            .setFooter('Made by: okaynice#0001')
            .setAuthor('Fergie BOT', 'https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
            .setThumbnail('https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
            .setDescription('**Description:** `Kick a user` \n **Usage:** `,kick <user> [reason]` \n **Example:** `,kick @okaynice logged with pick`')
        if(!args[0]) return message.channel.send(embed);
        var user = message.mentions.users.first();
            if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You are lacking the permission `KICK_MEMBERS` retard!");
            if(message.guild.member(user).hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("This user is too OP and cannot be kicked!");
            if(user) {
                const member = message.guild.member(user)
                if (member) {
                    member.kick('You have been kicked from the server! Pce bot!').then(() => {
                        message.channel.sendMessage(`${user.tag} Has been fucking yeeted out of the server!`);
                    }).catch(err => {
                        message.reply('I was unable to kick this user!');
                        console.log(err);
                    });    
                } else{
                    message.channel.sendMessage("That user isn't in the server!")
                }
            } else {
                message.channel.sendMessage("You need to specify a user in the server!")
            }
    }

    if(command === "ban") {
        var embed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTimestamp()
            .setFooter('Made by: okaynice#0001')
            .setAuthor('Fergie BOT', 'https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
            .setThumbnail('https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
            .setDescription('**Description:** `ban a user` \n **Usage:** `,ban <user> [reason]` \n **Example:** `,ban @okaynice ddos threats`')
        if(!args[0]) return message.channel.send(embed);
        var user = message.mentions.users.first();
            if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You are lacking the permission `BAN_MEMBERS` retard!");
            if(message.guild.member(user).hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("This user is too OP and cannot be banned!");
            if(user) {
                const member = message.guild.member(user);
        
                if (member) {
                    member.ban({ression: 'Pce!'}).then(() => {
                        message.channel.sendMessage(`${user.tag} Has been fucking banned and blacklisted from the server! GG GF!`)     
                   })
                } else {
                    message.sendMessage("That user isn't in the server!")
                }
            } else {
                message.sendMessage("You need to specify a user in the server!")
            }
    }

    if(command === "purge") {
        var embed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTimestamp()
            .setFooter('Made by: okaynice#0001')
            .setAuthor('Fergie BOT', 'https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
            .setThumbnail('https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
            .setDescription('**Description:** `mass delete text` \n **Usage:** `,purge <ammount>` \n **Example:** `,purge 20`')
        if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send("You are lacking the permission `MANAGE_MESSAGES` retard!");
        if(!args[0]) return message.channel.send(embed);
        message.channel.bulkDelete(args[0]).then(() => {
            message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
        });

    }

    if(command === "poll") {
        var embed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTimestamp()
        .setFooter('Made by: okaynice#0001')
        .setAuthor('Fergie BOT', 'https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
        .setThumbnail('https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
        .setDescription('**Description:** `create a poll` \n **Usage:** `,poll <text>` \n **Example:** `,poll Should Chrrs be demoted?`')
        var embed2 = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTimestamp()
        .setDescription(args.join` `)
        if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("You are lacking the permission `ADMINISTRATOR` retard!");
        if(!args[0]) return message.channel.send(embed);
        
        let msg = await client.channels.get("581052788314734592").send(embed2);
        await msg.react('✅');
        await msg.react('❌');
    }

    if(command === "serverinfo") {
        var embed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTimestamp()
            .setFooter('Made by: okaynice#0001')
            .setAuthor('Fergie BOT', 'https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
            .setThumbnail('https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
            .addField('**Server Name**', `${message.guild.name}`, true)
            .addField('**Server Owner**', `${message.guild.owner.user}`, true)
            .addField('**Members**', `${message.guild.members.filter(member => member.user.bot).size} bot of ${message.guild.memberCount} members`, true)
            .addField('**Channels**', `${message.guild.channels.filter(channel => channel.type ==='voice').size} voice / ${message.guild.channels.filter(channel => channel.type === 'text').size} text`, true)
            .addField('**Server Region**', `${message.guild.region}`, true)
            .addField('**Created**', `${moment.utc(message.guild.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
        message.channel.send(embed)
    }

    if(command === "botinfo") {
        var embed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTimestamp()
            .setFooter('Made by: okaynice#0001')
            .setAuthor('Fergie BOT', 'https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
            .setThumbnail('https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png', true)
            .addField('**Bot Name**', client.user.username, true)
            .addField('**Bot Developer**', 'okaynice#0001', true)
            .addField('**Bot ID**', '572742804850212891', true)
            .addField('**Servers**', client.guilds.size, true)
            .addField('**Bot Create Date**', `${moment.utc(client.user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
        message.channel.send(embed)
    }

    if(command === "userinfo") {
        let user;
        if (message.mentions.users.first()) {
            user = message.mentions.users.first();

        } else {
            user = message.author;
        }
        const member = message.guild.member(user);
        var embed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTimestamp()
            .setFooter('Made by: okaynice#0001')
            .setAuthor('Fergie BOT', 'https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
            .setThumbnail(message.author.avatarURL, true)
            .addField('**Name**', `${user.username}`, true)
            .addField('**User ID**', `${user.id}`, true)
            .addField('**Nickname**', `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
            .addField('**Status**', `${user.presence.status}`, true)
            .addField('**Roles**', member.roles.map(r => `${r}`).join(' | '), true)
            .addField('**Account Created**', `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
            .addField('**Joined Server**', `${moment.utc(user.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
        message.channel.send(embed)
    }

    if(command === "nick") {
        let nickUser = message.mentions.users.first();
        let nickReason = message.mentions.users.first();
        if(!nickUser) return message.channel.send("No mentioned User.");
        if(!nickReason) return message.channel.send("Not having a name is not a good nickname.");
        if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("No permissions!");
        if(!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send("No need to change the nickname of someone that can change nicknames as well.");
        nickUser.setNickname(nickReason);
        message.channel.send("Changed " + nickUser + "'s nickname!");
      }
    

    if(command === "help") {
        var embed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTimestamp()
            .setFooter('Made by: okaynice#0001')
            .setAuthor('Fergie BOT', 'https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
            .setThumbnail('https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
            .addField('General Commands', '`,kick {user}` - Kick a user from the server \n `,ban {user}` - Ban a player from the server \n `,purge {ammount}` - Bulk delete previous messages in a channel \n `,serverinfo` - Lists infomation about the server your in \n `,botinfo` - Lists infomation about the Fergie Bot \n `,userinfo {user}` - List infomation about a you or another user \n `,poll {text} - Create a poll with reactions`')
            .addField('Fun Commands', '`,roast {user}` - Roast a user with a random insult \n `,nigga` - If you know you know. \n `,ping` - Show ping of user and Fergie Bot \n `,ask {question}` - Ask me a question!')
            .addField('Other Commands', '`,ip` - List of ips for popular minecraft servers \n `,vanity` - Link to VanityMC infomation')
            .addField('Bot Owner Commands', "`,reload {command}` - Reloads a specific command \n `,givemeOP` - Restores user's role if any retard tries to remove them \n `,die` - Disables the bot until manually restarted")
            message.channel.sendEmbed(embed) 
    }

//FUN COMMANDS//
    
    if(command === "ping") {
      // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
      // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
      const m = await message.channel.send("Loading..");
      m.edit(`Pong! Users Ping: ${m.createdTimestamp - message.createdTimestamp}ms. Fergie Bot's Ping: ${Math.round(client.ping)}ms.`);
    }

    if(command === "nigga") {
        if(!message.member.hasPermission(["ADMINISTRATOR"])) return message.channel.send("This command has been disabled and is limited to users with `ADMINISTRATOR` role!");
        message.channel.sendMessage('ayy my niGga!');
        message.channel.sendMessage('http://1.bp.blogspot.com/-jqPgtbzfY-k/T0EqGljXR-I/AAAAAAAALF8/kDA5QNPKkTM/s320/human-freaks12.jpg');
    }

    if(command === "roast") {
        var insults = [
            "has a 2 inch penis!",
            "looks like a gay retarded fish!",
            "is a wingwong and eats dogs!",
            "is a ching-chong bing-bong!",
            "sucks dick for free!",
            "has ligma aka. stage 4 cancer!",
            "is so fat thanos had to snap twice!",
            "is a dumb cuntmuffin!"
            ];
            if(!args[0]) return message.channel.send('roast who? `,roast <user>`');
            var user = message.mentions.users.first();
            //if(!args[1]) return message.channel.sendMessage('Error, user not found!'); ERROR - Wont skip this if the user does enter a valid @
            message.channel.sendMessage(`${user.tag} ` + (insults[Math.floor(Math.random() * insults.length)]))
    }

    if(command === "ask") {
        var answers = [
            "100% Yes.",
            "Nigga, no.",
            "My weeb senses say yes.",
            "Most certainly not!",
            "I give it a phat Maybe.",
            "Yes! very much!",
        ]
        if(!args[0]) return message.channel.send('Ask me what bro??');
        message.channel.sendMessage(answers[Math.floor(Math.random() * answers.length)])
    }

    
    if(command === "choose") {
        var embed = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTimestamp()
            .setFooter('Made by: okaynice#0001')
            .setAuthor('Fergie BOT', 'https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
            .setThumbnail('https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
            .setDescription('**Description:** `make decisions for you` \n **Usage:** `,choose <"option1"> <"option 2">` \n **Example:** `,choose "dogs" "cats" "neither"`')
        if(!args[0]) return message.channel.send(embed);
            let arg1 = args.join("")
            let ar1 = arg1.split(`"`);
            let random = Math.floor(Math.random() * args.length);
            let answer = args[random];
        let embed2 = new Discord.RichEmbed()
            .setColor('#0099ff')
            .setTimestamp()
            .setFooter('Made by: okaynice#0001')
            .setAuthor('Fergie BOT', 'https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
            .addField('When choosing between', arg1)
            .addField('I\'ve decided to choose ', answer);
            message.channel.send(embed2);
    }

//OTHER COMMANDS//

    if(command === "ip") {
        var embed = new Discord.RichEmbed()
                .setColor('#0099ff')
                .setTimestamp()
                .setFooter('Made by: okaynice#0001')
                .setAuthor('Fergie BOT', 'https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
                .setThumbnail('https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
                .addField('VanityMC', 'play.vanitymc.co')
                .addField('Hypixel', 'mc.hypixel.net')
                .addField('MineSaga', 'minesaga.org')
                .addField('SaicoPvP', 'play.saicopvp.com')
                .addField('MineMan', 'eu.mineman.club')
            message.channel.sendEmbed(embed)
    }

    if(command === "vanity") {
        var embed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTimestamp()
        .setFooter('Made by: okaynice#0001')
        .setAuthor('Fergie BOT', 'https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
        .setThumbnail('https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
        .setTitle('VanityMC Infomation')
        .setDescription('**IP:** play.vanitymc.co \n **Rules:** https://vanitymc.co/forums/rules.43/ \n **Store:** https://store.vanitymc.co/ \n **Staff:** https://vanitymc.co/staff/')
        message.channel.sendEmbed(embed)
    }

    if(command === "invite") {
        var embed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setFooter('Made by: okaynice#0001')
        .setAuthor('Want me on your server? Here\'s an invite link!', 'https://i.gyazo.com/ecfe90c19bcc58712179e25c485bb33e.png')
        .setDescription('> [Click Here](https://discordapp.com/oauth2/authorize?client_id=572742804850212891&scope=bot)')
        message.channel.sendEmbed(embed)
    }

    if(command === "givemeop") {
        const role = message.guild.roles.find('name', 'CTB Leader')
        if (message.author.id !== '400123239038189569') return message.channel.sendMessage('This command can only be used by the bot owner! `okaynice#0001`');
        if (message.author.id === '400123239038189569');
            message.member.addRole(role);
            message.channel.sendMessage('Roles and permissions restored for `okaynice#0001`, oopsie! :)')
        }

    if (command === 'die') {
        const embed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setTitle('Disconnected')
        .setDescription(`Bot has been disabled in **${Math.floor(client.ping)}**ms! F in chat.`);
        if (message.author.id !== '400123239038189569') return message.channel.sendMessage(':robot: Only the bot owner can kill me! ');
        message.channel.send(embed).then(() => {
        process.exit(1);
    })
    };

  });

  client.on('error', err => {
      console.log(err);
});
  
  client.login(token);