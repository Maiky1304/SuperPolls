const { MessageEmbed } = require("discord.js");
const { color } = require('../config.json');
const { Guilds } = require('../dbObjects');

module.exports = {
    name: 'message',
    async: true,
    async execute(client, message) {
        const checkFor = `<@!${client.user.id}>`;
        const content = message.content;

        if (!content.startsWith(checkFor)) return;

        const dbGuild = await Guilds.findOne({ where: { guild_id: message.guild.id } });
        const prefix = dbGuild.prefix;
        const args = message.content.slice(checkFor).trim().split(' ');
        
        if (args.length != 2) {
            const embed = new MessageEmbed();
            embed.setAuthor('SuperPolls', client.user.avatarURL());
            embed.setColor(color);
            embed.setDescription("The current prefix of the bot is ``" + prefix + "``\nChange this by mentioning me and appending the new prefix to it.");
            embed.setFooter("Create polls with ease! • superpolls.gg", client.user.avatarURL());
            message.channel.send(embed);
        } else {
            const newPrefix = args[1];

            Guilds.update({ prefix: newPrefix }, { where: { guild_id: message.guild.id } }).then(update => {
                const embed = new MessageEmbed();
                embed.setAuthor('SuperPolls', client.user.avatarURL());
                embed.setColor(color);
                embed.setDescription("Prefix was updated!");
                embed.addField('Old prefix', prefix, true);
                embed.addField('New prefix', newPrefix, true);
                embed.setFooter("Create polls with ease! • superpolls.gg", client.user.avatarURL());
                message.channel.send(embed);
            }).catch(console.log);
        }
    },
};