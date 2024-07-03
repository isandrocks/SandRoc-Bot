const { SlashCommandBuilder } = require('discord.js');
const { spawn } = require('child_process');


const paimon_tts = new SlashCommandBuilder()
    .setName('paimon_tts')
    .setDescription('send a prompt and get an audio response!')
    .addStringOption(option =>
        option.setName('input')
            .setDescription('What you are asking paimon to say')
            .setMaxLength(2000));

module.exports = {
    data: paimon_tts,
    async execute(interaction) {
        interaction.deferReply(); // Acknowledge the interaction immediately

        const input = interaction.options.getString('input');
        const args = ['tts.py', input];

        const process = spawn('./.venv/Scripts/python.exe', args);

        process.stdout.on('data', (data) => {
            const response = data;
            if (response.includes('Audio file saved to ./tts/paimon.wav'))
                // Send the response and img to the user
                interaction.followUp({ content: 'Audio created using the following text:' + '\n' + `${input}`, files: ['./tts/paimon.wav']});
            
        });

        process.on('close', (code) => {
            if (code !== 0) {
                console.error(`Python process exited with code ${code}`);
                interaction.followUp('The Python script exited with an error.');
            }
        });
    }
};