const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');


const llama = new SlashCommandBuilder()
    .setName('llama')
    .setDescription('talk to the llama bot!')
    .addStringOption(option =>
        option.setName('input')
            .setDescription('What you are asking the llama')
            .setMaxLength(2000));


module.exports = {
    data: llama,
    async execute(interaction) {
        const options = {
            method: 'post',
            url: 'http://localhost:11434/api/generate',
            headers: { 'Content-Type': 'application/json', 'User-Agent': 'insomnia/9.1.0' },
            data: {
              model: 'llama3',
              prompt: `${interaction.options.getString('input')} 1950words`,
              stream: false,
            }
          };

        await interaction.deferReply(); // Acknowledge the interaction immediately

          axios.request(options)
              .then(function(response) {
                  // console.log(response.data.response);
                  // Send the final response in a follow-up message
                  interaction.followUp(`you ask the llama: ${interaction.options.getString('input')} \n\n the llama said: ${response.data.response}`);
              })
              .catch(function(error) {
                  console.error(`Axios async error: ${error}`);
                  // If there's an error, let the user know
                  interaction.followUp('There was an error fetching data.');
              });
    }
};