const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	cooldown: 10,
	data: new SlashCommandBuilder()
		.setName('pongtwice')
		.setDescription('Replies with Pong! Then it waits and hits you with another Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
        await wait(4000);
        await interaction.editReply('Pong, Pong!');
	},
};
