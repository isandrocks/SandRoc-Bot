const { SlashCommandBuilder, ChannelType } = require('discord.js');

const clear = new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Cleares the specified channel of 100 messages')
    .addChannelOption(option =>
        option.setName('channel')
            .setDescription('pick a channel to clear 100 messages in')
            .addChannelTypes(ChannelType.GuildText)
            .setRequired(true)
    );

module.exports = {
    cooldown: 10,
    data: clear,
    async execute(interaction) {
        try {
            const channel = interaction.options.getChannel('channel');

            const msg = await channel.messages.fetch({ limit: 100 });

            interaction.reply(`Clearing ${msg.size} messages in ${channel}`);

            const msgArr = Array.from(msg);
            const msgIds = msgArr.map(subArr => subArr[0]);

            for (const id of msgIds) {
                channel.messages.delete(id);
            }

            interaction.deleteReply();

        } catch (error) {
            console.error(`ERROR: ${error}`);
        }

    },
};