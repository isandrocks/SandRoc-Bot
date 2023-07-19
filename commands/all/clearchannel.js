const { SlashCommandBuilder, ChannelType } = require('discord.js');

const clearChannel = new SlashCommandBuilder()
    .setName('clear-channel')
    .setDescription('Cleares the specified channel of 100 messages')
    .addChannelOption(option =>
        option.setName('channel')
        .setDescription('pick a channel to clear 100 messages in')
        .addChannelTypes(ChannelType.GuildText)
    );

        module.exports = {
            cooldown: 10,
            data: clearChannel,
            async execute(interaction) {
                await interaction.reply('i do nothing yet');
            },
        };