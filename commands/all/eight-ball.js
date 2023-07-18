const { SlashCommandBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

const eightBall = new SlashCommandBuilder()
    .setName('eight-ball')
    .setDescription('Ask the eight-ball a question!')
    .addStringOption(option =>
        option.setName('ask')
            .setDescription('Ask a question to the eight ball')
            .setMaxLength(2000)
            .setRequired(true))
    .addBooleanOption(option =>
        option.setName('private')
            .setDescription('Whether or not the question should be private'));

const confirm = new ButtonBuilder()
    .setCustomId('confirm')
    .setLabel('Confirm')
    .setStyle(ButtonStyle.Primary);

const cancel = new ButtonBuilder()
    .setCustomId('cancel')
    .setLabel('Cancel')
    .setStyle(ButtonStyle.Secondary);

const actionRow = new ActionRowBuilder()
    .addComponents(confirm, cancel);


module.exports = {
    cooldown: 10,
    data: eightBall,
    async execute(interaction) {
        const randomNumber = Math.floor(Math.random() * 8);
        let eightBallA = '';

        switch (randomNumber) {
            case 0:
                eightBallA = 'It is certain';
                break;
            case 1:
                eightBallA = 'It is decidedly so';
                break;
            case 2:
                eightBallA = 'Reply hazy try again';
                break;
            case 3:
                eightBallA = 'Cannot predict now';
                break;
            case 4:
                eightBallA = 'Do not count on it';
                break;
            case 5:
                eightBallA = 'My sources say no';
                break;
            case 6:
                eightBallA = 'Outlook not so good';
                break;
            case 7:
                eightBallA = 'Signs point to yes';
                break;
        }
        const response = await interaction.reply({
            content: `Do you want to ask the eight ball: ${interaction.options.getString('ask')}?`,
            components: [actionRow],
            ephemeral: interaction.options.getBoolean('private'),
        });

        const collectorFilter = i => i.user.id === interaction.user.id;

        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60000 });

            if (confirmation.customId === 'confirm') {
                await confirmation.update({ content: `You asked: ${interaction.options.getString('ask')}? \nThe Eight Ball says:  ${eightBallA}`, components: [] });

            } else if (confirmation.customId === 'cancel') {
                await confirmation.update({ content: 'Action cancelled', components: [] });
            }

        } catch (e) {
            await interaction.editReply({ content: 'Confirmation not received within 1 minute, cancelling', components: [] });
        }
    }
};