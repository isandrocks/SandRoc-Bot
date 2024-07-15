# SandRoc-Bot

SandRoc-Bot is a basic Discord bot that can access my locally run LLM, TTS, and stable diffusion AI to allow access to them from Discord.

## Installation

1. Clone the repository:
  ```
  git clone https://github.com/TestSandRocks/SandRoc-Bot.git
  ```

2. Install the required dependencies:
  ```
  npm install
  ```

3. Configure the bot token:
  - Create a new Discord application and bot on the [Discord Developer Portal](https://discord.com/developers/applications).
  - Copy the bot token.
  - Create a `config.json` file in the root directory of the project.
  - Add the following line to the `config.json` file, replacing `<YOUR_BOT_TOKEN>` with your actual bot token:
    ```
    {
    "token" : "<YOUR_BOT_TOKEN>",
    "clientId": "<YOUR_BOT_clientId>",
    "guildId": "<YOUR_BOT_guildId>"
    }
    ```

4. Start the bot:
  ```
  node index.js
  ```

## Usage

To use the bot, invite it to your Discord server and run slash commands by typing `/` followed by the command name.

The `llama`, `txt2img`, and `paimon_tts` commands are for my AI running locally on the same machine and will not work without some external setup.

For the AI I am running:
1. Ollama in a Docker container
   [https://github.com/ollama/ollama](https://github.com/ollama/ollama)
   
2. Parler TTS. This can be set up in the bot's repository.
   [https://huggingface.co/parler-tts/parler_tts_mini_v0.1](https://huggingface.co/parler-tts/parler_tts_mini_v0.1)
   
3. ComfyUI running locally. You will also need to create a `workflow_api.json` and place it in the root directory.
   [https://github.com/comfyanonymous/ComfyUI](https://github.com/comfyanonymous/ComfyUI)


## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
