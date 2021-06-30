const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Guilds = require('./models/Guild')(sequelize, Sequelize.DataTypes);

/* eslint-disable-next-line func-names */
Guilds.addGuild = async function(guild) {
	return Guilds.create({ guild_id: guild.id });
};

Guilds.getPrefix = function(guild) {
	return Guilds.findAll({
		where: { guild_id: guild.id }
	});
}

module.exports = { Guilds };