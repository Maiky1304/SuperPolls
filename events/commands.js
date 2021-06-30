const { Guilds } = require('../dbObjects');

module.exports = {
    name: 'message',
    async: true,
    async execute(client, message) {
        const dbGuild = await Guilds.findOne({ where: { guild_id: message.guild.id } });
        const prefix = dbGuild.prefix;

        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift().toLowerCase();
    
        if (!client.commands.has(command)) return;
    
        try {
            const cmd = client.commands.get(command);
            const user = message.author;
            if (cmd.permission) {
                const member = await message.guild.members.fetch({ user, force: true });
                if (!member.permissions.has(cmd.permission)) {
                    message.reply("You don't have the required permissions to use this command!");
                    return;
                }
            }

            console.log(`[Command] [Executed] [Guild: ${dbGuild.guild_id}] ${message.author.username}#${message.author.discriminator} => ${command}`)
            client.commands.get(command).execute(client, message, args);
        } catch (error) {
            console.error(error);
            message.reply('There was an error executing this command, contact the developer of this bot.');
        }
    },
};