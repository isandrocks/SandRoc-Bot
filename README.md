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
  - Create a `.env` file in the root directory of the project.
  - Add the following line to the `.env` file, replacing `<YOUR_BOT_TOKEN>` with your actual bot token:
    ```
    BOT_TOKEN=<YOUR_BOT_TOKEN>
    ```

4. Start the bot:
  ```
  npm start
  ```

## Usage

To use the bot, invite it to your Discord server and run slash commands by typing `/` followed by the command name.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
