const { SlashCommandBuilder } = require('discord.js');

const echo = new SlashCommandBuilder()
    .setName('echo')
    .setDescription('Replies with your input!')
    .addStringOption(option =>
        option.setName('input')
            .setDescription('The input to echo back')
            .setMaxLength(2000));

module.exports = {
    data: echo,
    async execute(interaction) {
        await interaction.reply(`Echo: ${interaction.options.getString('input')}`);
    }
};