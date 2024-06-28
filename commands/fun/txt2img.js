const { SlashCommandBuilder } = require('discord.js');
const { spawn } = require('child_process');


const txt2img = new SlashCommandBuilder()
    .setName('txt2img')
    .setDescription('send a prompt and get an image response!')
    .addStringOption(option =>
        option.setName('input')
            .setDescription('What you are asking the llama to draw')
            .setMaxLength(2000));

module.exports = {
    data: txt2img,
    async execute(interaction) {
        interaction.deferReply(); // Acknowledge the interaction immediately

        const input = interaction.options.getString('input');
        const args = ['comfy_websocket.py', input];

        const process = spawn('./.venv/Scripts/python.exe', args);

        process.stdout.on('data', (data) => {
            const response = data;
            console.log(`Python process response: ${response}`);

            // Send the response and img to the user
            interaction.followUp({ content: 'Image created using the following prompt:' + '\n' + `${input}`, files: ['./txt2img/588.png']});
            
        });

        process.stderr.on('data', (data) => {
            console.error(`Python process error: ${data}`);
            interaction.followUp('There was an error running the Python script.');
        });

        process.on('close', (code) => {
            if (code !== 0) {
                console.error(`Python process exited with code ${code}`);
                interaction.followUp('The Python script exited with an error.');
            }
        });
    }
};