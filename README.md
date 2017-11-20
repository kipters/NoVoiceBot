# NoVoice Bot

A bot I made since I was sick and tired of people sending voice and video messages in groups.

## How it works

Meh, it's simple enough, just read `index.js`.

## I want to deploy my own

The bot is ready to be deployed on Heroku.
Just follow the normal steps for creating a new bot with [Botfather](https://t.me/botfather) and get your own key.

You **MUST** configure two environment variables:

| var       | description
|-----------|-------------
| `BOT_KEY` | The key you got from Botfather.
| `BOT_ID`  | The bot's ID. Usually it's the number before the colon in `BOT_KEY`. Otherwise you can just call the [`getMe`](https://core.telegram.org/bots/api#getme) method.

## Config

Optionally you can configure the optional environment variables:

| var         | description
|-------------|-------------
| `MAX_VOICE` | Maximum allowed duration for voice messages. Set it to `-1` to allow any duration.
| `MAX_VIDEO` | Maximum allowed duration for video messages. Set it to `-1` to allow any duration.
| `BAN_TIME`  | Ban duration in seconds. As per [Telegram specifications](https://core.telegram.org/bots/api#kickchatmember), a time under 30 seconds or over 366 days is considered a **permanent** ban.
| `INFO_MSG`  | What the bot says after joining a new group
| `PRIV_MSG`  | What the bot says in private conversations

## License

This code is licensed under the MIT license.

You can find me on [Telegram](https://t.me/kipters).
