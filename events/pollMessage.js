const { MessageEmbed } = require("discord.js");
const { execute } = require("./messageReactionAdd");

module.exports = {
    name: 'message',
    async execute(client, message) {
        if (!client.reacts.has(user.id)) return;
        
        let message = message.channel.messages.resolveID(client.reacts.get(user.id));
        if (message == null || message == undefined) return;

        if (message.embeds.length != 1) return;

        const currentEmbed = message.embeds[0];

        if (!currentEmbed.description.startsWith('Send your message for the poll in this channel!')) return;

        const embed = new MessageEmbed();
        embed.setAuthor('SuperPolls - Create Poll', client.user.avatarURL());
        embed.setDescription("Use the reactions to set up the poll easily!\nStill in need of help contact us in our Discord! [Click here](https://discord.gg/test)");
        embed.setColor(color);
        
        const options = {
            'Poll Message :white_check_mark:': '📝',
            'Poll Duration': '🕐',
            'Poll Channel': '🎚️'
        };
        
        for (const option of Object.keys(options)) {
            embed.addField(option, options[option] + ' React to change', true);
        }

        embed.setFooter("Create polls with ease! • superpolls.gg", client.user.avatarURL());
        channel.send(embed).then(message => {
            for (const option of Object.keys(options)) {
                message.react(options[option]);
            }

            client.reacts.set(user.id, message.id)
        });
    },
};