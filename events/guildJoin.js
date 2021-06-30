const { Guilds } = require('../dbObjects');

module.exports = {
    name: 'guildCreate',
    execute(client, guild) {
        a = Guilds.addGuild(guild);
        a.then(insertion => {
            console.log(insertion);
        }).catch(console.log);
    }
};