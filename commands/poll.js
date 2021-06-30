const { MessageEmbed } = require("discord.js");
const { color } = require('../config.json');

module.exports = {
    name: "poll",
    description: "Start the poll creation process",
    execute(client, message, args) {
        this.selectionEmbed(client, message.channel, message.author);
    },

    selectionEmbed(client, channel, user) {
        const embed = new MessageEmbed();
        embed.setAuthor('SuperPolls - Create Poll', client.user.avatarURL());
        embed.setDescription("Use the reactions to set up the poll easily!\nStill in need of help contact us in our Discord! [Click here](https://discord.gg/test)");
        embed.setColor(color);
        
        const options = {
            'Poll Message': '📝',
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
    }
};