const { MessageEmbed } = require('discord.js');
const { color } = require('../config.json');

module.exports = {
    name: 'messageReactionAdd',
    async: true,
    async execute(client, reaction, user) {
        if (!client.reacts.has(user.id)) return;
        if (client.reacts.get(user.id) != reaction.message.id) return;

        const emoji = reaction._emoji.name;
        const message = reaction.message;
        
        if (message.embeds.length != 1) return;

        const currentEmbed = message.embeds[0];

        if (!currentEmbed.description.startsWith('Use the reactions to set up the poll easily!')) return;

        if (emoji == '📝') {
            await message.reactions.removeAll();

            const embed = new MessageEmbed();
            embed.setAuthor('SuperPolls - Create Poll', client.user.avatarURL());
            embed.setDescription("Send your message for the poll in this channel!\nStill in need of help contact us in our Discord! [Click here](https://discord.gg/test)");
            embed.setColor(color);
            embed.setFooter("Create polls with ease! • superpolls.gg", client.user.avatarURL());

            message.edit(embed);
        } else if (emoji == '🕐') {
            await message.reactions.removeAll();
        } else if (emoji == '🎚️') {
            await message.reactions.removeAll();
        }
    }
};