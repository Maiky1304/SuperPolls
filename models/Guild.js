module.exports = (sequelize, DataTypes) => {
	return sequelize.define('Guild', {
		guild_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		prefix: {
			type: DataTypes.STRING,
			defaultValue: '!',
			allowNull: false,
		},
	}, {
		timestamps: false,
	});
};