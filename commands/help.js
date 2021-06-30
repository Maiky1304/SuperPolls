const { MessageEmbed } = require("discord.js");
const { color } = require('../config.json');
const { Guilds } = require('../dbObjects');

module.exports = {
    name: 'help',
    description: 'See all the commands of the bot.',
    permission: 'ADMINISTRATOR',
    async execute(client, message, args) {
        const dbGuild = await Guilds.findOne({ where: { guild_id: message.guild.id } });
        const prefix = dbGuild.prefix;

        const embed = new MessageEmbed();
        embed.setAuthor('SuperPolls - Help', client.user.avatarURL());
        embed.setColor(color);
        embed.setDescription("These are all the commands of the bot.\nLeave suggestions for new feature in our Discord! [Click here](https://discord.gg/test)");
        for (const [label, cmd] of client.commands) {
            embed.addField("``" + `${prefix}${cmd.name}` + "``", cmd.description, false);
        }
        embed.setFooter("Create polls with ease! • superpolls.gg", client.user.avatarURL());
        message.channel.send(embed);
    },
};